import { Handler } from "@netlify/functions";
import { OAuth2Client } from "google-auth-library";
import {
  Call,
  Client as FaunaClient,
  Create,
  Exists,
  Function,
  Get,
  If,
  Index,
  IsNonEmpty,
  Let,
  Match,
  Now,
  Select,
  TimeAdd,
  Tokens,
  Update,
  Var,
  Delete,
  Do,
} from "faunadb";

// eslint-disable-next-line no-unused-vars
export const handler: Handler = async (event, _context) => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);
    const idToken = event.queryStringParameters.id_token;

    if (!process.env.FAUNADB_SERVER_SECRET) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Fauna server secret not set.",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    if (!idToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No idToken provided" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    if (ticket["error"]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Token failed verification", ticket }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    const payload = ticket.getPayload();
    const userId = ticket.getUserId();

    const fauna = new FaunaClient({
      secret: process.env.FAUNADB_SERVER_SECRET,
      domain: "db.fauna.com",
      port: 443,
      scheme: "https",
    });

    const userRef = await fauna.query(
      If(
        Exists(Match(Index("user_by_googleid"), userId)),
        // Make sure to update the idToken
        Select(
          "ref",
          Update(Select("ref", Get(Match(Index("user_by_googleid"), userId))), {
            data: {
              lastLogin: Now(),
            },
          })
        ),
        Call(
          Function("CreateNewUserFromGoogle"),
          userId,
          payload.name ? payload.name : payload.given_name,
          payload.picture,
          payload.email,
          payload.email_verified
        )
      )
    );

    // Create a Fauna token for the user.
    const token = (await fauna.query(
      Let(
        {
          tokenSet: Match(Index("tokens_by_instance"), userRef as object),
        },
        Do(
          If(
            IsNonEmpty(Var("tokenSet")),
            Delete(Select("ref", Get(Var("tokenSet")))),
            null
          ),
          Create(Tokens(), {
            instance: userRef,
            ttl: TimeAdd(Now(), 3, "hours"),
          })
        )
      )
    )) as any;

    return {
      statusCode: 200,
      body: JSON.stringify({
        secret: token.secret,
      }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (e: Error | any) {
    console.debug(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
