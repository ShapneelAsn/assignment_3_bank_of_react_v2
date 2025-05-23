
/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';

const Credits = (props) => {
  const creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0, 10);
      return (
        <li key={credit.id}>
          {credit.amount} {credit.description} {date}
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Credits</h1>

      {creditsView()}

      <form onSubmit={props.addCredit}>
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

        <button type="submit">Add Credit</button>
      </form>

      <br />
      <div>Account Balance: ${props.accountBalance.toFixed(2)}</div>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
