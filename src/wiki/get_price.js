

import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
import { cryptoWaitReady } from '@polkadot/util-crypto';
await cryptoWaitReady();

// import BigNumber from "bignumber.js";

let polkaAPI = null;
const url = "wss://gladios.aresprotocol.io";
async function initProvider(url) {
    const provider = new WsProvider(url);
    return await ApiPromise.create({provider});
}

async function init() {
    const keyring = new Keyring({ type: 'sr25519' });
    const dave = await keyring.createFromUri('//Dave');
    polkaAPI = await initProvider(url);
}

/**
 * 获取价格
 * symbol 交易对名称如： btc-usdt
 */
async function getAresPrice(symbol) {
    if(polkaAPI) {
        console.log("get symbol price");
        const res = await polkaAPI.query.aresOracle.aresAvgPrice(symbol);
        const price = res.toJSON();// res.toHuman();
        console.log(`======fetch ${symbol} price finished======`);
        console.log(`symbol price: ${price[0]}/(${10 ** price[1]}) = `, price[0]/(10 ** price[1]) );
        console.log(`========================`);
    }
}

async function runGetAresPrice(){
    await init()
    await getAresPrice("eth-usdt");
}

runGetAresPrice();
