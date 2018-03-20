pragma solidity ^0.4.19;

import "./Survey.sol";

/// @title SurveyFactory - Creates surveys and charge users
/// @author Amr Gawish
contract SurveyFactory {
    address[] public surveys;

    function createSurvey() external payable returns(uint surveyId) {
        require(msg.value > 0);
        address newSurvey = new Survey(msg.sender);
        uint id = surveys.push(newSurvey) - 1;
        return id;
    }

    function getSurveysCount() public constant returns(uint surveyCount){
        return surveys.length;
    }

    function getSurveyById(uint index) public constant returns(address surveyAddress){
        return surveys[index];
    }
}