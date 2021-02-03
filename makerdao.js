/* /service/overview.js */
'use strict';
// Example to supply ETH as collateral and borrow a supported ERC-20 token
const Web3 = require('web3');
// const HashQuark = 'http://152.32.252.15:11122'
const HashQuark = 'http://127.0.0.1:8545'
const web3 = new Web3(HashQuark)

const Maker = require('@makerdao/dai');
const { McdPlugin, ETH, DAI } = require('@makerdao/dai-plugin-mcd');

// const ownerAddress = '0x90f79bf6eb2c4f870365e785982e1f101e93b906';                         // Fork HashQuark01
// const myPrivateKey = '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6'; // Fork HashQuark01

const ownerAddress = '0x5fA2866e24425Bc26c0bFf2291ad77Beb8Dbe02b';                         // Fork Local
const myPrivateKey = '0xfc541f71b6b649cf2e31e956fa1e9a93ef6b8d62fb570964b224cdac8f7b7536'; // Fork Local

/**
 * Compound Potocol
 */
class MakerDaoService extends require('egg').Service {
    async accountInfo() {
        let blockNumber = await web3.eth.getBlockNumber();
        let balanceETH = await web3.eth.getBalance(ownerAddress);

        console.log([
            `blockNumber: ${blockNumber}`,
            `Address: ${ownerAddress}`,
            `balanceETH: ${balanceETH}`,
        ].map(x => x.toString()))

        let accountInfo = {
            blockNumber: blockNumber,
            owner: ownerAddress,
            ETH: balanceETH,
        }

        return accountInfo
    }

    async mcdSystemData() {
        const maker = await Maker.create('http', {
            plugins: [McdPlugin],
            url: HashQuark,
        });

        const service = maker.service('mcd:systemData');
        const base = await service.getAnnualBaseRate();
        const line = await service.getSystemWideDebtCeiling();
        const dead = await service.isGlobalSettlementInvoked();

        console.log([
            `系统基准利率: ${base}`,
            `系统总体上限: ${line}`,
            `系统是否关闭: ${dead}`,
        ].map(x => x.toString()));

        let systemData = {
            "base": base,
            "line": line,
            "dead": dead,
        }

        return systemData
    }

    async createVault() {
        console.log(`query:`)
        const maker = await Maker.create('http', {
            plugins: [McdPlugin],
            url: HashQuark,
            privateKey: myPrivateKey
        });
        // console.log(`query:${query.inputCdpType}`)
        // console.log(`query:${query.inputEthAmount}`)
        // console.log(`query:${query.inputDaiAmount}`)
        console.log(`currentAddress: ${maker.currentAddress()}`);

        await maker.service('proxy').ensureProxy();
        const manager = maker.service('mcd:cdpManager');

        // openLockAndDraw
        let vault = await manager.openLockAndDraw('ETH-A', ETH(50), DAI(1000));

        // console.log(`vault.id:${vault.id}`);  // vault.id:20096
        // console.log(`vault.debtValue:${vault.debtValue}`); // vault.debtValue:1000.00 DAI


        // await maker.service('proxy').ensureProxy();
        // const manager = maker.service('mcd:cdpManager');

        // // openLockAndDraw
        // // let inputType = query.inputCdpType
        // // let inputEth = ETH(`${query.inputEthAmount}`)
        // // let inputDai = DAI(`${query.inputDaiAmount}`)
        // // let vault = await manager.openLockAndDraw('ETH-A',  ETH(5),DAI(100));
        // // openLockAndDraw
        // let vault = await manager.openLockAndDraw('ETH-A', ETH(50), DAI(1000));


        // let vault = await manager.openLockAndDraw(inputType, inputEth, inputDai);
        
        // console.log(`vault.id:${vault.id}`);  // vault.id:20096
        // console.log(`vault.debtValue:${vault.debtValue}`); // vault.debtValue:1000.00 DAI

        // wipeAndFree
        // let proxy = await maker.currentProxy();
        // let cdps = await manager.getCdpIds(proxy);
        // await manager.wipeAndFree(cdps[0].id, 'ETH-A', DAI(100), ETH(5));

        let createVault = {
            // cdpId: cdps[0].id,
            // cdpType: query.inputCdpType,
            // supplyETH: `ETH(${query.inputEthAmount})`,
            // borrowDAI: `DAI(${query.inputDaiAmount})`,
        }

        return createVault

    }

    async closeVault() {
        const maker = await Maker.create('http', {
            plugins: [McdPlugin],
            url: HashQuark,
            privateKey: myPrivateKey
        });

        const cdpManager = maker.service('mcd:cdpManager');
        let proxy = await maker.currentProxy();
        let cdps = await cdpManager.getCdpIds(proxy);
        // let vaultId = 20188
        await cdpManager.wipeAndFree(cdps[0].id, 'ETH-A', DAI(100), ETH(5));
        // console.log(`vault is closed: ${vault}`)
    }

    async mcdSaving() {
        const maker = await Maker.create('http', {
            plugins: [McdPlugin],
            url: HashQuark,
            privateKey: myPrivateKey
        });

        const service = maker.service('mcd:savings');

        // const joinResult = await service.join(DAI(10));
        // console.log(`address:${ownerAddress} deposit dai to DSR: ${joinResult}`) 

        const balanceOfAddress = await service.balanceOf(ownerAddress)
        const totalDaiLocked = await service.getTotalDai();
        const apyOfDai = await service.getYearlyRate();

        console.log([
            `${ownerAddress} 存入Dai: ${balanceOfAddress}`,  // address:0x90f79bf6eb2c4f870365e785982e1f101e93b906's balance: 0.00 DAI
            `DSR中Dai总锁定: ${totalDaiLocked}`,  // totalDaiLocked: 7118512.79 DAI
            `Dai年化收益: ${apyOfDai}`,  // DAI's Saving APY: 0
        ].map(x => x.toString()))

        let mcdSaving = {
            "address": ownerAddress,
            "balanceOfAddress": balanceOfAddress._amount,
            "totalDaiLocked": totalDaiLocked._amount,
            "apyOfDAI": apyOfDai,
        }

        return mcdSaving
    }
}

module.exports = MakerDaoService;