import {Page,Locator, expect} from "@playwright/test";

export class WebCommons {

    page: Page;

    static getAzurePlanIdFromCliArgs(): string | undefined {
        const argIndex = process.argv.findIndex((value) => value.toLowerCase() === '--planid');
        if (argIndex !== -1) {
            return process.argv[argIndex + 1]?.trim();
        }

        const equalArg = process.argv.find((value) => value.toLowerCase().startsWith('--planid='));
        if (equalArg) {
            return equalArg.split('=').slice(1).join('=').trim();
        }

        return undefined;
    }

    static getAzureSuiteIdFromCliArgs(): string | undefined {
        const argIndex = process.argv.findIndex((value) => value.toLowerCase() === '--suiteid');
        if (argIndex !== -1) {
            return process.argv[argIndex + 1]?.trim();
        }

        const equalArg = process.argv.find((value) => value.toLowerCase().startsWith('--suiteid='));
        if (equalArg) {
            return equalArg.split('=').slice(1).join('=').trim();
        }

        return undefined;
    }

    constructor(page: Page) {
        this.page = page;
    }
    
    //Launch the application and optionally verify the title. 
    async launchApplication(url: string, title?: string) {
        await this.page.goto(url);
        if (title) {
            await expect(this.page).toHaveTitle(title);
        }
    }

    //Generate Web Element from the Locator. 
    async element(locator: string): Promise<Locator> {
        return this.page.locator(locator);
    }

    async getElement(locator: string, locatorType: string, role?: string): Promise<Locator> {
        switch (locatorType.toLowerCase()) {
            case "xpath":
                return this.page.locator(`xpath=${locator}`);
            case "css":
                return this.page.locator(`css=${locator}`);
            case "placeholder":
                return this.page.getByPlaceholder(locator);
            case "text":
                return this.page.getByText(locator);
            case "role":
                return this.page.getByRole(role as any, { name: locator });
            case "label":
                return this.page.getByLabel(locator);

            default:
                throw new Error(`Unsupported locator type: ${locatorType}`);
        }
    }

    //Scroll to the target element when the element is not visible in the window. 
    async scrollToElement(locator: string) {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
    }

    //Click on the target element.
    async clickElement(locator: string) {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.click();
    }

    //Type the text in the target element.
    async enterText(locator: string, text: string) {
        const element = await this.element(locator);
        await element.clear();
        await element.fill(text);
    }

    //Blur the target element (e.g. to trigger field-level validation).
    async blurElement(locator: string) {
        const element = await this.element(locator);
        await element.blur();
    }

    //Select an option from the drop-down. 
    async selectOption(locator: string, option: string) {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.selectOption(option);
    }

    //Double click on the target element.
    async doubleClick(locator: string) {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.dblclick();
    }

    //Right click on the target element.
    async rightClick(locator: string) {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.click({ button: 'right' });
    }

    //Hover over the target element.
    async hoverOverElement(locator: string) {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.hover();
    }

    //Select the checkbox. 
    async selectCheckbox(locator: string) {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        const isChecked = await element.isChecked();
        if (!isChecked) {
            await element.check();
        }
    }

