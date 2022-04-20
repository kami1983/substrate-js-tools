// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
// import { u8aToHex, numberToU8a, hexToNumber, stringToHex, hexToBigInt } from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';

// Construct
const wsProvider = new WsProvider('ws://158.247.224.97:7645');
const api = await ApiPromise.create({ provider: wsProvider });

// Do something
console.log(api.genesisHash.toHex());


// Retrieve the current block header
// const blockNumber = 748600
// check block_number
const extract_block_number = 42862
// Get block hash
const extract_hash = await api.rpc.chain.getBlockHash(extract_block_number)
let lastHdr = await api.rpc.chain.getHeader(extract_hash);

// console.log('等待扫描的 blockNumber ', lastHdr.number.toNumber(), lastHdr.hash.toHuman())
// console.log(lastHdr.digest.asPreRuntime)

let i=0;
let futureSlot = 0;
let futureMoment = 0;
do{
    const randomness = await api.query.babe.randomness.at(lastHdr.hash);
    const next_randomness = await api.query.babe.nextRandomness.at(lastHdr.hash);
    const initialized = await api.query.babe.initialized.at(lastHdr.hash);
    const epoch_index = await api.query.babe.epochIndex.at(lastHdr.hash);
    const current_slot = await api.query.babe.currentSlot.at(lastHdr.hash);
    const currentMoment = await api.query.timestamp.now.at(lastHdr.hash);

    // 完整信息
    // console.log(`Bn = ${lastHdr.number}, babe randomness = ${randomness.toHuman()}, next = ${next_randomness} initialized = ${initialized.toHuman()} epoch_index = ${epoch_index} current_slot = ${current_slot}` )
    // slot 差值，
    const diffSlot = futureSlot - current_slot ;
    const diffMoment = futureMoment - currentMoment;
    if(diffSlot>1) {
        console.log(`Bn = ${lastHdr.number} , futureSlot = ${futureSlot}, currentSlot = ${current_slot}, diffSlot = ${diffSlot}, DiffMoment = ${diffMoment}` )
    }else{
        console.log(`Bn = ${lastHdr.number} --- DiffMoment = ${diffMoment}` )
    }
    futureSlot = current_slot;
    futureMoment = currentMoment;
    lastHdr = await api.rpc.chain.getHeader(lastHdr.parentHash);
    i++;
}while (i<9000)