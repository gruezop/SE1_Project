import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import { FcCurrencyExchange } from "react-icons/fc";
import {Link} from 'react-router-dom';

function ExpenseDiary({ setExpenseToEdit }) {

    const [inputData, setData] = useState({
        name: ""
    });

    const handleUpdate = e =>
        setData({
            ...inputData, 
            [e.target.name]: e.target.value
        });

    const {name} = inputData;

    const [expenses, setExpense]  = useState([]);
    const history = useHistory();

    const loadExpenses = async () => {
        const response = await fetch('/expense');
        const expenses = await response.json();
        setExpense(expenses);
    } 

  
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const total = expenses.reduce((acc, item) => acc + item.amount, 0);
        setTotal(total)
    }, [expenses]);


    const onEditExpense = async expense => {
        setExpenseToEdit(expense);
        history.push("/edit-expense");
    }


    const onDeleteExpense = async _id => {
        const response = await fetch(`/expense/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/expense');
            const expenses = await getResponse.json();
            setExpense(expenses);
        } else {
            console.error(`Failed to delete expense with _id = ${_id}, status code = ${response.status}`)
        }
    }

    useEffect(() => {
        loadExpenses();
    }, []);

    
    // Get currency conversion from microservice
    const amount = total
    const [currency, setCurrency] = useState('');
    const [exchanges, setExchanges]     = useState([]);
    const convertMe = {amount, currency};

    const loadExchange = async () => {
        const response = await fetch(`https://currency-micro.onrender.com/`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(convertMe),
            headers: {'Content-Type': 'application/json',},
        });

        const exchange = await response.json();
        setExchanges(exchange.newAmount);
    }
    
    
    return (
        <>
            <article>
            <h2>Daily Expenses</h2>
            <h3>Total Spent: ${total.toFixed(2)}   </h3>    
                    <div className="fieldset-auto-width">
                    
                    <label htmlFor="currency"> <FcCurrencyExchange/> Convert Total Spent Amount: {exchanges} {currency}</label>
                    <select 
                            className="form-select"
                            name="currency" 
                            id="currency" 
                            value={currency}
                            onChange={e => setCurrency(e.target.value)} >
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                    <option value="YEN">JPY</option>
                    <option value="AUD">AUD</option>
                    </select> 
                    
                    <button
                    className="h3-button"
                    type="submit"
                    onClick={loadExchange}
                    id="submit"
                    >Convert</button>                   
                </div>
                
                <div className="add-input">
                <input className="diary-input" 
                    type="text" 
                    name="name"
                    placeholder="Add Your Expense"
                    value={name}
                    onChange={e => handleUpdate(e)}
                    
                    />
                    <Link to={`/add-expense/${name}`}>
                    <button className="diary-input-button" type="button" > +</button>
                    </Link>
                </div>


            <ExpenseList
                expenses={expenses}
                onEdit={onEditExpense}
                onDelete={onDeleteExpense}
            />

            </article>
        </>
    )

}

export default ExpenseDiary;