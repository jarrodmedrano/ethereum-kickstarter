import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
import * as keys from './config/dev';
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  keys.address
);

export default instance;