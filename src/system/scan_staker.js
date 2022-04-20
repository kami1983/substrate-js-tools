// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
// import { u8aToHex, numberToU8a, hexToNumber, stringToHex, hexToBigInt } from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';

// Construct
const wsProvider = new WsProvider('wss://gladios.aresprotocol.io');
const api = await ApiPromise.create({ provider: wsProvider });

// Do something
console.log(api.genesisHash.toHex());


// Retrieve the current block header

// console.log(lastHdr)
// console.log(lastHdr.digest.asPreRuntime)

// const momentPrev = await api.query.timestamp.now.at(lastHdr.parentHash);

// 750200
let blockNumber = 60000;
let eraIndex = parseInt(blockNumber / 100 / 6);
console.log(parseInt(eraIndex));
let lastHdr = await api.rpc.chain.getBlockHash(blockNumber)

for (let i=0; i< 10000; i++) {
    let result = await api.query.staking.erasStakers.at(lastHdr, eraIndex, "4Rma6tk2UtaGxPh5dozPz4DVFM2R4wK4iZtXP4kXzKqMv27F");
    console.log( blockNumber, eraIndex, result.toHuman().total, result.toHuman().others);
    blockNumber-=600;
    eraIndex--;
}

