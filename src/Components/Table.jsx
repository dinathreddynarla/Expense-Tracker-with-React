import img from "../assets/notransaction2.png"
import "../Styles/Table.css"

const Table = ({data , handleDelete}) => {
  return (
    <>
      <h1>Transactions</h1>
      <table border={1} cellSpacing={0} cellPadding={5}>
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.length >0 ? ( 
                data.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.description}</td>
                        <td>{item.amount}</td>
                        <td>{item.type}</td>
                        <td><button onClick={()=>handleDelete(item.id)}>Delete</button></td>
                    </tr>
                ))
            ) : (
                <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  <img src={img} className="notransaction" alt="No Transactions" />
                </td>
              </tr>
            )}
            </tbody>
      </table>
    </>
  )
}

export default Table
