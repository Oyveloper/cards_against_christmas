import React from "react";
import Player from "../core/Player";
import { AccountCircle } from "@material-ui/icons";

import "./PlayerAvatar.css";

type PlayerAvatarProps = {
  player: Player;
};

export default function PlayerAvatar({ player }: PlayerAvatarProps) {
  return (
    <div
      className={`PlayerAvatar ${player.isJudge ? "PlayerAvatarActive" : ""}`}
      title={player.name}
    >
      <AccountCircle fontSize="large" />
      <p>{player.name}</p>
    </div>
  );
}
