pragma solidity ^0.4.19;

import "./Survey.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

/// @title SurveyFactory - Creates surveys and charge users
/// @author Amr Gawish
contract SurveyFactory is Ownable{
    
    using SafeMath for uint;

    /* Events */
    event SurveyFactoryInitialized(uint indexed surveyCreationFees);
    event SurveyCreated(uint indexed suveryId, address indexed surveyAddress);


    /* Modifiers */
    modifier notTheOwner(){
        require(msg.sender != owner);
        _;
    }
    modifier onlySurveyMaker(uint _index){
        require(surveys[0] != address(0) && surveyToOwner[_index] == msg.sender);
        _;
    }
    
    /* Contract State */
    uint public surveyCreationFees ;
    address[] public surveys ;
    mapping(uint => address) public surveyToOwner ;

    /// @notice Constructor of the Survey Factory Contract
    /// @param _surveyCreationFees - The fees to charge user when they create their survey
    /// @dev Initialise the Survey Factory with Survey Creation Fees value
    function SurveyFactory(uint _surveyCreationFees) public {
        surveyCreationFees = _surveyCreationFees;
        SurveyFactoryInitialized(surveyCreationFees);
    }


    /// @notice Create a new Survey instance
    /// @dev checks against the following:
    ///      1. msg.sender and revert if the sender is the Survey DApp Owner
    ///      2. msg.value to be bigger than surveyCreationFees (The difference is the Initialized Survey Reward)
    /// @return surveyId - The index os the Survey 
    /// @return newSurveyAddress - The address of the newly created contract
    function createSurvey() external payable notTheOwner returns(uint surveyId, address newSurveyAddress) {
        require(msg.value > surveyCreationFees);

        uint surveyReward = msg.value.sub(surveyCreationFees);

        address _newSurveyAddress = (new Survey).value(surveyReward)(msg.sender);
        uint _surveyId = surveys.push(_newSurveyAddress).sub(1);
        surveyToOwner[_surveyId] = msg.sender;
        

        SurveyCreated(_surveyId, _newSurveyAddress);
        return (_surveyId, _newSurveyAddress);
    }
}