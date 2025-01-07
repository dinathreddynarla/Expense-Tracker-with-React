import { useState,useEffect } from 'react'
import './App.css'
import Create from './Components/Create'
import Table from './Components/Table'

function App() {
  const [balance,setBalance] = useState(0)
  const [data,setData] = useState([])

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('data')) || [];
    setData(savedData);
  }, []);

  useEffect(() => {
    calculateBalance()
  }, [data]);

  const calculateBalance = () => {
    let balance = 0;
    data.forEach((item) => {
        balance += item.type === 'income' ? item.amount : -item.amount;
    });
    setBalance(balance);
};
  const handleDelete = (id) =>{
    fetch(`http://localhost:3000/data/${id}`, { method: 'DELETE' })
    .then(() => {
      const updatedData = data.filter((item) => item.id !== id);
      localStorage.setItem('data', JSON.stringify(updatedData));
      setData(updatedData);
    })
    .catch((error) => console.error('Error:', error));
  }

  // console.log(balance)

  return (
    <>
      <h1>Personal Finance Manager</h1>
      <h2>Balance : &#8377; {balance}</h2>
      <Create setData={setData}/>
      <Table data={data} handleDelete={handleDelete}/>
    </>
  )
}

export default App
