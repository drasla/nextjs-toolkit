"use client";

import { SelectContextType } from "./_types";
import { createContext } from "react";

export const SelectContext = createContext<SelectContextType>({
    onChange: () => {},
    selectedValue: "",
});
