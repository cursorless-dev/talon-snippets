import type { Snippet, SnippetFile, SnippetHeader, SnippetVariable } from "./types";

export function serializeSnippetFile(snippetFile: SnippetFile): string {
    const documents: string[] = [];

    if (snippetFile.header != null) {
        documents.push(getDocumentText(snippetFile.header));
    }

    documents.push(...snippetFile.snippets.map(getDocumentText));

    // Remove empty documents
    const result = documents.filter(Boolean).join("\n---\n\n");

    return result ? result + "\n---\n" : "";
}

function getDocumentText(document: SnippetHeader | Snippet): string {
    const parts: string[] = [
        getOptionalPairString("name", document.name),
        getOptionalPairString("description", document.description),
        getOptionalPairString("language", document.languages),
        getOptionalPairString("phrase", document.phrases),
        getOptionalPairString("insertionScope", document.insertionScopes),
    ].filter(Boolean);

    if (document.variables.length > 0) {
        if (parts.length > 0) {
            parts.push("");
        }
        parts.push(...getSortedVariables(document.variables));
    }

    if ("body" in document) {
        parts.push("-", ...document.body);
    }

    return parts.join("\n");
}

function getSortedVariables(variables: SnippetVariable[]): string[] {
    const result = [...variables];
    result.sort(compareVariables);
    return result
        .flatMap((variable) => [
            getOptionalPairString(
                `$${variable.name}.insertionFormatter`,
                variable.insertionFormatters,
            ),
            getOptionalPairString(`$${variable.name}.wrapperPhrase`, variable.wrapperPhrases),
            getOptionalPairString(`$${variable.name}.wrapperScope`, variable.wrapperScope),
        ])
        .filter(Boolean);
}

function getOptionalPairString(key: string, value: string | string[] | undefined): string {
    if (value == null) {
        return "";
    }
    if (Array.isArray(value)) {
        return `${key}: ${value.join(" | ")}`;
    }
    return `${key}: ${value}`;
}

function compareVariables(a: SnippetVariable, b: SnippetVariable): number {
    if (a.name === "0") {
        return 1;
    }
    if (b.name === "0") {
        return -1;
    }
    return a.name.localeCompare(b.name);
}
