import Game from "../core/Game";
import Player from "../core/Player";

it("sets judge correclty", () => {
  const p1 = new Player("p1");
  const p2 = new Player("p2");
  const local = new Player("local");
  let game = new Game("123", [p1, p2], local);

  game.setJudge(p1);
  expect(p1.isJudge).toBeTruthy();
  expect(game.currentJudge).toEqual(p1);

  game.setJudge(p2);
  expect(p2.isJudge).toBeTruthy();
  expect(p1.isJudge).toBeFalsy();
  expect(game.currentJudge).toEqual(p2);
});
