Feature: Git repository API validations
    As a user, I want to validate all the Git repository-related API validations in this feature file.

    Background:
        Given Initialize the API request context

    Scenario: Validate request to create a duplicate repository
        When I send a "POST" request with endpoint "/user/repos" to create a repo with name "JmeterRepo" and description "This is duplicate repo"
        Then I should receive a response with status code 422
        And I should receive a response with status message "Unprocessable Entity"
        And I should receive a response with body having "message" as "Repository creation failed."

    Scenario: Validate request to create a valid repository
        When I send a "POST" request with endpoint "/user/repos" to create a repo with name "JmeterRepo5" and description "This is valid repo"
        Then I should receive a response with status code 201
        And I should receive a response with status message "Created"
        And I should receive a response with body having "name" as "JmeterRepo5"
        And I should receive a response with body having "description" as "This is valid repo"

    Scenario: Validate request to update a valid repository
        When I send a "PATCH" request with endpoint "/repos/bharathtechacademy05/JmeterRepo5" to update a repo visibility as "true"
        Then I should receive a response with status code 200
        And I should receive a response with status message "OK"
        And I should receive a response with body having "name" as "JmeterRepo5"
        And I should receive a response with body having "private" as "true"

    Scenario: Validate request to get a valid repository
        When I send a "GET" request with endpoint "/repos/bharathtechacademy05/JmeterRepo5"
        Then I should receive a response with status code 200
        And I should receive a response with status message "OK"
        And I should receive a response with body having "name" as "JmeterRepo5"
        And I should receive a response with body having "description" as "This is valid repo"

    Scenario: Validate request to delete a valid repository
        When I send a "DELETE" request with endpoint "/repos/bharathtechacademy05/JmeterRepo5"
        Then I should receive a response with status code 204
        And I should receive a response with status message "No Content"


    