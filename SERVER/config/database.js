const mongoose = require('mongoose');

exports.  connectTodatabase = () => {
    try{
        mongoose.connnect(process.env.DATABASE_URL).then(() => {
            console.log('database connection established');
        }); 

    }catch(err){
        console.group("error occured while estabilishing connction with the  database");
        console.error(err.message);
        process.exit(1);
    }
}