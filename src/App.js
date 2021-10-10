
import './App.css';

import Commerce from "@chec/commerce.js";

function App() {
  const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
  commerce.products.list().then(response => console.log(response.data));

  return (
    <div>
      <header>
        Welcome to COSC631.
      </header>
    </div>
  );
}

export default App;
