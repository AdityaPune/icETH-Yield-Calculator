import { useEffect, useState, useCallback } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddress, useWeb3Context } from "../hooks";
import "./style.scss";
import { getTokenPrice } from "../helpers";
import Topbar from "src/components/Topbar";
import Card from "src/components/Card";
import { getBalances } from "src/store/Slices/balance-slice";

function App() {
    const dispatch = useDispatch();
    const address = useAddress();
    const [walletChecked, setWalletChecked] = useState(false);
    const ethPrice = getTokenPrice("ETH");

    const { connect, disconnect, connected, web3, provider, providerChainID, hasCachedProvider, checkWrongNetwork, chainID } = useWeb3Context();

    const connectToDapp = () => {
        if (hasCachedProvider()) {
            connect().then(() => {
                setWalletChecked(true);
            });
        } else {
            setWalletChecked(true);
        }
    };

    async function loadDetails() {
        console.log("Holllaa");
        loadConvert(provider);
    }

    const loadConvert = useCallback(
        loadProvider => {
            dispatch(getBalances({ address, networkID: chainID, provider: loadProvider }));
        },
        [connected],
    );

    useEffect(() => {
        if (hasCachedProvider()) {
            connect().then(() => {
                setWalletChecked(true);
            });
        } else {
            setWalletChecked(true);
        }
    }, []);

    useEffect(() => {
        if (walletChecked) {
            loadDetails();
        }
    }, [walletChecked]);

    return (
        <div className="root-app">
            <Topbar />
            <Card />
        </div>
    );
}

export default App;
