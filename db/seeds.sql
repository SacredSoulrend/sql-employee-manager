INSERT INTO department (name) VALUES
    ('HR'),
    ('Sales'),
    ('Engineering'),
    ('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
    ('HR Manager', 60000, 1),
    ('Recruiter', 50000, 1),
    ('Sales Manager', 75000, 2),
    ('Sales Representative', 55000, 2),
    ('Software Engineer', 80000, 3),
    ('Frontend Developer', 70000, 3),
    ('Marketing Manager', 65000, 4),
    ('Marketing Specialist', 55000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mike', 'Johnson', 3, NULL),
    ('Emily', 'Williams', 4, 3),
    ('David', 'Lee', 5, NULL),
    ('Sarah', 'Brown', 6, 5),
    ('Alex', 'Wilson', 7, NULL),
    ('Grace', 'Davis', 8, 7);
