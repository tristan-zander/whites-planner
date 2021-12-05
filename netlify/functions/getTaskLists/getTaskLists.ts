import { Handler } from "@netlify/functions";
import {
  Client,
  Paginate,
  Documents,
  Collection,
  Map,
  Lambda,
  Get,
} from "faunadb";
import client from "../faunaClient";

export const handler: Handler = async (event, context) => {
  const taskLists = await client.query(
    Map(
      Paginate(Documents(Collection("TaskList"))),
      Lambda((x) => Get(x))
    )
  );

  const data = taskLists.data.map((ref) => {
    return ref.data;
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
