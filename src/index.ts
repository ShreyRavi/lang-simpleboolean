import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"
import {completeFromList} from "@codemirror/autocomplete"

export const simplebooleanLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        "AND OR NOT": t.operatorKeyword,
        Operator: t.operator,
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

export const exampleCompletion = simplebooleanLanguage.data.of({
  autocomplete: completeFromList([
    {label: "AND", type: "keyword"},
    {label: "OR", type: "keyword"},
    {label: "NOT", type: "keyword"}
  ])
})

export function simpleboolean() {
  return new LanguageSupport(simplebooleanLanguage)
}
