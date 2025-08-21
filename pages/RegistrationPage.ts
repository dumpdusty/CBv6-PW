import { Page, expect } from '@playwright/test'
import { ExternalPage } from './ExternalPage'


export class RegistrationPage extends ExternalPage {

    constructor(page: Page) {
        super(page)
    }

    get companyNameField() {
        return this.page.locator('[name="companyName"]')
    }
    
    get firstNameField() {
        return this.page.locator('[name="firstName"]')
    }
    
    get lastNameField() {
        return this.page.locator('[name="lastName"]')
    }

    get emailField() {
        return this.page.locator('[name="email"]')
    }

    get passwordField() {
        return this.page.locator('[name="password"]')
    }
    
    get submitButton() {
        return this.page.getByRole('button')
    }
    
    
       async verifyFormElements(){
        await expect(this.page.locator('.header-logo')).toContainText('ClientBase')
        await expect(this.page.locator('.card-title')).toHaveText('Sign Up')
        await expect(this.page.locator('[name="companyName"]')).toHaveAttribute('placeholder', 'Enter company name')
        await expect(this.page.locator('[name="firstName"]')).toHaveAttribute('placeholder', 'Enter your first name')
        await expect(this.page.locator('[name="lastName"]')).toHaveAttribute('placeholder', 'Enter last name')
        await expect(this.page.locator('[name="email"]')).toHaveAttribute('placeholder', 'Enter email')
        await expect(this.page.locator('[name="password"]')).toHaveAttribute('placeholder', 'Enter password')

        await expect(this.page.getByRole('button')).toHaveText('Create Account')

        await expect(this.page.locator('.card-footer')).toHaveText('Already have an account? Just click Log in.')   
        await expect(this.page.locator('.card-footer a')).toHaveAttribute('href', '/v6/user/login')
    }
}