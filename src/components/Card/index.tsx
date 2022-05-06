import "./card.scss";
import IceCube from "./Icons/icecube-2.png";
import GreenArrow from "./Icons/green2.png";
import { getTokenPrice } from "../../helpers";
import { useAddress, useWeb3Context } from "../../hooks";
import { IReduxState } from "../../store/Slices/state.interface";
import { useSelector, useDispatch } from "react-redux";
import CountUp from "react-countup";

function Card() {
    const ethPrice = getTokenPrice("ETH");
    const icethPrice = getTokenPrice("icETH");
    const valueInEth = (icethPrice / ethPrice).toFixed(4);
    const { provider, connect, chainID, checkWrongNetwork } = useWeb3Context();
    const percIncrease = ((icethPrice - ethPrice) / icethPrice).toFixed(4);

    const address = useAddress();

    const postEth = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.postEth;
    });

    const preEth = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.preEth;
    });

    const timeElapsed = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.timeElapsed;
    });

    const TOTAL_SECONDS = 60 * 60 * 24 * 365;

    //This is the value (usually) shown on Dune Analytics
    const stEth = 3.67;

    //This is the actual expected stETH value retrieved from the contract
    const actualStEth = (100 * ((Number(postEth) - Number(preEth)) * TOTAL_SECONDS)) / (Number(preEth) * Number(timeElapsed));

    const borrowRate = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.borrow_Rate;
    });
    const leverageRatio = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.leverage_Ratio;
    });
    const icETH_Bal = useSelector<IReduxState, string>(state => {
        return state.balance && state.balance.icETH_Bal;
    });

    const grossYield = Number((Number(actualStEth) - Number(borrowRate)) * (Number(leverageRatio) - 1) + stEth).toFixed(4);

    return (
        <div className="card-container">
            <div className="card-container-segment">
                <div className="card-container-segment-header">
                    <img src={IceCube} className="card-container-segment-header-icon" />
                    &nbsp; icETH Interest
                </div>

                {address && (
                    <div className="card-container-segment-header">
                        <CountUp start={0} end={Number(grossYield)} duration={1} decimals={4} />%
                    </div>
                )}

                <div className="card-container-segment-body">
                    {!address && (
                        <div className="card-container-segment-body-row-special">
                            <div onClick={connect}>Connect your wallet</div>
                        </div>
                    )}
                    {address && (
                        <div className="card-container-segment-body-row">
                            <div className="card-container-segment-body-row-unit">
                                Balance &nbsp;
                                <img src={IceCube} className="card-container-segment-body-row-icon" />
                            </div>
                            <div>{icETH_Bal}</div>
                        </div>
                    )}

                    <div className="card-container-segment-body-row">
                        <div className="card-container-segment-body-row-unit">
                            Price&nbsp;
                            <img src={IceCube} className="card-container-segment-body-row-icon" />
                        </div>
                        <div>${icethPrice}</div>
                    </div>

                    <div className="card-container-segment-body-row">
                        <div>
                            Value in ETH
                            <br />(<span>{percIncrease}%</span>
                            <img src={GreenArrow} className="card-container-segment-row-icon" />)
                        </div>
                        <div>{valueInEth} ETH</div>
                    </div>

                    {/* <div className="card-container-segment-body-row">
                        <div>Correct</div>
                        <div>{actualStEth} </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Card;
