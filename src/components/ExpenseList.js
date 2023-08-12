import React from 'react';
import Expense from './Expense';


function ExpenseList({expenses, onDelete, onEdit}) {
    
    return (
        <table id ="expenses">
            <thead>
                <tr>
                    <th>Date</th>  
                    <th>Name</th>
                    <th>Amount</th>             
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense, i)=>
                    <Expense
                        expense={expense}
                        key={i}
                        onDelete={onDelete}
                        onEdit= {onEdit}
                    />                    
                )}
                
            </tbody>

        </table>
    );
}

export default ExpenseList; 