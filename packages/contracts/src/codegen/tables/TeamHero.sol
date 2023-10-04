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

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("TeamHero")));
bytes32 constant TeamHeroTableId = _tableId;

library TeamHero {
  /** Get the table's schema */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](1);
    _schema[0] = SchemaType.BYTES32;

    return SchemaLib.encode(_schema);
  }

  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](2);
    _schema[0] = SchemaType.BYTES32;
    _schema[1] = SchemaType.UINT8;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's metadata */
  function getMetadata() internal pure returns (string memory, string[] memory) {
    string[] memory _fieldNames = new string[](1);
    _fieldNames[0] = "playerCardEntity";
    return ("TeamHero", _fieldNames);
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

  /** Get playerCardEntity */
  function get(bytes32 playerId, uint8 index) internal view returns (bytes32 playerCardEntity) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = playerId;
    _keyTuple[1] = bytes32(uint256(index));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
    return (Bytes.slice32(_blob, 0));
  }

  /** Get playerCardEntity (using the specified store) */
  function get(IStore _store, bytes32 playerId, uint8 index) internal view returns (bytes32 playerCardEntity) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = playerId;
    _keyTuple[1] = bytes32(uint256(index));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
    return (Bytes.slice32(_blob, 0));
  }

  /** Set playerCardEntity */
  function set(bytes32 playerId, uint8 index, bytes32 playerCardEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = playerId;
    _keyTuple[1] = bytes32(uint256(index));

    StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((playerCardEntity)));
  }

  /** Set playerCardEntity (using the specified store) */
  function set(IStore _store, bytes32 playerId, uint8 index, bytes32 playerCardEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = playerId;
    _keyTuple[1] = bytes32(uint256(index));

    _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((playerCardEntity)));
  }

  /** Tightly pack full data using this table's schema */
  function encode(bytes32 playerCardEntity) internal pure returns (bytes memory) {
    return abi.encodePacked(playerCardEntity);
  }

  /** Encode keys as a bytes32 array using this table's schema */
  function encodeKeyTuple(bytes32 playerId, uint8 index) internal pure returns (bytes32[] memory _keyTuple) {
    _keyTuple = new bytes32[](2);
    _keyTuple[0] = playerId;
    _keyTuple[1] = bytes32(uint256(index));
  }

  /* Delete all data for given keys */
  function deleteRecord(bytes32 playerId, uint8 index) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = playerId;
    _keyTuple[1] = bytes32(uint256(index));

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /* Delete all data for given keys (using the specified store) */
  function deleteRecord(IStore _store, bytes32 playerId, uint8 index) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = playerId;
    _keyTuple[1] = bytes32(uint256(index));

    _store.deleteRecord(_tableId, _keyTuple);
  }
}
