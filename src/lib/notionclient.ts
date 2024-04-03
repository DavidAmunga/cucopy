import { Client } from "@notionhq/client";

// Initializing a client
const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default notionClient;
