import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  const { identity, user } = context.clientContext;

  console.debug(context, event);

  return {
    statusCode: 200,
    body: JSON.stringify(JSON.parse(event.body)),
  };
};
