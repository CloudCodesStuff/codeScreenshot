import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";

export const langs = {
	javascript,
	jsx: () => javascript({ jsx: true }),
	typescript: () => javascript({ typescript: true }),
	tsx: () => javascript({ jsx: true, typescript: true }),
	json,
	html,
	css,
};
