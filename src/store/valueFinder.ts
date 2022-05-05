import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { EtherscanProvider, JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../constants/blockchain";
import { getAddresses } from "../constants";
import { ethers, BigNumber } from "ethers";
import { icETHContract, icETHStratContract, aavePoolContract, lidoOracleContract } from "../abi";

export const getBalances = async (address: string, networkID: Networks, provider: StaticJsonRpcProvider | JsonRpcProvider) => {
    const addresses = getAddresses(networkID);

    const icETH_Contract = new ethers.Contract(addresses.icETH_ADDRESS, icETHContract, provider);
    const icETH_Balance = await icETH_Contract.balanceOf(address);

    const icETH_Strat_Contract = new ethers.Contract(addresses.icETH_STRAT, icETHStratContract, provider);
    const leverageRatio = await icETH_Strat_Contract.getCurrentLeverageRatio();

    const aave_Pool_Contract = new ethers.Contract(addresses.aave_POOL, aavePoolContract, provider);
    const borrowRate_wETH = await aave_Pool_Contract.getReserveData(addresses.wETH_ADDRESS);

    const lido_Contract = new ethers.Contract(addresses.lido_ORACLE, lidoOracleContract, provider);
    const lido_Info = await lido_Contract.getLastCompletedReportDelta;

    return {
        icETH_Bal: ethers.utils.formatUnits(icETH_Balance, 18),
        leverage_Ratio: ethers.utils.formatUnits(leverageRatio, 18),
        borrow_Rate: ethers.utils.formatUnits(borrowRate_wETH[0].currentVariableBorrowRate, 6),
        postEth: ethers.utils.formatUnits(lido_Info[0], 18),
        preEth: ethers.utils.formatUnits(lido_Info[1], 18),
        timeElapsed: lido_Info[2],
    };
};
