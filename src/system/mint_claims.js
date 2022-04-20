// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';
import {decodeAddress, xxhashAsHex} from '@polkadot/util-crypto';
import {hexToString, u8aToHex, hexToU8a} from '@polkadot/util';
// import { u8aToHex, numberToU8a, hexToNumber, stringToHex, hexToBigInt } from '@polkadot/util';
import { createType, createTypeUnsafe, TypeRegistry } from '@polkadot/types';

// Construct
const wsProvider = new WsProvider('ws://127.0.0.1:9944');
const api = await ApiPromise.create({ provider: wsProvider });
const keyring = new Keyring({ type: 'sr25519' });

// Retrieve the upgrade key from the chain state
const adminId = await api.query.sudo.key();

// Find the actual keypair in the keyring (if this is a changed value, the key
// needs to be added to the keyring before - this assumes we have defaults, i.e.
// Alice as the key - and this already exists on the test keyring)
const adminPair = keyring.addFromUri('0xf7a139713338804e7d9384809dc7324895a1e292b3d4b402160b5d2b1931b42b'); // For controller 1

console.log(`admin address: ${adminPair.address}`)

const ethAddr = '0x7CBe7b2511dabC3fa90e4425d3f1a938951F80F1'
const amount = BigInt('3333000000000000')

// mintClaim(who, value, vestingSchedule, statement) Mint a new claim to collect DOTs.
api.tx.claims
    .mintClaim(ethAddr, amount, null, null)
    .signAndSend(adminPair, {  }, ({ events = [], status }) => {
        console.log('Transaction status:', status.type);
        if (status.isInBlock) {
            console.log('Included at block hash', status.asInBlock.toHex());
            console.log('Events:');
            events.forEach(({ event: { data, method, section }, phase }) => {
                console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            });
        } else if (status.isFinalized) {
            console.log('Finalized block hash', status.asFinalized.toHex());
            process.exit(0);
        }
    });