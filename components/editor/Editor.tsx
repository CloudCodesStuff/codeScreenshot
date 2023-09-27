import React from "react";
import CodeMirror, { EditorView, ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { aura } from '@uiw/codemirror-theme-aura';
import { historyField } from '@codemirror/commands';
import { langs } from "@/lib/langs";
import { javascript } from "@codemirror/lang-javascript";
import { lightTheme, darkTheme } from "./themes"; // Import both light and dark themes
import { getExtensions } from "./get-extensions";

export type EditorProps = {
    language?: string;
    darkMode?: boolean; // Add the darkMode prop
} & ReactCodeMirrorProps;

const stateFields = { history: historyField };

const Editor = ({ language = "javascript", darkMode = false, ...rest }: EditorProps) => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const serializedState = localStorage.getItem('myEditorState');
        const value = localStorage.getItem('myValue') || '';



        const extensions = getExtensions(language);

        // Determine the theme based on darkMode prop
        const theme = darkMode ? darkTheme : lightTheme;

        return (
            <CodeMirror
                theme={theme} className="text-base" {...rest} value={value}
                extensions={[extensions, EditorView.lineWrapping]}
                initialState={
                    serializedState
                        ? {
                            json: JSON.parse(serializedState || ''),
                            fields: stateFields,
                        }
                        : undefined
                }
                onChange={(value, viewUpdate) => {
                    localStorage.setItem('myValue', value);

                    const state = viewUpdate.state.toJSON(stateFields);
                    localStorage.setItem('myEditorState', JSON.stringify(state));
                }}
            />
        );
    }
};

export default Editor;
