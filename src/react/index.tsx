import React, { useEffect } from "react";
import {
  CursorType,
  initCursor,
  updateCursor,
  disposeCursor,
  IpadCursorConfig,
  updateConfig,
  customCursorStyle,
} from "..";
import type * as CursorOutput from "..";

const useIPadCursorInit = (config?: IpadCursorConfig) => {
  useEffect(() => {
    initCursor(config);
    return () => {
      disposeCursor();
    };
  }, [config]);
  return {
    CursorType,
    disposeCursor,
    initCursor,
    updateCursor,
    updateConfig,
    customCursorStyle,
  };
};

const CursorContext = React.createContext<Partial<typeof CursorOutput>>({});
export function IPadCursorProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: IpadCursorConfig
}) {
  const {
    CursorType,
    disposeCursor,
    initCursor,
    updateCursor,
    updateConfig,
    customCursorStyle,
  } = useIPadCursorInit(config);
  return (
    <CursorContext.Provider
      value={{
        CursorType,
        disposeCursor,
        initCursor,
        updateCursor,
        updateConfig,
        customCursorStyle,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useIPadCursor() {
  return React.useContext(CursorContext);
}
