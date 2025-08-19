import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import 'dotenv/config'

test.describe('AUTHORIZATION GENERAL', () => { 
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => { 
        loginPage = new LoginPage(page)
        loginPage.visit('v6/user/login')
    })

    test('verify login form elements', async ({ page }) => {
        await loginPage.verifyFormElements()
    })
})


test.describe('AUTHORIZATION POSITIVE', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => { 
        loginPage = new LoginPage(page)
        loginPage.visit('v6/user/login')
    })

    test('verify user can log in with valid credentials', async ({ page }) => {
        await page.locator('[name="email"]').fill(process.env.EMAIL)
        await page.locator('[name="password"]').fill(process.env.PASSWORD)
        await page.getByRole('button').click()

        await page.locator('.menu-link').click()
        
        await expect(page.locator('h3')).toHaveText('Clients')
        await expect(page.url()).toContain('client')
    })
})

test.describe('AUTHORIZATION NEGATIVE', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => { 
        loginPage = new LoginPage(page)
        loginPage.visit('v6/user/login')
    })

    test('verify user can\'t log in with invalid email', async ({ page }) => {
        await page.locator('[name="email"]').fill('invalid@pirate.com')
        await page.locator('[name="password"]').fill(process.env.PASSWORD)
        await page.getByRole('button').click()

        await expect(page.locator('.ant-notification-notice-message')).toHaveText('Auth failed')
    })

    test('verify user can\'t log in with invalid password', async ({ page }) => {
        await page.locator('[name="email"]').fill(process.env.EMAIL)
        await page.locator('[name="password"]').fill("invalid123")
        await page.getByRole('button').click()

        await expect(page.locator('.ant-notification-notice-message')).toHaveText('Auth failed')
    })

    test('verify user can\'t log in with empty data', async ({ page }) => {

        await expect(page.locator('[name="email"]')).toHaveAttribute('required')
        await expect(page.locator('[name="password"]')).toHaveAttribute('required')

        await page.locator('[name="email"]').fill("")
        await page.locator('[name="password"]').fill("")
        await page.getByRole('button').click()

        await expect(page.getByRole('button')).toBeVisible()
        await expect(page.url()).toContain('login')
        
    })

    test('login form empty fields validation', async ({ page }) => {
        await page.getByRole('button').click()

        const emailValidationMessage = await page.locator('[name="email"]').evaluate((el: HTMLInputElement) => el.validationMessage);

        await expect(emailValidationMessage.length).toBeGreaterThan(0);

        await page.locator('[name="email"]').fill(process.env.EMAIL)
        await page.getByRole('button').click()

         const passwordValidationMessage = await page.locator('[name="email"]').evaluate((el: HTMLInputElement) => el.validationMessage);

        await expect(passwordValidationMessage.length).toBeGreaterThan(0);
    })


})