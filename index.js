const inq = require('inquirer');
const fs = require('fs');
const manager = require('./lib/Manager');
const engineer = require('./lib/Engineer');
const intern = require('./lib/Intern');
console.log(manager)
const questions = [
    {
        name: 'mName',
        message: 'Please enter the team managers information: \n Name: ',
        type: 'input'
    },
    {
        name: 'mID',
        message: 'Employee ID: ',
        type: 'input'
    },
    {
        name: 'mAdress',
        message: 'Email Address: ',
        type: 'input'
    },
    {
        name: 'mOfficeNumber',
        message: 'Office Number: ',
        type: 'input'
    },
    {
        name: 'nextAction',
        message: 'Would you like to add another team member?',
        type: 'list',
        choices: ['Add an Engineer', 'Add an Intern', 'Finalize Team']
    }
]

const followUpQuestions = {
    'Add an Engineer': [
        {
            name: 'eName',
            message: 'Please enter the engineers information: \n Name: ',
            type: 'input'
        },
        {
            name: 'eID',
            message: 'Employee ID: ',
            type: 'input'
        },
        {
            name: 'eEmail',
            message: 'Employee email: ',
            type: 'input'
        },
        {
            name: 'eGithub',
            message: 'Employee github username: ',
            type: 'input'
        },
        {
            name: 'nextAction',
            message: 'Would you like to add another team member?',
            type: 'list',
            choices: ['Add an Engineer', 'Add an Intern', 'Finalize Team']
        }
    ],
    'Add an Intern': [
        {
            name: 'iName',
            message: 'Please enter the interns information: \n Name: ',
            type: 'input'
        },
        {
            name: 'iID',
            message: 'Employee ID: ',
            type: 'input'
        },
        {
            name: 'iEmail',
            message: 'Employee email: ',
            type: 'input'
        },
        {
            name: 'iSchool',
            message: 'Employee\'s school: ',
            type: 'input'
        },
        {
            name: 'nextAction',
            message: 'Would you like to add another team member?',
            type: 'list',
            choices: ['Add an Engineer', 'Add an Intern', 'Finalize Team']
        }

    ]
}

var employees = [];

function outputHtml() {
    //add manager first
    let employeeSectionHTML = `<section class="display col-4">
    <div class="display-header">
        <h2>${employees[0].getRole()}</h2>
    </div>
    <ul>
        <li>${employees[0].name}</li>
        <li>${employees[0].id}</li>
        <li>${employees[0].officeNumber}</li>
        <li>${employees[0].email}</li>
    </ul>
</section>`;
    for(let i = 1; i < employees.length; i++) {
        employeeSectionHTML += `<section class="display col-4">
    <div class="display-header">
        <h2>${employees[i].getRole()}</h2>
    </div>
    <ul>
        <li>${employees[i].name}</li>
        <li>${employees[i].id}</li>
        <li>${(employees[i].github) ? 'https://github.com/employees[i].github' : employees[i].school}</li>
        <li>${employees[i].email}</li>
    </ul>
</section>`
    }

    let htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Manager</title>
        <link rel="stylesheet" href="reset.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <h1>My Team</h1>
        </header>
        <main class="container"> 
            <div class="row justify-content-center">
                ${employeeSectionHTML}
            </div>
            
        </main>
        <script src="script.js"></script>
    </body>
</html>`
    fs.writeFile('./output/index.html', htmlTemplate, (err) => {console.log((err) ? err:"hi")});
}

function followUp(nextAction) {
    inq.prompt(followUpQuestions[nextAction])
    .then((data) => {
        employees.push((nextAction == 'Add an Engineer') ? new engineer(data.eName, data.eID, data.eEmail, data.eGithub) : new intern(data.iName, data.iID, data.iEmail, data.iSchool));
        if(data.nextAction != 'Finalize Team'){
            followUp(data.nextAction);
        }else{
            outputHtml();
            console.log(employees);
        }
    });
}

inq.prompt(questions)
.then((data) => {
    console.log(data)
    employees.push(new manager(data.mName, data.mID, data.mAdress, data.mOfficeNumber));
    if(data.nextAction != 'Finalize Team'){
        followUp(data.nextAction);
    }else{
        outputHtml();
        console.log(employees);
    }

});

