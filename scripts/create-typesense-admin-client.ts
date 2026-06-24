import { Client } from "typesense";

export function createTypesenseAdminClient() {
  const host = process.env.PUBLIC_TYPESENSE_API_HOST;
  const port = process.env.PUBLIC_TYPESENSE_API_PORT;
  const protocol = process.env.PUBLIC_TYPESENSE_API_PROTOCOL;
  const apiKey = process.env.TYPESENSE_ADMIN_API_KEY;

  if (!host || !port || !protocol || !apiKey) {
    throw new Error("Missing Typesense environment variables");
  }

  return new Client({
    nodes: [
      {
        host,
        port: Number(port),
        protocol: protocol as "http" | "https",
      },
    ],
    apiKey,
    connectionTimeoutSeconds: 2,
  });
}



