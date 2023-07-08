// types
export type ICursorType = "normal" | "text" | "block";
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

  /**
   * detect text node and apply text cursor automatically
   **/
  enableAutoTextCursor?: boolean;
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

let ready = false;
let cursorEle: HTMLDivElement | null = null;
let isBlockActive = false;
let isTextActive = false;
let styleTag: HTMLStyleElement | null = null;
const position = { x: 0, y: 0 };
const isServer = typeof document === "undefined";
const registeredNodeSet = new Set<Element>();
const eventMap = new Map<
  Element,
  Array<{ event: string; handler: (e: Event) => void }>
>();
const config = getDefaultConfig();

/**
 * Util collection
 */
class Utils {
  static clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
  }
  static isNum(v: string | number) {
    return typeof v === "number" || /^\d+$/.test(v);
  }
  static getSize(size: MaybeSize) {
    if (this.isNum(size)) return `${size}px`;
    return size;
  }
  static getDuration(duration: MaybeDuration): string {
    if (this.isNum(duration)) return `${duration}ms`;
    return `${duration}`;
  }
  static getColor(color: MaybeColor) {
    return color;
  }
  static objectKeys<T extends string>(obj: Partial<Record<T, any>>): T[] {
    return Object.keys(obj) as T[];
  }
  static style2Vars(style: IpadCursorStyle) {
    const map: Record<keyof IpadCursorStyle, string> = {
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
      zIndex: "--cursor-z-index",
    };
    return this.objectKeys(style).reduce((prev, key) => {
      let value = style[key];
      if (value === undefined) return prev;

      const maybeColor = ["background", "border"].includes(key);
      const maybeSize = ["width", "height", "radius", "backdropBlur"].includes(
        key
      );
      const maybeDuration = key.startsWith("duration");

      if (maybeColor) value = this.getColor(value as MaybeColor);
      if (maybeSize) value = this.getSize(value as MaybeSize);
      if (maybeDuration) value = this.getDuration(value as MaybeDuration);

      const recordKey = map[key] || key;
      return { ...prev, [recordKey]: value };
    }, {});
  }
  static isMergebleObject(obj: any) {
    const isObject = (o: any) =>
      o && typeof o === "object" && !Array.isArray(o);
    return isObject(obj) && Object.keys(obj).length > 0;
  }
  static mergeDeep<T extends any = any>(obj: T, ...sources: any[]): T {
    if (!sources.length) return obj;
    const source = sources.shift();
    if (!source) return obj;
    if (this.isMergebleObject(obj) && this.isMergebleObject(source)) {
      Utils.objectKeys(source).forEach((key) => {
        if (this.isMergebleObject(source[key])) {
          if (!(obj as any)[key]) Object.assign(obj as any, { [key]: {} });
          this.mergeDeep((obj as any)[key], source[key]);
        } else {
          Object.assign(obj as any, { [key]: source[key] });
        }
      });
    }
    return this.mergeDeep(obj, ...sources);
  }
}

/**
 * Get default config
 * @returns
 */
function getDefaultConfig(): IpadCursorConfig {
  const normalStyle: IpadCursorStyle = {
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
    backdropSaturate: "180%",
  };
  const textStyle: IpadCursorStyle = {
    width: "4px",
    height: "1.2em",
    border: "0px solid rgba(100, 100, 100, 0)",
    background: "rgba(100, 100, 100, 0.3)",
    durationBackdropFilter: "1s",
    radius: "10px",
  };
  const blockStyle: IpadCursorStyle = {
    background: "rgba(100, 100, 100, 0.1)",
    border: "1px solid rgba(100, 100, 100, 0.05)",
    backdropBlur: "0px",
    durationBase: "0.23s",
    durationBackdropFilter: "0.1s",
    backdropSaturate: "120%",
    radius: "10px",
  };
  const defaultConfig: IpadCursorConfig = {
    blockPadding: "auto",
    adsorptionStrength: 10,
    className: "ipad-cursor",
    normalStyle,
    textStyle,
    blockStyle,
  };
  return defaultConfig;
}

/** update cursor style (single or multiple) */
function updateCursorStyle(
  keyOrObj: string | Record<string, any>,
  value?: string
) {
  if (!cursorEle) return;
  if (typeof keyOrObj === "string") {
    value && cursorEle.style.setProperty(keyOrObj, value);
  } else {
    Object.entries(keyOrObj).forEach(([key, value]) => {
      cursorEle && cursorEle.style.setProperty(key, value);
    });
  }
}

/** record mouse position */
function onMousemove(e: MouseEvent) {
  position.x = e.clientX;
  position.y = e.clientY;
  autoApplyTextCursor(e.target as HTMLElement);
}

/**
 * Automatically apply cursor style when hover on target
 * @param target
 * @returns
 */
function autoApplyTextCursor(target: HTMLElement) {
  if (isBlockActive || isTextActive || !config.enableAutoTextCursor) return;
  if (target && target.childNodes.length === 1) {
    const child = target.childNodes[0] as HTMLElement;
    if (child.nodeType === 3 && child.textContent?.trim() !== "") {
      target.setAttribute("data-cursor", "text");
      applyTextCursor(target);
      return;
    }
  }
  resetCursorStyle();
}


