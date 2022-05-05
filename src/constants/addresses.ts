import { Networks } from "./blockchain";

const ETH = {
    icETH_ADDRESS: "0x7C07F7aBe10CE8e33DC6C5aD68FE033085256A84",
    icETH_STRAT: "0xe6484a64e2ea165943c734dC498070b5902CBc2b",
    aave_POOL: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
    lido_ORACLE: "0x442af784A788A5bd6F42A01Ebe9F287a871243fb",
    wETH_ADDRESS: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.ETH) return ETH;

    throw Error("Network doesn't support");
};
