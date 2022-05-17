
import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
const keyring = new Keyring({ type: 'sr25519' });
import { cryptoWaitReady } from '@polkadot/util-crypto';
await cryptoWaitReady();

let polkaAPI = null;
// const url = "wss://gladios.aresprotocol.io";
const url = "ws://127.0.0.1:9948";
async function initProvider(url) {
    const provider = new WsProvider(url);
    return await ApiPromise.create({provider});
}

async function init() {
    polkaAPI = await initProvider(url);
}

/**
 * 提交预付款
 * maxFee
 * requestKeys 交易对数组  如："btc-usdt,eth-usdt,doge-usdt"
 */
async function submitAskPrice(sender, maxFee, requestKeys) {
    if(polkaAPI) {
        console.log("============submit ask price==============");
        // maxFee = new BigNumber(maxFee).shiftedBy(12).toNumber();
        const unsub = await polkaAPI.tx.aresOracle.submitAskPrice(maxFee, requestKeys)
            .signAndSend(sender, {}, ({status, events, dispatchError}) => {
                if (dispatchError) {
                    if (dispatchError.isModule) {
                        const decoded = polkaAPI.registry.findMetaError(dispatchError.asModule);
                        const { docs, name, section } = decoded;
                        console.log(`${section}.${name}: ${docs.join(' ')}`);
                    }
                    console.log(`${dispatchError}`);
                } else if (status.isFinalized) {
                    events.map(item => {
                        const result = item.event.toHuman();
                        if (result.method === "NewPurchasedRequest") {
                            console.log("submit ask price order ID:", result.data[0]);
                        }
                    })
                    console.log(`submitAskPrice Transaction finalized at blockHash ${status.asFinalized}`);
                    unsub();
                }
            });
    }
}

const userPair = keyring.addFromUri('0xf7a139713338804e7d9384809dc7324895a1e292b3d4b402160b5d2b1931b42b');
await init()
await submitAskPrice(userPair, BigInt(`${200}000000000000`), 'doge-usdt,dot-usdt');