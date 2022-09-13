
const fs = require("fs");
const inquirer = require("inquirer");

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

const emailValidation = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
        // test regex function that takes a string and compares it to regex function
        validate: answer => {
            if (emailValidation.test(answer)) {
                return true;
            } else {
                return 'Error! Must insert valid email address.'
            }
        }
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
            'MIT License',
            'GNU GPLv3',
            'Apache License 2.0',
            'Other'
          ]
    },
    {
        type: 'input',
        message:'List your projects features.',
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

    let license 
    if (data.license === 'MIT License') {
    } else if (data.license === 'GNU GPLv3') {
    } else if (data.license === 'Apache License 2.0') { 
    } else if (data.license === 'Other') {
    } else {
        return 'Error! Must choice a license.'
    };

    fs.writeFile("README.md", readMe, (err) => {
        err ? console.err("failed to save README file") : console.log("README file saved!!");
    });
})
.catch((err) => {
    console.log(err);
});
