// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
// import { u8aToHex, numberToU8a, hexToNumber, stringToHex, hexToBigInt } from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';
// import { RawBabePreDigest } from '@polkadot/types/interfaces/babe';

// Construct
const wsProvider = new WsProvider('ws://158.247.224.97:7646');
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
            const rawBytes = data.asPreRuntime[1]
            const registry = new TypeRegistry();
            const currentRawBabePreDigest = registry.createTypeUnsafe('RawBabePreDigest', [rawBytes.toU8a(true)])
            // const slotNumber = currentRawBabePreDigest.toHuman().SecondaryPlain.slotNumber;
            const digestType = currentRawBabePreDigest.isPrimary?'Primary':
                                currentRawBabePreDigest.isSecondaryPlain?'SecondaryPlain':
                                    currentRawBabePreDigest.isSecondaryVRF?'SecondaryVRF':'unknown'
            let slotNumber = 'Null'
            switch (digestType){
                case 'Primary':
                    slotNumber = currentRawBabePreDigest.asPrimary.slotNumber
                    break;
                case 'SecondaryPlain':
                    slotNumber = currentRawBabePreDigest.asSecondaryPlain.slotNumber
                    break;
            }

            // return `${digestType} : ${JSON.stringify(currentRawBabePreDigest.toHuman())}`
            // return `${digestType}, ${slotNumber}, ${currentRawBabePreDigest}`
            return `${digestType}, ${slotNumber}`
        }
        if(data.isConsensus){
            return `isConsensus`
        }
        return "N"
    }), lastHdr.number.toHuman())
    lastHdr = await api.rpc.chain.getHeader(lastHdr.parentHash);
}while (i<60)
// const momentPrev = await api.query.timestamp.now.at(lastHdr.parentHash);