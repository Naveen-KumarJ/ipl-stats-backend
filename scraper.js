import puppeteer from "puppeteer";

const categories = {
  orangeCap: "Orange Cap",
  fours: "Most Fours (Innings)",
  sixes: "Most Sixes (Innings)",
  hundreds: "Most Centuries",
  fifties: "Most Fifties",
};

export const scrapeAllStats = async (year, categoryKey) => {
  if (!categories[categoryKey]) {
    throw new Error("Invalid category key");
  }

  const browser = await puppeteer.launch({headless:false, slowMo:100});
  const page = await browser.newPage();

  await page.goto(`https://www.iplt20.com/stats/${year}`, {
    waitUntil: "networkidle0",
  });

  await page.waitForSelector(".statsTypeFilter");
  await page.click(".statsTypeFilter");

  const tabLabel = categories[categoryKey];
  await page.evaluate((label) => {
    const tabs = Array.from(document.querySelectorAll(".cSBListItems"));
    const target = tabs.find((el) => el.innerText.trim() === label);
    if (target) target.click();
  }, tabLabel);

  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const data = await page.evaluate(() => {
    const rows = document.querySelectorAll(".statsTable tbody tr");
    return Array.from(rows)
      .slice(1, 11)
      .map((row) => ({
        name: row.querySelector(".st-ply-name")?.innerText.trim(),
        team: row.querySelector(".st-ply-tm-name")?.innerText.trim(),
        profile: row.querySelector(".pbi img")?.getAttribute("src") || null,
        stat: row.querySelectorAll("td")[2]?.innerText?.trim(),
      }));
  });

  await browser.close();
  return {
    year,
    category: categoryKey,
    data,
  };
};
