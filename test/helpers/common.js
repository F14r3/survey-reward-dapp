/* Loading all imports */
const _ = require('lodash');
const expectRevert = require('./expectRevert');
const Survey = artifacts.require("./Survey.sol");
const SurveyFactory = artifacts.require("./SurveyFactory.sol");
const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-bignumber')(BigNumber))
    .use(require('chai-as-promised'))
    .should();//To enable should chai style

/* Creating a class with all common Variables */
class CommonVariables {
    constructor(_accounts) {
        this.accounts = _accounts;

        this.appOwner = _accounts[0]
        this.surveyMaker = _accounts[1]
        this.participants = _.difference(_accounts, [_accounts[0], _accounts[1]]);

        this.surveyCreationCost = web3.toWei('1', 'ether');
    }
}

/* Exporting the module */
module.exports = {
    BigNumber,
    SurveyFactory,
    Survey,
    expectRevert,
    CommonVariables
}