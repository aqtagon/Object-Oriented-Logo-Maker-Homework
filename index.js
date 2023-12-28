import inquirer from 'inquirer';
import fs from 'fs';
import { Triangle, Circle, Square } from './lib/shapes.js';

const questions = [
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color:',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Select a shape:',
        choices: ['Triangle', 'Circle', 'Square'],
    },
    {
        type: 'input',
        name: 'text',
        message: 'Enter a text for the logo (3 letters):',
        validate: input => {
            if (input.length === 3) return true;
            return 'Text must be exactly 3 letters long.';
        }
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color:',
    }
];

const askQuestions = async () => {
    const answers = await inquirer.prompt(questions);

    let shape;
    switch (answers.shape) {
        case 'Triangle':
            shape = new Triangle();
            break;
        case 'Circle':
            shape = new Circle();
            break;
        case 'Square':
            shape = new Square();
            break;
        default:
            console.error('Invalid shape selected');
            return;
    }

    shape.setColor(answers.shapeColor);

    // Incorporating the text and text color into the SVG content
    const svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shape.render()}
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
    </svg>`;

    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
};

askQuestions();