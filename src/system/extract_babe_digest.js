// 用来分解Babe共识下的某一个区块Digest的情况
// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
// import { u8aToHex, numberToU8a, hexToNumber, stringToHex, hexToBigInt } from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';
// import { RawBabePreDigest } from '@polkadot/types/interfaces/babe';

// Construct
const wsProvider = new WsProvider('ws://127.0.0.1:7745');
const api = await ApiPromise.create({ provider: wsProvider });
const registry = new TypeRegistry();

// Do something
console.log('genesisHash = ', api.genesisHash.toHex());

// check block_number
const extract_block_number = 1
// Get block hash
const extract_hash = await api.rpc.chain.getBlockHash(extract_block_number)
// Print infos.
console.log(`Extract bn= ${extract_block_number}, hash= ${extract_hash.toHuman()}`)
// Get hader
const extract_hdr = await api.rpc.chain.getHeader(extract_hash);
//
extract_hdr.digest.logs.map(data=>{
    if(data.isPreRuntime){
        console.log('isPreRuntime => ')
        const rawBytes = data.asPreRuntime[1];
        // RawBabePreDigest 如果出错，可能当前区块并不是Babe共识。
        const currentRawBabePreDigest = registry.createTypeUnsafe('RawBabePreDigest', [rawBytes.toU8a(true)])
        const digestType = currentRawBabePreDigest.isPrimary?'Primary':
            currentRawBabePreDigest.isSecondaryPlain?'SecondaryPlain':
                currentRawBabePreDigest.isSecondaryVRF?'SecondaryVRF':'unknown'

        console.log(`digestType = ${digestType}`)

        let slotNumber = 'Null'
        let authorityIndex = 'Null'
        switch (digestType){
            case 'Primary':
                slotNumber = currentRawBabePreDigest.asPrimary.slotNumber
                authorityIndex = currentRawBabePreDigest.asPrimary.authorityIndex
                break;
            case 'SecondaryPlain':
                slotNumber = currentRawBabePreDigest.asSecondaryPlain.slotNumber
                authorityIndex = currentRawBabePreDigest.asSecondaryPlain.authorityIndex
                break;
        }
        console.log(`slotNumber= ${slotNumber} authorityIndex = ${authorityIndex}`)

    }
    if(data.isConsensus){
        console.log('isConsensus => ', data.asConsensus[0].toHuman())
        if ('BABE' == data.asConsensus[0].toHuman()) {
            // 获取 Consensus 存储数据
            const rawBytes = data.asConsensus[1];
            // 这个可以解析，但是感觉也有点怪
            // const extract_data = registry.createTypeUnsafe('AuthoritySet', [rawBytes.toU8a(true)])
            // 这个可以解析，但是感觉也有点怪
            const authority_list = registry.createTypeUnsafe('AuthorityList', [rawBytes.toU8a(true)])
            console.log('authority_list', authority_list.toJSON())

            const vrf_output = registry.createTypeUnsafe('RawVRFOutput', [rawBytes.toU8a(true)])
            console.log('vrf_output', vrf_output.toJSON())


            const randomness = registry.createTypeUnsafe('MaybeRandomness', [rawBytes.toU8a(true)])
            console.log('这个 randomness 解析的不准', randomness.toHuman())
        }

    }
    if(data.isSeal){
        console.log('isSeal => ', data.asSeal[0].toHuman())
        console.log('isSeal => ', data.asSeal[1].toHuman())
    }
})


// console.log(lastHdr.digest.asPreRuntime)

// let i=0;
// do{
//     i++;
//     console.log(lastHdr.digest.logs.map(data=>{
//         if(data.isPreRuntime){
//             const rawBytes = data.asPreRuntime[1]
//             const registry = new TypeRegistry();
//             const currentRawBabePreDigest = registry.createTypeUnsafe('RawBabePreDigest', [rawBytes.toU8a(true)])
//             // const slotNumber = currentRawBabePreDigest.toHuman().SecondaryPlain.slotNumber;
//             const digestType = currentRawBabePreDigest.isPrimary?'Primary':
//                                 currentRawBabePreDigest.isSecondaryPlain?'SecondaryPlain':
//                                     currentRawBabePreDigest.isSecondaryVRF?'SecondaryVRF':'unknown'
//             let slotNumber = 'Null'
//             switch (digestType){
//                 case 'Primary':
//                     slotNumber = currentRawBabePreDigest.asPrimary.slotNumber
//                     break;
//                 case 'SecondaryPlain':
//                     slotNumber = currentRawBabePreDigest.asSecondaryPlain.slotNumber
//                     break;
//             }
//
//             // return `${digestType} : ${JSON.stringify(currentRawBabePreDigest.toHuman())}`
//             // return `${digestType}, ${slotNumber}, ${currentRawBabePreDigest}`
//             return `${digestType}, ${slotNumber}`
//         }
//         if(data.isConsensus){
//             return `isConsensus`
//         }
//         return "N"
//     }), lastHdr.number.toHuman())
//     lastHdr = await api.rpc.chain.getHeader(lastHdr.parentHash);
// }while (i<60)
// const momentPrev = await api.query.timestamp.now.at(lastHdr.parentHash);