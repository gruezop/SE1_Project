import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';


export const EditExpense = ({ expenseToEdit }) => {
 
    const [name, setName]         = useState(expenseToEdit.name);
    const [amount, setAmount]     = useState(expenseToEdit.amount);
    const [date, setDate]         = useState(expenseToEdit.date);
    
    const history = useHistory();

    const editExpense= async () => {
        const response = await fetch(`/expense/${expenseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                amount: amount, 
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Your entry has been edited!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to edit expense. ${errMessage.Error}`);
        }
        history.push("/expensediary");
    }

    return (
        <>
        <article>
            <h2> Edit Expense </h2>
            <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>

                    <label for="title">Name</label>
                    <input
                        className="form-input"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
                    
                    <label for="amount">Amount</label>
                    <input
                        className="form-input"
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={e => setAmount(e.target.value)} 
                        id="amount" />

                    <label for="date">Date</label>
                    <input
                        className="form-input"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <label for="submit">
                    <button
                        onClick={editExpense}
                        id="submit"
                    >Save</button></label>
                </fieldset>
                </form>
                </div>
            </article>
        </>
    );
}
export default EditExpense;