import React, { createContext, useContext, ReactNode } from "react";

// types
export type DTxStatus = "init" | "loading" | "done" | "error";

export type DTxType = "lucid" | "game";

export type DTxInfo = {
    status: DTxStatus;
    selectedType: DTxType | null;
};

// state type for context
type DTxState = [DTxInfo, React.Dispatch<React.SetStateAction<DTxInfo>>];

const DTxContext = createContext<DTxState | null>(null);
DTxContext.displayName = "DTx";

export function DTxProvider({
    children,
    dtx,
}: {
    children: ReactNode;
    dtx: DTxState;
}) {
    return <DTxContext.Provider value={dtx}>{children}</DTxContext.Provider>;
}

export function useDTx() {
    return useContext(DTxContext)!;
}

// required status : init, loading, done ,error
