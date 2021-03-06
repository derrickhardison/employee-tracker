const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Gizmo2020",
  database: "employeeTrackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

function init() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
        "Done",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add department":
          console.log("Add department was selected");
          addDepartment();

          break;

        case "Add role":
          addRoles();

          break;

        case "Add employee":
          console.log("Add employee was selected");
          addEmployee();

          break;

        case "View departments":
          console.log("View department was selected");
          viewDepartments();

          break;

        case "View roles":
          console.log("View roles was selected");
          viewRoles();

          break;

        case "View employees":
          console.log("View employees was selected");
          viewEmployees();

          break;

        case "Update employee roles":
          console.log("Update employee roles was selected");

          break;

        case "Done":
          console.log("Done was selected");
          break;
      }
    });
}

// FUNCTION DEFINITIONS

function addDepartment() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is the name of the department you'd like to add?",
    })
    .then(({ name }) => {
      connection.query(
        `INSERT into department (name) VALUES (?);`,
        [name],

        function (err, res) {
          if (err) throw err;
        }
      );
      init();
    });

  //   var query = "SELECT * FROM department;";
  //   connection.query(query, function (err, res) {
  //     if (err) throw err;
  //     console.table(res);
  //     console.log("Which department do you want to add?");
  //   });
}

function addEmployee() {
  var query = "SELECT * FROM role;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    const arrayOfObjects = res.map((role) => {
      const object = {
        name: role.title,
        value: role.id,
      };
      return object;
    });

    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;

      const employeesObject = res.map((employee) => {
        const newObject = {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
        return newObject;
      });

      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message:
              "What is the first name of the employee you'd like to add?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee you'd like to add?",
          },
          {
            name: "roleID",
            type: "list",
            message: "What is the role of the employee",
            choices: arrayOfObjects,
          },
          {
            name: "managerID",
            type: "list",
            message: "Who is the employee's manager?",
            choices: employeesObject,
          },
        ])
        .then(({ firstName, lastName, roleID, managerID }) => {
          connection.query(
            `INSERT INTO employee (first_name) (last_name) (role_id) (manager_id) (?), (?), (?), (?);`,
            function (err) {
              if (err) throw err;

              [firstName], [lastName], [roleID], [managerID];
            }
          );
          init();
        });
    });
  });
}

function addRoles() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the role you'd like to add?",
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary?",
      },
      {
        name: "department",
        type: "number",
        message: "What is the department ID?",
      },
    ])
    .then(({ name, salary, department }) => {
      connection.query(
        `INSERT into role (title, salary, department_id) VALUES (?,?,?);`,
        function (err, res) {
          if (err) throw err;
          [name], [salary], [department];
          console.log(res)
        }
      );
      init();
    });
}

function viewEmployees() {
  var query = "SELECT * FROM employee;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  init();
}

function viewDepartments() {
  var query = "SELECT * FROM department;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  init();
}

function viewRoles() {
  var query = "SELECT * FROM role;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  init();
}

// FUNCTION CALLS
init();
