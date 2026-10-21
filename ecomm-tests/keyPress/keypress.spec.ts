import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium } from "@playwright/test";

test("should be able to type", async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
  });
  const page: Page = await browser.newPage();
  await page.goto("https://www.flipkart.com/");

  await page.locator("css=span[role=button]").click();
  const textBox: Locator = page
    .locator('css=input.nw1UBF.v1zwn26')
    .first();

  await textBox.press('w'); // press takes the name of the key like Enter or q
   await page.waitForTimeout(4000);
   await textBox.pressSequentially("ire less", {delay:1000}); // takes string of chars to be types
  await textBox.press('Backspace');
  await textBox.press('e+Shift+a'); // combination of keys
  await page.keyboard.press('Control+A+Delete'); // if element is already in focus, use keyboard api

  await page.waitForTimeout(4000);
});
