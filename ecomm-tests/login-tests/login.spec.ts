import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, firefox, chromium} from '@playwright/test'

test('login to the portal ', async() => {
  const browser: Browser = await chromium.launch({headless : false})
  const page: Page = await browser.newPage();
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  const email:Locator = page.locator('#input-email');
  const password:Locator = page.locator('#input-password');
  const loginButton:Locator = page.locator("input[type='submit']");

  await email.fill('testuser7892@gmail.com')
  await password.fill('testuser7892')
  await loginButton.click();

  const title:string = await page.title();
  await page.screenshot({path:'./PlaywrightDemo/screenshots/user-homepage.png'});

  expect(title).toEqual('My Account');

  await browser.close();

})
