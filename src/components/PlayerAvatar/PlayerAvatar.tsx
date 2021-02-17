import React from "react";
import { AccountCircle } from "@material-ui/icons";

import "./PlayerAvatar.css";
import { Player } from "../../types";

type PlayerAvatarProps = {
  player: Player;
  isJudge: boolean;
};

export default function PlayerAvatar({ player, isJudge }: PlayerAvatarProps) {
  return (
    <div title={player.name} className={`PlayerAvatar`}>
      <p>{isJudge ? "Judge" : <br />}</p>
      <AccountCircle fontSize="large" />
      <p>{player.name}</p>
      <p>{player.score}</p>
    </div>
  );
}
