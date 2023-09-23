require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Function to get all departments
function getAllDepartments(callback) {
    const query = 'SELECT DISTINCT id, name FROM department';
    db.query(query, callback);
}

// Function to get all roles
function getAllRoles(callback) {
    const query = `
        SELECT DISTINCT role.id, role.title, role.salary, department.name AS department_name
        FROM role
        INNER JOIN department ON role.department_id = department.id
    `;
    db.query(query, callback);
}

// Function to get all employees
function getAllEmployees(callback) {
    const query = `
        SELECT DISTINCT employee.id, employee.first_name, employee.last_name, role.title AS job_title, 
        department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `;
    db.query(query, callback);
}

// Function to insert a new department
function insertDepartment(name, callback) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    db.query(query, [name], callback);
}

// Function to insert a new role
function insertRole(title, salary, departmentId, callback) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    db.query(query, [title, salary, departmentId], callback);
}

// Function to insert a new employee
function insertEmployee(firstName, lastName, roleId, managerId, callback) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    db.query(query, [firstName, lastName, roleId, managerId], callback);
}

// Function to update an employee's role
function updateEmployeeRole(employeeId, newRoleId, callback) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    db.query(query, [newRoleId, employeeId], callback);
}

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    insertDepartment,
    insertRole,
    insertEmployee,
    updateEmployeeRole
};
