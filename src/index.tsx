// Functions
export { fnEnv } from "./functions/env";
export { GraphQLSA } from "./functions/apollo";

// Layouts
export { HTML } from "./layout/html";
export { VerticalLayout } from "./layout/vertical";

// Components
export * from "./components/button";
export * from "./components/input";

// hooks
export * from "./hooks/useRipple";

// Providers
export * from "./providers/apollo";
export * from "./providers/theme";
export * from "./providers/aside";

// Theme 관련 Type 정의
export type THEME_COLOR =
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "disabled";
export type BUTTON_VARIANT = "outlined" | "filled";
export type THEME_SIZE = "small" | "medium" | "large";

// Server Actino 관련 Type 정의
export type ActionOutput = {
    error?: string;
};
