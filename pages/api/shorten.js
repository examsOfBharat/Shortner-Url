import dbConnect from "../../lib/dbConnect";
import Url from "../../models/Url";
import shortid from "shortid";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { originalUrl, alias } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    try {
      // Check if the original URL already exists in the database
      let existingUrl = await Url.findOne({ originalUrl });

      // If no alias is provided, generate a new short URL
      if (!alias) {
        if (existingUrl) {
          return res.status(400).json({
            error:
              "This URL has already been shortened. Please use the existing short URL.",
          });
        }

        const shortUrl = shortid.generate();
        const newUrl = await Url.create({ originalUrl, shortUrl });
        return res.status(201).json(newUrl);
      } else {
        // Check if the alias already exists in the database
        let existingAlias = await Url.findOne({ alias });

        if (existingAlias) {
          return res.status(400).json({
            error: "Alias is already in use. Please choose another one.",
          });
        }

        // If both alias and original URL are unique, create a new URL with the alias
        const newUrl = await Url.create({ originalUrl, shortUrl: alias });
        return res.status(201).json(newUrl);
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to shorten URL Or already Exits" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

