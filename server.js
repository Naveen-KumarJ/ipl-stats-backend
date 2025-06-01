import express from "express";
import cors from "cors";
import { scrapeAllStats } from "./scraper.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/api/ipl-stats", async (req, res) => {
  const { year, category } = req.query;
  if (!year || !category)
    return res.status(400).json({ error: "Year and Category is Required" });

  try {
    const stats = await scrapeAllStats(year, category);
    res.json(stats);
  } catch (error) {
    console.error("Scraping failed:", error);
    res.status(500).json({ error: "Failed to fetch IPL stats." });
  }
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
