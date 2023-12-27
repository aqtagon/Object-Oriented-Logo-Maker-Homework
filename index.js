const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

const askQuestions = async () => {
    const answers = await inquirer.prompt([

    ]);

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
            process.exit(1);            
    }

    shape.setColor(answers.shapeColor);

    const svgContent = shape.render();

    fs.writeFileSync('logo.svg', svgContent);

    console.log('Generated logo.svg');
};

askQuestions();