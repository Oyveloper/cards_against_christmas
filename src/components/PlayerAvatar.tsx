import React from "react";
import { AccountCircle } from "@material-ui/icons";

import "./PlayerAvatar.css";
import { Player } from "../types";

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
