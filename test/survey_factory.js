/* Loading all libraries from common */
const {
  SurveyFactory, //Survey Factor Contract
  Survey, //Survey Contract
  BigNumber, //BigNumber from web3 (for ease to use)
  CommonVariables, //Multiple common variables
  expectRevert, //Check if the Solidity returns "revert" exception (usually result from require failed)
} = require('./helpers/common');

contract('SurveyFactory', _accounts => {
  const commonVars = new CommonVariables(_accounts);

  let accounts = commonVars.accounts;

  const _appOwner = commonVars.appOwner;
  const _surveyMaker = commonVars.surveyMaker;
  const _participants = commonVars.participants;

  const _surveyCreationCost = commonVars.surveyCreationCost;

  let surveyFactory = null;

  let surveyCreatedEvent;

  before(async () => {
    console.log('Creating Survey Factory');
    surveyFactory = await SurveyFactory.new({ from: _appOwner });
  });


  describe('Create New Survey', () => {

    it(`1. Given that I’m the Survey Maker
        2. When I try to create a new Survey and included the survey creation cost
        3. Then I should be able to get the created survey reference number`, () => {
        return surveyFactory.createSurvey.call({ value: _surveyCreationCost, from: _surveyMaker })
          .then(([surveyId, surveyAddress]) => {
            return surveyId;
          }).should.eventually.be.bignumber.equals(0);
      });

    it(`1. Given that I’m the Survey Maker
        2. When I try to create a new survey without including the survey creation cost
        3. Then I should receive a "revert" Error`, () => {

        return expectRevert(surveyFactory.createSurvey.call({ from: _surveyMaker }));

      });

    it(`1. Given that I’m the Survey App Owner
        2. When I try to create a new Survey
        3. Then I should receive a "revert" Error`, () => {

        return expectRevert(surveyFactory.createSurvey.call({ from: _appOwner }));

      });

  });


});
