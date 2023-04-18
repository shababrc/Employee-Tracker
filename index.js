const inquirer = require('inquirer');
require('console.table');
// will need to bring in connection to db

function mainQuestion(){
    inquirer.prompt({
        type: "list",
        name: "mainQuestion",
        message: "What would you like to do?",
        choices: ["View all employees", "View all departments",
                "View all roles", "Im done."]
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

function viewAllEmployees(){
    // make a request to the db to select * from employee
    //when you get the results you will console.table them to display
    //after the results are displayed you will want to recall mainQuestion()
}

function init(){
    console.log("Welcome to the Employee Tracker!")
    mainQuestion()
}

init()