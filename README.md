# UserApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

## Objective

  * Intergrate to [JSONPLACEHOLDERAPI](https://jsonplaceholder.typicode.com/users) and create a display of users on a paginated view.
  * Functionality to add new users
  * Perform form validation
  * Write unit test
  * Component navigation(routing)

## Pre-requisite to run the app
1. Have npm installed. Version 6.14.17 should be okay(Haven't tested with other versions but may work).
2. Have angular-cli version 14.2.13 and angular 14.3.0 installed.(Haven't tested other versions but they might work)

## Running the application
1. Clone the repo on your machine and perform an `npm install` to install the package dependencies.
2. Run on terminal `ng serve` to execute the application.
3. Run `npm test` to run the unit tests for the application

## Limitations
1. The application can only simulate a pagination between 5 and 10 since the resource being returned by the API is limited to 10 items.
2. We are not able to use pagination controls to move to the next stage because pagination is being done on the client-side and not on the server-side.
