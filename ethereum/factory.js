import web3 from './web3';
import CampaignFactory from './build/:CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0x22b902e5108266DB6E2B28eDc314c0B2e7aFAEdD'
)

export default instance;