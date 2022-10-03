
const fs = require("fs");
const inquirer = require("inquirer");



const writeToFile = ({name, year, projectTitle, githubUsername, email, deployedApplication, userStory, acceptanceCriteria, description, installationSteps, credits, dependencies, tests, license}) => {
    return `
    # ${projectTitle}
    
    ## Description
    ${description}

    ## Table of Contents 
    - [User Story](#user-story)
    - [Acceptance Criteria](#acceptance-criteria)
    - [Technologies Used](#technologies-used)
    - [Final Application](#final-application)
    - [Installation](#installation)
    - [Tests](#tests)
    - [Credits](#credits)
    - [Contact Me](#contact-me)
    - [${license}](#${license})

    ## User Story
    ${userStory}

    ## Acceptance Criteria
    ${acceptanceCriteria}
    
    ### Additional instructions:
    * Repository as a unique name, has proper file structure, naming conventions, proper indentation, quality comments, and a quality README file with description.
    * Application resembles the following mock-up functionality: 

    ![screenshot of mock-up]()

    ## Technologies Used
    * ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
    * ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
    * ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

    ## Dependencies 
    ${dependencies}

    ## Final Application
    [Live Deployed Link](!${deployedApplication})
    !['description of screenshot or video']()

    ## Installation
    ${installationSteps}

    ## Tests
    ${tests}
    
    ## Credits
    ${credits}

    ## Contact Me
    If you have any questions about this repository, please contact me at ${email}. To view more of my work head over to [my GitHub!](!${githubUsername}) 🎉

    ## ${license}
    Copyright © ${year}, ${name}
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
        message:'What year is it?',
        name: 'year'
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
        message:'What is your projects user story?',
        name: 'userStory'
    },
    {
        type: 'input',
        message:'What is your projects acceptance criteria?',
        name: 'acceptanceCriteria'
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

    //FUTURE DEVELOPMENT 
    // let license 
    // if (data.license === 'MIT License') {
    // } else if (data.license === 'GNU GPLv3') {
    // } else if (data.license === 'Apache License 2.0') { 
    // } else if (data.license === 'Other') {
    // } else {
    //     return 'Error! Must choice a license.'
    // };

    fs.writeFile("README.md", readMe, (err) => {
        err ? console.err("failed to save README file") : console.log("README file saved!!");
    });
})
.catch((err) => {
    console.log(err);
});
