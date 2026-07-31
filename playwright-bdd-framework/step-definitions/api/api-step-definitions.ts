import { Given, When, Then } from '@cucumber/cucumber';
import {APICommons} from '../../commons/api/api-commons.ts';
import data from '../../testdata/api/data.json' with {type: 'json'};

let api: APICommons;

//Given Initialize the API request context
Given('Initialize the API request context', async () => {
    api = new APICommons();
    await api.InitializeRequestContext();
});

//When I send a "POST" request with endpoint "/user/repos" to create a repo with name "JmeterRepo" and description "This is duplicate repo"
When('I send a {string} request with endpoint {string} to create a repo with name {string} and description {string}', async (requestType: string, endpoint: string, repoName: string, repoDescription: string) => {
    let reqBody = data.createRepo.body;
    reqBody.name = repoName;
    reqBody.description = repoDescription;
    await api.getResponse(requestType,endpoint,reqBody);
});

//Then I should receive a response with status code 422
Then('I should receive a response with status code {int}', async function (expStatusCode:number){
    await api.validateStatusCode(expStatusCode);
})

//And I should receive a response with status message "Unprocessable Entity"
Then('I should receive a response with status message {string}', async function (expStatusMessage:string){
    await api.validateStatusMessage(expStatusMessage);
})

// //And I should receive a response with body having "message" as "Repository creation failed."
// Then('I should receive a response with body having {string} as {string}', async function (key:string, expValue:string){
//     await api.validateResponseBody(key,expValue);
// });

//When I send a "PATCH" request with endpoint "/repos/bharathtechacademy05/JmeterRepo5" to update a repo visibility as "true"
When('I send a {string} request with endpoint {string} to update a repo visibility as {string}', async function(reqType:string, endPoint:string, repoVisibility:string){
    let reqBody = data.updateRepo.body;
    reqBody.private = repoVisibility === "true";
    await api.getResponse(reqType, endPoint, reqBody);
});

//And I should receive a response with body having "private" as "true"
Then('I should receive a response with body having {string} as {string}', async function (key:string, expValue:string){
    if(expValue==="true"){
        await api.validateResponseBody(key,true);
    }else if(expValue==="false"){
       await api.validateResponseBody(key,false); 
    }else{
        await api.validateResponseBody(key,expValue);
    }
});

//When I send a "GET" request with endpoint "/repos/bharathtechacademy05/JmeterRepo5"
When('I send a {string} request with endpoint {string}', async function (reqType:string, endPoint:string){
    await api.getResponse(reqType,endPoint);
})



