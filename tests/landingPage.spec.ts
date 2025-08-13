import { LandingPage } from "../pages/LandingPage";
import { test } from '@playwright/test'

test.describe('LANDING PAGE',() => { 
    test('verify web-elements', async ({ page }) => { 
        const landingPage = new LandingPage(page)

        await landingPage.visit('v6')

        await landingPage.verifyHeader('Dispatching and accounting for service companies') 

        await landingPage.verifyFormElements()
    })

    test('verify links', async ({ page }) => { 
        const landingPage = new LandingPage(page)

        await landingPage.visit('v6')

        await landingPage.verifyLinks()
    })
})
