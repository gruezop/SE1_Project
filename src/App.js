import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import AddExpense from './pages/AddExpense';
import ExpenseDiary from './pages/ExpenseDiary';
import EditExpense from './pages/EditExpense';
import ContactUs from './pages/ContactUs';
import Help from './pages/Help';
import Navigation from './components/Navigation';
import Footer from './pages/Footer';


function App() {
    
    const[expenseToEdit, setExpenseToEdit] = useState([]);
    
    
    return (
        <>
          <Router>
            <Navigation />
            <main>
                <Switch>
               
                <Route path="/" exact><HomePage /></Route>
               
                <Route path="/add-expense/:name" render={props => <AddExpense {...props} />} />

                <Route path="/add-expense"><AddExpense setExpenseToEdit={setExpenseToEdit} /></Route>
            
                <Route path="/edit-expense"><EditExpense expenseToEdit={expenseToEdit} /></Route>

                <Route path="/expensediary"><ExpenseDiary setExpenseToEdit={setExpenseToEdit}/></Route>

                <Route path="/help"><Help/></Route>

                <Route path="/contactus"><ContactUs/></Route>
                
                </Switch>
            </main>
            <Footer />
          </Router>
        </>
    )
}

export default App;