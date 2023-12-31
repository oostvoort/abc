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

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("ItemCard")));
bytes32 constant ItemCardTableId = _tableId;

struct ItemCardData {
  uint8 buff_attack;
  uint8 buff_health;
  uint8 debuff_attack;
  uint8 debuff_health;
}

library ItemCard {
  /** Get the table's schema */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](4);
    _schema[0] = SchemaType.UINT8;
    _schema[1] = SchemaType.UINT8;
    _schema[2] = SchemaType.UINT8;
    _schema[3] = SchemaType.UINT8;

    return SchemaLib.encode(_schema);
  }

  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](1);
    _schema[0] = SchemaType.BYTES32;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's metadata */
  function getMetadata() internal pure returns (string memory, string[] memory) {
    string[] memory _fieldNames = new string[](4);
    _fieldNames[0] = "buff_attack";
    _fieldNames[1] = "buff_health";
    _fieldNames[2] = "debuff_attack";
    _fieldNames[3] = "debuff_health";
    return ("ItemCard", _fieldNames);
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

  /** Get buff_attack */
  function getBuff_attack(bytes32 cardEntity) internal view returns (uint8 buff_attack) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Get buff_attack (using the specified store) */
  function getBuff_attack(IStore _store, bytes32 cardEntity) internal view returns (uint8 buff_attack) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Set buff_attack */
  function setBuff_attack(bytes32 cardEntity, uint8 buff_attack) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((buff_attack)));
  }

  /** Set buff_attack (using the specified store) */
  function setBuff_attack(IStore _store, bytes32 cardEntity, uint8 buff_attack) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((buff_attack)));
  }

  /** Get buff_health */
  function getBuff_health(bytes32 cardEntity) internal view returns (uint8 buff_health) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 1);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Get buff_health (using the specified store) */
  function getBuff_health(IStore _store, bytes32 cardEntity) internal view returns (uint8 buff_health) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 1);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Set buff_health */
  function setBuff_health(bytes32 cardEntity, uint8 buff_health) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    StoreSwitch.setField(_tableId, _keyTuple, 1, abi.encodePacked((buff_health)));
  }

  /** Set buff_health (using the specified store) */
  function setBuff_health(IStore _store, bytes32 cardEntity, uint8 buff_health) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    _store.setField(_tableId, _keyTuple, 1, abi.encodePacked((buff_health)));
  }

  /** Get debuff_attack */
  function getDebuff_attack(bytes32 cardEntity) internal view returns (uint8 debuff_attack) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 2);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Get debuff_attack (using the specified store) */
  function getDebuff_attack(IStore _store, bytes32 cardEntity) internal view returns (uint8 debuff_attack) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 2);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Set debuff_attack */
  function setDebuff_attack(bytes32 cardEntity, uint8 debuff_attack) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    StoreSwitch.setField(_tableId, _keyTuple, 2, abi.encodePacked((debuff_attack)));
  }

  /** Set debuff_attack (using the specified store) */
  function setDebuff_attack(IStore _store, bytes32 cardEntity, uint8 debuff_attack) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    _store.setField(_tableId, _keyTuple, 2, abi.encodePacked((debuff_attack)));
  }

  /** Get debuff_health */
  function getDebuff_health(bytes32 cardEntity) internal view returns (uint8 debuff_health) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 3);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Get debuff_health (using the specified store) */
  function getDebuff_health(IStore _store, bytes32 cardEntity) internal view returns (uint8 debuff_health) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 3);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Set debuff_health */
  function setDebuff_health(bytes32 cardEntity, uint8 debuff_health) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    StoreSwitch.setField(_tableId, _keyTuple, 3, abi.encodePacked((debuff_health)));
  }

  /** Set debuff_health (using the specified store) */
  function setDebuff_health(IStore _store, bytes32 cardEntity, uint8 debuff_health) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    _store.setField(_tableId, _keyTuple, 3, abi.encodePacked((debuff_health)));
  }

  /** Get the full data */
  function get(bytes32 cardEntity) internal view returns (ItemCardData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = StoreSwitch.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Get the full data (using the specified store) */
  function get(IStore _store, bytes32 cardEntity) internal view returns (ItemCardData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    bytes memory _blob = _store.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Set the full data using individual values */
  function set(
    bytes32 cardEntity,
    uint8 buff_attack,
    uint8 buff_health,
    uint8 debuff_attack,
    uint8 debuff_health
  ) internal {
    bytes memory _data = encode(buff_attack, buff_health, debuff_attack, debuff_health);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    StoreSwitch.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using individual values (using the specified store) */
  function set(
    IStore _store,
    bytes32 cardEntity,
    uint8 buff_attack,
    uint8 buff_health,
    uint8 debuff_attack,
    uint8 debuff_health
  ) internal {
    bytes memory _data = encode(buff_attack, buff_health, debuff_attack, debuff_health);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = cardEntity;

    _store.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using the data struct */
  function set(bytes32 cardEntity, ItemCardData memory _table) internal {
    set(cardEntity, _table.buff_attack, _table.buff_health, _table.debuff_attack, _table.debuff_health);
  }

  /** Set the full data using the data struct (using the specified store) */
  function set(IStore _store, bytes32 cardEntity, ItemCardData memory _table) internal {
    set(_store, cardEntity, _table.buff_attack, _table.buff_health, _table.debuff_attack, _table.debuff_health);
  }

  /** Decode the tightly packed blob using this table's schema */
  function decode(bytes memory _blob) internal pure returns (ItemCardData memory _table) {
    _table.buff_attack = (uint8(Bytes.slice1(_blob, 0)));

    _table.buff_health = (uint8(Bytes.slice1(_blob, 1)));

    _table.debuff_attack = (uint8(Bytes.slice1(_blob, 2)));

    _table.debuff_health = (uint8(Bytes.slice1(_blob, 3)));
  }

  /** Tightly pack full data using this table's schema */
  function encode(
    uint8 buff_attack,
    uint8 buff_health,
    uint8 debuff_attack,
    uint8 debuff_health
  ) internal pure returns (bytes memory) {
    return abi.encodePacked(buff_attack, buff_health, debuff_attack, debuff_health);
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
