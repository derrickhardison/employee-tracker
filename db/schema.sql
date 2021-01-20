DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department(
id INTEGER PRIMARY KEY auto_increment,
name VARCHAR(30)
);

CREATE TABLE role(
id INTEGER PRIMARY KEY auto_increment,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER
);

CREATE TABLE employee(
id INTEGER PRIMARY KEY auto_increment,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER
);
