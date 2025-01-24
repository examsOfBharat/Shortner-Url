import dbConnect from "../../lib/dbConnect";
import Url from "../../models/Url";
import shortid from "shortid";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    try {
      // Check if the original URL already exists in the database
      let existingUrl = await Url.findOne({ originalUrl });

      if (existingUrl) {
        // If the URL exists, return the existing short URL
        return res.status(200).json({ shortUrl: existingUrl.shortUrl });
      }

      // If the URL doesn't exist, generate a new short URL and save it
      const shortUrl = shortid.generate();
      const newUrl = await Url.create({ originalUrl, shortUrl });

      res.status(201).json(newUrl);
    } catch (error) {
      res.status(500).json({ error: "Failed to shorten URL" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
