Feature: Git API Load Test Feature
    As a user, I want to validate all the scenarios related to Git API performance within this feature file.

    Scenario: Validate Git Repository API Request Performance
        Given Initialize the JMETER utility
        Then Execute the JMETER test plan "LoadTest.jmx" and publish the results