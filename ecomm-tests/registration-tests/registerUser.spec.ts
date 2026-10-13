import {test, expect, Browser, Page, Locator} from '@playwright/test'
import { webkit, firefox, chromium } from '@playwright/test'

test('register a user', async() => {
    const browser:Browser = await chromium.launch({headless : true})
    const page:Page = await browser.newPage();

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    const firstName:Locator = await page.locator("#input-firstname");
    const lastName:Locator = await page.locator("#input-lastname");
    const email:Locator = await page.locator("#input-email");
    const telephone:Locator = await page.locator("#input-telephone");
    const password:Locator = await page.locator("#input-password");
    const confirmPassword:Locator = await page.locator("#input-confirm");
    const submitButton:Locator = await page.locator('.btn.btn-primary');
    const checkBox:Locator = await page.locator("input[type='checkbox']");

    await firstName.fill('test');
    await lastName.fill('user');
    await email.fill("testuser@gmail.com ");
    await telephone.fill(`1234567897`);
    await password.fill('test123');
    await confirmPassword.fill('test123');

    await checkBox.check();
    await submitButton.click();

    const title = await page.title();
    expect(title).toEqual('Your Account Has Been Created!');


    await browser.close();

});