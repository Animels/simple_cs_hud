import {
  createContext,
  createEffect,
  createMemo,
  createSignal
} from "solid-js";

interface ITheme {
  theme: string;
  type_of_match: {
    bo1: boolean;
    bo3: boolean;
    bo5: boolean;
    bo7: boolean;
  };
  score: {
    left: number;
    right: number;
  };
  tip_theme: string;
  radar_image_path: string;
  tip_radar_image_path: string;
  font: string;
  tip_font: string;
  font_size: string;
  tip_font_size: string;
  font_style: string;
  tip_font_style: string;
  font_weight: number;
  tip_font_weight: string;
  CT_color: string;
  tip_CT_color: string;
  T_color: string;
  tip_T_color: string;
  CT_HP_color: string;
  tip_CT_HP_color: string;
  T_HP_color: string;
  tip_T_HP_color: string;
  text_color: string;
  tip_text_color: string;
  secondary_color: string;
  tip_secondary_color: string;
  dead_color: string;
  tip_dead_color: string;
  money_color: string;
  tip_money_color: string;
  background_player_color: string;
  tip_background_player_color: string;
  background_color: string;
  tip_background_color: string;
}

interface IThemeContext {
  themeState: () => ITheme;
  resetTheme: () => void;
  getRadarImagesPath: () => string;
  set_key: (key: string, value: any) => void;
  getTextColor: () => string;
  getSecondaryColor: () => string;
  getDeadColor: () => string;
  getMoneyColor: () => string;
  getBackgroundPlayerColor: () => string;
  getBackgroundColor: () => string;
  getCTColor: () => string;
  getTColor: () => string;
  getCTHPColor: () => string;
  getTHPColor: () => string;
  getFont: () => string;
  getFontSize: () => string;
  getFontStyle: () => string;
  getFontWeight: () => number;
  getBaseTheme: () => string;
}

const initTheme: ITheme = {
  score: {
    left: 0,
    right: 0
  },

  type_of_match: {
    bo1: true,
    bo3: false,
    bo5: false,
    bo7: false
  },

  theme: "classic",
  tip_theme: "Here you can write any folder name from themes folder",


  radar_image_path: "simpleradar",
  tip_radar_image_path:
    "Here you can write any folder name from assets/maps folder",

  font: "Archivo Black",
  tip_font: "Here you can write any valid font name that installed",

  font_size: "16px",
  tip_font_size: "Here you can write any valid font size (px, rem, %)",

  font_style: "sans-serif",
  tip_font_style: "Here you can write any valid font style",

  font_weight: 0,
  tip_font_weight: "Here you can write any valid font weight",

  CT_color: "#2A63A5",
  tip_CT_color: "Here you can choose any color from color picker",

  T_color: "#D7B243",
  tip_T_color: "Here you can choose any color from color picker",

  CT_HP_color: "#2A63A5",
  tip_CT_HP_color: "Here you can choose any color from color picker",

  T_HP_color: "#D7B243",
  tip_T_HP_color: "Here you can choose any color from color picker",

  text_color: "#fcfcfc",
  tip_text_color: "Here you can choose any color from color picker",

  secondary_color: "#1d1c1c",
  tip_secondary_color: "Here you can choose any color from color picker",

  dead_color: "#6f6f6f",
  tip_dead_color: "Here you can choose any color from color picker",

  money_color: "#7cad7b",
  tip_money_color: "Here you can choose any color from color picker",

  background_player_color: "#000000",
  tip_background_player_color:
    "Here you can choose any color from color picker",

  background_color: "#244814",
  tip_background_color: "Here you can choose any color from color picker"
};

