import { ethers } from "ethers";
import "./card.scss";
import { Grid, Box } from "@material-ui/core";
import IceCube from "./Icons/icecube-2.png";
import { getTokenPrice } from "../../helpers";
import { useAddress, useWeb3Context } from "../../hooks";
import { IReduxState } from "../../store/Slices/state.interface";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getBalances } from "src/store/valueFinder";
import { delay } from "lodash";
import { EtherscanProvider, JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";

function Card() {
    const ethPrice = getTokenPrice("ETH");
    const icethPrice = getTokenPrice("icETH");
    const valueInEth = (icethPrice / ethPrice).toFixed(4);
    const [result, setResult] = useState({});

    const address = useAddress();

    const postEth = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.postEth;
    });

    const preEth = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.postEth;
    });

    const timeElapsed = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.timeElapsed;
    });

    const TOTAL_SECONDS = 60 * 60 * 24 * 365;

    const stEth = (((Number(postEth) - Number(preEth)) * TOTAL_SECONDS) / (Number(preEth) * Number(timeElapsed))).toFixed(4);

    const borrowRate = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.borrow_Rate;
    });
    const leverageRatio = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.leverage_Ratio;
    });
    const icETH_Bal = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.icETH_Bal;
    });

    const grossYield = Number((Number(stEth) - Number(borrowRate)) * (Number(leverageRatio) - 1) + stEth).toFixed(4);

    return (
        <div className="card-container">
            <div className="card-container-segment">
                <div className="card-container-segment-header">
                    <img src={IceCube} className="card-container-segment-header-icon" />
                    &nbsp; icETH Interest Earned
                </div>

                <div className="card-container-segment-header">{grossYield}</div>
                {/* <div className="card-container-segment-header">{address}</div> */}
                <div className="card-container-segment-body">
                    <div className="card-container-segment-body-row">
                        <div>Gross Yield vs ETH</div>
                        <div>{icETH_Bal}%</div>
                    </div>
                    <div className="card-container-segment-body-row">
                        <div>Borrow Rate</div>
                        <div>${borrowRate}</div>
                    </div>
                    <div className="card-container-segment-body-row">
                        <div>Lev Ratio</div>
                        <div>${leverageRatio}</div>
                    </div>
                    <div className="card-container-segment-body-row">
                        <div>st Eth</div>
                        <div>${stEth}</div>
                    </div>
                    <div className="card-container-segment-body-row">
                        <div>ETH Price</div>
                        <div>${ethPrice}</div>
                    </div>

                    <div className="card-container-segment-body-row">
                        <div>icETH Price</div>
                        <div>${icethPrice}</div>
                    </div>

                    <div className="card-container-segment-body-row">
                        <div>icETH in ETH</div>
                        <div>{valueInEth} ETH</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
