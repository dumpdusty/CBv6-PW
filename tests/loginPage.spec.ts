import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

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
        await page.locator('[name="email"]').fill('jacksparrow@pirate.com')
        await page.locator('[name="password"]').fill('Pirate666!')
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
        await page.locator('[name="password"]').fill('Pirate666!')
        await page.getByRole('button').click()

        await expect(page.locator('.ant-notification-notice-message')).toHaveText('Auth failed')
     
    })
})