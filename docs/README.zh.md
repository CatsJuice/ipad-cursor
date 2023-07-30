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
  在浏览器中实现 iPad 的鼠标效果，可在任何框架中使用
</p>
<p align="center">
  <img src="https://img.shields.io/npm/l/ipad-cursor"/>
  <img src="https://img.shields.io/bundlephobia/min/ipad-cursor"/>
  <img src="https://img.shields.io/npm/v/ipad-cursor"/>
</p>

<p align="center">
  <a href="../README.md"> 
    <img src="https://img.shields.io/badge/language_English-blue"/>
  </a>
</p>

<p align="center">
  <a href="https://cursor.oooo.so">
    <img src="../playground/public/screenshot.gif" />
  </a>
</p>


---


## 安装

- NPM
  
  ```bash
  npm install ipad-cursor --save
  ```

- CDN
  
  目前仅支持 `ESM` 模块
  ```html
  <div data-cursor="block">Block</div>
  <div data-cursor="text">text</div>

  <script type="module">
    import cursor from "https://unpkg.com/ipad-cursor@latest"
    cursor.initCursor()
  </script>
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

  在你的dom加载后，调用 `initCursor` 来启动效果。当dom更新时，你可能需要调用 `updateCursor()`。

  ```js
  import { initCursor } from 'ipad-cursor'

  initCursor()
  ```

  > ⚠️ **注意**：到目前为止，你需要自己管理 `何时更新光标`。确保在dom更新后调用 `updateCursor`。
  > 在未来，可能会有更好的方式来处理这个问题，详见 [路线图](#路线图)。

### 自定义样式

  你可以通过配置 [配置](#配置) 来自定义光标的样式，可以在调用 `initCursor` 时传入配置，也可以在初始化后调用 `updateConfig` 来更新配置。每一种光标类型都可以单独定义样式。

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

  有时候，你可能需要针对某个元素自定义样式， 可以通过给元素绑定 `data-cursor-style` 来设置样式，该属性的值是由 `;` 分割的多个 `key:value` 对，其中 `key` 是 `IpadCursorStyle` 的属性，`value` 是对应的值，如果传入的 `key` 不是 `IpadCursorStyle` 的属性，会被当作 `css` 属性。

  推荐通过 [customCursorStyle](#customCursorStyle%28style%29) 方法来创建样式字符串以获得更好的类型提示。

  例如，为一个圆形的元素（如头像），需要单独设置：

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

  查看 [样式](#样式) 浏览完整的样式列表

### 在框架中使用

- [Vue.js](https://vuejs.org/)
  - **hooks**

    你可以通过使用 `useCursor` hook， 当组件挂载和销毁时自动调用 `updateCursor()`
    ```ts
    <script setup>
    import { useCursor } from "ipad-cursor/vue"

    useCursor()
    </script>
    ```
  - **自定义指令**

    全局注册插件：
    ```ts
    // src/main.ts
    import { ipadCursorPlugin } from "ipad-cursor/vue"

    app.use(ipadCursorPlugin, {
      // global configurations
      blockStyle: { radius: "auto" }
    })
    ```

    然后就可以在组件中使用：
    ```html
    <div v-cursor-block />
    <div v-cursor-text />
    <div v-cursor-block="{ background: 'red' }" />
    ```
    
- [React](https://react.dev)
  可参考 [App.tsx](./examples/react-basic/src/App.tsx)
- [Hexo](https://hexo.io/zh-cn/)
  可参考 [@zqqcee](https://github.com/zqqcee)'s [Blog](https://zqqcee.github.io/2023/07/23/ebae3e5deab8/)


## 原理

当调用 `initCursor` 时，它将移除默认光标，并使用 `div` 元素生成一个假光标。然后监听 `mousemove` 事件，并将假光标移动到鼠标位置。

初始化完成后，它将调用 `updateCursor` 方法，扫描带有 `data-cursor` 属性的元素，检测光标类型，并为元素添加事件监听器。

当鼠标进入元素时，应用样式。

## API

### initCursor(cfg)
  > 更多详细信息请查看 [配置](#配置)。

  初始化光标，移除默认光标，并使用 `div` 元素生成一个假光标。然后监听 `mousemove` 事件，并将假光标移动到鼠标位置。

### updateCursor
  扫描元素以观察悬停事件，并应用样式，以及移除未使用元素的事件监听器。

### disposeCursor
  移除假光标，并移除所有事件监听器，恢复默认光标。

### updateConfig(cfg)
  更新配置，详见 [配置](#配置)。

### customCursorStyle(style)
  创建可用作 `data-cursor-style` 属性的样式字符串。
  这个方法用于更好的类型提示。

### resetCursor
  将光标重置为默认样式。

## 配置

建议查看 npm 包中的 [index.d.ts](./src/index.d.ts)。

| 名称                                        | 类型              | 默认值               | 描述                                                                               | 是否必须 |
| ------------------------------------------- | ----------------- | -------------------- | ---------------------------------------------------------------------------------- | -------- |
| `adsorptionStrength`                        | `number`          | `0.2`                | 吸附力强度                                                                         | No       |
| `className`                                 | `string`          | `'ipad-cursor'`      | 光标的css类名                                                                      | No       |
| `blockPadding`                              | `number`          | `auto`               | 当光标聚焦在 `block` 时的内边距，设置为 `auto` 将自动计算                          | No       |
| `enableAutoTextCursor`(`v0.2.0+`)           | `boolean`         | `false`              | 自动检测 `text` 类型的光标 [#12](https://github.com/CatsJuice/ipad-cursor/pull/12) | No       |
| `enableLighting`(`v0.3.0+`)                 | `boolean`         | `false`              | 给 `block` 增加光照效果 [#14](https://github.com/CatsJuice/ipad-cursor/pull/14)    | No       |
| `enableMouseDownEffect`(`v0.4.3+`,  实验性) | `boolean`         | `false`              | 当鼠标按下时应用样式， 通过配置 `mouseDownStyle` 来自定义样式                      | No       |
| `enableAutoUpdateCursor`(`v0.5.0+`)         | `boolean`         | `false`              | 当 dom 更新时自动更更新光标的扫描                                                  | No       |
| `normalStyle`                               | `IpadCursorStyle` | 请查看 [样式](#样式) | 正常情况下的光标样式, 请查看 [样式](#样式)                                         | No       |
| `textStyle`                                 | `IpadCursorStyle` | 请查看 [样式](#样式) | 文字模式下的光标样式, 请查看 [样式](#样式)                                         | No       |
| `blockStyle`                                | `IpadCursorStyle` | 请查看 [样式](#样式) | 块元素下的光标样式, 请查看 [样式](#样式)                                           | No       |
| `mouseDownStyle`(`v0.4.3+`, 实验性)         | `IpadCursorStyle` | 请查看 [样式](#样式) | 鼠标按下时的光标样式, 请查看 [样式](#样式)                                         | No       |


## 样式

| 名称                     | 类型                     | 描述                                                                                                               | 例子                               |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `width`                  | `MaybeSize`              | 光标宽度                                                                                                           | `'10px'`, `10`, `'10'`             |
| `height`                 | `MaybeSize`              | 光标高度                                                                                                           | `'10px'`, `10`, `'10'`             |
| `radius`                 | `MaybeSize`  \| `'auto'` | 光标半径, 当给 `blockStyle` 设置为 `auto`  ,将根据元素的 css `border-radius` 和 `config.blockPadding` 自动计算     | `'10px'`, `10`, `'10'`, `'auto'`   |
| `background`             | `string`                 | 光标背景颜色                                                                                                       | `'#fff'`, `'red'`, `'rgba(0,0,0)'` |
| `border`                 | `string`                 | 光标边框的css样式                                                                                                  | `'1px solid black'`                |
| `zIndex`                 | `number`                 | 光标的z-index层级                                                                                                  | `1`                                |
| `scale`                  | `number`                 | 光标缩放                                                                                                           | `1.05`                             |
| `backdropBlur`           | `MaybeSize`              | 光标的 backdrop-filter 模糊                                                                                        | `'10px'`, `10`, `'10'`             |
| `backdropSaturate`       | `string`                 | 光标的 backdrop-filter 饱和度                                                                                      | `180%`                             |
| `durationBase`           | `MaybeDuration`          | 光标的基础属性过度时间 如 `width`, `height`, `radius`, `border`, `background-color`, 如果未指定单位, 将会使用 `ms` | `'1000'`, `1000`, `200ms`, `0.23s` |
| `durationPosition`       | `MaybeDuration`          | 光标的位置属性过度时间 如 `top`, `left`, 如果未指定单位, 将会使用 `ms`                                             | `'1000'`, `1000`, `200ms`, `0.23s` |
| `durationBackdropFilter` | `MaybeDuration`          | 光标的backdrop-filter属性过度时间, 如果未指定单位, 将会使用 `ms`                                                   | `'1000'`, `1000`, `200ms`, `0.23s` |

### 默认样式

请查看 [index.ts](./src/index.ts) 中的 `getDefaultConfig` 方法


## 路线图

- [x] 添加中文文档
- [x] API 文档
- [ ] 更多示例
- [x] 自动检测 dom 更新，并自动调用 `updateCursor`
    - 可能会使用 [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)


## 展示

- [oooo.so](https://oooo.so)
- [ipad-cursor.oooo.so](https://ipad-cursor.oooo.so)