import type { SnippetDocument, SnippetVariable } from "./types";

export function serializeSnippetFile(snippetDocuments: SnippetDocument[]): string {
    const result = snippetDocuments
        .map((s) => getDocumentText(s))
        // Remove empty documents
        .filter(Boolean)
        .join("\n---\n\n");

    return result ? result + "\n---\n" : "";
}

function getDocumentText(document: SnippetDocument): string {
    const parts: string[] = [
        getOptionalPairString("name", document.name),
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

    if (document.body != null) {
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
