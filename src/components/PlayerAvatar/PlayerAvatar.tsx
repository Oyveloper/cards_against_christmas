import React from "react";
import { AccountCircle } from "@material-ui/icons";

import "./PlayerAvatar.css";
import { Player } from "../../types";

type PlayerAvatarProps = {
  player: Player;
};

export default function PlayerAvatar({ player }: PlayerAvatarProps) {
  console.log(player);

  return (
    <div title={player.name} className="PlayerAvatar">
      <AccountCircle fontSize="large" />
      <p>{player.name}</p>
    </div>
  );
}
