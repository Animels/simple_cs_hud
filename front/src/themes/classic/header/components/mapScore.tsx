import { ThemeContext } from "~/context/themeContext";
import { useContext } from "solid-js";
import { s } from "vite/dist/node/types.d-FdqQ54oU";

export default function MapScore() {
  const { themeState } = useContext(ThemeContext);
  const sides = ["left", "right"];

  const maxPossibleCards = () => {
    if (themeState().type_of_match.bo3) {
      return 2;
    }
    if (themeState().type_of_match.bo5) {
      return 3;
    }
    if (themeState().type_of_match.bo7) {
      return 4;
    }
    return 1;
  };

  return (<div class={"map_score_container"}>
    {sides.map((side) => {
      return <div class={"team_map_score" + " " + side}>
        {Array.from({ length: maxPossibleCards() }).map((_, index) => {
          // @ts-ignore
          if (index < themeState().score[side]) {
            return <div class={"score_cell fill"}></div>;
          }
          return <div class={"score_cell"}></div>;
        })}
      </div>;
    })}
  </div>);
}
