import { Page, expect } from '@playwright/test'
import { BasePage } from './page'

export class LoginPage extends BasePage{ 

    constructor(page: Page){ 
        super(page)
    }

    
}