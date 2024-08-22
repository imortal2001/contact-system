### In this project i used Laravel a PHP Framework with the SPA front-end using React.js and Inertia.js

### also im using Laravel Sail for running the server and database, Laravel Sail is a light-weight command-line interface for interacting with Laravel's default Docker development environment. Sail provides a great starting point for building a Laravel application using PHP, MySQL, and Redis without requiring prior Docker experience.

## Module/Features

    > Login / Logout ✔
    > Registration ✔
    > Contacts
       -List ✔
       -Add ✔
       -Edit ✔
       -Delete ✔
       -Contact Search ✔
       -List Pagination ✔

# Database Design ✔

    > Design tables that will be used in this project   ✔
    > Email address should be unique to each user   ✔
    > Password field should be encrypted    ✔
    > Contacts are not shared to all user   ✔

# Login/Logput

    > Email & Password should match in the database to login    ✔
    > Password field should be encrypted    ✔
    > Use session to login user     ✔
    > The logout link should be visible in every page after you've logged in    ✔
    > When user clicks the link to logout it should destroy session and redirect back to login area     ✔
    > After logging in, redirect to contact page ✔

# Registration

    > If Email already exists, show an error message ✔
    > Password should match the confirm password and be encrypted ✔
    > After a successful registration, redirect to thank you page ✔
    > When user clicks the continue button it will go to contact page ✔

# Contacts

    > User should login to access this page ✔
    > Contact is not shared to all user ✔
    > Search keyword should match at least one of all contact details ✔
    > Search result should be AJAX ✔
    > Implement the pagination to the list (Do not use DataTables) ✔
    > When user clicks the delete it should have popup confirmation and delete the contact ✔
