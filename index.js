const mysql = require("mysql");
const inquirer = require("inquirer");

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
          init();
          break;

        case "Add role":
          console.log("Add role was selected");
          init();
          break;

        case "Add employee":
          console.log("Add employee was selected");
          init();
          break;

        case "View departments":
          console.log("View department was selected");
          viewDepartments();
          init();
          break;

        case "View roles":
          console.log("View roles was selected");
          viewRoles();
          init();
          break;

        case "View employees":
          console.log("View employees was selected");
          viewEmployees();
          init();
          break;

        case "Update employee roles":
          console.log("Update employee roles was selected");
          init();
          break;

        case "Done":
          console.log("Done was selected");
          break;
      }
    });
}

// FUNCTION DEFINITIONS

function viewEmployees() {
    var query = "SELECT * FROM employee;";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);

});
}

function viewDepartments() {
    var query = "SELECT * FROM department;";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);

});
}

function viewRoles() {
    var query = "SELECT * FROM role;";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);

});
}

// FUNCTION CALLS
init();
