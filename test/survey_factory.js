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
  const _surveyReward = commonVars.surveyReward;
  const _surveyRewardAndCreationCost = commonVars.surveyRewardAndCreationCost;

  let surveyFactory = null;

  let surveyCreatedEvent;

  beforeEach(async () => {
    surveyFactory = await SurveyFactory.new(_surveyCreationCost, { from: _appOwner });
  });


  describe('Create New Survey Test Cases', () => {

    it(`1. Given that I’m the Survey Maker
        2. When I try to create a new Survey and included the survey creation costs and survey reward
        3. Then I should be able to get the created survey reference number`, () => {
        return surveyFactory.createSurvey.call({ value: _surveyRewardAndCreationCost, from: _surveyMaker })
          .then(([surveyId, surveyAddress]) => {
            return surveyId;
          }).should.eventually.be.bignumber.equals(0);
      });

    it(`1. Given that I’m the Survey Maker
        2. When I try to create a new Survey and included the survey creation costs and survey reward
        3. Then I should be assigned as the owner of the newly created survey`, () => {
        let newSurveyAddress;
        return surveyFactory.createSurvey.call({ value: _surveyRewardAndCreationCost, from: _surveyMaker })
          .then(([surveyId, surveyAddress]) => {
            newSurveyAddress = surveyAddress;
            return surveyFactory.createSurvey({ value: _surveyRewardAndCreationCost, from: _surveyMaker });
          }).then(receipt => {
            return Survey.at(newSurveyAddress);
          }).then(surveyInstance => {
            return surveyInstance.owner.call();
          }).should.eventually.equal(_surveyMaker);
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
