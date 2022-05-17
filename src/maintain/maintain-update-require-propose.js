


import {ApiPromise, WsProvider} from '@polkadot/api';
import {cryptoWaitReady} from '@polkadot/util-crypto';
import {Keyring} from '@polkadot/keyring';

console.log('Hello update config.');

async function subApi() {
    // wss%3A%2F%2Fgladios.aresprotocol.io#/extrinsics
    const wsProvider = new WsProvider('wss://gladios.aresprotocol.io' );
    return await ApiPromise.create({provider: wsProvider});
}

async function getMemberKeyring() {
    await cryptoWaitReady();
    const keyring = new Keyring({type: 'sr25519'});
    return keyring.addFromUri(
        'blur pioneer frown science banana impose avoid law act strategy have bronze//1//controller',
    );
}

function getUpdateData() {
    return [[ 'btc-usdt', 'btc', 2, 4, 5 ],
    [ 'eth-usdt', 'eth', 2, 4, 5 ],
    [ 'dot-usdt', 'dot', 2, 4, 5 ],
    [ 'link-usdt', 'link', 2, 4, 5 ],
    [ 'ada-usdt', 'ada', 2, 4, 9 ],
    [ 'xrp-usdt', 'xrp', 2, 4, 9 ],
    [ 'sol-usdt', 'sol', 2, 4, 9 ],
    [ 'uni-usdt', 'uni', 2, 4, 9 ],
    [ 'bnb-usdt', 'bnb', 2, 4, 9 ],
    [ '1inch-usdt', '1inch', 2, 4, 9 ],
    [ 'atom-usdt', 'atom', 2, 4, 9 ],
    [ 'trx-usdt', 'trx', 2, 4, 9 ],
    [ 'aave-usdt', 'aave', 2, 4, 9 ],
    [ 'snx-usdt', 'snx', 2, 4, 9 ],
    [ 'avax-usdt', 'avax', 2, 4, 12 ],
    [ 'ltc-usdt', 'ltc', 2, 4, 12 ],
    [ 'bch-usdt', 'bch', 2, 4, 12 ],
    [ 'fil-usdt', 'fil', 2, 4, 12 ],
    [ 'etc-usdt', 'etc', 2, 4, 12 ],
    [ 'eos-usdt', 'eos', 2, 4, 12 ],
    [ 'dash-usdt', 'dash', 2, 4, 12 ],
    [ 'comp-usdt', 'comp', 2, 4, 12 ],
    [ 'matic-usdt', 'matic', 2, 4, 12 ],
    [ 'doge-usdt', 'doge', 2, 4, 5 ],
    [ 'luna-usdt', 'luna', 2, 4, 12 ],
    [ 'ftt-usdt', 'ftt', 2, 4, 16 ],
    [ 'xlm-usdt', 'xlm', 2, 4, 16 ],
    [ 'vet-usdt', 'vet', 2, 4, 16 ],
    [ 'icp-usdt', 'icp', 2, 4, 16 ],
    [ 'theta-usdt', 'theta', 2, 4, 16 ],
    [ 'algo-usdt', 'algo', 2, 4, 16 ],
    [ 'xmr-usdt', 'xmr', 2, 4, 16 ],
    [ 'xtz-usdt', 'xtz', 2, 4, 16 ],
    [ 'egld-usdt', 'egld', 2, 4, 16 ],
    [ 'axs-usdt', 'axs', 2, 4, 16 ],
    [ 'iota-usdt', 'iota', 2, 4, 16 ],
    [ 'ftm-usdt', 'ftm', 2, 4, 16 ],
    [ 'ksm-usdt', 'ksm', 2, 4, 4 ],
    [ 'hbar-usdt', 'hbar', 2, 4, 16 ],
    [ 'neo-usdt', 'neo', 2, 4, 16 ],
    [ 'waves-usdt', 'waves', 2, 4, 16 ],
    [ 'mkr-usdt', 'mkr', 2, 4, 16 ],
    [ 'near-usdt', 'near', 2, 4, 16 ],
    [ 'btt-usdt', 'btt', 2, 4, 16 ],
    [ 'chz-usdt', 'chz', 2, 4, 16 ],
    [ 'stx-usdt', 'stx', 2, 4, 16 ],
    [ 'dcr-usdt', 'dcr', 2, 4, 16 ],
    [ 'xem-usdt', 'xem', 2, 4, 16 ],
    [ 'omg-usdt', 'omg', 2, 4, 16 ],
    [ 'zec-usdt', 'zec', 2, 4, 16 ],
    [ 'sushi-usdt', 'sushi', 2, 4, 16 ],
    [ 'enj-usdt', 'enj', 2, 4, 16 ],
    [ 'mana-usdt', 'mana', 2, 4, 16 ],
    [ 'yfi-usdt', 'yfi', 2, 4, 16 ],
    [ 'iost-usdt', 'iost', 2, 4, 16 ],
    [ 'qtum-usdt', 'qtum', 2, 4, 16 ],
    [ 'bat-usdt', 'bat', 2, 4, 16 ],
    [ 'zil-usdt', 'zil', 2, 4, 16 ],
    [ 'icx-usdt', 'icx', 2, 4, 16 ],
    [ 'grt-usdt', 'grt', 2, 4, 16 ],
    [ 'celo-usdt', 'celo', 2, 4, 16 ],
    [ 'zen-usdt', 'zen', 2, 4, 16 ],
    [ 'ren-usdt', 'ren', 2, 4, 16 ],
    [ 'sc-usdt', 'sc', 2, 4, 16 ],
    [ 'zrx-usdt', 'zrx', 2, 4, 16 ],
    [ 'ont-usdt', 'ont', 2, 4, 16 ],
    [ 'nano-usdt', 'nano', 2, 4, 16 ],
    [ 'crv-usdt', 'crv', 2, 4, 16 ],
    [ 'bnt-usdt', 'bnt', 2, 4, 16 ],
    [ 'fet-usdt', 'fet', 2, 4, 16 ],
    [ 'uma-usdt', 'uma', 2, 4, 16 ],
    [ 'iotx-usdt', 'iotx', 2, 4, 16 ],
    [ 'lrc-usdt', 'lrc', 2, 4, 16 ],
    [ 'sand-usdt', 'sand', 2, 4, 16 ],
    [ 'srm-usdt', 'srm', 2, 4, 16 ],
    [ 'kava-usdt', 'kava', 2, 4, 16 ],
    [ 'knc-usdt', 'knc', 2, 4, 16 ],]
}

