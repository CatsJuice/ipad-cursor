export type ICursorType = "normal" | "text" | "block";
/**
 *  if without unit, `px` is used by default
 */
type MaybeSize = string | number;
/** if without unit `ms` is used by default */
type MaybeDuration = string | number;
/** do not use 0x000000, use #000000 instead */
type MaybeColor = string;
/**
 * Configurations for the cursor
 */
export interface IpadCursorConfig {
    /**
     * Strength of adsorption, the larger the value,
     * The higher the value, the greater the range of the block that can be moved when it is hovered
     * @type {number} between 0 and 30
     * @default 10
     */
    adsorptionStrength?: number;
    /**
     * The class name of the cursor element
     * @type {string}
     * @default 'cursor'
     */
    className?: string;
    /**
     * The style of the cursor, when it does not hover on any element
     */
    normalStyle?: IpadCursorStyle;
    /**
     * The style of the cursor, when it hovers on text
     */
    textStyle?: IpadCursorStyle;
    /**
     * The style of the cursor, when it hovers on a block
     */
    blockStyle?: IpadCursorStyle;
    /**
     * The style of the cursor, when mousedown
     */
    mouseDownStyle?: IpadCursorStyle;
    /**
     * Cursor padding when hover on block
     */
    blockPadding?: number | "auto";
    /**
     * detect text node and apply text cursor automatically
     **/
    enableAutoTextCursor?: boolean;
    /**
     * whether to enable lighting effect
     */
    enableLighting?: boolean;
    /**
     * whether to apply effect for mousedown action
     */
    enableMouseDownEffect?: boolean;
}
/**
 * Configurable style of the cursor (Experimental)
 * This feature is Experimental, so it's set to false by default.
 * And it not support `block` yet
 */
export interface IpadCursorStyle {
    /**
     * The width of the cursor
     */
    width?: MaybeSize;
    /**
     * The width of the cursor
     */
    height?: MaybeSize;
    /**
     * Border radius of cursor
     */
    radius?: MaybeSize | "auto";
    /**
     * Transition duration of basic properties like width, height, radius, border, background-color
     */
    durationBase?: MaybeDuration;
    /**
     * Transition duration of position: left, top
     */
    durationPosition?: MaybeDuration;
    /**
     * Transition duration of backdrop-filter
     */
    durationBackdropFilter?: MaybeDuration;
    /**
     * The background color of the cursor
     */
    background?: MaybeColor;
    /**
     * Border of the cursor
     * @example '1px solid rgba(100, 100, 100, 0.1)'
     */
    border?: string;
    /** z-index of cursor */
    zIndex?: number;
    /**
     * Scale of cursor
     */
    scale?: number;
    /**
     * backdrop-filter blur
     */
    backdropBlur?: MaybeSize;
    /**
     * backdrop-filter saturate
     */
    backdropSaturate?: string;
}
/**
 * Init cursor, hide default cursor, and listen mousemove event
 * will only run once in client even if called multiple times
 * @returns
 */
declare function initCursor(_config?: IpadCursorConfig): void;
/**
 * destroy cursor, remove event listener and remove cursor element
 * @returns
 */
declare function disposeCursor(): void;
/**
 * Update current Configuration
 * @param _config
 */
declare function updateConfig(_config: IpadCursorConfig): IpadCursorConfig;
/**
 * Detect all interactive elements in the page
 * Update the binding of events, remove listeners for elements that are removed
 * @returns
 */
declare function updateCursor(): void;
/**
 * Create custom style that can be bound to `data-cursor-style`
 * @param style
 */
declare function customCursorStyle(style: IpadCursorStyle & Record<string, any>): string;
declare const CursorType: {
    TEXT: ICursorType;
    BLOCK: ICursorType;
};
declare const exported: {
    CursorType: {
        TEXT: ICursorType;
        BLOCK: ICursorType;
    };
    initCursor: typeof initCursor;
    updateCursor: typeof updateCursor;
    disposeCursor: typeof disposeCursor;
    updateConfig: typeof updateConfig;
    customCursorStyle: typeof customCursorStyle;
};
export { CursorType, initCursor, updateCursor, disposeCursor, updateConfig, customCursorStyle, };
export default exported;
