import { createTheme, Settings } from "@uiw/codemirror-themes";
import { tags } from "@lezer/highlight";

// const customStyles = ({ darkMode, showLineNumber, fontSize }: ThemeProps) =>
//   EditorView.theme(
//     {
//       "& .cm-content, & .cm-gutter": {
//         minHeight: "100px",
//       },
//       "& .cm-scroller": {
//         paddingTop: "8px",
//         paddingBottom: "16px",
//         paddingInline: "16px",
//         fontFamily: "'Roboto Mono', monospace",
//         fontSize,
//       },
//       "&.cm-editor.cm-focused": {
//         outline: "none",
//       },
//       "&.cm-focused .cm-cursor": {
//         borderLeftColor: "#FACC15",
//       },
//       "& .cm-selectionBackground": {
//         background: "transparent",
//       },
//       "&.cm-focused .cm-selectionBackground, ::selection": {
//         backgroundColor: "rgba(255,255,255,0.2)",
//       },
//       "& .cm-gutters": {
//         backgroundColor: "transparent",
//         border: "none",
//         display: !showLineNumber ? "none" : null,
//       },
//       "& .cm-lineNumbers .cm-gutterElement": {
//         padding: "0 10px 0 2px",
//       },
//       "& .cm-foldGutter": {
//         display: "none !important",
//       },
//       "& .cm-activeLine, & .cm-activeLineGutter": {
//         backgroundColor: "transparent",
//       },
//     },
//     { dark: darkMode }
//   );

// const darkHighlightStyle = HighlightStyle.define(
//   [
//     { tag: tags.keyword, color: "#4ff0ff" },
//     {
//       tag: tags.comment,
//       color: "rgba(255, 255, 255, 0.3)",
//       fontStyle: "italic",
//     },
//     { tag: tags.bracket, color: "#ffc248" },
//     { tag: tags.attributeName, color: "#d47dff" },
//     { tag: tags.angleBracket, color: "#ffffff" },
//     { tag: tags.variableName, color: "#ffffff" },
//     { tag: tags.string, color: "#c0ff5b" },
//     { tag: tags.number, color: "#ff808a" },
//     { tag: tags.bool, color: "#ff808a" },
//     { tag: tags.punctuation, color: "#4ff0ff" },
//     { tag: tags.tagName, color: "#ff808a" },
//     { tag: tags.squareBracket, color: "#ff808a" },
//     { tag: tags.propertyName, color: "#d47dff" },
//     { tag: tags.typeName, color: "#5cabff" },
//   ],
//   { themeType: "dark" }
// );

// const lightHighlightStyle = HighlightStyle.define(
//   [
//     { tag: tags.keyword, color: "#1a6eff" },
//     {
//       tag: tags.comment,
//       color: "rgba(0, 0, 0, 0.3)",
//       fontStyle: "italic",
//     },
//     { tag: tags.bracket, color: "#FB923C" },
//     { tag: tags.angleBracket, color: "#334155" },
//     { tag: tags.variableName, color: "#334155" },
//     { tag: tags.string, color: "#379d6c" },
//     { tag: tags.number, color: "#ff4656" },
//     { tag: tags.punctuation, color: "#1a6eff" },
//     { tag: tags.squareBracket, color: "#ff9f46" },
//     { tag: tags.tagName, color: "#ff4656" },
//     { tag: tags.attributeName, color: "#a327e2" },
//     { tag: tags.propertyName, color: "#a327e2" },
//     { tag: tags.typeName, color: "#5cabff" },
//     { tag: tags.bool, color: "#ff4656" },
//   ],
//   { themeType: "light" }
// );

// export type ThemeProps = {
//   darkMode: boolean;
//   showLineNumber: boolean;
//   fontSize: string | number | null;
// };

// export const getTheme = (props: ThemeProps) => [
//   customStyles(props),
//   syntaxHighlighting(props.darkMode ? darkHighlightStyle : lightHighlightStyle),
// ];

const defaultSettings: Settings = {
    background: "transparent",
    foreground: "#4D4D4C",
    caret: "#facc15",
    selection: "#1e293b80",
    selectionMatch: "transparent",
    gutterBackground: "transparent",
    gutterForeground: "#4D4D4C",
    gutterBorder: "transparent",
    lineHighlight: "transparent",
};

export const lightTheme = createTheme({
    theme: "light",
    settings: {
        ...defaultSettings,
        foreground: "#1e293b",
        gutterForeground: "#1e293b",
        selection: "rgba(0,0,0,0.1)",
    },
    styles: [
        { tag: tags.keyword, color: "#1a6eff" },
        { tag: tags.comment, color: "#475569" },
        { tag: tags.bracket, color: "#FB923C" },
        { tag: tags.angleBracket, color: "#334155" },
        { tag: tags.variableName, color: "#334155" },
        { tag: tags.string, color: "#379d6c" },
        { tag: tags.number, color: "#ff4656" },
        { tag: tags.punctuation, color: "#1a6eff" },
        { tag: tags.squareBracket, color: "#ff9f46" },
        { tag: tags.tagName, color: "#ff4656" },
        { tag: tags.attributeName, color: "#a327e2" },
        { tag: tags.propertyName, color: "#a327e2" },
        { tag: tags.typeName, color: "#5cabff" },
        { tag: tags.bool, color: "#ff4656" },
    ],
});

export const darkTheme = createTheme({
    theme: "dark",
    settings: {
        ...defaultSettings,
        foreground: "#fff",
        gutterForeground: "#fff",
        selection: "rgba(255,255,255,0.1)",
    },
    styles: [
        { tag: tags.keyword, color: "#4ff0ff" },
        { tag: tags.comment, color: "#94a3b8" },
        { tag: tags.bracket, color: "#ffc248" },
        { tag: tags.attributeName, color: "#d47dff" },
        { tag: tags.angleBracket, color: "#ffffff" },
        { tag: tags.variableName, color: "#ffffff" },
        { tag: tags.string, color: "#c0ff5b" },
        { tag: tags.number, color: "#ff808a" },
        { tag: tags.bool, color: "#ff808a" },
        { tag: tags.punctuation, color: "#4ff0ff" },
        { tag: tags.tagName, color: "#ff808a" },
        { tag: tags.squareBracket, color: "#ff808a" },
        { tag: tags.propertyName, color: "#d47dff" },
        { tag: tags.typeName, color: "#5cabff" },
    ],
});