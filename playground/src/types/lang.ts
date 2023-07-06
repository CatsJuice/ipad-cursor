export type Lang = "js" | "ts" | "vue" | "html" | "yarn" | "npm" | "pnpm";
export type Code = {
  lang: Lang;
  code: string;
  title?: string;
};
