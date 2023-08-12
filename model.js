const mongoose = require('mongoose');
require('dotenv').config()



// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Expense collection using Mongoose.');
    }
});


// SCHEMA: Define the collection's schema.
const expenseSchema = mongoose.Schema({
	name: { type: String, required: true },
	amount: { type: Number, min: 1, required: true},
    date: { type: Date, required: true }
});

// Compile the model from the schema.
const Expense = mongoose.model("Expense", expenseSchema);


// CREATE model *****************************************
const addExpense = async (name, amount, date) => {
    const expense = new Expense({ 
        name: name, 
        amount: amount, 
        date: date 
    });
    return expense.save();
}


// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const findExpense = async (filter) => {
    const query = Expense.find(filter);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findExpenseById = async (_id) => {
    const query = Expense.findById(_id);
    return query.exec();
}


// DELETE model based on ID  *****************************************
const deleteById = async (_id) => {
    const result = await Expense.deleteOne({_id: _id});
    return result.deletedCount;
};

const opts = {runValidators: true};
// REPLACE model *****************************************************
const replaceExpense = async (_id, name, amount, date) => {
    const result = await Expense.replaceOne({_id: _id }, {
        name: name,
        amount: amount,
        date: date
    }, opts);
    return result.modifiedCount;
}



// Export our variables for use in the controller file.
module.exports = {addExpense, findExpense, findExpenseById, replaceExpense, deleteById} 