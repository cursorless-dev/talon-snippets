export interface SnippetDocument {
    name?: string;
    description?: string;
    phrases?: string[];
    insertionScopes?: string[];
    languages?: string[];
    body?: string[];
    variables: SnippetVariable[];
}

export interface SnippetVariable {
    name: string;
    insertionFormatters?: string[];
    wrapperPhrases?: string[];
    wrapperScope?: string;
}
