# IPL Stats Backend

This is a Node.js + Express backend that scrapes live IPL player statistics using Puppeteer from the official [IPL website](https://www.iplt20.com/stats) and exposes a REST API.

## 📊 Features

- Scrapes live stats like:
  - Orange Cap
  - Most Fours
  - Most Sixes
  - Most Centuries
  - Most Fifties
- Uses Puppeteer for browser automation
- Returns top 10 players in the selected category

## 📦 Tech Stack

- Node.js
- Express.js
- Puppeteer
- CORS

## 🛠 API Endpoint
```
GET /api/ipl-stats?year={YEAR}&category={CATEGORY}
```