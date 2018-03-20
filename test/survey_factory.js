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

  beforeEach(async () => {
    surveyFactory = await SurveyFactory.new({ from: _appOwner });
  });

  describe('createSurvey', () => {

    it(`1. Given that I'm the SurveyMaker
        2. When I try to create a new Survey and paid the survey creation cost
        3. Then I should be able to create a new survey and get its reference`, () => {
        const surveyId = surveyFactory.createSurvey.call({ value: _surveyCreationCost, from: _surveyMaker });
        surveyId.should.eventually.be.bignumber.equals(0);
      });

    it(`1. Given that I'm the SurveyMaker
        2. When I try to create a survey without sending the survey creation cost
        3. Then I should receive a "revert" Error`, () => {
        expectRevert(surveyFactory.createSurvey.call({ from: _surveyMaker }));
      });

    it(`1. Given that I'm the AppOwner
        2. When I try to create a Survey
        3. Then I should receive a "revert" Error`, () => {
        expectRevert(surveyFactory.createSurvey.call({ from: _surveyMaker }));
      });

  });


});
