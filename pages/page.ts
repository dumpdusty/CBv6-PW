import { Page, expect } from '@playwright/test'

export class BasePage { 

    readonly page: Page

    constructor(page: Page) { 
        this.page = page
    }


    async visit(endpoint: string) { 
        await this.page.goto(endpoint)
    }

    async verifyHeader(text: string) { 
        await expect(this.page.locator('h1')).toHaveText(text)
    }
}