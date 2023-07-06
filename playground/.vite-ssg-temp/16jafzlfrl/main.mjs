import { ViteSSG } from "vite-ssg";
import { defineComponent, mergeProps, unref, useSSRContext, onMounted, onBeforeUnmount, watchEffect } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { useDark, useToggle } from "@vueuse/core";
import { clamp, objectKeys } from "@catsjuice/utils";
import { useHead } from "@unhead/vue";
const __uno = "";
const style = "";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const isDark = useDark();
    useToggle(isDark);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "app-header",
        flex: "~",
        "gap-3": "",
        "justify-end": "",
        "items-center": "",
        py7: "",
        px8: ""
      }, _attrs))}><div data-cursor="block" p1>`);
      if (unref(isDark)) {
        _push(`<div p0 icon-btn i-carbon:sun text-xl></div>`);
      } else {
        _push(`<div p0 icon-btn i-carbon:moon text-xl></div>`);
      }
      _push(`</div><div data-cursor="block" p1><a href="https://twitter.com/cats_juice" text-xl><div p0 icon-btn i-carbon:logo-twitter></div></a></div><div data-cursor="block" p1><a href="https://github.com/CatsJuice/ipad-cursor" text-xl><div p0 icon-btn i-carbon:logo-github></div></a></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = "/ipad-cursor.svg";