    //Get the text from the web element. 
    async getText(locator: string): Promise<string|null> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.textContent();
    }

    //Get the attribute value from the web element.
    async getAttribute(locator: string, attributeName: string): Promise<string|null> {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        return await element.getAttribute(attributeName);
    }

    //Method to verify the element is visible 
    async isElementVisible(locator: string): Promise<void> {
        const element = await this.element(locator);
        await expect(element).toBeVisible({ timeout: 30000 });
    }

    //Method to verify element is disappeared 
    async isElementDisappeared(locator: string): Promise<boolean> {
        const element = await this.element(locator);
        return await element.isHidden();
    }

    //Method to upload the file 
    async uploadFile(locator: string, filePath: string) {
        const element = await this.element(locator);
        await this.scrollToElement(locator);
        await element.setInputFiles(filePath);
    }

    //Method to Handle the Alert 
    async handleAlert(action: 'accept' | 'dismiss', promptText?: string) {
        this.page.once('dialog', async dialog => {
            if (action === 'accept') {
                await dialog.accept(promptText);
            } else {
                await dialog.dismiss();
            }
        });
    }

    //Method to take a screenshot 
    async takeScreenshot(path: string) {
        await this.page.screenshot({ path: path });
    }

    //Method to Refresh the page. 
    async refreshPage() {
        await this.page.reload();
    }

    //Method to set the resolution of the browser window 
    async setResolution(width: number, height: number) {
        await this.page.setViewportSize({ width, height });
    }

    //Method to launch the new tab 
    async launchNewTab(url: string) {
        const newPage = await this.page.context().newPage();
        return newPage.goto(url);
    }
        
    //Method to Locate the element inside the frame 
    async frameElement(frameLocator: string, elementLocator: string): Promise<Locator> {
        const frame = await this.page.frameLocator(frameLocator);
        return frame.locator(elementLocator);
    }

    //Method tocompare two values
    async compareValues(actualValue: string, expectedValue: string) {
        await expect(actualValue).toBe(expectedValue);
    } 

    //Method to Verify expected value contains actual value. 
    async verifyValueContains(actualValue: string, expectedValue: string) {
        await expect(actualValue).toContain(expectedValue);
    }

    
    //Update the Azure DevOps Test Plan point/result status after execution.
    async updateAzureTestStatus(
        testCaseId: number | string,
        status: 'Passed' | 'Failed' | 'Blocked' | 'Not Run',
        suiteId?: string,
        planId?: string
    ): Promise<boolean> {
        const orgUrl = (process.env.AZURE_ORG_URL || '').replace(/\/+$/, '');
        const pat = process.env.AZURE_PAT?.trim();
        const resolvedSuiteId = suiteId || WebCommons.getAzureSuiteIdFromCliArgs() || process.env.AZURE_TEST_SUITE_ID;
        const resolvedPlanId = planId || WebCommons.getAzurePlanIdFromCliArgs() || process.env.AZURE_TEST_PLAN_ID || '1357';

        if (!orgUrl || !pat || !resolvedSuiteId || !resolvedPlanId) {
            console.log(`[Azure Status] Skipping Azure update for TC #${testCaseId}. Set AZURE_ORG_URL, AZURE_PAT, --planId/--suiteId or AZURE_TEST_PLAN_ID/AZURE_TEST_SUITE_ID.`);
            return false;
        }

        const authHeader = `Basic ${Buffer.from(`:${pat}`).toString('base64')}`;
        const outcomeByStatus: Record<string, string> = {
            Passed: 'Passed',
            Failed: 'Failed',
            Blocked: 'Blocked',
            'Not Run': 'NotExecuted'
        };

        try {
            const pointsUrl = `${orgUrl}/_apis/test/Plans/${resolvedPlanId}/Suites/${resolvedSuiteId}/points?api-version=7.0`;
            const pointsResponse = await fetch(pointsUrl, {
                headers: {
                    'Authorization': authHeader,
                    'Accept': 'application/json'
                }
            });

            if (!pointsResponse.ok) {
                console.warn(`[Azure Status] Unable to fetch Azure Test Points for plan ${resolvedPlanId} suite ${resolvedSuiteId} (HTTP ${pointsResponse.status}).`);
                return false;
            }

            const pointsData: any = await pointsResponse.json();
            const targetPoint = (pointsData.value || []).find((point: any) => {
                return String(point.testCase?.id) === String(testCaseId) || String(point.id) === String(testCaseId);
            });

            if (!targetPoint) {
                console.warn(`[Azure Status] No Azure Test Point found for TC #${testCaseId} in plan ${resolvedPlanId} suite ${resolvedSuiteId}.`);
                return false;
            }

            const runPayload = {
                name: `Playwright Automated Run - Plan ${resolvedPlanId} / Suite ${resolvedSuiteId}`,
                plan: { id: Number(resolvedPlanId) },
                isAutomated: true,
                pointIds: [targetPoint.id],
                state: 'InProgress',
                comment: `Automated Playwright execution: ${status}. Suite ${resolvedSuiteId}. Plan ${resolvedPlanId}.`
            };

            const runResponse = await fetch(`${orgUrl}/_apis/test/runs?api-version=7.0`, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(runPayload)
            });

            if (!runResponse.ok) {
                console.warn(`[Azure Status] Unable to create Azure Test Run for TC #${testCaseId} (HTTP ${runResponse.status}).`);
                return false;
            }

            const runData: any = await runResponse.json();
            const runId = runData.id;
            const resultUrl = `${orgUrl}/_apis/test/runs/${runId}/results?api-version=7.0`;
            const resultResponse = await fetch(resultUrl, {
                headers: {
                    'Authorization': authHeader,
                    'Accept': 'application/json'
                }
            });

            if (!resultResponse.ok) {
                console.warn(`[Azure Status] Unable to fetch Azure Test Results for Run #${runId} (HTTP ${resultResponse.status}).`);
                return false;
            }

            const resultData: any = await resultResponse.json();
            const targetResult = (resultData.value || []).find((result: any) => {
                return String(result.testCase?.id) === String(testCaseId) || String(result.testPoint?.id) === String(targetPoint.id);
            });

            if (!targetResult) {
                console.warn(`[Azure Status] No Azure Test Result was created for TC #${testCaseId} in run #${runId}.`);
                return false;
            }

            const patchBody = [{
                id: targetResult.id,
                outcome: outcomeByStatus[status] || 'Failed',
                state: 'Completed',
                comment: `Automated Playwright execution: ${status}. Suite ${resolvedSuiteId}. Plan ${resolvedPlanId}.`
            }];

            const patchResponse = await fetch(resultUrl, {
                method: 'PATCH',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(patchBody)
            });

            if (!patchResponse.ok) {
                console.warn(`[Azure Status] Azure Test Result update failed for TC #${testCaseId} with HTTP ${patchResponse.status}.`);
                return false;
            }

            await fetch(`${orgUrl}/_apis/test/runs/${runId}?api-version=7.0`, {
                method: 'PATCH',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ state: 'Completed' })
            });

            console.log(`[Azure Status] Azure TC #${testCaseId} updated to ${status} in plan ${resolvedPlanId} / suite ${resolvedSuiteId}.`);
            return true;
        } catch (error: any) {
            console.warn(`[Azure Status] Azure update error for TC #${testCaseId}: ${error.message}`);
            return false;
        }
    }


}