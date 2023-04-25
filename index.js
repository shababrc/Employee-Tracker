// will need to bring in connection to db
// as well as various other inports
// express needed to run the app
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
    db.query('SELECT employee.first_name, employee.last_name, role.title, manager.first_name AS manager_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id=employee.manager_id', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
};

function viewAllDepartments() {
    // make a request to the db to select * from department
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
};

function viewAllRoles() {
    // make a request to the db to select * from roles
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    //Here we join the tables with the department table to get the department name
    db.query('SELECT role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
};

function addDepartment(newDepartment) {
    //make a request to the db to insert into department
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    const sql = `INSERT INTO department(name) VALUES (?)`;
    const newDepartmentValues = [newDepartment];
    db.query(sql, [newDepartment], (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
};


function addRole(role, salary, department) {
    // make a request to the db to insert into roles
    //console.table the results to display them to the console
    //then recall mainQuestion()
    const sql = `INSERT INTO role(title, salary, department_id) VALUES (?)`;
    const roleValues = [role, salary, department];
    db.query(sql, [roleValues], (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
};

function addEmployee(firstName, lastName, role, manager) {
    //make a request to the db to insert into employee
    //console.table the results to display them to the console
    //then recall mainQuestion()
    const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?)`;
    
    const employeeValues = [firstName, lastName, role, manager];
    db.query(sql, [employeeValues], (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });

};

function updateEmployeeRole(employeeId, roleId) {
    //make a request to the db to update employee's role
    //console.table the results to display them to the console
    //then recall mainQuestion()
    const sql = `UPDATE employee SET role_id =? WHERE id =?`;
    const employeeValues = [roleId, employeeId];
    db.query(sql, [roleId, employeeId], (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
};



function mainQuestion() {
    // set up the main question in inquirer, asking the user what they would like to do,
    // then it will call the appropriate function based on what the user selected
    // this inquirer will give the user a list of choices to choose from,
    // sometimes the user will be prompted to select a choice from the list, or
    // otherwise the user will be prompted to enter a number or string.
    // This is built on promises and async/await. We call the functions above, and use inquirer.prompt() to get the user input, and then manipulate the database with the user input.
    inquirer.prompt({
        type: "list",
        name: "mainQuestion",
        message: "What would you like to do?",
        choices: ["View all employees", "Add an employee", "Update an employee's role", "View all departments", "Add a department", "View all roles", "Add a role", "I'm done."]
    })
        .then(({ mainQuestion }) => {
            switch (mainQuestion) {
                case "Add a department":
                    inquirer.prompt({
                        type: "input",
                        name: "newDepartment",
                        message: "What is the name of the department would you like to add?"
                    }).then(({ newDepartment }) => {
                        addDepartment(newDepartment);
                        console.log(newDepartment + " has been added to the department database.");
                    })
                    break;

                case "Add a role":
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newRole",
                            message: "What is the name of the role would you like to add?"
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
                        }
                    ]).then(({ newRole, salary, departmentId }) => {
                        
                        if(departmentId === 'Sales'){
                            departmentId = 1;
                        } 
                        else if(departmentId === 'Engineering'){
                            departmentId = 2;
                        } 
                        else if(departmentId === 'Finance'){
                            departmentId = 3;
                        } 
                        else if(departmentId === 'Legal'){
                            departmentId = 4;
                        }
                        
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
                        message: "Who is the employee's manager?",

                    },
                ]).then(({firstNameId, lastNameId, roleId, managerId}) => {
                    
                    if(roleId === 'Sales Lead'){
                        roleId = 1;
                    } 
                    else if(roleId === 'Salesperson'){
                        roleId = 2;
                    } 
                    else if(roleId === 'Lead Engineer'){
                        roleId = 3;
                    } 
                    else if(roleId === 'Software Engineer'){
                        roleId = 4;
                    }
                    if(roleId === 'Account Manager'){
                        roleId = 5;
                    } 
                    else if(roleId === 'Accountant'){
                        roleId = 6;
                    } 
                    else if(roleId === 'Legal Team Lead'){
                        roleId = 7;
                    } 
                    else if(roleId === 'Lawyer'){
                        roleId = 8;
                    }
                    
                    if(managerId === 'John Doe'){
                        managerId = null;
                    } 
                    else if(managerId === 'Ashley Rodriguez'){
                        managerId = null;
                    } 
                    else if(managerId === 'Kunal Singh'){
                        managerId = null;
                    } 
                    else if(managerId === 'Sarah Lourd'){
                        managerId = null;
                    }
                    addEmployee(firstNameId, lastNameId, roleId, managerId);
                        console.log(firstNameId + lastNameId + " has been added to the employee database.");
                })
                    break; 
                    
                case "Update an employee's role":
                    db.query('SELECT * FROM employee', (err, res) => {
                        if (err) throw err; 
                        const mapEmployees = res.map(employee => {
                            return ({
                                name: `${employee.first_name} ${employee.last_name}`,
                                value: employee.id
                            })
                        })

                        db.query('SELECT * FROM role', (err, res) => {
                            if (err) throw err; 
                            const mapRoles = res.map(role => {
                                return ({
                                    name: `${role.title}`,
                                    value: role.id
                                })
                            })
                            inquirer.prompt([
                                {
                                 type: "list",
                                 name: "employeeId",
                                 choices: mapEmployees,
                                 message: "Select an employee from the list"
                                },
         
                                {
                                 type: "list",
                                 name: "roleId",
                                 choices: mapRoles,
                                 message: "Select a role from the list"
                                },
                             ]).then(({employeeId, roleId}) => {
                                updateEmployeeRole(employeeId, roleId);
                             })
         
                        });
                    });
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
                    console.log("Goodbye!")
                    process.exit(0)
            }

        })
}

function init() {
    console.log("Welcome to the Employee Tracker!")
    mainQuestion()
}

init();