let ready = false;
let cursorEle = null;
let isActive = false;
let styleTag = null;
const position = { x: 0, y: 0 };
const isServer = typeof document === "undefined";
const registeredNodeSet = /* @__PURE__ */ new Set();
const eventMap = /* @__PURE__ */ new Map();
const config = getDefaultConfig();
class Utils {
  static isNum(v) {
    return typeof v === "number" || /^\d+$/.test(v);
  }
  static getSize(size) {
    if (this.isNum(size))
      return `${size}px`;
    return size;
  }
  static getDuration(duration) {
    if (this.isNum(duration))
      return `${duration}ms`;
    return duration;
  }
  static getColor(color) {
    return color;
  }
  static objectKeys(obj) {
    return Object.keys(obj);
  }
  static style2Vars(style2) {
    const map = {
      backdropBlur: "--cursor-bg-blur",
      backdropSaturate: "--cursor-bg-saturate",
      background: "--cursor-bg",
      border: "--cursor-border",
      durationBackdropFilter: "--cursor-blur-duration",
      durationBase: "--cursor-duration",
      durationPosition: "--cursor-position-duration",
      height: "--cursor-height",
      radius: "--cursor-radius",
      scale: "--cursor-scale",
      width: "--cursor-width",
      zIndex: "--cursor-z-index"
    };
    return this.objectKeys(style2).reduce((prev, key) => {
      let value = style2[key];
      if (value === void 0)
        return prev;
      const maybeColor = ["background", "border"].includes(key);
      const maybeSize = ["width", "height", "radius", "backdropBlur"].includes(
        key
      );
      const maybeDuration = key.startsWith("duration");
      if (maybeColor)
        value = this.getColor(value);
      if (maybeSize)
        value = this.getSize(value);
      if (maybeDuration)
        value = this.getDuration(value);
      const recordKey = map[key] || key;
      return { ...prev, [recordKey]: value };
    }, {});
  }
  static isMergebleObject(obj) {
    const isObject = (o) => o && typeof o === "object" && !Array.isArray(o);
    return isObject(obj) && Object.keys(obj).length > 0;
  }
  static mergeDeep(obj, ...sources) {
    if (!sources.length)
      return obj;
    const source = sources.shift();
    if (!source)
      return obj;
    if (this.isMergebleObject(obj) && this.isMergebleObject(source)) {
      objectKeys(source).forEach((key) => {
        if (this.isMergebleObject(source[key])) {
          if (!obj[key])
            Object.assign(obj, { [key]: {} });
          this.mergeDeep(obj[key], source[key]);
        } else {
          Object.assign(obj, { [key]: source[key] });
        }
      });
    }
    return this.mergeDeep(obj, ...sources);
  }
}
function getDefaultConfig() {
  const normalStyle = {
    width: "20px",
    height: "20px",
    radius: "50%",
    durationBase: "0.23s",
    durationPosition: "0s",
    durationBackdropFilter: "0s",
    background: "rgba(150, 150, 150, 0.2)",
    border: "1px solid rgba(100, 100, 100, 0.1)",
    zIndex: 9999,
    scale: 1,
    backdropBlur: "0px",
    backdropSaturate: "180%"
  };
  const textStyle = {
    width: "4px",
    height: "1.2em",
    border: "0px solid rgba(100, 100, 100, 0)",
    background: "rgba(100, 100, 100, 0.3)",
    durationBackdropFilter: "1s",
    radius: "10px"
  };
  const blockStyle = {
    background: "rgba(100, 100, 100, 0.1)",
    border: "1px solid rgba(100, 100, 100, 0.05)",
    backdropBlur: "0px",
    durationBackdropFilter: "0.1s",
    backdropSaturate: "120%",
    radius: "10px"
  };
  const defaultConfig = {
    blockPadding: "auto",
    adsorptionStrength: 10,
    className: "ipad-cursor",
    normalStyle,
    textStyle,
    blockStyle
  };
  return defaultConfig;
}
function updateCursorStyle(keyOrObj, value) {
  if (!cursorEle)
    return;
  if (typeof keyOrObj === "string") {
    value && cursorEle.style.setProperty(keyOrObj, value);
  } else {
    Object.entries(keyOrObj).forEach(([key, value2]) => {
      cursorEle && cursorEle.style.setProperty(key, value2);
    });
  }
}
function recordMousePosition(e) {
  position.x = e.clientX;
  position.y = e.clientY;
}
function initCursor(_config) {
  if (isServer || ready)
    return;
  if (_config)
    updateConfig(_config);
  ready = true;
  window.addEventListener("mousemove", recordMousePosition);
  createCursor();
  createStyle();
  updateCursorPosition();
  updateCursor();
}
function disposeCursor() {
  if (!ready)
    return;
  ready = false;
  window.removeEventListener("mousemove", recordMousePosition);
  cursorEle && cursorEle.remove();
  styleTag && styleTag.remove();
  styleTag = null;
  cursorEle = null;
  registeredNodeSet.forEach((node) => unregisterNode(node));
}
function updateConfig(_config) {
  if ("adsorptionStrength" in _config) {
    config.adsorptionStrength = clamp(_config.adsorptionStrength || 10, 0, 30);
  }
  return Utils.mergeDeep(config, _config);
}
function createStyle() {
  if (styleTag)
    return;
  styleTag = document.createElement("style");
  styleTag.innerHTML = `
    body, * {
      cursor: none;
    }
    .${config.className.split(/\s+/).join(".")} {
      pointer-events: none;
      position: fixed;
      left: var(--cursor-x);
      top: var(--cursor-y);
      width: var(--cursor-width);
      height: var(--cursor-height);
      border-radius: var(--cursor-radius);
      background-color: var(--cursor-bg);
      border: var(--cursor-border);
      z-index: var(--cursor-z-index);
      font-size: var(--cursor-font-size);
      backdrop-filter: 
        blur(var(--cursor-bg-blur)) 
        saturate(var(--cursor-bg-saturate));
      transition:
        width var(--cursor-duration) ease,
        height var(--cursor-duration) ease,
        border-radius var(--cursor-duration) ease,
        border var(--cursor-duration) ease,
        background-color var(--cursor-duration) ease,
        left var(--cursor-position-duration) ease,
        top var(--cursor-position-duration) ease,
        backdrop-filter var(--cursor-blur-duration) ease;
      transform: 
        translate(calc(-50% + var(--cursor-translateX)), calc(-50% + var(--cursor-translateY))) 
        scale(var(--cursor-scale));
    }
  `;
  document.head.appendChild(styleTag);
}
function createCursor() {
  if (isServer)
    return;
  cursorEle = document.createElement("div");
  cursorEle.classList.add(config.className);
  document.body.appendChild(cursorEle);
  resetCursorStyle();
}
function updateCursorPosition() {
  if (isServer || !cursorEle)
    return;
  if (!isActive) {
    updateCursorStyle("--cursor-x", `${position.x}px`);
    updateCursorStyle("--cursor-y", `${position.y}px`);
  }
  window.requestAnimationFrame(updateCursorPosition);
}
function queryAllTargets() {
  if (isServer || !ready)
    return [];
  const nodes = document.querySelectorAll("[data-cursor]");
  return nodes;
}
function updateCursor() {
  if (isServer || !ready)
    return;
  const nodes = queryAllTargets();
  const nodesMap = /* @__PURE__ */ new Map();
  nodes.forEach((node) => {
    nodesMap.set(node, true);
    if (registeredNodeSet.has(node))
      return;
    registerNode(node);
  });
  registeredNodeSet.forEach((node) => {
    if (nodesMap.has(node))
      return;
    unregisterNode(node);
  });
}
function registerNode(node) {
  const type = node.getAttribute("data-cursor");
  registeredNodeSet.add(node);
  if (type === "text")
    registerTextNode(node);
  if (type === "block")
    registerBlockNode(node);
  else
    registeredNodeSet.delete(node);
}
function unregisterNode(node) {
  var _a;
  registeredNodeSet.delete(node);
  (_a = eventMap.get(node)) == null ? void 0 : _a.forEach(({ event, handler }) => {
    node.removeEventListener(event, handler);
  });
  eventMap.delete(node);
  node.style.setProperty("transform", "none");
}
function extractCustomStyle(node) {
  const customStyleRaw = node.getAttribute("data-cursor-style");
  const styleObj = {};
  if (customStyleRaw) {
    customStyleRaw.split(/(,|;)/).forEach((style2) => {
      const [key, value] = style2.split(":").map((s) => s.trim());
      styleObj[key] = value;
    });
  }
  return styleObj;
}
function registerTextNode(node) {
  function onTextOver(e) {
    updateCursorStyle(Utils.style2Vars(config.textStyle || {}));
    const dom = e.target;
    const fontSize = window.getComputedStyle(dom).fontSize;
    updateCursorStyle("--cursor-font-size", fontSize);
    updateCursorStyle(
      Utils.style2Vars({
        ...config.textStyle,
        ...extractCustomStyle(dom)
      })
    );
  }
  node.addEventListener("mouseover", onTextOver, { passive: true });
  node.addEventListener("mouseleave", resetCursorStyle, { passive: true });
  eventMap.set(node, [
    { event: "mouseover", handler: onTextOver },
    { event: "mouseleave", handler: resetCursorStyle }
  ]);
}
function registerBlockNode(_node) {
  const node = _node;
  node.addEventListener("mouseenter", onBlockEnter, { passive: true });
  node.addEventListener("mousemove", onBlockMove, { passive: true });
  node.addEventListener("mouseleave", onBlockLeave, { passive: true });
  let timer;
  function onBlockEnter() {
    const rect = node.getBoundingClientRect();
    timer && clearTimeout(timer);
    timer = setTimeout(() => isActive = true);
    const blockPadding = config.blockPadding || 0;
    let padding = blockPadding;
    if (padding === "auto") {
      const size = Math.min(rect.width, rect.height);
      padding = Math.max(2, Math.floor(size / 25));
    }
    cursorEle.classList.add("focus");
    updateCursorStyle("--cursor-x", `${rect.left + rect.width / 2}px`);
    updateCursorStyle("--cursor-y", `${rect.top + rect.height / 2}px`);
    updateCursorStyle("--cursor-width", `${rect.width + padding * 2}px`);
    updateCursorStyle("--cursor-height", `${rect.height + padding * 2}px`);
    const styleToUpdate = {
      ...config.blockStyle || {},
      ...extractCustomStyle(node)
    };
    updateCursorStyle(Utils.style2Vars(styleToUpdate));
    node.style.setProperty(
      "transform",
      "translate(var(--translateX), var(--translateY))"
    );
  }
  function onBlockMove() {
    const rect = node.getBoundingClientRect();
    const halfHeight = rect.height / 2;
    const topOffset = (position.y - rect.top - halfHeight) / halfHeight;
    const halfWidth = rect.width / 2;
    const leftOffset = (position.x - rect.left - halfWidth) / halfWidth;
    const strength = config.adsorptionStrength || 10;
    updateCursorStyle(
      "--cursor-translateX",
      `${leftOffset * (rect.width / 100 * strength)}px`
    );
    updateCursorStyle(
      "--cursor-translateY",
      `${topOffset * (rect.height / 100 * strength)}px`
    );
    node.style.setProperty(
      "--translateX",
      `${leftOffset * (rect.width / 100 * strength)}px`
    );
    node.style.setProperty(
      "--translateY",
      `${topOffset * (rect.height / 100 * strength)}px`
    );
  }
  function onBlockLeave() {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      isActive = false;
      cursorEle && cursorEle.classList.remove("focus");
    });
    resetCursorStyle();
    node.style.setProperty("transform", "translate(0px, 0px)");
  }
  eventMap.set(node, [
    { event: "mouseenter", handler: onBlockEnter },
    { event: "mousemove", handler: onBlockMove },
    { event: "mouseleave", handler: onBlockLeave }
  ]);
}
function resetCursorStyle() {
  updateCursorStyle(Utils.style2Vars(config.normalStyle || {}));
}
function customCursorStyle(style2) {
  return Object.entries(style2).map(([key, value]) => `${key}: ${value}`).join("; ");
}
const CursorType = {
  TEXT: "text",
  BLOCK: "block"
};
function useCursor(config2) {
  onMounted(() => updateCursor());
  onBeforeUnmount(() => updateCursor());
  config2 && updateConfig(config2);
  initCursor();
  return {
    CursorType,
    disposeCursor,
    initCursor,
    updateCursor,
    updateConfig,
    customCursorStyle
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const { CursorType: CursorType2, customCursorStyle: customCursorStyle2, initCursor: initCursor2, disposeCursor: disposeCursor2 } = useCursor({
      normalStyle: {
        backdropBlur: 12
      }
    });
    const btns = [
      { label: "Default" },
      { label: "CustomBg", style: customCursorStyle2({ background: "#ff204020" }) },
      {
        label: "Blur Effect",
        style: customCursorStyle2({
          backdropBlur: 0,
          durationBackdropFilter: 1e3
        })
      },
      {
        label: "Custom Border",
        style: customCursorStyle2({
          border: "1px solid currentColor"
        })
      },
      {
        label: "Custom Anime Speed",
        style: customCursorStyle2({
          durationBase: 2e3
        })
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "~ col",
        "justify-center": "",
        "items-center": "",
        "gap-2": ""
      }, _attrs))}><div w-100px h-100px${ssrRenderAttr("data-cursor", unref(CursorType2).BLOCK)}${ssrRenderAttr("data-cursor-style", unref(customCursorStyle2)({ radius: 30 }))}><img w-full h-full${ssrRenderAttr("src", _imports_0)}></div><h2 my-0 data-cursor="text"${ssrRenderAttr(
        "data-cursor-style",
        unref(customCursorStyle2)({
          background: "currentColor"
        })
      )}> iPad Cursor </h2><div data-cursor="text"><div>Hack iPad&#39;s mouse effect in browser,</div><div>can be used in any frameworks</div></div><div flex="~ gap-1" items-center pt4><!--[-->`);
      ssrRenderList(btns, (btn) => {
        _push(`<div${ssrRenderAttr("data-cursor", unref(CursorType2).BLOCK)} class="btn"${ssrRenderAttr("data-cursor-style", btn.style)}>${ssrInterpolate(btn.label)}</div>`);
      });
      _push(`<!--]--></div><div flex="~ gap-1" items-center pt2><div${ssrRenderAttr("data-cursor", unref(CursorType2).BLOCK)} class="btn"> Recover mouse </div><div${ssrRenderAttr("data-cursor", unref(CursorType2).BLOCK)} class="btn"> Enable iPad Mouse </div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Home.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    const isDark = useDark();
    const { updateConfig: updateConfig2 } = useCursor();
    const appName = "ipad-cursor";
    const appDesc = "iPad Cursor Effect in Browser";
    useHead({
      title: appName,
      link: [{ rel: "icon", href: "/ipad-cursor.svg", sizes: "any" }],
      meta: [
        { name: "description", content: appDesc },
        { property: "og:title", content: appName },
        { property: "og:description", content: appDesc },
        { property: "og:image", content: "/og-image.jpg" }
      ]
    });
    watchEffect(
      () => updateConfig2({
        blockStyle: {
          border: `1px solid ${isDark.value ? "#ffffff80" : "#00000020"}`
        }
      })
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$2, {
        fixed: "",
        "top-0": "",
        "right-0": ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const App_vue_vue_type_style_index_0_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const createApp = ViteSSG(_sfc_main, {});
export {
  createApp
};
