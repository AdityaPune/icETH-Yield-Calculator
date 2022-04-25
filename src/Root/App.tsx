import { useEffect, useState, useCallback } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddress, useWeb3Context } from "../hooks";
import "./style.scss";

function App() {
    const dispatch = useDispatch();

    const { provider, chainID, connected } = useWeb3Context();

    return <div>Hello World</div>;
}

export default App;
