import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.scss";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact element={<Home />} path="/"></Route>
          <Route element={<ProductList />} path="/products/:category"></Route>
          <Route element={<Product />} path="/product/:id"></Route>
          <Route element={<Cart />} path="/cart"></Route>
          <Route element={<Success />} path="/success"></Route>
          <Route
            element={user ? <Navigate to={"/"} /> : <Login />}
            path="/login"
          ></Route>
          <Route
            element={user ? <Navigate to={"/"} /> : <Register />}
            path="/register"
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
