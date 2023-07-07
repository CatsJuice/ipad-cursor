<!-- Logo -->
<p align="center">
  <img src="https://cursor.oooo.so/ipad-cursor.svg"/>
</p>

<!-- Bridge -->
<h1 align="center">ipad-mouse </h1>
<!-- Description -->
<h2 align="center">
  Mouse effect hacking of iPad in browser that can be used in any frameworks 
</h2>
<p align="center">
  <img src="https://img.shields.io/npm/l/ipad-cursor"/>
  <img src="https://img.shields.io/bundlephobia/min/ipad-cursor"/>
  <img src="https://img.shields.io/npm/v/ipad-cursor"/>
</p>

<p align="center">
  <a href="./docs/README.zh.md"> 
      <img src="https://img.shields.io/badge/language_%E4%B8%AD%E6%96%87-bule"/>
  </a>
</p>

---



## Install

- NPM
  
  ```bash
  npm install ipad-cursor --save
  ```

- CDN
  
  ```html
  <script src="https://unpkg.com/ipad-cursor@latest" />
  ```

  See [cursor.oooo.so](https://ipad-cursor.oooo.so) for more details.

## Usage

### Basic usage

  Apply `data-cursor` attribute to the element you want to add the effect.
  
  - `data-cursor="text"`: text cursor
  - `data-cursor="block"`: block cursor 

  ```html
  <div data-cursor="text">Text Cursor</div>
  <div data-cursor="block">Block Cursor</div>
  ```

  After your dom loaded, call `initCursor` to start the effect. You may need to call `initCursor` when dom updated.

  ```js
  import { initCursor } from 'ipad-cursor'

  initCursor()
  ```

  > ⚠️ **Notice**: As so far, you need to manage `when to updateCursor` yourself. Make sure to call `updateCursor` after dom updated.
  > In the future, there maybe a better way to handle this, see [Roadmap](#roadmap) for more details.

## Principle

When `initCursor` called, it will remove default cursor, and generate a fake cursor use `div` element. Then listen `mousemove` event, and move the fake cursor to the mouse position.

After init finished, it will call `updateCursor` method, scan element with `data-cursor` attribute, detect the cursor type, and add event listener to the element.

When mouse enter the element, apply styles.

## API

### initCursor(cfg)
  > see [Config](#config) for more details.

  Init cursor, remove default cursor, and generate a fake cursor use `div` element. Then listen `mousemove` event, and move the fake cursor to the mouse position.


### updateCursor
  Scan element to observe hover event, and apply styles, as well as remove unused element's event listener.

### disposeCursor
  Remove fake cursor, and remove all event listener, recover default cursor.

### updateConfig(cfg)
  Update config, see [Config](#config) for more details.

### customCursorStyle(style)
  Create style string that can be used as `data-cursor-style` attribute.
  This method is used for better type hinting.

## Config

It is recommended to see [index.d.ts](./src/index.d.ts) in the npm package.

```ts
/**
 *  if without unit, `px` is used by default
 */
type MaybeSize = string | number;
/** if without unit `ms` is used by defaut */
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
     * The style of the cursor, when it not hover on any element
     */
    normalStyle?: IpadCursorStyle;
    /**
     * The style of the cursor, when it hover on text
     */
    textStyle?: IpadCursorStyle;
    /**
     * The style of the cursor, when it hover on block
     */
    blockStyle?: IpadCursorStyle;
    /**
     * Cursor padding when hover on block
     */
    blockPadding?: number | "auto";
}
/**
 * Configurable style of the cursor
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
    radius?: MaybeSize;
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
```


## Roadmap

- [x] Add Chinese document
- [ ] API Docs
- [ ] More examples
- [ ] Auto detect dom update, and call `updateCursor` automatically
    - Maybe use [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)


## Showcase

- [oooo.so](https://oooo.so)
- [ipad-cursor.oooo.so](https://ipad-cursor.oooo.so)
