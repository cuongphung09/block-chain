const {BlockChain, Transaction} = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('d1712b41549316951f924823f04e065184bc0d97a3fe7df7f98bcaaa31e439d8');
const myWalletAddress = myKey.getPublic('hex');

let saveCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here',1000);
tx1.signTransaction(myKey);
saveCoin.addTransaction(tx1)
const tx2 = new Transaction(myWalletAddress, 'public key goes here',2000);
tx2.signTransaction(myKey);
saveCoin.addTransaction(tx2)
saveCoin.minePendingTransaction(myWalletAddress)
console.log(`Balance of ? address is: ${saveCoin.getBalanceOfAddress(myWalletAddress)}`);
console.log(saveCoin)