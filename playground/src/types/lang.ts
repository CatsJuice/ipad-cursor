export type Lang = "js" | "ts" | "vue" | "html" | "yarn" | "npm" | "pnpm" | "react";
export type Code = {
  lang: Lang;
  code: string;
  title?: string;
};
