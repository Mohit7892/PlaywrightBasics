import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { webkit, firefox, chromium } from "@playwright/test";

test("authenticate the user", async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
  });
  const page: Page = await browser.newPage();
  //await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');

  const username:string = "admin";
  const password:string = "admin";
  // const authToken:string = "Basic "+btoa("admin:admin");
  await page.setExtraHTTPHeaders({
    Authorization: getAuthToken(username, password),
  });

  await page.goto("https://the-internet.herokuapp.com/basic_auth");

  //static waits
  await page.waitForTimeout(5000);

  const successMsg: Locator = page.locator("//h3/following-sibling::p");
  await expect(successMsg).toContainText("Congratulations");

  await browser.close();
});

function getAuthToken(username:string,password:string):string {
  const token = "Basic " + btoa(username+":"+password);
  return token;
}
