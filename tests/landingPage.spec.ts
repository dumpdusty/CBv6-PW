import { LandingPage } from "../pages/LandingPage";
import { test } from '@playwright/test';

test.describe('LANDING PAGE', () => {
    let landingPage: LandingPage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page)
        await landingPage.visit('v6')
    });

    test(`verify web-elements `, async () => {
        await landingPage.verifyHeader('Dispatching and accounting for service companies')

        await landingPage.verifyFormElements()
    })

    test(`verify links`, async () => {
        await landingPage.verifyLinks()
    })
})