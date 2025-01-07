import React, { useState } from 'react'
import "../Styles/Create.css"

const Create = ({setData}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const[details,setDetails] = useState({
        description:'',
        amount:'',
        type:'income'
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevState) => ({
            ...prevState,
            [name]: name === 'amount' ? Number(value) : value,
          }));
        // console.log(details)
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (details.amount <= 0) {
            setErrorMessage('Amount must be a positive number.');
            return;
        }
        const options = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(details),
        };
    
        fetch('http://localhost:3000/data', options)
          .then((res) => res.json())
          .then((data) => handleLocal(data))
          .catch((error) => {
            // console.error('Error:', error);
            setErrorMessage('Failed to save transaction. Please try again.');
        });
      };
      const handleLocal=(data)=>{
        let LocalData = JSON.parse(localStorage.getItem("data")) || [];
        LocalData.push(data)
        localStorage.setItem("data",JSON.stringify(LocalData))
        setData((prevData)=>[...prevData,data])
        setDetails({
            description: '',
            amount: '',
            type: 'income',
        });
        setErrorMessage('');

    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Description' id='description' name='description' value={details.description} onChange={handleChange} required/>
        <input type="number" placeholder='Amount' id='amount' name='amount' value={details.amount} onChange={handleChange} required/>
        <select name='type' id="dropdown" value={details.type} onChange={handleChange}>
            <option value={"income"}>income</option>
            <option value={"expense"}>expense</option>
        </select>
        <button type='submit'> Add Transaction</button>
    </form>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    
    </>
  )
}

export default Create
