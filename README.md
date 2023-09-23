# SQL Employee Tracker

## Description
The Employee Management System is a command-line application that allows you to manage your company's employees, departments, roles, and more. It provides a user-friendly interface for viewing, adding, and updating employee information within your organization.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
To use the Employee Tracker, follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies: npm install node, mysql2, inquirer, dotenv.

3. Login to your mysql using the command line/bash
In bash: mysql -u [username] -p;

3. Set up your database by creating a .env file in the project root directory. Add your MySQL database configuration as follows:

DB_HOST=localhost
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_DATABASE=company_db

4. Create the necessary database schema using the provided SQL files (schema.sql and seeds.sql) in the "db" directory.
In bash: mysql -u your-database-username -p your-database-name < db/schema.sql

5. Seed your database with sample data.
In bash: mysql -u your-database-username -p your-database-name < db/seeds.sql

6. Start the application.
In bash: node server.js

## Usage
Here are my video link examples on how to use the application:

Part 1: https://drive.google.com/file/d/1dLcSh8HsPuDRLR_EIcZ0Ncz2QGp87y95/view

Part 2: https://drive.google.com/file/d/1fzSFXosHFH1R9uj97JhkW9UIFDcFbtIO/view

## License
![License](https://img.shields.io/badge/license-MIT-yellow)

## License

MIT License

## Contributing


## Tests


## Questions
For additional questions, contact .
GitHub: [SacredSoulrend](https://github.com/SacredSoulrend)