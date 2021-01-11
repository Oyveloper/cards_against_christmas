import { GameServerResponse } from "../types";

/**
 * asks the server wether a game exists or not
 * @param id - the id of the game
 */
export async function gameExists(id: string): Promise<boolean> {
  return fetch(`http://localhost:8080/gameExists?gameId=${id}`)
    .then((result) => result.json())
    .then((result) => {
      let response: GameServerResponse = result;
      if (response.status === "OK") {
        return response.data;
      }
    });
}

/**
 * asks the server if a player name is taken for a given game
 * @param playerName - the name you want to check
 * @param gameId - the gameId for which you want to check
 */
export async function isPlayerNameTaken(
  playerName: string,
  gameId: string
): Promise<boolean> {
  return fetch(
    `http://localhost:8080/isPlayerNameTaken?playerName=${playerName}&gameId=${gameId}`
  )
    .then((result) => result.json())
    .then((result) => {
      let response: GameServerResponse = result;
      if (response.status === "OK") {
        return response.data;
      }
    });
}