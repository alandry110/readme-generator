// TODO: Include packages needed for this application

const fs = require("fs");
const inquirer = require("inquirer");

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
const writeToFile = (name, projectTitle, githubUsername, email, deployedApplication, description, installationSteps, credits, license, projectFeatures, contributions, dependencies, tests) => {
    return `
    # Project Title

    ${projectTitle}

    ## Live Links & GitHub Information

    [${projectTitle} live Link](${deployedApplication})
    [${name}'s GitHub Username](${githubUsername})
    [${name}'s Email](${email})

    ## Description
    
    ${description}
    
    ## Installation

    ${installationSteps}
    
    ## Credits

    ${credits}
    
    ## License
    
    ${license}

    ## Features
    
    ${projectFeatures}

    ## How to Contribute

    ${contributions}
    
    ## Dependencies 

    ${dependencies}

    ## Tests
    
    ${tests}
    `
}

inquirer.prompt ([
    {
        type: 'input',
        message:'What is your name?',
        name: 'name'
    },
    {
        type: 'input',
        message:"What is your project's name?",
        name: 'projectTitle'
    },
    {
        type: 'input',
        message:'What is your GitHub username?',
        name: 'githubUsername'
    },
    {
        type: 'input',
        message:'What is your email address?',
        name: 'email',
        //validate: emailValidation
    },
    {
        type: 'input',
        message:'What is your projects live URL page?',
        name: 'deployedApplication'
    },
    {
        type: 'input',
        message:'Please write a short description of your project.',
        name: 'description'
    },
    {
        type: 'input',
        message:'What are the steps required to install your project?',
        name: 'installationSteps'
    },
    {
        type: 'input',
        message: 'List your collaborators, if any.',
        name: 'credits'
    },
    {
        type: 'rawlist',
        message:'What type of license should your project have?',
        name: 'license',
        choices: [
            '',
            '',
            ''
          ]
        //validate: licenseValidation
    },
    {
        type: 'input',
        message:'List your projects features',
        name: 'projectFeatures'
    },
    {
        type: 'input',
        message:'What does the user need to know about contributing to the repo?',
        name: 'contributions'
    },
    {
        type: 'input',
        message:'What command should be run to install dependencies?',
        name: 'dependencies'
    },
    {
        type: 'input',
        message:'What command should be run to run tests?',
        name: 'tests'
    },
     
])
.then((data) => {
    const readMe = writeToFile(data);
    fs.writeFile("README.md", readMe, (err) => {
        err ? console.err("failed to save README file") : console.log("README file saved!!");
    });

})
.catch((err) => {
    console.log(err);
});

// // TODO: Create a function to initialize app
// function init() {}

// // Function call to initialize app
// init();

// /* validate: (Function) Receive the user input and answers hash. Should return true if the value is valid, and an error message (String) otherwise. If false is returned, a default error message is provided.*/

// //Validations

//  //need to research this conditional
//  const emailValidation = async (input) => {
//     if (input !== '@gmail.com' || input !== '@yahoo.com' || input !== '@outlook.com' || input !== '@') {
//        return 'Must insert a valid email address';
//     }
//     return true;
//  };

//  //need to write a conditional statement that inserts the correct license
//  const licenseValidation = async (input) => {
//     if (input !== 'y' || input !== 'n') {
//        return 'Must choose an option to continue.';
//     }
//     return true;
//  };