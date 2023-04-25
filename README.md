# Employee-Tracker
Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases.  Here we are building a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.


## User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## How we did this:
### By:
First we defined our company database in our db folder. We created a schema file in the same directory,
and in this file we created a table department, a table for roles and a table for employees. We added the necessary primary and foreign keys to the tables, so that our relationships between the tables would be working properly.
We then added a seed file for the database, filling in the database with sample data, such as roles, names of employees, sample departments, etc.
In our index.js file we have most of our javascript code that runs our application and does the functionality of what we want to do.
We will need to bring in connection to db as well as various other inports, such as express needed to run the app. inquirer and mysql2.
We define our middleware, as well as connect to the database.
Using localhost as the host, and our username and password, we connect to the company_db database. We define a function viewAllEmployees, which shows all employees. By which will make a request to the db to select * from employee when you get the results you will console.table them to display after the results are displayed you will want to recall mainQuestion(). Then we have a function viewAllDepartment, that shows all the departments, and view all Roles, which shows all roles in a similar fashion like above.
We then have an add department function, which makes a request to the db to insert into department when you get the results you will console.table them to display after the results are displayed you will want to recall mainQuestion(). Another function declared in the index.js file is add role, which make a request to the db to insert into roles and console.table the results to display them to the console then recall mainQuestion(). Then we have add an employee function, which makes a request to the db to insert into employees, 
then console.table the results to display them to the console then recall mainQuestion(). Finally we have a function to update an employee's role, which makes a request to the db to update an employee's role, then console.table the results to display, then recall mainQuestion().
Then finally, our function runs in command line, or console by the main question function. 
This function  set up the main question in inquirer, asking the user what they would like to do,
then it will call the appropriate function based on what the user selected this inquirer will give the user a list of choices to choose from,sometimes the user will be prompted to select a choice from the list, or otherwise the user will be prompted to enter a number or string.
This is built on promises and async/await. We call the functions above, and use inquirer.prompt() to get the user input, and then manipulate the database with the user input.


## Link to Github Repository

## Link to Walkthrough Video

## Credits
Big thanks to the rest of the bootcamp class for their help, as well as Bryan and Shawn for their expertise. Thanks to tutor Erik Hirsch for helping me get started, and as well as Irina Kudosova, and Jehyun Jung.

## License 
None 