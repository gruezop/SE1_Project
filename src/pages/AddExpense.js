import React, { useState} from 'react';
import { useHistory, useParams } from "react-router-dom";


export const AddExpense = () => {

    const {name} = useParams();

    const [inputData, setInputData] = useState({
        name: name, 
        amount: "", 
    });

    const [date, setDate]   = useState('');
    const {amount} = inputData;
    const history = useHistory();

    const handleUpdate = e =>
        setInputData({
            ...inputData, 
            [e.target.name]: e.target.value
        });


    const addExpense = async () => {
        const newExpense = { name, amount, date };
        const response = await fetch('/expense', {
            method: 'post',
            body: JSON.stringify(newExpense),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Your entry has been added!");
        } else {
            alert("There was an error adding this entry. Try again");
        }
        history.push("/expensediary");
    };

    return (
        <>
        <article>
            <h2>Add Expenses</h2>
            <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <label for="name">Name
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Name of Expense"
                        value={name}
                        onChange={e => handleUpdate(e)} 
                        id="name" />
                    </label>
                    <label for="amount">Amount
                    <input
                        className="form-input"
                        name="amount"
                        type="number"
                        step="0.01"
                        value={amount}
                        placeholder="$"
                        onChange={e => handleUpdate(e)} 
                        id="reps" />
                    </label>
                    <label for="date">Date
                    <input
                        className="form-input"
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" />
                    </label>
                    <label for="submit">
                    <button
                        type="submit"
                        onClick={addExpense}
                        id="submit"
                    >Add</button></label>
                </fieldset>
                </form>

            </div>
            </article>

        </>
    );
}

export default AddExpense;