let lastNode: Element | null = null;
const scrollHandler = () => {
  const currentNode = document.elementFromPoint(position.x, position.y);
  const mouseLeaveEvent = new MouseEvent('mouseleave', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  if (currentNode !== lastNode && lastNode && mouseLeaveEvent) {
    lastNode.dispatchEvent(mouseLeaveEvent);
  }
  lastNode = currentNode;
}


/**
 * Init cursor, hide default cursor, and listen mousemove event
 * will only run once in client even if called multiple times
 * @returns
 */
function initCursor(_config?: IpadCursorConfig) {
  if (isServer || ready) return;
  if (_config) updateConfig(_config);
  ready = true;
  window.addEventListener("mousemove", onMousemove);
  window.addEventListener("scroll", scrollHandler);
  createCursor();
  createStyle();
  updateCursorPosition();
  updateCursor();
}

/**
 * destroy cursor, remove event listener and remove cursor element
 * @returns
 */
function disposeCursor() {
  if (!ready) return;
  ready = false;
  window.removeEventListener("mousemove", onMousemove);
  window.removeEventListener("scroll", scrollHandler);
  cursorEle && cursorEle.remove();
  styleTag && styleTag.remove();
  styleTag = null;
  cursorEle = null;

  // iterate nodesMap
  registeredNodeSet.forEach((node) => unregisterNode(node));
}

/**
 * Update current Configuration
 * @param _config
 */
function updateConfig(_config: IpadCursorConfig) {
  if ("adsorptionStrength" in _config) {
    config.adsorptionStrength = Utils.clamp(
      _config.adsorptionStrength || 10,
      0,
      30
    );
  }
  return Utils.mergeDeep(config, _config);
}

/**
 * Create style tag
 * @returns
 */
function createStyle() {
  if (styleTag) return;
  styleTag = document.createElement("style");
  styleTag.innerHTML = `
    body, * {
      cursor: none;
    }
    .${config.className!.split(/\s+/).join(".")} {
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

/**
 * create cursor element, append to body
 * @returns
 */
function createCursor() {
  if (isServer) return;
  cursorEle = document.createElement("div");
  cursorEle.classList.add(config.className!);
  document.body.appendChild(cursorEle);
  resetCursorStyle();
}

/**
 * update cursor position, request animation frame
 * @returns
 */
function updateCursorPosition() {
  if (isServer || !cursorEle) return;
  if (!isBlockActive) {
    updateCursorStyle("--cursor-x", `${position.x}px`);
    updateCursorStyle("--cursor-y", `${position.y}px`);
  }
  window.requestAnimationFrame(updateCursorPosition);
}

/**
 * get all hover targets
 * @returns
 */
function queryAllTargets() {
  if (isServer || !ready) return [];
  return document.querySelectorAll("[data-cursor]");
}

/**
 * Detect all interactive elements in the page
 * Update the binding of events, remove listeners for elements that are removed
 * @returns
 */
function updateCursor() {
  if (isServer || !ready) return;
  const nodesMap = new Map();
  // addDataCursorText(document.body.childNodes)
  const nodes = queryAllTargets();
  nodes.forEach((node) => {
    nodesMap.set(node, true);
    if (registeredNodeSet.has(node)) return;
    registerNode(node);
  });

  registeredNodeSet.forEach((node) => {
    if (nodesMap.has(node)) return;
    unregisterNode(node);
  });
}

function registerNode(node: Element) {
  let type = node.getAttribute("data-cursor") as ICursorType;
  registeredNodeSet.add(node);
  if (type === "text") registerTextNode(node);
  if (type === "block") registerBlockNode(node);
  else registeredNodeSet.delete(node);
}

function unregisterNode(node: Element) {
  registeredNodeSet.delete(node);
  eventMap.get(node)?.forEach(({ event, handler }: any) => {
    node.removeEventListener(event, handler);
  });
  eventMap.delete(node);
  (node as HTMLElement).style.setProperty("transform", "none");
}

function extractCustomStyle(node: Element) {
  const customStyleRaw = node.getAttribute("data-cursor-style");
  const styleObj: Record<string, any> = {};
  if (customStyleRaw) {
    customStyleRaw.split(/(;)/).forEach((style) => {
      const [key, value] = style.split(":").map((s) => s.trim());
      styleObj[key] = value;
    });
  }
  return styleObj;
}

/**
 * + ---------------------- +
 * | TextNode               |
 * + ---------------------- +
 */
function registerTextNode(node: Element) {
  let timer: any;
  function onTextOver(e: Event) {
    timer && clearTimeout(timer);
    isTextActive = true;
    // for some edge case, two ele very close
    timer = setTimeout(() => (isTextActive = true));
    applyTextCursor(e.target as HTMLElement);
  }
  function onTextLeave() {
    timer && clearTimeout(timer);
    timer = setTimeout(() => (isTextActive = false));
    resetCursorStyle();
  }
  node.addEventListener("mouseover", onTextOver, { passive: true });
  node.addEventListener("mouseleave", onTextLeave, { passive: true });
  eventMap.set(node, [
    { event: "mouseover", handler: onTextOver },
    { event: "mouseleave", handler: resetCursorStyle },
  ]);
}

/**
 * + ---------------------- +
 * | BlockNode              |
 * + ---------------------- +
 */
function registerBlockNode(_node: Element) {
  const node = _node as HTMLElement;
  node.addEventListener("mouseenter", onBlockEnter, { passive: true });
  node.addEventListener("mousemove", onBlockMove, { passive: true });
  node.addEventListener("mouseleave", onBlockLeave, { passive: true });

  let timer: any;

  function onBlockEnter() {
    const rect = node.getBoundingClientRect();
    timer && clearTimeout(timer);
    isBlockActive = true;
    // for some edge case, two ele very close
    timer = setTimeout(() => (isBlockActive = true));
    const blockPadding = config.blockPadding || 0;
    let padding = blockPadding;
    if (padding === "auto") {
      const size = Math.min(rect.width, rect.height);
      padding = Math.max(2, Math.floor(size / 25));
    }

    cursorEle!.classList.add("focus");
    updateCursorStyle("--cursor-x", `${rect.left + rect.width / 2}px`);
    updateCursorStyle("--cursor-y", `${rect.top + rect.height / 2}px`);
    updateCursorStyle("--cursor-width", `${rect.width + padding * 2}px`);
    updateCursorStyle("--cursor-height", `${rect.height + padding * 2}px`);

    const styleToUpdate: IpadCursorStyle = {
      ...(config.blockStyle || {}),
      ...extractCustomStyle(node),
    };

    if (styleToUpdate.durationPosition === undefined) {
      styleToUpdate.durationPosition =
        styleToUpdate.durationBase ?? config.normalStyle?.durationBase;
    }

    updateCursorStyle(Utils.style2Vars(styleToUpdate));

    toggleNodeTransition(true);
    node.style.setProperty(
      "transform",
      "translate(var(--translateX), var(--translateY))"
    );
  }
  function onBlockMove() {
    if (!isBlockActive) {
      onBlockEnter();
    }
    const rect = node.getBoundingClientRect();
    const halfHeight = rect.height / 2;
    const topOffset = (position.y - rect.top - halfHeight) / halfHeight;
    const halfWidth = rect.width / 2;
    const leftOffset = (position.x - rect.left - halfWidth) / halfWidth;

    const strength = config.adsorptionStrength || 10;
    updateCursorStyle(
      "--cursor-translateX",
      `${leftOffset * ((rect.width / 100) * strength)}px`
    );
    updateCursorStyle(
      "--cursor-translateY",
      `${topOffset * ((rect.height / 100) * strength)}px`
    );

    toggleNodeTransition(false);
    node.style.setProperty(
      "--translateX",
      `${leftOffset * ((rect.width / 100) * strength)}px`
    );
    node.style.setProperty(
      "--translateY",
      `${topOffset * ((rect.height / 100) * strength)}px`
    );
  }
  function onBlockLeave() {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      isBlockActive = false;
      cursorEle && cursorEle.classList.remove("focus");
    });
    resetCursorStyle();
    toggleNodeTransition(true);
    node.style.setProperty("transform", "translate(0px, 0px)");
  }

  function toggleNodeTransition(enable?: boolean) {
    const duration = enable
      ? Utils.getDuration(
        config?.blockStyle?.durationPosition ??
        config?.blockStyle?.durationBase ??
        config?.normalStyle?.durationBase ??
        "0.23s"
      )
      : "";
    node.style.setProperty(
      "transition",
      duration ? `all ${duration} cubic-bezier(.58,.09,.46,1.46)` : "none"
    );
  }

  eventMap.set(node, [
    { event: "mouseenter", handler: onBlockEnter },
    { event: "mousemove", handler: onBlockMove },
    { event: "mouseleave", handler: onBlockLeave },
  ]);
}

function resetCursorStyle() {
  updateCursorStyle(Utils.style2Vars(config.normalStyle || {}));
}

function applyTextCursor(sourceNode: HTMLElement) {
  updateCursorStyle(Utils.style2Vars(config.textStyle || {}));
  const fontSize = window.getComputedStyle(sourceNode).fontSize;
  updateCursorStyle("--cursor-font-size", fontSize);
  updateCursorStyle(
    Utils.style2Vars({
      ...config.textStyle,
      ...extractCustomStyle(sourceNode),
    })
  );
}

/**
 * Create custom style that can be bound to `data-cursor-style`
 * @param style
 */
function customCursorStyle(style: IpadCursorStyle & Record<string, any>) {
  return Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}
const CursorType = {
  TEXT: "text" as ICursorType,
  BLOCK: "block" as ICursorType,
};

const exported = {
  CursorType,
  initCursor,
  updateCursor,
  disposeCursor,
  updateConfig,
  customCursorStyle,
};
export {
  CursorType,
  initCursor,
  updateCursor,
  disposeCursor,
  updateConfig,
  customCursorStyle,
};
export default exported;
