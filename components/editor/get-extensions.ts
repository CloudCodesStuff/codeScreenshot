import { langs } from "@/lib/langs";
import type { Extension } from "@codemirror/state";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { rust } from "@codemirror/lang-rust";
import { css } from "@codemirror/lang-css";
import { markdown } from "@codemirror/lang-markdown";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { wast } from "@codemirror/lang-wast";
import { lezer } from "@codemirror/lang-lezer";
import { sql } from "@codemirror/lang-sql";
import { php } from "@codemirror/lang-php";

export const getExtensions = (language: string): any[] => {
	switch (language) {
		case "json":
			return [langs.json()];
		case "javascript":
			return [langs.javascript()];
		case "coffeescript":
			return [langs.javascript()];
		case "jsx":
			return [langs.javascript({ jsx: true, typescript: true })];
		case "typescript":
			return [langs.javascript({ typescript: true })];
		case "python":
			return [python()];
		case "html":
			return [html()];
		case "markdown":
			return [markdown()];
		case "css":
			return [css()];
		case "scss":
			return [css()];
		case "rust":
			return [rust()];
		case "c++":
			return [cpp()];
		case "c":
			return [cpp()];
		case "c#":
			return [cpp()];
		case "swift":
			return [cpp()];
		case "java":
			return [java()];
		case "xml":
			return [xml()];
		case "wast":
			return [wast()];
		case "lezer":
			return [lezer()];
		case "sql":
			return [sql()];
		case "php":
			return [php()];
		default:
			return [];
	}
};
