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
let lastHdr = await api.rpc.chain.getHeader();
console.log(lastHdr)
// console.log(lastHdr.digest.asPreRuntime)

let i=0;
let lastTimeStamp = 0;
do{
    const momentPrev = await api.query.timestamp.now.at(lastHdr.hash);
    if(lastTimeStamp > 0) {
        // console.log(`BN: ${lastHdr.number.toHuman()}, timeStamp: ${momentPrev.toNumber()} Diff: ${lastTimeStamp - momentPrev.toNumber()}`)
        if(lastTimeStamp - momentPrev.toNumber() > 6050) {
            console.log(`BN: ${lastHdr.number.toHuman()}, timeStamp: ${momentPrev.toNumber()} Diff: ${lastTimeStamp - momentPrev.toNumber()}`)
        }
    }
    lastTimeStamp = momentPrev.toNumber()
    lastHdr = await api.rpc.chain.getHeader(lastHdr.parentHash);
    i++;
}while (i<100)
// const momentPrev = await api.query.timestamp.now.at(lastHdr.parentHash);