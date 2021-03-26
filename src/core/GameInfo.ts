import { GameServerResponse } from "../types";
import baseURL from "url";

/**
 * asks the server wether a game exists or not
 * @param id - the id of the game
 */
export async function gameExists(id: string): Promise<boolean> {
  return fetch(`${baseURL}/gameExists?gameId=${id}`)
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
    `${baseURL}/isPlayerNameTaken?playerName=${playerName}&gameId=${gameId}`
  )
    .then((result) => result.json())
    .then((result) => {
      let response: GameServerResponse = result;
      if (response.status === "OK") {
        return response.data;
      }
    });
}

/**
 * creates a new game hosted by the player with hostPlayerName
 * @param hostPlayerName - the playerName chosen by the host
 */
export async function createGame(): Promise<string> {
  return fetch(`${baseURL}/createGame`, {
    method: "POST",
  })
    .then((result) => result.json())
    .then((result) => {
      let response: GameServerResponse = result;
      if (response.status === "OK") {
        return response.data;
      }
    });
}
