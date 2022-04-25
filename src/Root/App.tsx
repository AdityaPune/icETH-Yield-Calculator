import { useEffect, useState, useCallback } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddress, useWeb3Context } from "../hooks";
import "./style.scss";
import { getTokenPrice } from "../helpers";
import Topbar from "src/components/Topbar";

function App() {
    const dispatch = useDispatch();
    const address = useAddress();
    const [walletChecked, setWalletChecked] = useState(false);
    const ethPrice = getTokenPrice("ETH");

    const { connect, disconnect, connected, web3, providerChainID, hasCachedProvider, checkWrongNetwork, chainID } = useWeb3Context();

    const connectToDapp = () => {
        if (hasCachedProvider()) {
            connect().then(() => {
                setWalletChecked(true);
            });
        } else {
            setWalletChecked(true);
        }
    };

    useEffect(connectToDapp, []);

    return (
        <div className="root-app">
            <Topbar />
            Hello World {ethPrice}
            {!connected && <button onClick={connectToDapp}>Click me</button>}
        </div>
    );
}

export default App;
