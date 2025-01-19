import type { SnippetDocument } from "./types";

/**
 * Get the header snippet for a snippet file (list of documents) if it exists.
 * A header snippet is a snippet document that is first in the file and has no body.
 */
export function getHeaderSnippet(snippetDocuments: SnippetDocument[]): SnippetDocument | undefined {
    return snippetDocuments.length > 0 && snippetDocuments[0].body == null
        ? snippetDocuments[0]
        : undefined;
}
