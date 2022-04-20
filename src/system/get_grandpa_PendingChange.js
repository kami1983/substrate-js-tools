// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
// import { u8aToHex, numberToU8a, hexToNumber, stringToHex, hexToBigInt } from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';

// Construct
const wsProvider = new WsProvider('ws://167.179.113.240:7645');
const api = await ApiPromise.create({ provider: wsProvider });

// Do something
console.log(api.genesisHash.toHex());


// Retrieve the current block header
// const blockNumber = 748600
const blockNumber = 769820
let lastHash = await api.rpc.chain.getBlockHash(blockNumber)
console.log('等待扫描的 blockNumber ', blockNumber, lastHash.toHuman())
// console.log(lastHdr.digest.asPreRuntime)


let i=0;
do{
    const pending_change = await api.query.grandpa.pendingChange.at(lastHash.toHuman());
    const stalled = await api.query.grandpa.stalled.at(lastHash.toHuman());
    console.log(`pending_change = `, blockNumber - i, lastHash.toHuman(), pending_change.toHuman(), stalled.toHuman())
    const lastHdr = await api.rpc.chain.getHeader(lastHash.toHuman());
    lastHash = lastHdr.parentHash;
    i++;
}while (i<500)