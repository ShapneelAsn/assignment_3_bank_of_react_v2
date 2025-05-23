
/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={props.addDebit}>
        <div>
          <label>
            Description:
            <input type="text" name="description" placeholder="" required />
          </label>
        </div>

        <div>
          <label>
            Amount:
            <input type="number" name="amount" placeholder="" step="0.01" required />
          </label>
        </div>

        <button type="submit">Add Debit</button>
      </form>
      <br />
      <div>Account Balance: ${props.accountBalance.toFixed(2)}</div>
      <br />
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;