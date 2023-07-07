<!-- Logo -->
<p align="center">
  <img src="https://cursor.oooo.so/ipad-cursor.svg"/>
</p>

<!-- Bridge -->
<h1 align="center">ipad-mouse </h1>
<!-- Description -->
<h2 align="center">
  在浏览器中实现 iPad 的鼠标效果，可在任何框架中使用
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


## 安装

- NPM
  
  ```bash
  npm install ipad-cursor --save
  ```

- CDN
  
  ```html
  <script src="https://unpkg.com/ipad-cursor@latest" />
  ```

  更多详细信息请查看 [cursor.oooo.so](https://ipad-cursor.oooo.so)。

## 使用

### 基本使用

  在你想要添加效果的元素上应用 `data-cursor` 属性。
  
  - `data-cursor="text"`: 文本光标
  - `data-cursor="block"`: 块状光标 

  ```html
  <div data-cursor="text">文本光标</div>
  <div data-cursor="block">块状光标</div>
  ```

  在你的dom加载后，调用 `initCursor` 来启动效果。当dom更新时，你可能需要调用 `initCursor`。

  ```js
  import { initCursor } from 'ipad-cursor'

  initCursor()
  ```

  > ⚠️ **注意**：到目前为止，你需要自己管理 `何时更新光标`。确保在dom更新后调用 `updateCursor`。
  > 在未来，可能会有更好的方式来处理这个问题，详见 [路线图](#roadmap)。

## 原理

当调用 `initCursor` 时，它将移除默认光标，并使用 `div` 元素生成一个假光标。然后监听 `mousemove` 事件，并将假光标移动到鼠标位置。

初始化完成后，它将调用 `updateCursor` 方法，扫描带有 `data-cursor` 属性的元素，检测光标类型，并为元素添加事件监听器。

当鼠标进入元素时，应用样式。

## API

### initCursor(cfg)
  > 更多详细信息请查看 [配置](#config)。

  初始化光标，移除默认光标，并使用 `div` 元素生成一个假光标。然后监听 `mousemove` 事件，并将假光标移动到鼠标位置。

### updateCursor
  扫描元素以观察悬停事件，并应用样式，以及移除未使用元素的事件监听器。

### disposeCursor
  移除假光标，并移除所有事件监听器，恢复默认光标。

### updateConfig(cfg)
  更新配置，详见 [配置](#config)。

### customCursorStyle(style)
  创建可用作 `data-cursor-style` 属性的样式字符串。
  这个方法用于更好的类型提示。

## 配置

建议查看 npm 包中的 [index.d.ts](./src/index.d.ts)。

```ts
/**
 *  如果没有单位，默认使用 `px`
 */
type MaybeSize = string | number;
/** 如果没有单位，默认使用 `ms` */
type MaybeDuration = string | number;
/** 不要使用 0x000000，而应使用 #000000 */
type MaybeColor = string;
/**
 * 光标的配置
 */
export interface IpadCursorConfig {
    /**
     * 吸附力度，值越大，
     * 值越高，悬停时可移动的块的范围越大
     * @type {number} 在 0 和 30 之间
     * @default 10
     */
    adsorptionStrength?: number;
    /**
     * 光标元素的类名
     * @type {string}
     * @default 'cursor'
     */
    className?: string;
    /**
     * 光标的样式，当它没有悬停在任何元素上时
     */
    normalStyle?: IpadCursorStyle;
    /**
     * 光标的样式，当它悬停在文本上时
     */
    textStyle?: IpadCursorStyle;
    /**
     * 光标的样式，当它悬停在块上时
     */
    blockStyle?: IpadCursorStyle;
    /**
     * 当光标悬停在块上时的填充
     */
    blockPadding?: number | "auto";
}
/**
 * 可配置的光标样式
 */
export interface IpadCursorStyle {
    /**
     * 光标的宽度
     */
    width?: MaybeSize;
    /**
     * 光标的宽度
     */
    height?: MaybeSize;
    /**
     * 光标的边框半径
     */
    radius?: MaybeSize;
    /**
     * 基本属性如宽度、高度、半径、边框、背景颜色的过渡持续时间
     */
    durationBase?: MaybeDuration;
    /**
     * 位置：左、上的过渡持续时间
     */
    durationPosition?: MaybeDuration;
    /**
     * backdrop-filter 的过渡持续时间
     */
    durationBackdropFilter?: MaybeDuration;
    /**
     * 光标的背景颜色
     */
    background?: MaybeColor;
    /**
     * 光标的边框
     * @example '1px solid rgba(100, 100, 100, 0.1)'
     */
    border?: string;
    /** 光标的 z-index */
    zIndex?: number;
    /**
     * 光标的缩放
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


## 路线图

- [x] 添加中文文档
- [ ] API 文档
- [ ] 更多示例
- [ ] 自动检测 dom 更新，并自动调用 `updateCursor`
    - 可能会使用 [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)


## 展示

- [oooo.so](https://oooo.so)
- [ipad-cursor.oooo.so](https://ipad-cursor.oooo.so)