pragma solidity 0.4.19;

/// @title SurveyFactory - Creates surveys and charge users
/// @author Amr Gawish
contract SurveyFactory {
    
    function createSurvey() external payable returns(uint surveyId) {
        require(msg.value > 0);
        return 0;
    }
}