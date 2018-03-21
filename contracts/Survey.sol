pragma solidity ^0.4.19;

/// @title Survey - A survey instant created by SurveyFactory to randomize the winning process of the fees
/// @author Amr Gawish
contract Survey {

    /* Events */
    event SurveyInitialized(address indexed owner, uint indexed surveyReward);


    /* Contract State */
    address public owner;
    address private factory;

    /// @notice Constructor of the Survey Contract
    /// @param _owner - The survey maker of this survey (needs to be a real address!)
    /// @dev Initialise the Survey with Survey Reward (must be > 0)
    function Survey(address _owner) payable public {
        require(owner != address(0));
        require(msg.value > 0);
        
        owner = _owner;
        factory = msg.sender;
        SurveyInitialized(owner, msg.value);
    }


}