// updateRequestPropose(priceKey, priceToken, parseVersion, fractionNum, requestInterval)
async function updateRequestPropose() {

    const apis = await subApi();
    const memberKeyPair = await getMemberKeyring();
    let {nonce} = await apis.query.system.account(memberKeyPair.address);

    console.log(" All update count: ", getUpdateData().length)
    for (const data of getUpdateData()) {
        const priceKey = data[0]
        const priceToken = data[1]
        const parseVersion = data[2]
        const fractionNum = data[3]
        const requestInterval = data[4] * 2

        console.log(`getUpdateData : ${priceKey}, ${priceToken}, ${parseVersion}, ${fractionNum}, ${requestInterval}`)

        const proposal =
            apis.tx.aresOracle &&
            apis.tx.aresOracle.updateRequestPropose(
                priceKey,
                priceToken,
                parseVersion,
                fractionNum,
                requestInterval,
            );

        console.log(`Current nonce: ${nonce}`)

        await apis.tx.sudo
            .sudo(proposal)
            .signAndSend(memberKeyPair, {nonce}, ({ events = [], status}) => {
                console.log('Proposal status: ', status.type);
                if (status.isInBlock) {
                    console.log('Included at block hash 1: ', status.asInBlock.toHex(), priceKey, priceToken);
                    // console.log('Events:', events);
                } else if (status.isFinalized) {
                    console.log('Finalized block hash: 2', status.asFinalized.toHex(), priceKey, priceToken);
                }
            });

        nonce++

        sleep(3000);
    }
}

async function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    })
}

async function run() {
    // Show old config values.
    const apis = await subApi();
    await updateRequestPropose();
}

run().then(r => {});