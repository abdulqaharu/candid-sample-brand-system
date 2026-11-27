/**
 * Loads the Hairline kernel and one figure from public/hairline. Both are the
 * skill's own plain scripts, served as they are: the kernel defines a global
 * `HL`, and each figure ends by calling a global `hairline({ ... })`.
 */
export type Figure = {
  name: string;
  /** Slider values at intensity 0, 0.5 and 1. The middle one is the default. */
  range: [number, number, number];
  mount: (
    parts: { stage: HTMLElement; svg: SVGElement; read: { textContent: string | null } },
    value: number,
  ) => { destroy: () => void };
};

type Kernel = {
  inject: (root: Document) => void;
  mk: (tag: string, attrs: Record<string, string>, parent: Element) => SVGElement;
};

declare global {
  interface Window {
    HL?: Kernel;
    hairline?: (figure: Figure) => void;
  }
}

const declared = new Map<string, (figure: Figure) => void>();
const figures = new Map<string, Promise<Figure>>();
let kernel: Promise<void> | undefined;

function addScript(src: string, type: "text/javascript" | "module") {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = type;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error(`Could not load ${src}`));
    };
    document.head.appendChild(script);
  });
}

export function loadFigure(name: string) {
  let figure = figures.get(name);
  if (!figure) {
    window.hairline = (declaration) => declared.get(declaration.name)?.(declaration);
    kernel ??= addScript("/hairline/kernel.js", "text/javascript");
    figure = kernel.then(
      () =>
        new Promise<Figure>((resolve, reject) => {
          declared.set(name, resolve);
          addScript(`/hairline/${name}.js`, "module").catch(reject);
        }),
    );
    figures.set(name, figure);
  }
  return figure;
}
