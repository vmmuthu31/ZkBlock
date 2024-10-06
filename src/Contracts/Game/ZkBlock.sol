// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OnChainGame {
    struct Player {
        uint256 gold;
        uint256 diamond;
        mapping(uint256 => string[]) mapIdToData; 
    }

    mapping(address => Player) public players; 

    event PlayerUpdated(address indexed player, uint256 gold, uint256 diamond);
    event MapDataAdded(address indexed player, uint256 indexed mapId, string data);
    event MapDataRemoved(address indexed player, uint256 indexed mapId, string data);

    /**
     * @dev Updates player's resources and adds map data in one transaction.
     * @param player The address of the player.
     * @param goldAmount The amount of gold to set for the player.
     * @param diamondAmount The amount of diamonds to set for the player.
     * @param mapId The ID of the map to which data is added.
     * @param data The string data to be added to the mapId's array.
     */
    function updatePlayerAndAddData(address player, uint256 goldAmount, uint256 diamondAmount, uint256 mapId, string memory data) public {
        players[player].gold = goldAmount;
        players[player].diamond = diamondAmount;
        players[player].mapIdToData[mapId].push(data);
        emit PlayerUpdated(player, goldAmount, diamondAmount);
        emit MapDataAdded(player, mapId, data);
    }

    /**
     * @dev Removes specific map data for a player if it exists.
     * @param player The address of the player.
     * @param mapId The ID of the map from which data is removed.
     * @param data The string data to be removed from the mapId's array.
     */
    function removeMapData(address player, uint256 mapId, string memory data) public {
        string[] storage dataArray = players[player].mapIdToData[mapId];
        
        for (uint i = 0; i < dataArray.length; i++) {
            if (keccak256(abi.encodePacked(dataArray[i])) == keccak256(abi.encodePacked(data))) {
                if (i != dataArray.length - 1) {
                    dataArray[i] = dataArray[dataArray.length - 1];
                }
                dataArray.pop();
                emit MapDataRemoved(player, mapId, data);
                return;
            }
        }
        revert("Data not found in the map's array");
    }

    /**
     * @dev Retrieve player's data including all map data for all mapIds.
     * @param player The address of the player.
     * @return gold Amount of gold the player has.
     * @return diamond Amount of diamonds the player has.
     * @return mapIds An array of all mapIds associated with the player.
     * @return mapDatas A nested array where each index corresponds to a mapId from mapIds, 
     * containing all data strings associated with that mapId.
     */
    function getPlayerData(address player) public view returns (
        uint256 gold, 
        uint256 diamond, 
        uint256[] memory mapIds, 
        string[][] memory mapDatas
    ) {
        Player storage playerData = players[player];
        gold = playerData.gold;
        diamond = playerData.diamond;

        uint256 mapIdCount = 0;
        for (uint256 i = 0; i < type(uint256).max; i++) {
            if (playerData.mapIdToData[i].length > 0 || mapIdCount > 0) {
                mapIdCount++;
            } else if (mapIdCount > 0) {
                break; 
            }
        }

        mapIds = new uint256[](mapIdCount);
        mapDatas = new string[][](mapIdCount);
        uint256 index = 0;
        for (uint256 mapId = 0; mapId < mapIdCount; mapId++) {
            if (playerData.mapIdToData[mapId].length > 0) {
                mapIds[index] = mapId;
                mapDatas[index] = playerData.mapIdToData[mapId];
                index++;
            }
        }
    }
}