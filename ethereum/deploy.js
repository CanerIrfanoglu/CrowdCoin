// Contract deployed to 0x63154444676cDa8623564f6Bc2B0664731184E82
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const compiledFactory = require('./build/:CampaignFactory.json');

const provider = new HDWalletProvider(
	'twelwe random recovery words goes something like this'
  // remember to change this to your own phrase!
  'https://sepolia.infura.io/v3/somerandomnumber'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
