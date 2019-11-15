let fs = require('fs');
let db = require('../util/database');

async function test() {
    console.log("passing")
    let query = 'select * from user'
    await db.execute(query).then(([row,someData]) => {
        console.log(row); 
    });
}

module.exports = {
    test : test
}