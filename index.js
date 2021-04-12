const Web3 = require('web3');
const abis = require('./abis');
const address = require('./address');


const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const pancakeswap = new web3.eth.Contract(
    abis.pancakerouter,
    address.mainnet.dex.pancakeRouter
  );

const bakeswaprouter = new web3.eth.Contract(
    abis.bakerouter,
    address.mainnet.dex.bakeswapRouter 
);



const init = async () =>{
//https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol
while(true){
  const result_cake = await pancakeswap.methods.getAmountsOut(10000, [address.mainnet.token.BUSD, address.mainnet.token.BAKE] ).call()
  let pricepan = result_cake[0] / result_cake[1]
  console.log("Result pancake ", pricepan );

  const result_bake = await bakeswaprouter.methods.getAmountsOut(10000, [address.mainnet.token.BUSD, address.mainnet.token.BAKE] ).call()
  let prinebake = result_bake[0] / result_bake[1]
  console.log("result Bake", prinebake);
    // const account = web3.eth.accounts.create();


  console.log("price diff" + Math.abs(pricepan - prinebake) + "\n")
}
}
init();
