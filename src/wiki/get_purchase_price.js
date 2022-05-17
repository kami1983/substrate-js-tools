
import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
import { cryptoWaitReady } from '@polkadot/util-crypto';
await cryptoWaitReady();

let polkaAPI = null;
const url = "wss://gladios.aresprotocol.io";
async function initProvider(url) {
    const provider = new WsProvider(url);
    return await ApiPromise.create({provider});
}

async function init() {
    polkaAPI = await initProvider(url);
}


/**
 * 获取预付款价格
 * orderID 预付款订单ID
 * symbol 交易对名称如： btc-usdt
 */
async function getPurchasedAvgPrice(orderID, symbol) {
    if(polkaAPI) {
        console.log("Get purchasedAvgPrice");
        const res = await polkaAPI.query.aresOracle.purchasedAvgPrice(orderID, symbol);
        const price = res.toJSON();
        console.log(`======Fetch ${orderID} =====`);
        console.log(`Symbol: ${symbol}, Create block number: ${price.createBn}, Reached type: ${price.reachedType}, Value = ${price.priceData[0]/(10 ** price.priceData[1])}`);
        console.log(`========================`);
    }
}

let orderID = '0xaaf0c45982a423036601dcacc67854b38b854690d8e15bf1543e9a00e660e0195ff717000000000000';
await init()
await getPurchasedAvgPrice(orderID, 'doge-usdt');
await getPurchasedAvgPrice(orderID, 'dot-usdt');