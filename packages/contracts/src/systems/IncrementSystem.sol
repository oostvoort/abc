// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Counter } from "../codegen/Tables.sol";

contract IncrementSystem is System {
  function increment(uint8 index) public returns (uint32) {
    bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
    uint32 counter = Counter.get(playerEntity, index);
    uint32 newValue = counter + 1;
    Counter.set(playerEntity, index, newValue);
    return newValue;
  }
}
