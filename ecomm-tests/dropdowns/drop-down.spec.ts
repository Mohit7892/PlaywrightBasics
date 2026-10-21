import { test, expect, Browser, Page } from "@playwright/test";
import { chromium } from "@playwright/test";

test("should be able to handle drop downs", async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
  });
  const page: Page = await browser.newPage();
  await page.goto("https://orangehrm.com/30-day-free-trial");

//   await page.selectOption("css=select[name='Country']", { label: "India" });
//   await page.selectOption("css=select[name='Country']", { value: "Australia" });
//  await page.selectOption("css=select[name='Country']", { index: 3 });

  // const dropDown = page.locator(".dropdown");

  const allOptions = await page.locator("css=.dropdown > option").all();
  console.log(allOptions.length);

  for (const option of allOptions) {
    const optionText = await option.textContent();
    if (optionText?.trim() === "Australia") {
      await page.selectOption("css=select[name='Country']", { label: "Australia" });
      break;
    }
  }

  await page.waitForTimeout(10000);
});
