import React from 'react';
import ReactTooltip from 'react-tooltip'
import { HiOutlineTrash } from "react-icons/hi";


function Expense({expense, onEdit, onDelete}){


    return (

        <tr>
            <td>{expense.date.substring(5,10)}</td>
            <td className="edit-entry" data-tip data-for="editTip" onClick={()=> onEdit(expense)}> {expense.name} <ReactTooltip id="editTip"> Click to Edit </ReactTooltip></td>
            <td>${expense.amount}</td>
            <td><HiOutlineTrash className="trash-icon" onClick={() => {if (window.confirm('Are You Sure You Want To Delete This Entry?')) onDelete(expense._id)}} /></td>
        </tr>
    )
}

export default Expense; 