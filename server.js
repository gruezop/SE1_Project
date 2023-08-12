const express = require('express')
const path = require('path')

const cors = require('cors');
const expense = require('./model.js');
require('dotenv').config()
const bodyParser = require("body-parser")

const app = express()
const port = process.env.PORT || 5000


const buildPath = path.join(__dirname, 'build')


app.use(express.static(buildPath))
app.use(express.json())
app.use(cors())



app.use(bodyParser.urlencoded({ extended: true }));


// CREATE controller ******************************************
app.post ('/expense', (req,res) => { 
  expense.addExpense(
      req.body.name, 
      req.body.amount, 
      req.body.date
      )
      .then(expense=> {
          res.status(201).json(expense);
      })
      .catch(error => {
          console.log(error);
          res.status(400).json({ error: 'Invalid request.' });
      });
});

// READ controller ****************************************************
// GET expenses
app.get('/expense', (req, res) => {
  let filter = {};

  expense.findExpense(filter, '', 0)
      .then(expense => {
          res.send(expense);
      })
      .catch(error => {
          console.error(error);
          res.send({ Error: 'Request failed' });
      });

});


// RETRIEVE controller ****************************************************
// GET expenses by ID
app.get('/expense/:_id', (req, res) => {
  const expenseId = req.params._id;
  expense.findExpenseById(expenseId)
      .then(expense => { 
          if (expense !== null) {
              res.json(expense);
          } else {
              res.status(404).json({ Error: 'Not found' });
          }         
       })
      .catch(error => {
          console.error(error);
          res.status(400).json({ Error: 'Try again! Request failed' });
      });

});


// DELETE Controller ******************************
app.delete('/expense/:_id', (req, res) => {
  expense.deleteById(req.params._id)
      .then(deletedCount => {
          if (deletedCount === 1) {
              res.status(204).send();
          } else {
              res.status(404).json({ Error: 'Not found' });
          }
      })
      .catch(error => {
          console.error(error);
          res.send({ error: 'Try again! Request failed' });
      });
});

// UPDATE controller ************************************
app.put('/expense/:_id', (req, res) => {
  expense.replaceExpense(
      req.params._id, 
      req.body.name, 
      req.body.amount, 
      req.body.date
  )

  .then(numUpdated => {
      if (numUpdated === 1) {
          res.json({ 
              _id: req.params._id, 
              name: req.body.name, 
              amount: req.body.amount, 
              date: req.body.date
          })
      } else {
          res.status(404).json({ Error: 'Not found' });
      }
  })
  .catch(error => {
      console.error(error);
      res.status(400).json({ Error: 'Invalid Request' });
  });
});


// gets the static files from the build folder
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});