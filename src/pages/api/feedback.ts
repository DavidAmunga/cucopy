import notionClient from "@/lib/notionclient";
import type { NextApiRequest, NextApiResponse } from "next";

const databaseId = process.env.NOTION_FEEDBACK_DATABASE;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { feedback, category } = req.body;

      // Add a new page to the database
      await notionClient.pages.create({
        parent: { database_id: databaseId! },
        properties: {
          // Assuming you have a property named "Feedback" in your database
          Title: {
            title: [
              {
                text: {
                  content: `${category || "Feedback"}-${Date.now()}`,
                },
              },
            ],
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: feedback,
                },
              },
            ],
          },
          Category: {
            select: {
              name: category || "Feedback", // The category value from the request
            },
          },
        },
      });

      res.status(200).json({ message: "Thanks for your feedback 🙂" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
