// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "@latticexyz/store/src/PackedCounter.sol";

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("HeroCard")));
bytes32 constant HeroCardTableId = _tableId;

struct HeroCardData {
  uint8 attack;
  uint8 health;
}

library HeroCard {
  /** Get the table's schema */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](2);
    _schema[0] = SchemaType.UINT8;
    _schema[1] = SchemaType.UINT8;

    return SchemaLib.encode(_schema);
  }

  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](1);
    _schema[0] = SchemaType.BYTES32;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's metadata */
  function getMetadata() internal pure returns (string memory, string[] memory) {
    string[] memory _fieldNames = new string[](2);
    _fieldNames[0] = "attack";
    _fieldNames[1] = "health";
    return ("HeroCard", _fieldNames);
  }

  /** Register the table's schema */
  function registerSchema() internal {
    StoreSwitch.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Register the table's schema (using the specified store) */
  function registerSchema(IStore _store) internal {
    _store.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Set the table's metadata */
  function setMetadata() internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    StoreSwitch.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Set the table's metadata (using the specified store) */
  function setMetadata(IStore _store) internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    _store.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Get attack */
  function getAttack(bytes32 cardEntity) internal view returns (uint8 attack) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Get attack (using the specified store) */
  function getAttack(IStore _store, bytes32 cardEntity) internal view returns (uint8 attack) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Set attack */
  function setAttack(bytes32 cardEntity, uint8 attack) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((attack)));
  }

  /** Set attack (using the specified store) */
  function setAttack(IStore _store, bytes32 cardEntity, uint8 attack) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((attack)));
  }

  /** Get health */
  function getHealth(bytes32 cardEntity) internal view returns (uint8 health) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 1);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Get health (using the specified store) */
  function getHealth(IStore _store, bytes32 cardEntity) internal view returns (uint8 health) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 1);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Set health */
  function setHealth(bytes32 cardEntity, uint8 health) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    StoreSwitch.setField(_tableId, _keyTuple, 1, abi.encodePacked((health)));
  }

  /** Set health (using the specified store) */
  function setHealth(IStore _store, bytes32 cardEntity, uint8 health) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    _store.setField(_tableId, _keyTuple, 1, abi.encodePacked((health)));
  }

  /** Get the full data */
  function get(bytes32 cardEntity) internal view returns (HeroCardData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = StoreSwitch.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Get the full data (using the specified store) */
  function get(IStore _store, bytes32 cardEntity) internal view returns (HeroCardData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = _store.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Set the full data using individual values */
  function set(bytes32 cardEntity, uint8 attack, uint8 health) internal {
    bytes memory _data = encode(attack, health);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    StoreSwitch.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using individual values (using the specified store) */
  function set(IStore _store, bytes32 cardEntity, uint8 attack, uint8 health) internal {
    bytes memory _data = encode(attack, health);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    _store.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using the data struct */
  function set(bytes32 cardEntity, HeroCardData memory _table) internal {
    set(cardEntity, _table.attack, _table.health);
  }

  /** Set the full data using the data struct (using the specified store) */
  function set(IStore _store, bytes32 cardEntity, HeroCardData memory _table) internal {
    set(_store, cardEntity, _table.attack, _table.health);
  }

  /** Decode the tightly packed blob using this table's schema */
  function decode(bytes memory _blob) internal pure returns (HeroCardData memory _table) {
    _table.attack = (uint8(Bytes.slice1(_blob, 0)));

    _table.health = (uint8(Bytes.slice1(_blob, 1)));
  }

  /** Tightly pack full data using this table's schema */
  function encode(uint8 attack, uint8 health) internal pure returns (bytes memory) {
    return abi.encodePacked(attack, health);
  }

  /** Encode keys as a bytes32 array using this table's schema */
  function encodeKeyTuple(bytes32 cardEntity) internal pure returns (bytes32[] memory _keyTuple) {
    _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;
  }

  /* Delete all data for given keys */
  function deleteRecord(bytes32 cardEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /* Delete all data for given keys (using the specified store) */
  function deleteRecord(IStore _store, bytes32 cardEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    _store.deleteRecord(_tableId, _keyTuple);
  }
}
