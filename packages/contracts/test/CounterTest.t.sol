// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/store/src/MudTest.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { Counter, CounterTableId } from "../src/codegen/Tables.sol";

contract CounterTest is MudTest {
  IWorld public world;
  bytes32 public playerEntity;

  function setUp() public override {
    super.setUp();
    world = IWorld(worldAddress);
    playerEntity = bytes32(uint256(uint160(address(this))));
  }

  function testWorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  function testCounter() public {
    // Expect the counter to be 1 because it was incremented in the PostDeploy script.
    uint32 counter = Counter.get(world, playerEntity, 1);
    assertEq(counter, 0);

    // Expect the counter to be 2 after calling increment.
    world.increment(1);
    counter = Counter.get(world, playerEntity, 1);
    assertEq(counter, 1);
  }
}
