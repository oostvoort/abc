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

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("PlayerInDuel")));
bytes32 constant PlayerInDuelTableId = _tableId;

struct PlayerInDuelData {
  bytes32 duelEntity;
  bool ready;
}

library PlayerInDuel {
  /** Get the table's schema */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](2);
    _schema[0] = SchemaType.BYTES32;
    _schema[1] = SchemaType.BOOL;

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
    _fieldNames[0] = "duelEntity";
    _fieldNames[1] = "ready";
    return ("PlayerInDuel", _fieldNames);
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

  /** Get duelEntity */
  function getDuelEntity(bytes32 playerEntity) internal view returns (bytes32 duelEntity) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
    return (Bytes.slice32(_blob, 0));
  }

  /** Get duelEntity (using the specified store) */
  function getDuelEntity(IStore _store, bytes32 playerEntity) internal view returns (bytes32 duelEntity) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
    return (Bytes.slice32(_blob, 0));
  }

  /** Set duelEntity */
  function setDuelEntity(bytes32 playerEntity, bytes32 duelEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((duelEntity)));
  }

  /** Set duelEntity (using the specified store) */
  function setDuelEntity(IStore _store, bytes32 playerEntity, bytes32 duelEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((duelEntity)));
  }

  /** Get ready */
  function getReady(bytes32 playerEntity) internal view returns (bool ready) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 1);
    return (_toBool(uint8(Bytes.slice1(_blob, 0))));
  }

  /** Get ready (using the specified store) */
  function getReady(IStore _store, bytes32 playerEntity) internal view returns (bool ready) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 1);
    return (_toBool(uint8(Bytes.slice1(_blob, 0))));
  }

  /** Set ready */
  function setReady(bytes32 playerEntity, bool ready) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    StoreSwitch.setField(_tableId, _keyTuple, 1, abi.encodePacked((ready)));
  }

  /** Set ready (using the specified store) */
  function setReady(IStore _store, bytes32 playerEntity, bool ready) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    _store.setField(_tableId, _keyTuple, 1, abi.encodePacked((ready)));
  }

  /** Get the full data */
  function get(bytes32 playerEntity) internal view returns (PlayerInDuelData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    bytes memory _blob = StoreSwitch.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Get the full data (using the specified store) */
  function get(IStore _store, bytes32 playerEntity) internal view returns (PlayerInDuelData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    bytes memory _blob = _store.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Set the full data using individual values */
  function set(bytes32 playerEntity, bytes32 duelEntity, bool ready) internal {
    bytes memory _data = encode(duelEntity, ready);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    StoreSwitch.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using individual values (using the specified store) */
  function set(IStore _store, bytes32 playerEntity, bytes32 duelEntity, bool ready) internal {
    bytes memory _data = encode(duelEntity, ready);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    _store.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using the data struct */
  function set(bytes32 playerEntity, PlayerInDuelData memory _table) internal {
    set(playerEntity, _table.duelEntity, _table.ready);
  }

  /** Set the full data using the data struct (using the specified store) */
  function set(IStore _store, bytes32 playerEntity, PlayerInDuelData memory _table) internal {
    set(_store, playerEntity, _table.duelEntity, _table.ready);
  }

  /** Decode the tightly packed blob using this table's schema */
  function decode(bytes memory _blob) internal pure returns (PlayerInDuelData memory _table) {
    _table.duelEntity = (Bytes.slice32(_blob, 0));

    _table.ready = (_toBool(uint8(Bytes.slice1(_blob, 32))));
  }

  /** Tightly pack full data using this table's schema */
  function encode(bytes32 duelEntity, bool ready) internal pure returns (bytes memory) {
    return abi.encodePacked(duelEntity, ready);
  }

  /** Encode keys as a bytes32 array using this table's schema */
  function encodeKeyTuple(bytes32 playerEntity) internal pure returns (bytes32[] memory _keyTuple) {
    _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;
  }

  /* Delete all data for given keys */
  function deleteRecord(bytes32 playerEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /* Delete all data for given keys (using the specified store) */
  function deleteRecord(IStore _store, bytes32 playerEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = playerEntity;

    _store.deleteRecord(_tableId, _keyTuple);
  }
}

function _toBool(uint8 value) pure returns (bool result) {
  assembly {
    result := value
  }
}
