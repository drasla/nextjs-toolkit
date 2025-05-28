import { createContext } from "react";
import { SelectContextType } from "./_types";

export const SelectContext = createContext<SelectContextType>({
    onChange: () => {},
    selectedValue: "",
});