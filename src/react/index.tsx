import React, { useLayoutEffect, useRef } from 'react'
import type * as CursorOutput from '..'
import {
  CursorType,
  IpadCursorConfig,
  customCursorStyle,
  disposeCursor,
  initCursor,
  resetCursor,
  updateConfig,
  updateCursor,
} from '..'

const useIPadCursorInit = (config?: IpadCursorConfig) => {
  useLayoutEffect(() => {
    initCursor(config)
    return () => {
      disposeCursor()
    }
  }, [config])
  return null
}

const CursorContext = React.createContext<Partial<typeof CursorOutput>>({})
export function IPadCursorProvider({
  children,
  config,
}: {
  children: React.ReactNode
  config?: IpadCursorConfig
}) {
  useIPadCursorInit(config)
  return (
    <CursorContext.Provider
      value={
        useRef({
          CursorType,
          resetCursor,
          disposeCursor,
          initCursor,
          updateCursor,
          updateConfig,
          customCursorStyle,
        }).current
      }
    >
      {children}
    </CursorContext.Provider>
  )
}

export function useIPadCursor() {
  return React.useContext(CursorContext)
}
