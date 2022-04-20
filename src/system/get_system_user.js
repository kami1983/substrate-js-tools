// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import { xxhashAsHex } from '@polkadot/util-crypto';
import {hexToString, u8aToHex, hexToU8a} from '@polkadot/util';
// import { u8aToHex, numberToU8a, hexToNumber, stringToHex, hexToBigInt } from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';

// Construct
const wsProvider = new WsProvider('wss://gladios.aresprotocol.io');
const api = await ApiPromise.create({ provider: wsProvider });

// function hex_to_string(metadata) {
//     return metadata.match(/.{1,2}/g).map(function(v){
//         return String.fromCharCode(parseInt(v, 16));
//     }).join('');
// }

// Do something
// console.log(api.genesisHash.toHex(), hex_to_string("0x0600000001000000010000000000000008f5dff1ad950300000000000000000000f00fe98219020000000000000000002c768cc40a92030000000000000000002c768cc40a9203000000000000000000"));

// Retrieve the current block header
let lastHdr = await api.rpc.chain.getHeader();



const hostKey = '0x92fcd076'
const hostKeyHex = hexToU8a(hostKey);
console.log("hostKeyHex = ", hostKeyHex);
console.log("")



// curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "offchain_localStorageGet", "params": ["PERSISTENT", "0x6172652d6f63773a3a6c6f63616c5f686f73745f6b6579"]}' http://gladios.aresprotocol.io:9933/



// 0x26aa394eea5630e07c48ae0c9558cef7
// 0xb99d880ec681799c0cf30e8886371da9

console.log('Storage-Key=', xxhashAsHex('System', 128),xxhashAsHex('Account', 128))

let storagelist = await api.rpc.state.getKeys("0x26aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e8886371da9"); // System+Account
let accountList = storagelist.toHuman().map(accData => {
    // console.log(accData.length)
    return accData.substr(accData.length - 64);
})
console.log(accountList, accountList.length)