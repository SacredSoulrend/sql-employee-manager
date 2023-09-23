# SQL Employee Manager

## Description
The Employee Manager is a command-line application that allows you to manage your company's employees, departments, roles, and more. It provides a user-friendly interface for viewing, adding, and updating employee information within your organization.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
To use the Employee Manager, follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies: npm install node, mysql2, inquirer, dotenv.

3. Login to your mysql using the command line/bash.<br>
In bash: mysql -u [username] -p;

4. Set up your database by creating a .env file in the project root directory. Add your MySQL database configuration as follows:<br>

DB_HOST=localhost<br>
DB_USER=your-database-username<br>
DB_PASSWORD=your-database-password<br>
DB_DATABASE=company_db<br>

5. Create the necessary database schema using the provided SQL files (schema.sql and seeds.sql) in the "db" directory.<br>
In bash: mysql -u your-database-username -p your-database-name < db/schema.sql

6. Seed your database with sample data.<br>
In bash: mysql -u your-database-username -p your-database-name < db/seeds.sql

7. Start the application.<br>
In bash: node server.js

## Usage
Here is my video example on how to use the application:

https://drive.google.com/file/d/1Bb33dbBkFjtgAjop-dUYjuTiirsWaxbx/view

## License
![License](https://img.shields.io/badge/license-MIT-yellow)

## License

MIT License

## Contributing


## Tests


## Questions
For additional questions, contact .
GitHub: [SacredSoulrend](https://github.com/SacredSoulrend)