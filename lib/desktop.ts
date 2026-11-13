import { Platform, useWindowDimensions } from "react-native";

// Layout de desktop: só no navegador, com janela larga. App nativo e navegador estreito não mudam.
export const useDesktop = () => useWindowDimensions().width >= 1024 && Platform.OS === "web";
