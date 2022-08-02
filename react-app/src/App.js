import './App.css';
import React, {Component, useEffect} from "react";
import ReactDOM from "react-dom/client";
import Navigation from "./components/Navigation";
import Home from "./components/Home";

export default class App extends Component {
    render()
    {
        return (
            <div className="container">
                <h4 className="header-text">React App using Web API</h4>
                <Navigation/>
                <Home/>
            </div>
        );
    }
}
