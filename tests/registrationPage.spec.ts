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

test.describe('REGISTRATION POSITIVE', () => { 
     let registrationPage: RegistrationPage

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page)
        registrationPage.visit('v6/user/register')
    })
0
    test('verify user can register with valid data', async ({ page }) => {

        const newEmail = `pirate_${Date.now()}@pirate.com`
        console.log(newEmail)
        
        await registrationPage.companyNameField.fill('Black Pearl')
        await registrationPage.firstNameField.fill('Jack')
        await registrationPage.lastNameField.fill('Sparrow')
        await registrationPage.emailField.fill(newEmail)
        await registrationPage.passwordField.fill(process.env.PASSWORD)
        await registrationPage.submitButton.click()

        await expect(page).toHaveURL('v6/onboarding')
        await expect(page.locator('h5')).toContainText(`We sent you confirmation email to ${newEmail}`)
    })
})