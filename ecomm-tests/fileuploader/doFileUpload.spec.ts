import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium } from "@playwright/test";
import path from "path";

test("should be able to upload files", async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
    slowMo: 2000,
  });
  const page: Page = await browser.newPage();
  await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

  await page.locator("id=filesToUpload").click();

  await page
    .locator("id=filesToUpload")
    .setInputFiles(
      path.join(
        "C:/Users/Asus/VSCodeProjects/PlaywrightDemo/ecomm-tests/files/MyPhoto.png",
      ),
    );


await page
    .locator("id=filesToUpload")
    .setInputFiles([]);

    await page
    .locator("id=filesToUpload")
    .setInputFiles([
        path.join("C:/Users/Asus/VSCodeProjects/PlaywrightDemo/ecomm-tests/files/MyPhoto.png"),
        path.join("C:/Users/Asus/VSCodeProjects/PlaywrightDemo/ecomm-tests/files/Nagraj.png")
    ]);

    await page
    .locator("id=filesToUpload")
    .setInputFiles([]);

  await page.waitForTimeout(4000);
  await browser.close();
});
