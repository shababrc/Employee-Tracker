// will need to bring in connection to db
//as well as various other inports
//express needed to run the app
const express = require('express');
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

function viewAllEmployees(){
    // make a request to the db to select * from employee
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
}

function viewAllDepartments(){
    // make a request to the db to select * from department
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
}

function viewAllRoles(){
    // make a request to the db to select * from roles
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
}
function addDepartment(newDepartment){
    //make a request to the db to insert into department
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
    db.query(`INSERT INTO department SET?`, newDepartment, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainQuestion();
    });
}

function addRole(){
    // make a request to the db to insert into roles
    //console.table the results to display them to the console
    //then recall mainQuestion()
}

function addEmployee(){
    //make a request to the db to insert into employee
    //console.table the results to display them to the console
    //then recall mainQuestion()

}


function mainQuestion(){
    //set up the main question in inquirer, asking the user what they would like to do,
    //then it will call the appropriate function based on what the user selected
        inquirer.prompt({
        type: "list",
        name: "mainQuestion",
        message: "What would you like to do?",
        choices: ["View all employees", "View all departments",
                "View all roles", "I'm done."]
    })
    .then(({mainQuestion})=>{
        switch(mainQuestion){
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

function init(){
    console.log("Welcome to the Employee Tracker!")
    mainQuestion()
}

init()