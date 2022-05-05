import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { EtherscanProvider, JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { getAddresses } from "../../constants";
import { ethers, BigNumber } from "ethers";
import { icETHContract, icETHStratContract, aavePoolContract, lidoOracleContract } from "../../abi";
import { setAll } from "../../helpers";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IBalances {
    icETH_Bal: string;
    leverage_Ratio: string;
    borrow_Rate: string;
    postEth: string;
    preEth: string;
    timeElapsed: string;
}

export const getBalances = createAsyncThunk("icETH/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IBalances> => {
    console.log("This is it");
    console.log(address, networkID, provider);
    const addresses = getAddresses(networkID);

    const icETH_Contract = new ethers.Contract(addresses.icETH_ADDRESS, icETHContract, provider);
    const icETH_Balance = await icETH_Contract.balanceOf(address);
    console.log("Bal", ethers.utils.formatUnits(icETH_Balance, 18));

    const icETH_Strat_Contract = new ethers.Contract(addresses.icETH_STRAT, icETHStratContract, provider);
    const leverageRatio = await icETH_Strat_Contract.getCurrentLeverageRatio();
    console.log("Lev ratio", ethers.utils.formatUnits(leverageRatio, 18));

    const aave_Pool_Contract = new ethers.Contract(addresses.aave_POOL, aavePoolContract, provider);
    const borrowRate_wETH = await aave_Pool_Contract.getReserveData(addresses.wETH_ADDRESS);
    console.log("Borrow rate", ethers.utils.formatEther(borrowRate_wETH.currentVariableBorrowRate));

    const lido_Contract = new ethers.Contract(addresses.lido_ORACLE, lidoOracleContract, provider);
    const lido_Info = await lido_Contract.getLastCompletedReportDelta();
    const postEth = ethers.utils.formatUnits(lido_Info[0], 18);
    const preEth = ethers.utils.formatUnits(lido_Info[1], 18);
    const time = ethers.utils.formatUnits(lido_Info[2], 0);

    return {
        icETH_Bal: ethers.utils.formatUnits(icETH_Balance, 18),
        leverage_Ratio: ethers.utils.formatUnits(leverageRatio, 18),
        borrow_Rate: ethers.utils.formatUnits(borrowRate_wETH.currentVariableBorrowRate, 25),
        postEth,
        preEth,
        timeElapsed: time,
    };
});

export interface IBalanceSlice {
    icETH_Bal: string;
    leverage_Ratio: string;
    borrow_Rate: string;
    postEth: string;
    preEth: string;
    timeElapsed: string;
}

const initialState: IBalanceSlice = {
    icETH_Bal: "",
    leverage_Ratio: "",
    borrow_Rate: "",
    postEth: "",
    preEth: "",
    timeElapsed: "",
};

const balanceSlice = createSlice({
    name: "icETH",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                console.log(error);
            });
    },
});

export default balanceSlice.reducer;
