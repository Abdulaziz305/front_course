const SHA256 = require('crypto-js/sha256');

class Block{

    constructor(index , timestamp , data , previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce ).toString();
    }

    // 2

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

    console.log("Block mined " + this.hash)

    }
}


class Blockchain{

    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }


    createGenesisBlock(){
        return new Block(0,"01/01/2000","ggg" , "0");
    }


    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.cacheslculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    } 

    isChainValid(){
        for(let i = 2; i<this.chain.length; i++){

            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }

            if(previousBlock.hash !== previousBlock.calculateHash()){
                return false
            }

            return true;
        }
    }




}

let aaaa = new Blockchain();

aaaa.addBlock(new Block(1, "11/11/1111" ,{name : "aziz"}))

aaaa.addBlock(new Block(2, "12/12/1212" ,{name : "saad"}))

aaaa.addBlock(new Block(3, "12/12/1212" ,{name : "abdullah"}))




//console.log('is block chain is valid ? ' + aaaa.isChainValid());

//aaaa.chain[1].data = {name:"muizz"}

//console.log('is block chain is valid ? ' + aaaa.isChainValid());

console.log(JSON.stringify(aaaa , null , 4));
