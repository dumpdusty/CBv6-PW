import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../pages/RegistrationPage'
import 'dotenv/config'

test.describe('REGISTRATION GENERAL', () => {

    let registrationPage: RegistrationPage

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page)
        registrationPage.visit('v6/user/register')
    })

    test('verify login page interface', async ({ page }) => {
       await expect(page).toHaveURL('v6/user/register')
       
        await registrationPage.verifyFormElements()
        
    })
})

// test.describe('REGISTRATION POSITIVE', () => { 
//      let registrationPage: RegistrationPage

//     test.beforeEach(async ({ page }) => {
//         registrationPage = new RegistrationPage(page)
//         registrationPage.visit('v6/user/register')
//     })
// 0
//     test('verify user can register with valid data', async ({ page }) => {

//         const newEmail = `pirate_${Date.now()}@pirate.com`
        
//         await registrationPage.companyNameField.fill('Black Pearl')
//         await registrationPage.firstNameField.fill('Jack')
//         await registrationPage.lastNameField.fill('Sparrow')
//         await registrationPage.emailField.fill(newEmail)
//         await registrationPage.passwordField.fill(process.env.PASSWORD)
//         await registrationPage.submitButton.click()

//         await expect(page).toHaveURL('v6/onboarding')
//         await expect(page.locator('h5')).toContainText(`We sent you confirmation email to ${newEmail}`)
//     })
// })

test.describe('REGISTRATION NEGATIVE', () => {
      let registrationPage: RegistrationPage

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page)
        registrationPage.visit('v6/user/register')
    })

    test('verify user can\'t register with empty fields', async ({ page }) => {
        const newEmail = `pirate_${Date.now()}@pirate.com`

        await registrationPage.submitButton.click()

        const emailValidationMessage = await page.locator('[name="email"]').evaluate((el: HTMLInputElement) => el.validationMessage);
        await expect(emailValidationMessage).toEqual('Please fill out this field.');

        await page.reload()
        
        await registrationPage.companyNameField.fill('Black Pearl')
        await registrationPage.firstNameField.fill('Jack')
        await registrationPage.lastNameField.fill('Sparrow')
        await registrationPage.emailField.fill(newEmail)
        await registrationPage.submitButton.click()

        const passwordValidationMessage = await page.locator('[name="password"]').evaluate((el: HTMLInputElement) => el.validationMessage);
        await expect(passwordValidationMessage).toEqual('Please fill out this field.');
        
    })

    test('verify email and password fields are required', async ({page}) => {
        await expect(registrationPage.emailField).toHaveAttribute('required')
        await expect(registrationPage.passwordField).toHaveAttribute('required')
    })

    test('verify first name and last name fields cant be empty', async ({ page }) => {
        const newEmail = `pirate_${Date.now()}@pirate.com`

        await registrationPage.companyNameField.fill('Black Pearl')
        await registrationPage.lastNameField.fill('Sparrow')
        await registrationPage.emailField.fill(newEmail)
        await registrationPage.passwordField.fill('Qwerty123')
        await registrationPage.submitButton.click()

        await expect(page.getByRole('alert')).toHaveText('User was not created')

        await page.reload()

        await registrationPage.companyNameField.fill('Black Pearl')
        await registrationPage.firstNameField.fill('Jack')
        await registrationPage.emailField.fill(newEmail)
        await registrationPage.passwordField.fill('Qwerty123')
        await registrationPage.submitButton.click()

        await expect(page.getByRole('alert')).toHaveText('User was not created')
    })

    test('verify user can\'t register with existing email', async ({ page }) => {
        await registrationPage.companyNameField.fill('Black Pearl')
        await registrationPage.firstNameField.fill('Jack')
        await registrationPage.lastNameField.fill('Sparrow')
        await registrationPage.emailField.fill(process.env.EMAIL)
        await registrationPage.passwordField.fill(process.env.PASSWORD)
        await registrationPage.submitButton.click()

        await expect(page.getByRole('alert')).toHaveText('User with this e-mail exists')
    })
})