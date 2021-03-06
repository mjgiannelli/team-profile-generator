// user starts the application
// user is prompted to enter the team manager's name, employee ID, email address, and office number
// after entering the user is then presented with a list menu to enter and engineer, intern, or finish building team
// if selects engineer
// user is prompted to enter their name, id, email and github username and then taken back to the same menu
// if user selects the intern option
// user is prompted to enter their name, id, email, school, and then taken back to the menu
// when user decides to finish building her team, the user exits out of the application and the html is generated

// Packages needed for this application
const inquirer = require('inquirer');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');
const generatePage = require('../src/page-template');
const { writeFile, copyFile } = require('../utils/generate-site')

// create organization class

class Organization {
    constructor() {
        this.manager;
        this.engineer;
        this.intern;
        this.employees = [];
    };

    // asks manager questions to create manager object
    initializeOrganization() {
        inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'name',
                    message: 'What is your name? (Required)',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter your name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'text',
                    name: 'id',
                    message: 'What is your employee ID? (Required)',
                    validate: idInput => {
                        if (idInput) {
                            return true;
                        } else {
                            console.log('Please enter your employee ID!');
                            return false;
                        }
                    }
                },
                {
                    type: 'text',
                    name: 'email',
                    message: 'What is your email address? (Required)',
                    validate: emailInput => {
                        if (emailInput) {
                            return true;
                        } else {
                            console.log('Please enter your email address!');
                            return false;
                        }
                    }
                },
                {
                    type: 'text',
                    name: 'officeNumber',
                    message: 'What is your office number? (Required)',
                    validate: officeInput => {
                        if (officeInput) {
                            return true;
                        } else {
                            console.log('Please enter your office number!');
                            return false;
                        }
                    }
                }
            ])
            // create manager object and push object to empty employees array
            .then((managerData) => {
                this.manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
                let employeeName = this.manager.getName().name;
                let employeeId = this.manager.getId().id;
                let employeeEmail = this.manager.getEmail().email;
                let employeeRole = this.manager.getRole().role;
                let employeeOfficeNum = this.manager.getOfficeNumber().officeNumber;

                let employee = {
                    name: employeeName,
                    id: employeeId,
                    email: employeeEmail,
                    role: employeeRole,
                    officeNumber: employeeOfficeNum
                }

                this.employees.push(employee);
                this.checkForNewEmployee();
            })
    }

    // create menu that allows manager to add another employee or finish building team
    async checkForNewEmployee() {
        const decision = await inquirer
            .prompt({
                type: 'list',
                message: 'Would you like to add another employee?',
                name: 'decision',
                choices: ['Add Engineer', 'Add Intern', 'Finish Building My Team']
            })

        if (Object.values(decision)[0] === 'Add Engineer') {
            await this.addEngineer();
        } else if (Object.values(decision)[0] === 'Add Intern') {
            await this.addIntern();
        } else {
            // take the employee object array and pass it to generatePage to put into HTML format and then write the HTML file to dist folder
            const employeeData = this.employees
            console.log(employeeData);
            const pageHtml = generatePage(employeeData)
            writeFile(pageHtml)
            copyFile();
            console.log("Your HTML webpage has been generated. Check the 'dist' folder.")
        }
    }

    // function to add engineer object
    async addEngineer() {
        const engineerData = await inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'name',
                    message: "What is your engineer's name? (Required)",
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter their name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'text',
                    name: 'id',
                    message: "What is your engineer's employee ID? (Required)",
                    validate: idInput => {
                        if (idInput) {
                            return true;
                        } else {
                            console.log('Please enter their employee ID!');
                            return false;
                        }
                    }
                },
                {
                    type: 'text',
                    name: 'email',
                    message: "What is your engineer's email address? (Required)",
                    validate: emailInput => {
                        if (emailInput) {
                            return true;
                        } else {
                            console.log('Please enter their email address!');
                            return false;
                        }
                    }
                },
                {
                    type: 'text',
                    name: 'github',
                    message: "What is your engineer's GitHub Username? (Required)",
                    validate: githubInput => {
                        if (githubInput) {
                            return true;
                        } else {
                            console.log('Please enter their GitHub username!');
                            return false;
                        }
                    }
                }
            ])

        // creates new engineer object and pushes to employees array

        this.engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);

        let employeeName = this.engineer.getName().name;
        let employeeId = this.engineer.getId().id;
        let employeeEmail = this.engineer.getEmail().email;
        let employeeRole = this.engineer.getRole().role;
        let employeeGithub = this.engineer.getGithub().github;

        let employee = {
            name: employeeName,
            id: employeeId,
            email: employeeEmail,
            role: employeeRole,
            github: employeeGithub
        }

        this.employees.push(employee);
        // return user back to menu to add employee or finish building team
        return this.checkForNewEmployee();

    }

    // function to add intern object
    async addIntern() {
        const internData = await inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'name',
                    message: "What is your intern's name? (Required)",
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter their name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'text',
                    name: 'id',
                    message: "What is your intern's employee ID? (Required)",
                    validate: idInput => {
                        if (idInput) {
                            return true;
                        } else {
                            console.log('Please enter their employee ID!');
                            return false;
                        }
                    }
                },
                {
                    type: 'text',
                    name: 'email',
                    message: "What is your intern's email address? (Required)",
                    validate: emailInput => {
                        if (emailInput) {
                            return true;
                        } else {
                            console.log('Please enter their email address!');
                            return false;
                        }
                    }
                },
                {
                    type: 'text',
                    name: 'school',
                    message: "What college does your intern attend? (Required)",
                    validate: schoolInput => {
                        if (schoolInput) {
                            return true;
                        } else {
                            console.log('Please enter the name of their college!');
                            return false;
                        }
                    }
                }
            ])
        // creates new intern object and pushes to employees array
        this.intern = new Intern(internData.name, internData.id, internData.email, internData.school);
        let employeeName = this.intern.getName().name;
        let employeeId = this.intern.getId().id;
        let employeeEmail = this.intern.getEmail().email;
        let employeeRole = this.intern.getRole().role;
        let employeeSchool = this.intern.getSchool().school;

        let employee = {
            name: employeeName,
            id: employeeId,
            email: employeeEmail,
            role: employeeRole,
            school: employeeSchool
        }

        this.employees.push(employee);
        // return user back to menu to add employee or finish building team
        return this.checkForNewEmployee();

    }
}

module.exports = Organization;