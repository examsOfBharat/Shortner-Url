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
      const shortUrl = shortid.generate();
      const newUrl = await Url.create({ originalUrl, shortUrl });

      res.status(201).json(newUrl);
    } catch (error) {
      res.status(500).json({ error: "Failed to shorten URL" });
    }
  }
}
