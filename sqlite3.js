'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('company.sqlite', (err) => console.log('connected'));
const {employees} = require('./employees.js');

db.run('DROP TABLE IF EXISTS employees');

const createEmployeeTable = () => {
    db.run('CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, title TEXT, address TEXT)', populateTable)
};

const populateTable = () => {
    employees.forEach((obj) => {
        // Using ES6 string templating, we can create an insert statement for each object
        db.run(`INSERT INTO employees VALUES (${obj.id}, '${obj.firstName}', '${obj.lastName}', '${obj.title}', '${obj.address}')`);
    });
};

createEmployeeTable();

//get back everything vvv
// setTimeout( () => {
//     db.each('SELECT * FROM employees', (err, { id, first, last, title, address}) => {
//         if (err) {
//             return console.log(err.toString());
//         }
//         console.log(`${id} ${first} ${last} ${title} ${address}`);
//     });
// }, 500);

//job titles vvv
// setTimeout( () => {
//     db.each('SELECT title FROM employees', (err, { title }) => {
//         if (err) {
//             return console.log(err.toString());
//         }
//         console.log(`${title}`);
//     });
// }, 500);


//get employees + address vvv
setTimeout( () => {
    db.each('SELECT first, last, address FROM employees', (err, { first, last,  address}) => {
        if (err) {
            return console.log(err.toString());
        }
        console.log(`${first} ${last} ${address}`);
    });
}, 500);



//extra notes vvv

    //creating two tables together

    // db.run('CREATE TABLE IF NOT EXISTS orders (orders stuff)');
    // db.run('CREATE TABLE IF NOT EXISTS people (people stuff)');

    // orders.forEach( ({date, amount, id}) => {
    //     db.run('INSET INTO orders VALUES (null, "${date} .......)')
    // });

    // people.forEach( ({first, last, address}) => {
    //     db.run('INSET INTO people VALUES (null, "${first} .......)')
    // });

    //finding all orders by one people

    // db.all(`SELECT * FROM orders
    //         JOIN people
    //         ON orders.peopleId = people.id
    //         WHERE people.id = #`,
    //         (err, data) => {
    //             console.log("thing", data);
    //         });

    //list of people that placed orders

    // SELECT * FROM people p
    // JOIN orders
    // ON p.Id = peopleid