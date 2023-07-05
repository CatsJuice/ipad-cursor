const position = { x: 0, y: 0 }
const isServer = typeof document === 'undefined'
const activeNodes = new Set<Element>()
const eventMap = new Map()

const config = {
  adsorptionStrength: 10,
  cursorClassName: 'cursor',
}
const { adsorptionStrength, cursorClassName } = config

const normalStyle = {
  '--cursor-width': '20px',
  '--cursor-height': '20px',
  '--cursor-radius': '10px',
  '--cursor-duration': '0.23s',
  '--cursor-position-duration': '0s',
  '--cursor-blur-duration': '0s',
  '--cursor-bg': 'rgba(150, 150, 150, 0.2)',
  '--cursor-border': '1px solid rgba(100, 100, 100, 0.1)',
  '--cursor-z-index': '9999',
  '--cursor-font-size': '1rem',
  '--cursor-translateX': '0px',
  '--cursor-translateY': '0px',
  '--cursor-scale': '1',
  '--cursor-bg-blur': '4px',
  '--cursor-bg-saturate': '180%',
}
const textStyle = {
  '--cursor-width': '4px',
  '--cursor-height': '1.2em',
  '--cursor-border': '0px solid rgba(100, 100, 100, 0)',
  '--cursor-bg': 'rgba(100, 100, 100, 0.3)',
  '--cursor-blur-duration': '1s',
}
const rectStyle = {
  '--cursor-bg': 'rgba(100, 100, 100, 0.1)',
  '--cursor-border': '1px solid rgba(100, 100, 100, 0.05)',
  '--cursor-bg-blur': '0px',
  '--cursor-blur-duration': '1s',
  '--cursor-bg-saturate': '120%',

}

let ready = false
let cursor: HTMLDivElement
let active = false

function updateStyle(keyOrObj: string | Record<string, any>, value?: any) {
  if (!cursor)
    return
  if (typeof keyOrObj === 'string') {
    cursor.style.setProperty(keyOrObj, value)
  }
  else {
    Object.entries(keyOrObj).forEach(([key, value]) => {
      cursor.style.setProperty(key, value)
    })
  }
}

export function init() {
  if (isServer || ready)
    return
  ready = true
  window.addEventListener('mousemove', (e) => {
    position.x = e.clientX
    position.y = e.clientY
  })
  createCursor()
  updateCursorPosition()

  const styleTag = document.createElement('style')
  styleTag.innerHTML = `
    body, * {
      cursor: none;
    }
    .${cursorClassName.split(/\s+/).join('.')} {
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
  `
  document.head.appendChild(styleTag)
}

/**
 * create cursor element, append to body
 * @returns
 */
function createCursor() {
  if (isServer)
    return
  cursor = document.createElement('div')
  cursor.classList.add(cursorClassName)
  updateStyle(normalStyle)
  document.body.appendChild(cursor)
}

/**
 * update cursor position, request animation frame
 * @returns
 */
function updateCursorPosition() {
  if (isServer || !cursor)
    return
  if (!active) {
    updateStyle('--cursor-x', `${position.x}px`)
    updateStyle('--cursor-y', `${position.y}px`)
  }
  window.requestAnimationFrame(updateCursorPosition)
}

function queryAllNodes() {
  if (isServer || !ready)
    return []
  const nodes = document.querySelectorAll('[data-cursor]')
  return nodes
}

export function register() {
  if (isServer || !ready)
    return
  const nodes = queryAllNodes()
  const nodesMap = new Map()
  nodes.forEach((node) => {
    nodesMap.set(node, true)
    if (activeNodes.has(node))
      return
    registerNode(node)
  })

  activeNodes.forEach((node) => {
    if (nodesMap.has(node))
      return
    unregisterNode(node)
  })
}

function registerNode(node: Element) {
  const type = node.getAttribute('data-cursor')
  activeNodes.add(node)
  if (type === 'text')
    registerTextNode(node)
  if (type === 'rect')
    registerRectNode(node)
}

function unregisterNode(node: Element) {
  activeNodes.delete(node)
  eventMap.get(node)?.forEach(({ event, handler }: any) => {
    node.removeEventListener(event, handler)
  })
  eventMap.delete(node)
}

function registerTextNode(node: Element) {
  function onTextOver(e: Event) {
    updateStyle(textStyle)
    const dom = e.target as HTMLElement
    const fontSize = window.getComputedStyle(dom).fontSize
    updateStyle('--cursor-font-size', fontSize)
  }
  node.addEventListener('mouseover', onTextOver, { passive: true })
  node.addEventListener('mouseleave', recoverStyle, { passive: true })
  eventMap.set(node, [
    { event: 'mouseover', handler: onTextOver },
    { event: 'mouseleave', handler: recoverStyle },
  ])
}

function registerRectNode(_node: Element) {
  const node = _node as HTMLElement
  node.addEventListener('mouseenter', onRectEnter, { passive: true })
  node.addEventListener('mousemove', onRectMove, { passive: true })
  node.addEventListener('mouseleave', onRectLeave, { passive: true })

  function onRectEnter() {
    const rect = node.getBoundingClientRect()
    active = true

    cursor.classList.add('focus')
    updateStyle('--cursor-position-duration', '0.1s')
    updateStyle('--cursor-radius', '8px')
    updateStyle('--cursor-x', `${rect.left + rect.width / 2}px`)
    updateStyle('--cursor-y', `${rect.top + rect.height / 2}px`)
    updateStyle('--cursor-width', `${rect.width}px`)
    updateStyle('--cursor-height', `${rect.height}px`)

    const styleToUpdate: any = { ...rectStyle }
    const customStyleRaw = node.getAttribute('data-cursor-style')
    if (customStyleRaw) {
      customStyleRaw.split(';').forEach((style) => {
        const [key, value] = style.split(':').map(s => s.trim())
        styleToUpdate[key] = value
      })
    }

    updateStyle(styleToUpdate)

    node.style.setProperty('transform', 'translate(var(--translateX), var(--translateY))')
  }
  function onRectMove() {
    const rect = node.getBoundingClientRect()
    const halfHeight = rect.height / 2
    const topOffset = (position.y - rect.top - halfHeight) / halfHeight
    const halfWidth = rect.width / 2
    const leftOffset = (position.x - rect.left - halfWidth) / halfWidth

    updateStyle('--cursor-translateX', `${leftOffset * (rect.width / 100 * adsorptionStrength)}px`)
    updateStyle('--cursor-translateY', `${topOffset * (rect.height / 100 * adsorptionStrength)}px`)

    node.style.setProperty('--translateX', `${leftOffset * (rect.width / 100 * adsorptionStrength)}px`)
    node.style.setProperty('--translateY', `${topOffset * (rect.height / 100 * adsorptionStrength)}px`)
  }
  function onRectLeave() {
    setTimeout(() => {
      active = false
      cursor.classList.remove('focus')
    })
    updateStyle(normalStyle)
    node.style.setProperty('transform', 'translate(0px, 0px)')
  }

  eventMap.set(node, [
    { event: 'mouseenter', handler: onRectEnter },
    { event: 'mousemove', handler: onRectMove },
    { event: 'mouseleave', handler: onRectLeave },
  ])
}

function recoverStyle() {
  updateStyle(normalStyle)
}

