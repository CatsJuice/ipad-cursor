<!-- Logo -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cursor.oooo.so/ipad-cursor-dark.svg">
    <img height="100" src="https://cursor.oooo.so/ipad-cursor.svg">
  </picture>
</p>

<!-- Bridge -->
<h2 align="center">ipad-mouse </h2>
<!-- Description -->
<p align="center">
  Mouse effect hacking of iPad in browser that can be used in any frameworks 
</p>
<p align="center">
  <img src="https://img.shields.io/npm/l/ipad-cursor"/>
  <img src="https://img.shields.io/bundlephobia/min/ipad-cursor"/>
  <img src="https://img.shields.io/npm/v/ipad-cursor"/>
</p>

<p align="center">
  <a href="./docs/README.zh.md"> 
    <img src="https://img.shields.io/badge/language_%E4%B8%AD%E6%96%87-blue"/>
  </a>
</p>

<p align="center">
  <a href="https://cursor.oooo.so">
    <img src="./playground/public/screenshot.gif" />
  </a>
</p>

---

## Install

- NPM
  
  ```bash
  npm install ipad-cursor --save
  ```

- CDN

  Only support `ESM` module
  
  ```html
  <div data-cursor="block">Block</div>
  <div data-cursor="text">text</div>

  <script type="module">
    import cursor from "https://unpkg.com/ipad-cursor@latest"
    cursor.initCursor()
  </script>
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

  After your dom loaded, call `initCursor` to start the effect. You may need to call `updateCursor()` when dom updated.

  ```js
  import { initCursor } from 'ipad-cursor'

  initCursor()
  ```

  > ⚠️ **Notice**: As so far, you need to manage `when to updateCursor` yourself. Make sure to call `updateCursor` after dom updated.
  > In the future, there maybe a better way to handle this, see [Roadmap](#roadmap) for more details.

### Custom Style

  You can customize the style of the cursor by [Config](#config), config can be passed to `initCursor` method, or use `updateConfig` method to update config. Every type can be configured separately.

  ```ts
  import { initCursor, updateConfig } from 'ipad-cursor'
  import type { IpadCursorConfig, IpadCursorStyle } from 'ipad-cursor'

  const normalStyle: IpadCursorStyle = { background: 'red' }
  const textStyle: IpadCursorStyle = { background: 'blue' }
  const blockStyle: IpadCursorStyle = { background: 'green' }
  const config: IpadCursorConfig = {
    normalStyle,
    textStyle,
    blockStyle,
  };
  initCursor(config)
  ```

  Sometimes, you may want to customize the style of the cursor for a specific element, you can use `data-cursor-style` attribute to do this.

  The value of `data-cursor-style` attribute is a string, split by `;`, and each part is a style, split by `:`. For example, `background:red;color:blue`.

  It is recommended to use [customCursorStyle](#customCursorStyle%28style%29) method to create style string.

  For example, customize the style for a circle element (Like avatar).

  ```html
  <div 
    data-cursor="block" 
    data-cursor-style="radius: 50%" 
    style="width: 50px; height: 50px; border-radius: 50%"
  />

  <script type="module">
    import cursor from "https://unpkg.com/ipad-cursor@latest"
    cursor.initCursor()
  </script>
  ```

  See [Style](#style) for full style list.

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

| Name                                              | Type              | Default             | Description                                                                            | required |
| ------------------------------------------------- | ----------------- | ------------------- | -------------------------------------------------------------------------------------- | -------- |
| `adsorptionStrength`                              | `number`          | `0.2`               | The strength of adsorption effect, number between 0 and 30                             | No       |
| `className`                                       | `string`          | `'ipad-cursor'`     | The class name of fake cursor                                                          | No       |
| `blockPadding`                                    | `number`          | `auto`              | The padding of cursor when hover on block, set to `auto` will calculate  automatic     | No       |
| `enableAutoTextCursor`(`v0.2.0+`)                 | `boolean`         | `false`             | Auto detect text cursor, see [#12](https://github.com/CatsJuice/ipad-cursor/pull/12)   | No       |
| `enableLighting`(`v0.3.0+`)                       | `boolean`         | `false`             | Add a lighting effect to block [#14](https://github.com/CatsJuice/ipad-cursor/pull/14) | No       |
| `enableMouseDownEffect`(`v0.4.3+`,  Experimental) | `boolean`         | `false`             | Add a effect when mouse down, customize style by config `mouseDownStyle`               | No       |
| `normalStyle`                                     | `IpadCursorStyle` | see [Style](#style) | The style of normal cursor, see [Style](#style)                                        | No       |
| `textStyle`                                       | `IpadCursorStyle` | see [Style](#style) | The style of text cursor, see [Style](#style)                                          | No       |
| `blockStyle`                                      | `IpadCursorStyle` | see [Style](#style) | The style of block cursor, see [Style](#style)                                         | No       |
| `mouseDownStyle`(`v0.4.3+`, Experimental)         | `IpadCursorStyle` | see [Style](#style) | The style of cursor when mouse is pressed, see [Style](#style)                         | No       |

## Style

| Name                     | Type                    | Description                                                                                                                                          | example                            |
| ------------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `width`                  | `MaybeSize`             | The width of cursor                                                                                                                                  | `'10px'`, `10`, `'10'`             |
| `height`                 | `MaybeSize`             | The height of cursor                                                                                                                                 | `'10px'`, `10`, `'10'`             |
| `radius`                 | `MaybeSize` \| `'auto'` | The border radius of cursor, if set to `auto` for `blockStyle`, it will be calculated by dom's css `border-radius` and `config.blockPadding`.        | `'10px'`, `10`, `'10'`, `'auto'`   |
| `background`             | `string`                | The background color of cursor                                                                                                                       | `'#fff'`, `'red'`, `'rgba(0,0,0)'` |
| `border`                 | `string`                | The css border property of cursor                                                                                                                    | `'1px solid black'`                |
| `zIndex`                 | `number`                | The z-index of cursor                                                                                                                                | `1`                                |
| `scale`                  | `number`                | The scale of cursor                                                                                                                                  | `1.05`                             |
| `backdropBlur`           | `MaybeSize`             | The backdrop-filter blur of cursor                                                                                                                   | `'10px'`, `10`, `'10'`             |
| `backdropSaturate`       | `string`                | The backdrop-filter saturate of cursor                                                                                                               | `180%`                             |
| `durationBase`           | `MaybeDuration`         | Transition duration of basic properties like `width`, `height`, `radius`, `border`, `background-color`, if unit if not  specified, `ms` will be used | `'1000'`, `1000`, `200ms`, `0.23s` |
| `durationPosition`       | `MaybeDuration`         | Transition duration of position properties like `top`, `left`, if unit if not  specified, `ms` will be used                                          | `'1000'`, `1000`, `200ms`, `0.23s` |
| `durationBackdropFilter` | `MaybeDuration`         | Transition duration of backdrop-filter property, if unit if not  specified, `ms` will be used                                                        | `'1000'`, `1000`, `200ms`, `0.23s` |

### Default Style

See `getDefaultConfig` method in [index.ts](./src/index.ts) for more details.


## Roadmap

- [x] Add Chinese document
- [x] API Docs
- [ ] More examples
- [ ] Auto detect dom update, and call `updateCursor` automatically
    - Maybe use [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)


## Showcase

- [oooo.so](https://oooo.so)
- [ipad-cursor.oooo.so](https://ipad-cursor.oooo.so)
