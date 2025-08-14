import { Page, expect } from '@playwright/test'
import { BasePage } from './page'

export class LoginPage extends BasePage{ 

    constructor(page: Page){ 
        super(page)
    }

    async verifyFormElements(){
        await expect(this.page.locator('.header-logo')).toContainText('ClientBase')
        await expect(this.page.locator('.card-title')).toHaveText('Sign In')
        await expect(this.page.locator('[name="email"]')).toHaveAttribute('placeholder', 'Enter your email address')

        const forgotPasswordLink = this.page.getByText('Forgot password?')
        await expect(forgotPasswordLink).toHaveAttribute('href', '/v6/user/password/reset/request')

        await expect(this.page.locator('[name="password"]')).toHaveAttribute('placeholder', 'Enter your password')

        await expect(this.page.getByRole('button')).toHaveText('Log In')

        await expect(this.page.locator('.card-footer a')).toHaveAttribute('href', '/v6/user/register')
    }
}