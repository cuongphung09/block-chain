const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
        this.nonce = 0
    }
    calculateHash(){
        return SHA256(this.index+this.timestamp+JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined: '+ this.hash)
    }
}
class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }
    createGenesisBlock(){
        return new Block(0,'1590564849518','GenesisBlock',"0");
    }
    getLastestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        // newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }
    isChainValid(){
        for(let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}
let saveCoin = new BlockChain();
console.log('Mining block 1 ...');
saveCoin.addBlock(new Block(1,'1590566432947',{amount: 10000}));
console.log('Mining block 2 ...');
saveCoin.addBlock(new Block(2,'1590566469467',{amount: 20000}));
console.log('Mining block 3 ...');
saveCoin.addBlock(new Block(3,'1590566469467',{amount: 30000}));
console.log('Mining block 4 ...');
saveCoin.addBlock(new Block(4,'1590566469467',{amount: 40000}));
console.log('Mining block 5 ...');
saveCoin.addBlock(new Block(5,'1590566469467',{amount: 50000}));

// console.log(JSON.stringify(saveCoin, null, 4))
// console.log(saveCoin.isChainValid());
