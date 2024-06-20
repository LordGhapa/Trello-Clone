"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type BoardContextProps = {
  openCard: string | null;
  setOpenCard: Dispatch<SetStateAction<string | null>>;
};

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

type BoardContextProviderProps = {
  children: ReactNode;
};

export function BoardContextProvider({ children }: BoardContextProviderProps) {
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <BoardContext.Provider value={{ openCard, setOpenCard }}>
      {children}
    </BoardContext.Provider>
  );
}

export const useBoardContext = (): BoardContextProps => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error(
      "useBoardContext must be used within a BoardContextProvider",
    );
  }
  return context;
};
