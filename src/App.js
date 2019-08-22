import React from "react";
// import logo from './logo.svg';
// import './App.css';
import Home from "./components/home/home";
import NewProduct from "./components/product/new";
import ScrollToTop from "react-scroll-up";
// import SignIn from './components/sign-in/sign_in';
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import history from "./history/history";
import MainComponent from "./components/MainComponent";
import { ToastContainer } from "react-toastify";
import IconButton from "@material-ui/core/IconButton";
import UpArrow from "@material-ui/icons/ArrowUpwardOutlined";

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <MainComponent />
        <ScrollToTop
          style={{
            left: 50
          }}
          showUnder={160}
        >
          <span>
            <IconButton color="inherit">
              <UpArrow />
            </IconButton>
          </span>
        </ScrollToTop>
        <ToastContainer />
      </Provider>
    </Router>
  );
}

export default App;
