# Ignite Data Crud App test by Omar Mirza

## Available Scripts

`prepare`
This script installs the necessary Git hooks via Husky. Run `yarn prepare` to install Git hooks.

`dev`
Starts the development server using Vite. Run `yarn dev` to start the Vite development server and begin local development.

`build`
Builds the project using TypeScript and Vite. Run`yarn build` to build the project. This will first compile the TypeScript files and then build the Vite project.

`lint`
Lints the codebase using ESLint. Run `yarn lint` to check the code for style and formatting issues.

`preview`
Preview the production build using Vite. Run `yarn preview` to preview the production build of the application.

`test`
Runs Jest tests with coverage. Run `yarn test` to run the tests using Jest and generate a coverage report.

## Crud endpoints

Endpoints used to retrieve/manipulate mocked data are implemented using MSW library (https://mswjs.io/) and MSW data (https://github.com/mswjs/data).

## List of available BFF endpoints:

GET - https://example.com/user - Retrieve all available users  
GET - https://example.com/user/:id - Retrieve user with a certain id  
POST - https://example.com/user - Create a new user. Provide first name  
PUT - https://example.com/user/:id - Edit a user. Provide first name  
DELETE - https://example.com/user/:id - Delete a user
