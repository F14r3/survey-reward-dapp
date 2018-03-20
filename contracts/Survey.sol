pragma solidity ^0.4.19;

/// @title Survey - Works with a Survey to add participants finish survey 
/// @author Amr Gawish
contract Survey {
    address public surveyMaker;
    uint public testvalue;

    function Survey(address _owner) public {
        surveyMaker = _owner;
        testvalue = 1;
    }
}