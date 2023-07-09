import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const FRAMEWORK = process.env.FRAMEWORK || "index";
const DECLARATIONS = process.env.DECLARATIONS || false;
const MIN = process.env.MIN || false;

const external = ["vue"];

function createOutput() {
  if (DECLARATIONS) {
    return {
      dir: "./dist",
      format: "esm",
    };
  }
  return {
    file: `./dist/${FRAMEWORK !== "index" ? FRAMEWORK + "/" : ""}index.${
      MIN ? "min.js" : "mjs"
    }`,
    format: "esm",
  };
}

function getExt() {
  if (["react"].includes(FRAMEWORK)) return "tsx";
  return "ts";
}

const plugins = [
  typescript({
    tsconfig: "tsconfig.json",
    compilerOptions: DECLARATIONS
      ? {
          declaration: true,
          emitDeclarationOnly: true,
        }
      : {},
    rootDir: "./",
    outDir: `./dist`,
    include: ["./src/**/*"],
    exclude: ["./playground"],
  }),
];

if (MIN) {
  plugins.push(terser());
}

export default {
  external,
  input: `./src/${
    FRAMEWORK === "index" ? "" : FRAMEWORK + "/"
  }index.${getExt()}`,
  output: createOutput(),
  plugins,
};
