import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
const createUsers = () => {
    const users = [];
    for (let i = 0; i < 5; i++) {
        const user = {
            id: i,
            pin: 1234 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(1234556 * Math.random() * 123456789),
            balance: 1234567 * i,
        };
        users.push(user);
    }
    return users;
};
const atmMachine = async (users) => {
    const response = await inquirer.prompt({
        type: 'number',
        message: 'Enter your PIN:',
        name: 'pin',
    });
    console.log('Welcome');
    const user = users.find((val) => val.pin === response.pin);
    if (user) {
        console.log(`Welcome, ${user.name}`);
        atmFunc(user);
        return;
    }
    else {
        console.log('Invalid User');
    }
};
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: 'list',
        name: 'Select',
        message: 'Choose an action:',
        choices: ['Withdraw', 'Balance', 'Exit'],
    });
    if (ans.Select === 'Withdraw') {
        const amount = await inquirer.prompt({
            type: 'number',
            message: 'Enter the amount to withdraw:',
            name: 'amount',
        });
        if (amount.amount > user.balance) {
            return console.log('Insufficient Balance');
        }
        console.log(`Withdrawn amount: ${amount.amount}`);
    }
    if (ans.Select === 'Balance') {
        console.log(`Balance: ${user.balance}`);
    }
    if (ans.Select === 'Exit') {
        console.log('Thank you');
    }
};
const users = createUsers();
atmMachine(users);
