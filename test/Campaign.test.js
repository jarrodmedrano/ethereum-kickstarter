const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  //deploy a new version of the contract, not specifying an address
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({from: accounts[0], gas: '1000000'});

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });
  //deploy a new contract and instruct web3 about its existence
  //use destructuring to take first element out of array and assign to campaignAddress variable
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    //pass in abi interface for compiled campaign
    JSON.parse(compiledCampaign.interface),
    //pass in address of where the campaign exists
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
      //manager method is public, call manager method
      const manager = await campaign.methods.manager().call();
      //is the manager the same as account[0]?
      assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });
    //is contributor should be a boolean value
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    //will return true or false
    assert(isContributor);
  });

  it('requires a minimum contribution', async() => {
    try {
      //send 5, which is too little, and catch an error
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err)
    }
  });

  it('allows a manager to make a payment request', async () => {
    //send message, with a certain amount of wei, from account 1
    await campaign.methods.createRequest('Buy batteries', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      });
    //go back into contract and pull out request that was made
    //a request is a struct, a collection of key value pairs
    //we can only ask for individual values but we cannot get everything at once
    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy batteries', request.description);
  });
});