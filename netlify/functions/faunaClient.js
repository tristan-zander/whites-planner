import { Client } from "faunadb";

export const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: "db.fauna.com",
  port: 443,
  scheme: "https",
});

export default client;
