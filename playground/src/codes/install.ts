import { packageName } from "../constants";
import { Code } from "../types/lang";

export const installCodes: Code[] = [
  {
    lang: "pnpm",
    title: "Pnpm",
    code: `pnpm i ${packageName}`,
  },
  {
    lang: "npm",
    title: 'NPM',
    code: `npm i ${packageName} --save`,
  },
  {
    lang: "yarn",
    title: "Yarn",
    code: `yarn add ${packageName}`,
  },
];
