// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import {decodeAddress, xxhashAsHex} from '@polkadot/util-crypto';
import {hexToString, u8aToHex, hexToU8a} from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';

const exclude_list = [];
exclude_list.push("70214e02fb2ec155a4c7bb8c122864b3b03f58c4ac59e8d83af7dc29851df657")
exclude_list.push("aaf0c45982a423036601dcacc67854b38b854690d8e15bf1543e9a00e660e019")
exclude_list.push("c82c3780d981812be804345618d27228680f61bb06a22689dcacf32b9be8815a")
exclude_list.push("74a173a22757ddc9790ed388953a1ed8a5933a421858533411b36ebd41d74165")
exclude_list.push("acad76a1f273ab3b8e453d630d347668f1cfa9b01605800dab7126a494c04c7c")
exclude_list.push("9e55f821f7b3484f15942af308001c32f113f31444f420a77422702907510669")
exclude_list.push("4aa6e0eeed2e3d1f35a8eb1cd650451327ad378fb8975dbf5747016ff3be2460")
exclude_list.push("587bae319ecaee13ce2dbdedfc6d66eb189e5af427666b21b4d4a08c7af0671c")

// Construct
const wsProvider = new WsProvider('wss://gladios.aresprotocol.io');
const api = await ApiPromise.create({ provider: wsProvider });
let lastHdr = await api.rpc.chain.getHeader();
console.log(lastHdr.hash)


const total_issuance = await api.query.balances.totalIssuance()
const total_issuance_human = BigInt(total_issuance.toHuman().replaceAll(',',''));


let gladiosBalance = [];
const exposures = await api.query.system.account.entries();
let debugTotalBalance = BigInt(0)
exposures.forEach(([key, exposure]) => {
    const storageKey = key.args.map((k) =>
        k.toHuman()
    );
    const dataExposure = exposure.toHuman();

    const ss58Addr = storageKey[0]
    const pubAddr = u8aToHex(decodeAddress(ss58Addr)).substr(2)
    const freeBalance = dataExposure.data.free.replaceAll(',','');
    const reservedBalance = dataExposure.data.reserved.replaceAll(',','');
    const miscFrozen = dataExposure.data.miscFrozen.replaceAll(',','');
    const feeFrozen = dataExposure.data.feeFrozen.replaceAll(',','');

    // console.log("ss58Addr = ", ss58Addr);
    // console.log("pubAddr = ", pubAddr);
    // console.log("free balance = ", freeBalance);


    const totalBalance = BigInt(freeBalance) + BigInt(reservedBalance)

    if(exclude_list.includes(pubAddr)) {
        console.log(`${pubAddr} is excluded, ss58Addr = ${pubAddr}, freeBalance = ${freeBalance}, reservedBalance = ${reservedBalance}`)
        console.log("-----------")
    }else{
        gladiosBalance.push([ss58Addr, totalBalance.toString()])
    }

    debugTotalBalance += BigInt(totalBalance)
});

import * as fs from 'fs';
try {
    const file_name = './gladios-balance.json'

    const sourceContent = JSON.stringify(gladiosBalance); // "(\d+)"
    const writeContent = sourceContent.replace(/("\d+")/g, (arg1)=>{
        return arg1.replaceAll('"', '')
    });

    fs.writeFileSync('./gladios-balance.json', writeContent)
    console.log("Save filename = ", file_name)
} catch (err) {
    console.error(err)
}

console.log("Total balance A= ", total_issuance_human)
console.log("Total balance B= ", debugTotalBalance)
console.log("Total balance C= ", total_issuance_human - debugTotalBalance)

// -16720823,916,263,828,040n
//
// 1,002,253,462,980,997,993,513n 计算出来的total
// 1,002,332,580,816,595,243,581  测试网total



