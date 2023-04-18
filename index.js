// will need to bring in connection to db
//as well as various other inports
//express needed to run the app
const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password123',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

function viewAllEmployees() {
    // make a request to the db to select * from employee
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
}

function viewAllDepartments() {
    // make a request to the db to select * from department
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
}

function viewAllRoles() {
    // make a request to the db to select * from roles
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
}
function addDepartment(newDepartment) {
    //make a request to the db to insert into department
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    db.query(`INSERT INTO department SET?`, newDepartment, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
}

function addRole(role, salary, department) {
    // make a request to the db to insert into roles
    //console.table the results to display them to the console
    //then recall mainQuestion()
    db.query(`INSERT INTO role SET?`, role, salary, department, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
}

function addEmployee(firstName, lastName, role, manager) {
    //make a request to the db to insert into employee
    //console.table the results to display them to the console
    //then recall mainQuestion()
    db.query(`INSERT INTO employee SET?`, firstName, lastName, role, manager, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });

}


function mainQuestion() {
    //set up the main question in inquirer, asking the user what they would like to do,
    //then it will call the appropriate function based on what the user selected
    inquirer.prompt({
        type: "list",
        name: "mainQuestion",
        message: "What would you like to do?",
        choices: ["View all employees", "Add an employee", "View all departments", "Add a department", "View all roles", "Add a role", "I'm done."]
    })
        .then(({ mainQuestion }) => {
            switch (mainQuestion) {
                case "Add a department":
                    inquirer.prompt({
                        type: "list",
                        name: "newDepartment",
                        choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
                        message: "What department would you like to add?"
                    }).then(({ newDepartment }) => {
                        addDepartment(newDepartment);
                        console.log(newDepartment + " has been added to the department database.");
                    })
                    break;

                case "Add a role":
                    inquirer.prompt(
                        {
                            type: "list",
                            name: "newRole",
                            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', "Legal Team Leader", "Lawyer",],
                            message: "What role would you like to add?"
                        },
                        {
                            type: "input",
                            name: "salary",
                            message: "What is the salary for this role?"
                        },
                        {
                            type: "list",
                            name: "departmentId",
                            choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
                            message: "What department does this role belong to?"
                        },
                    ).then(({ newRole, salary, departmentId }) => {
                        addRole(newRole, salary, departmentId);
                        console.log(newRole + " has been added to the role database.");
                    })
                    break;

                case "Add an employee":
                    inquirer.prompt([
                    {
                        type: "input",
                        name: "firstNameId",
                        message: "What is the employee's first name?"
                    },
                    {
                        type: "input",
                        name: "lastNameId",
                        message: "What is the employee's last name?"
                    },
                    {
                        type: "list",
                        name: "roleId",
                        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', "Legal Team Leader", "Lawyer",],
                        message: "What is this employee's role?"
                    },
                    {
                        type: "list",
                        name: "managerId",
                        choices: ['John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'Sarah Lourd'],
                        message: "Who is the employee's manager?"
                    },
                ]).then(({ newRole, salary, departmentId }) => {
                    addEmployee(firstNameId, lastNameId, roleId, managerId);
                        console.log(firstNameId + lastNameId + " has been added to the employee database.");
                })
                    break;    

                case "View all employees":
                    viewAllEmployees();
                    break;

                case "View all departments":
                    viewAllDepartments();
                    break;

                case "View all roles":
                    viewAllRoles();
                    break;


                default:
                    conosole.log("Goodbye!")
                    process.exit(0)
            }

        })
}

function init() {
    console.log("Welcome to the Employee Tracker!")
    mainQuestion()
}

init();