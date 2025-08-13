import { Page, expect } from '@playwright/test'
import { BasePage } from './page'

export class LandingPage extends BasePage { 

    constructor(page: Page) { 
        super(page)
    }

    async verifyFormElements() { 
        await expect(this.page.locator('.form-label', {hasText: "Company name"})).toBeVisible()
        await expect(this.page.locator('[name="companyName"]')).toHaveAttribute('placeholder', 'Enter company name')

        await expect(this.page.locator('.form-label', {hasText: "First name"})).toBeVisible()
        await expect(this.page.locator('[name="firstName"]')).toHaveAttribute('placeholder', 'Enter your first name')

        await expect(this.page.locator('.form-label', {hasText: "Last name"})).toBeVisible()
        await expect(this.page.locator('[name="lastName"]')).toHaveAttribute('placeholder', 'Enter last name')

        await expect(this.page.locator('.form-label', {hasText: "Email"})).toBeVisible()
        await expect(this.page.locator('[name="email"]')).toHaveAttribute('placeholder', 'Enter email')
        
        await expect(this.page.locator('.form-label', {hasText: "Password"})).toBeVisible()
        await expect(this.page.locator('[name="password"]')).toHaveAttribute('placeholder', 'Enter password')

        await expect(this.page.getByRole('button', {name: 'CREATE ACCOUNT'})).toHaveText('Create Account')
        
        await expect(this.page.locator('.card-footer')).toContainText('Already have an account? Just click ')

        await expect(this.page.locator('.card-footer a')).toHaveAttribute('href', expect.stringContaining('user/login'))
    }

    async verifyLinks() { 
        await this.page.locator('a', { hasText: 'Login' }).click()
        await expect(this.page.url()).toContain('user/login')
        await expect(this.page.locator('.card-title')).toHaveText('Sign In')

        await this.page.goBack()
        await this.page.locator('a', { hasText: 'Get started' }).click()
        await expect(this.page.url()).toContain('user/register')
        await expect(this.page.locator('.card-title')).toHaveText('Sign Up')
    }
}