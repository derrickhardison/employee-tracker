INSERT into department (name)
VALUES("Sales"), ("Engineering"), ("Finance");

INSERT into role (title, salary, department_id)
VALUES
("Sales Lead", 120000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 160000, 2),
("Software Engineer", 95000, 2),
("Accountant", 85000, 3);

INSERT into employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Johnson", 1, 1),
("Ashley", "Adams", 2, 2),
("David", "Drought", 3, 3);