import {test, expect, Browser, Page} from '@playwright/test'
import { chromium } from '@playwright/test'

test('should be able to login to orange hrm', async() => {
  const browser:Browser = await chromium.launch({headless: false, channel:"chrome"});
  
  const page:Page = await browser.newPage();
  await page.goto('https://orangehrm.com/30-day-free-trial');

  //selector chaining
  page.locator('fieldset >> #Form_getForm_subdomain_Holder >> input#Form_getForm_subdomain')
  .click();
  page.locator('fieldset >> #Form_getForm_subdomain_Holder >> input#Form_getForm_subdomain')
  .fill('abcdefgh');
  page.locator('fieldset >> #Form_getForm_Name_Holder >> input#Form_getForm_Name')
    .click();
    page.locator('fieldset >> #Form_getForm_Name_Holder >> input#Form_getForm_Name')
    .fill("admin123");
    page.locator("fieldset >> #Form_getForm_Email_Holder >> input[name='Email']")
    .fill("admin123@gmail.com");

    //locator-chaining
    const contactHolder = page.locator('id=Form_getForm_Contact_Holder');
    contactHolder.locator("//label[@for='Form_getForm_Contact']/..//input")
    .fill("8967453423");

    const buttonToolBar = page.locator('.btn-toolbar');
    const submitBtn = page.locator('#Form_getForm_action_submitForm');

   buttonToolBar.locator(submitBtn).click();



    await page.waitForTimeout(5000);
    await browser.close();
})
