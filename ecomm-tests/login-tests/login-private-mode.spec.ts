import { test, Page, BrowserContext } from "@playwright/test";
import { chromium } from "@playwright/test";
import { error } from "node:console";

test("load portal in persistent mode ", async () => {
  const browser: BrowserContext = await chromium.launchPersistentContext(
    "./sessionData",
    {
      channel: "chrome",
      headless: false,
    },
  );

  const pages:Page[] = browser.pages();
  const page = pages[0];
  if (!page) throw new Error("page not found");
  
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
  );

  await page
    .getByRole("textbox", { name: "E-Mail Address" })
    .fill("testuser7892@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("testuser7892");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForTimeout(5000);

  await browser.close();
});
