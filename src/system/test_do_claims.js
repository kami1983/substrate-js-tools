// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import {decodeAddress, xxhashAsHex} from '@polkadot/util-crypto';
import {hexToString, u8aToHex, hexToU8a} from '@polkadot/util';
// import { u8aToHex, numberToU8a, hexToNumber, stringToHex, hexToBigInt } from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';


function getStatementKind (kind?: StatementKind | null): Statement | undefined {
    if (!kind) {
        return undefined;
    }
    const url = kind.isRegular
        ? 'https://statement.polkadot.network/regular.html'
        : 'https://statement.polkadot.network/saft.html';
    const hash = kind.isRegular
        ? 'Qmc1XYqT6S39WNp2UeiRUrZichUWUPpGEThDE6dAb3f6Ny'
        : 'QmXEkMahfhHJPzT3RjkXiZVFi77ZeVeuxtAjhojGRNYckz';

    return {
        sentence: `I hereby agree to the terms of the statement whose SHA-256 multihash is ${hash}. (This may be found at the URL: ${url})`,
        url
    };
}

// Construct
const wsProvider = new WsProvider('ws://127.0.0.1:9944');
const api = await ApiPromise.create({ provider: wsProvider });

const ethAddr = '0x7CBe7b2511dabC3fa90e4425d3f1a938951F80F1';
const ss58Addr = '4UqsPeh8oDUT9Vihyy2j6HVPxuxwwZwi3yTeeKg3xFqTbVQ9';
const publicKey = u8aToHex(decodeAddress(ss58Addr));

console.log(`EthAddr = ${ethAddr}`)
console.log(`ss58Addr = ${ss58Addr}`)
console.log(`publicKey = ${publicKey}`)

// 获取对应的 Claim 数据 `claims.claims`
const claimData = await api.query.claims.claims(ethAddr);
const claimVesting = await api.query.claims.vesting(ethAddr);
console.log(`claim balance = ${claimData.toHuman()}`)
console.log(`claim vesting = total: ${claimVesting.toHuman()[0]},  per: ${claimVesting.toHuman()[1]},  start bn: ${claimVesting.toHuman()[2]}`)

// 拼接签名内容。
const toSignStr = `Pay ARES to the pioneer account:${publicKey}`
console.log(`toSignStr = |${toSignStr}|`)

//
const signedStr = `{
  "address": "0x7cbe7b2511dabc3fa90e4425d3f1a938951f80f1",
  "msg": "Pay ARES to the pioneer account:0xe0905542e8846108789628546e8999dc579eece0aa2b21f974c4a0a0e75fff2e",
  "sig": "0x72242f3f4c0f6e611f343738b0ec8d8013778c0829088301ad53a9b8df7cce8504d9df847d525c6d0d82785553417d26e3887be076cd214d3e61bc89ee6f78e41b",
  "version": "2"
}`;

// to claim
// Sign and send a transfer from Alice to Bob
const txHash = await api.tx.claims
    .claim(BOB, 12345)
    .signAndSend(alice);

// Show the hash
console.log(`Submitted with hash ${txHash}`);
