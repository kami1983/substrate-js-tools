// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
// import { u8aToHex, numberToU8a, hexToNumber, stringToHex, hexToBigInt } from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';

// Construct
const wsProvider = new WsProvider('ws://127.0.0.1:7646');
const api = await ApiPromise.create({ provider: wsProvider });

// Do something
console.log(api.genesisHash.toHex());


// Retrieve the current block header
let lastHdr = await api.rpc.chain.getHeader();
console.log(lastHdr)
// console.log(lastHdr.digest.asPreRuntime)

let i=0;
do{
    i++;
    console.log(lastHdr.digest.logs.map(data=>{
        if(data.isPreRuntime){
            // 获取 Aura solt number 的方法。
            const registry = new TypeRegistry();
            const rawBytes = data.asPreRuntime[1]
            const rawNum = registry.createTypeUnsafe('RawAuraPreDigest', [rawBytes.toU8a(true)]).slotNumber
            return `${rawNum}`
        }
        return "None"
        // return "h"
    }), lastHdr.number.toHuman())
    lastHdr = await api.rpc.chain.getHeader(lastHdr.parentHash);
}while (i<100)
// const momentPrev = await api.query.timestamp.now.at(lastHdr.parentHash);