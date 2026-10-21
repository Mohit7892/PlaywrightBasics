import { test, expect, Browser, Page } from "@playwright/test";
import { webkit, chromium, firefox } from "@playwright/test";

test("should be able to perform mouse clicks ", async () => {
  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto("https://the-internet.herokuapp.com/");

  //   //normal click
  await page.getByRole("link", { name: "Context Menu" }).click();

  //   //context click or right click
  await page.locator("#hot-spot").click({ button: "right" });
  await page.waitForTimeout(5000);

  page.goBack();

  //   //click with+ control/shift/Alt
  await page.getByText("Redirect Link").click();
  await page
    .getByRole("link", { name: "here" })
    .click({ modifiers: ["Control"] });

  await page.waitForTimeout(5000);

  await page.goBack();
  await page.goto("https://demoqa.com/buttons");

  //     //double click
  await page.locator("id=doubleClickBtn").dblclick();

  await expect(page.locator("id=doubleClickMessage")).toBeVisible();

  await page.waitForTimeout(5000);

  await page.goto("https://demoqa.com/droppable");

  //drag and drop
  await page
    .locator(".simple-drop-container > #draggable")
    .dragTo(page.locator(".simple-drop-container > #droppable"));

  //   await page.locator('.simple-drop-container > #draggable').hover();
  //   await page.mouse.down();
  //   await page.locator('.simple-drop-container > #droppable').hover();
  //   await page.mouse.up();

  await expect(page.locator("#droppable > p").first()).toHaveText("Dropped!");

  await page.screenshot({ path: "./PlaywrightDemo/folder/dragging.png" });

  await page.waitForTimeout(5000);
});
