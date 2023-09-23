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

        case "Add a department":
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "Enter the name of the department:",
              },
            ])
            .then((answers) => {
              insertDepartment(answers.name, (err) => {
                if (err) {
                  console.error("Error adding department:", err);
                } else {
                  console.log("Department added successfully.");
                }

                displayMainMenu();
              });
            });
          break;

        case 'Add a role':
          // Fetch the list of available departments
          getAllDepartments((err, departments) => {
            if (err) {
              console.error('Error fetching departments:', err);
              return;
            }

            const departmentChoices = departments.map((department) => department.name);

            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'title',
                  message: 'Enter the title of the role:'
                },
                {
                  type: 'input',
                  name: 'salary',
                  message: 'Enter the salary for the role:'
                },
                {
                  type: 'list',
                  name: 'department_name', 
                  message: 'Which department does the role belong to?',
                  choices: departmentChoices 
                }
              ])
              .then((answers) => {
                // Find the department ID based on the selected department name
                const selectedDepartment = departments.find(
                  (department) => department.name === answers.department_name
                );

                if (selectedDepartment) {
                  // Call the function to add the role, passing the department ID
                  insertRole(answers.title, answers.salary, selectedDepartment.id, (err) => {
                    if (err) {
                      console.error('Error adding role:', err);
                    } else {
                      console.log('Role added successfully.');
                    }

                    displayMainMenu();
                  });
                } else {
                  console.error('Error: Department not found.');
                  displayMainMenu();
                }
              });
          });
          break;

        case 'Add an employee':
          // Fetch the list of available roles and employees (managers)
          getAllRoles((err, roles) => {
            if (err) {
              console.error('Error fetching roles:', err);
              return;
            }

            getAllEmployees((err, employees) => {
              if (err) {
                console.error('Error fetching employees:', err);
                return;
              }

              const roleChoices = roles.map((role) => role.title);
              const managerChoices = employees.map((employee) => `${employee.first_name} ${employee.last_name}`);

              inquirer
                .prompt([
                  {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the first name of the employee:'
                  },
                  {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the last name of the employee:'
                  },
                  {
                    type: 'list',
                    name: 'role_title',
                    message: 'Select the role for the employee:',
                    choices: roleChoices
                  },
                  {
                    type: 'list',
                    name: 'manager_name',
                    message: 'Select the manager for the employee (leave blank if none):',
                    choices: managerChoices
                  }
                ])
                .then((answers) => {
                  const selectedRole = roles.find(
                    (role) => role.title === answers.role_title
                  );

                  const selectedManager = employees.find(
                    (employee) => `${employee.first_name} ${employee.last_name}` === answers.manager_name
                  );

                  if (selectedRole) {
                    // Call the function to add the employee, passing role ID and manager ID
                    insertEmployee(
                      answers.first_name,
                      answers.last_name,
                      selectedRole.id,
                      selectedManager ? selectedManager.id : null, // Use null if no manager selected
                      (err) => {
                        if (err) {
                          console.error('Error adding employee:', err);
                        } else {
                          console.log('Employee added successfully.');
                        }

                        displayMainMenu();
                      }
                    );
                  } else {
                    console.error('Error: Role not found.');
                    displayMainMenu();
                  }
                });
            });
          });
          break;

        case "Update an employee role":
          // First, fetch the lists of employee names and role titles from your database
          getAllEmployees((err, employees) => {
            if (err) {
              console.error("Error fetching employees:", err);
              return;
            }

            getAllRoles((err, roles) => {
              if (err) {
                console.error("Error fetching roles:", err);
                return;
              }

              const employeeNames = employees.map(
                (employee) => `${employee.first_name} ${employee.last_name}`
              );
              const roleTitles = roles.map((role) => role.title);

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "employee_name",
                    message: "Select the employee to update:",
                    choices: employeeNames,
                  },
                  {
                    type: "list",
                    name: "new_role_title",
                    message: "Select the new role for the employee:",
                    choices: roleTitles,
                  },
                ])
                .then((answers) => {
                  const selectedEmployee = employees.find(
                    (employee) =>
                      `${employee.first_name} ${employee.last_name}` ===
                      answers.employee_name
                  );
                  const selectedRole = roles.find(
                    (role) => role.title === answers.new_role_title
                  );

                  if (selectedEmployee && selectedRole) {
                    updateEmployeeRole(
                      selectedEmployee.id,
                      selectedRole.id,
                      (err) => {
                        if (err) {
                          console.error("Error updating employee role:", err);
                        } else {
                          console.log("Employee role updated successfully.");
                        }

                        displayMainMenu();
                      }
                    );
                  } else {
                    console.error("Error: Employee or role not found.");
                    displayMainMenu();
                  }
                });
            });
          });
          break;

        case "Exit":
          db.end((err) => {
            if (err) {
              console.error("Error closing the database connection:", err);
            }
            console.log("Goodbye!");
            process.exit(0);
          });
          break;
        default:
          console.log("Invalid choice. Please select a valid option.");
          displayMainMenu();
      }
    });
}

// Start the application by calling the main menu function
displayMainMenu();
