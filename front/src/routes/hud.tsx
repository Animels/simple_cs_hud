import PlayersProvider from "~/context/playersContext";
import MatchProvider from "~/context/matchContext";
import BombProvider from "~/context/bombContext";
import { lazy, Suspense, useContext } from "solid-js";
import FocusedPlayerProvider from "~/context/focusedPlayerContext";
import ThemeContextProvider, { ThemeContext } from "~/context/themeContext";
import GrenadesProvider from "~/context/grenadesContext";

export default function Layout() {
  let layoutRef: any;
  const {
    getBackgroundColor,
    getFont,
    getFontSize,
    getFontStyle,
    getFontWeight,
    getBaseTheme,
  } = useContext(ThemeContext);

  const RadarComponent = lazy(
    () => import(`../themes/${getBaseTheme()}/radar/radar.tsx`),
  );
  const HeaderComponent = lazy(
    () => import(`../themes/${getBaseTheme()}/header/header.tsx`),
  );
  const SidebarsComponent = lazy(
    () => import(`../themes/${getBaseTheme()}/sidebars/sidebars.tsx`),
  );

  return (
    <ThemeContextProvider>
      <PlayersProvider>
        <GrenadesProvider>
          <MatchProvider>
            <FocusedPlayerProvider>
              <BombProvider>
                <main
                  ref={layoutRef}
                  style={{
                    "background-color": getBackgroundColor(),
                    "font-family": getFont(),
                    "font-size": getFontSize(),
                    "font-style": getFontStyle(),
                    "font-weight": getFontWeight(),
                  }}
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    <div class={"relative h-1/2 w-full"}>
                      <RadarComponent />
                      <HeaderComponent />
                    </div>
                    <SidebarsComponent />
                  </Suspense>
                </main>
              </BombProvider>
            </FocusedPlayerProvider>
          </MatchProvider>
        </GrenadesProvider>
      </PlayersProvider>
    </ThemeContextProvider>
  );
}
