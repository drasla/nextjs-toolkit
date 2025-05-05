// Functions
export * from "./functions/env";
export * from "./functions/salt";

export { fnEnv } from "./functions/env";

// Layouts
export * from "./layout/html";
export * from "./layout/vertical";

export { HTML } from "./layout/html";

// Components
export * from "./components/button";

// hooks
export * from "./hooks/useRipple";

// Providers
export * from "./providers/theme";
export * from "./providers/aside";

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
