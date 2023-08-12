import React, {useState} from 'react'
import {Link} from 'react-router-dom';


function HomePage() {

    const [inputData, setData] = useState({
        name: ""
    });

    const handleUpdate = e =>
        setData({
            ...inputData, 
            [e.target.name]: e.target.value
        });

    const {name} = inputData;


    return (
        <>
            <article>
                <p>Enter your expense & click + to start tracking your expenses</p>
                <div className ="add-input">
          
                    <input className="add-input-input" 
                    type="text" 
                    name="name"
                    placeholder="Add Your Expense"
                    value={name}
                    onChange={e => handleUpdate(e)}
                    />
                    <Link to={`/add-expense/${name}`}>
                    <button className="add-input-button" type="button" >+</button>
                    </Link>
                </div>


            </article>
        </>
    )

}

export default HomePage;