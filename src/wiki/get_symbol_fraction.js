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
 * 获取支持的交易对儿
 */
async function getSymbolFraction(symbol) {
    if(polkaAPI) {
        console.log("get symbol list");
        const exposures = await polkaAPI.query.aresOracle.symbolFraction.entries();
        exposures.forEach(([key, exposure]) => {
            console.log(`Symbol = ${key.toHuman()[0]}`);
        })
    }
}

await init()
getSymbolFraction();