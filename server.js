require('dotenv').config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  insertDepartment,
  insertRole,
  insertEmployee,
  updateEmployeeRole,
} = require("./queries.js");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Function to display main menu
function displayMainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "View all departments":
          getAllDepartments((err, results) => {
            if (err) {
              console.error("Error viewing departments:", err);
              return;
            }

            console.table(results);

            displayMainMenu();
          });
          break;

        case "View all roles":
          getAllRoles((err, results) => {
            if (err) {
              console.error("Error viewing roles:", err);
              return;
            }

            console.table(results);

            displayMainMenu();
          });
          break;

        case "View all employees":
          getAllEmployees((err, results) => {
            if (err) {
              console.error("Error viewing employees:", err);
              return;
            }

            console.table(results);

            displayMainMenu();
          });
          break;