export const ThemeContext = createContext<IThemeContext>({
  themeState: () => initTheme,
  resetTheme: () => {
  },
  getRadarImagesPath: () => initTheme.radar_image_path,
  set_key: () => initTheme,
  getTextColor: () => initTheme.text_color,
  getSecondaryColor: () => initTheme.secondary_color,
  getDeadColor: () => initTheme.dead_color,
  getMoneyColor: () => initTheme.money_color,
  getBackgroundPlayerColor: () => initTheme.background_player_color,
  getBackgroundColor: () => initTheme.background_color,
  getCTColor: () => initTheme.CT_color,
  getTColor: () => initTheme.T_color,
  getCTHPColor: () => initTheme.CT_HP_color,
  getTHPColor: () => initTheme.T_HP_color,
  getFont: () => initTheme.font,
  getFontSize: () => initTheme.font_size,
  getFontStyle: () => initTheme.font_style,
  getFontWeight: () => initTheme.font_weight,
  getBaseTheme: () => initTheme.theme
});

export default function ThemeContextProvider(props: { children: any }) {
  const [themeState, setTheme] = createSignal<any>(initTheme);

  const test = localStorage.getItem("theme");
  if (!test) {
    localStorage.setItem("theme", JSON.stringify(themeState()));
  } else {
    setTheme(() => JSON.parse(test));
  }

  window.addEventListener(
    "storage",
    (ev) => {
      console.log(ev);
      if (ev.key === "theme" && ev.newValue !== null) {
        setTheme(() => JSON.parse(ev.newValue!));
      }
    },
    false
  );

  const set_key = (key: string, value: any) => {

    console.log(key, value);

    setTheme((state) => {
      return {
        ...state,
        [key]: value
      };
    });
  };

  createEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeState()));
  });

  const resetTheme = () => {
    setTheme(initTheme);
  };

  const getTextColor = createMemo(() => {
    return themeState().text_color;
  }, [themeState().text_color]);

  const getSecondaryColor = createMemo(() => {
    return themeState().secondary_color;
  }, [themeState().secondary_color]);

  const getDeadColor = createMemo(() => {
    return themeState().dead_color;
  }, [themeState().dead_color]);

  const getMoneyColor = createMemo(() => {
    return themeState().money_color;
  }, [themeState().money_color]);

  const getBackgroundPlayerColor = createMemo(() => {
    return themeState().background_player_color;
  }, [themeState().background_player_color]);

  const getBackgroundColor = createMemo(() => {
    return themeState().background_color;
  }, [themeState().background_color]);

  const getCTColor = createMemo(() => {
    return themeState().CT_color;
  }, [themeState().CT_color]);

  const getTColor = createMemo(() => {
    return themeState().T_color;
  }, [themeState().T_color]);

  const getCTHPColor = createMemo(() => {
    return themeState().CT_HP_color;
  }, [themeState().CT_HP_color]);

  const getTHPColor = createMemo(() => {
    return themeState().T_HP_color;
  }, [themeState().T_HP_color]);

  const getFont = createMemo(() => {
    return themeState().font;
  }, [themeState().font]);

  const getFontSize = createMemo(() => {
    return themeState().font_size;
  }, [themeState().font_size]);

  const getFontStyle = createMemo(() => {
    return themeState().font_style;
  }, [themeState().font_style]);

  const getFontWeight = createMemo(() => {
    return themeState().font_weight;
  }, [themeState().font_weight]);

  const getBaseTheme = createMemo(() => {
    return themeState().theme;
  }, [themeState().theme]);

  const getRadarImagesPath = createMemo(() => {
    return themeState().radar_image_path;
  }, [themeState().radar_image_path]);

  return (
    <ThemeContext.Provider
      value={{
        themeState,
        resetTheme,
        getRadarImagesPath,
        set_key,
        getTextColor,
        getSecondaryColor,
        getDeadColor,
        getMoneyColor,
        getBackgroundPlayerColor,
        getBackgroundColor,
        getCTColor,
        getTColor,
        getCTHPColor,
        getTHPColor,
        getFont,
        getFontSize,
        getFontStyle,
        getFontWeight,
        getBaseTheme
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
