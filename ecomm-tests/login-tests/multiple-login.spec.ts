import { test, expect, Browser, Page, BrowserContext, Locator } from "@playwright/test";
import { chromium } from "@playwright/test";

test("multiple users should login in", async () => {
  const browser: Browser = await chromium.launch({
    headless: true,
    channel: "chrome",
  });

  //create multiple contexts
  const context1: BrowserContext = await browser.newContext();
  const context2: BrowserContext = await browser.newContext();

  //open pages and navigate to portal from these contexts
  const page1: Page = await context1.newPage();
  page1.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
  );

  const page2: Page = await context2.newPage();
  page2.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
  );

  const email1: Locator = page1.locator("#input-email");
  const password1: Locator = page1.locator("#input-password");
  const loginButton1: Locator = page1.locator("input[type='submit']");

  await email1.fill("testuser7892@gmail.com");
  await password1.fill("testuser7892");
  await loginButton1.click();

  const title1:string = await page1.title();
  expect(title1).toEqual('My Account');


  const email2: Locator = page2.locator("#input-email");
  const password2: Locator = page2.locator("#input-password");
  const loginButton2: Locator = page2.locator("input[type='submit']");

  await email2.fill("testuser7892@gmail.com");
  await password2.fill("testuser7892");
  await loginButton2.click();

  const title2:string = await page2.title();
  expect(title2).toEqual('My Account');

  await context1.close();
  await context2.close();

  await browser.close();
  
});
