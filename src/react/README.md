## IPad Cursor React Component

IPad Cursor support of React component usage.

## Usage

it had exported two function

1. `IPadCursorProvider` -> add Context on the Top level code.
    ```ts
    <IPadCursorProvider>
        <App/>
    </IPadCursorProvider>
    ```
2. `useIPadCursor`        -> use a Hook to config
    ```typescript
    const {
        updateConfig,
        updateCursor,
        // ... and so on 
    } = useIPadCursor();
    ```