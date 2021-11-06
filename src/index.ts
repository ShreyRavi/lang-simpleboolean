import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"
import {completeFromList, Completion} from "@codemirror/autocomplete"

export const simpleBooleanLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        "AND": t.operatorKeyword,
        "OR": t.operatorKeyword,
        "NOT": t.operatorKeyword,
        Identifier: t.variableName,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

/**
 * Customizable autocomplete function for lang-simpleboolean
 * @param completeFromListParameter Completion[]
 * @returns CodeMirror autocomplete
 */
export const simpleBooleanCompletion = (completeFromListParameter: Completion[] = []) => simpleBooleanLanguage.data.of({
  autocomplete: completeFromList(completeFromListParameter.concat([
    {label: "AND", type: "keyword"},
    {label: "OR", type: "keyword"},
    {label: "NOT", type: "keyword"}
  ]))
})

export function simpleBoolean() {
  return new LanguageSupport(simpleBooleanLanguage)
}
