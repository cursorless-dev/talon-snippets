import assert from "node:assert";
import { serializeSnippetFile } from "../serializer";
import type { SnippetDocument } from "../types";

suite("serializer", () => {
    test("Key order", testKeyOrder);
    test("Name only", testNameOnly);
    test("Multiple values", testMultipleValues);
});

function testKeyOrder() {
    const fixture: SnippetDocument = {
        variables: [
            {
                wrapperScope: "statement",
                wrapperPhrases: ["try"],
                insertionFormatters: ["PASCAL_CASE"],
                name: "0",
            },
            {
                name: "foo",
                wrapperPhrases: ["bar"],
            },
            {
                wrapperScope: "statement",
                wrapperPhrases: ["catch"],
                name: "1",
            },
        ],
        insertionScopes: ["statement"],
        phrases: ["try catch"],
        languages: ["javascript"],
        name: "mySnippet",
    };

    const expected = `\
name: mySnippet
language: javascript
phrase: try catch
insertionScope: statement

$1.wrapperPhrase: catch
$1.wrapperScope: statement
$foo.wrapperPhrase: bar
$0.insertionFormatter: PASCAL_CASE
$0.wrapperPhrase: try
$0.wrapperScope: statement
---
`;

    const actual = serializeSnippetFile([fixture]);

    assert.equal(actual, expected);
}

function testNameOnly() {
    const fixture: SnippetDocument = {
        name: "mySnippet",
        variables: [],
    };

    const expected = `\
name: mySnippet
---
`;

    const actual = serializeSnippetFile([fixture]);

    assert.equal(actual, expected);
}

function testMultipleValues() {
    const fixture: SnippetDocument[] = [
        {
            name: "mySnippet",
            description: "My snippet",
            phrases: ["first", "second"],
            languages: ["javascript", "java"],
            insertionScopes: ["function", "statement"],
            body: ["foo"],
            variables: [],
        },
    ];

    const expected = `\
name: mySnippet
description: My snippet
language: javascript | java
phrase: first | second
insertionScope: function | statement
-
foo
---
`;

    const actual = serializeSnippetFile(fixture);

    assert.deepEqual(actual, expected);
}
