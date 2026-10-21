import { test, expect, Browser, Page, Locator, BrowserContext } from "@playwright/test";
import { webkit, chromium, firefox } from "@playwright/test";

test("should be able to mouse hover", async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
  });
  const context:BrowserContext = await browser.newContext();
  await context.grantPermissions(['geolocation']);
  const page: Page = await context.newPage();

  const pagePromise = context.waitForEvent('page');
  
  await page.goto("https://www.spicejet.com/");


  //mouse actions
  await page.getByText("Add-ons").first().hover();
  await page.waitForTimeout(5000);
  const option: Locator = page
    .getByText("Indian Armed Forces Personnel")
    .first();
    
  await option.hover();
  await page.waitForTimeout(5000);
  await option.click();

  const newPage = await pagePromise;
  

  await expect(newPage).toHaveURL('https://corporate.spicejet.com/IAFPersonnel.aspx');
  await newPage.screenshot({path:"./shots/army.png"});

  
  await context.close();
  await browser.close();
});
