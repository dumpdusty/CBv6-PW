import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('AUTHORIZATION', () => { 
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => { 
        loginPage = new LoginPage(page)
        loginPage.visit('v6/user/login')
    })

    test('verify login form elements', async ({ page }) => { 
        await expect(page.locator('.header-logo')).toContainText('ClientBase')
    })
})