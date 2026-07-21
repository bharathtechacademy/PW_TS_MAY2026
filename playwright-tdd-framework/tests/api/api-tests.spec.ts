import { test } from '@playwright/test';
import { APICommons } from '../../commons/api/api-commons.ts';
import testdata from '../../testdata/api/data.json' with {type: 'json'};

test.describe('API Tests', () => {
    let apiCommons: APICommons;

    // Initialize the APICommons instance before each test to share base url,headers etc..
    test.beforeEach(async () => {
        apiCommons = new APICommons();
        await apiCommons.InitializeRequestContext();
    });

    //Test Case 1: Request to create a duplicate repository within GitHub. 
    test('Create Duplicate Repository', async () => {
        const data = testdata.duplicateRepoRequest;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.payload);
        await apiCommons.validateStatusCode(data.expCode);
        await apiCommons.validateStatusMessage(data.expMessage);
        await apiCommons.validateResponseBody("message", data.expErrorMessage);
    });

    //Test Case 2: Request to create a valid repository within GitHub. 
    test('Create Valid Repository', async () => {
        const data = testdata.createValidRepoRequest;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.payload);
        await apiCommons.validateStatusCode(data.expCode);
        await apiCommons.validateStatusMessage(data.expMessage);
        await apiCommons.validateResponseBody("name", data.name);
    });

    //Test Case 3: Request to update a valid repository within GitHub. 
    test('Update Valid Repository', async () => {
        const data = testdata.updateValidRepoRequest;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.payload);
        await apiCommons.validateStatusCode(data.expCode);
        await apiCommons.validateStatusMessage(data.expMessage);
        await apiCommons.validateResponseBody("name", data.name);
        await apiCommons.validateResponseBody("private", data.expPrivate);
    });

    //Test Case 4: Request to get a valid repository within GitHub. 
    test('Get Valid Repository', async () => {
        const data = testdata.getValidRepoRequest;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.payload);
        await apiCommons.validateStatusCode(data.expCode);
        await apiCommons.validateStatusMessage(data.expMessage);
        await apiCommons.validateResponseBody("name", data.name);
    });

    //Test Case 5: Request to delete a valid repository within GitHub. 
    test('Delete Valid Repository', async () => {
        const data = testdata.deleteValidRepoRequest;
        await apiCommons.getResponse(data.requestType, data.endpoint, data.payload);
        await apiCommons.validateStatusCode(data.expCode);
        await apiCommons.validateStatusMessage(data.expMessage);
    });

});