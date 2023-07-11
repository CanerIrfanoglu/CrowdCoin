const path = require('path');
const solc = require('solc');
const fse = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fse.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fse.readFileSync(campaignPath, 'utf8');

const output = solc.compile(source, 1).contracts;

fse.ensureDirSync(buildPath);

for (let contract in output) {
	fse.outputJsonSync(
		path.resolve(buildPath, contract + '.json'),
		output[contract]
	);
}