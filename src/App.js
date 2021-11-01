import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "./App.css";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import { createContext, useState } from "react";
import Login from "./Pages/Login/Login";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import Admin from "./Pages/Admin/Admin";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSigned: false,
    name: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ user: [loggedInUser, setLoggedInUser] }}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>

            <Route exact path="/singleProduct/:id">
              <SingleProduct></SingleProduct>
            </Route>

            <Route exact path="/login">
              <Login></Login>
            </Route>

            <Route exact path="/checkout">
              <CheckoutPage></CheckoutPage>
            </Route>

            <Route exact path="/admin">
              <Admin></Admin>
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
