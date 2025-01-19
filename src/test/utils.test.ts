import assert from "node:assert";
import type { SnippetDocument } from "../types";
import { getHeaderSnippet } from "../utils";

suite("utils", () => {
    test("With header", testWithHeader);
    test("Without header", testWithoutHeader);
});

function testWithHeader() {
    const fixture: SnippetDocument[] = [
        {
            name: "mySnippet",
            variables: [],
        },
        {
            variables: [],
            body: [],
        },
    ];
    const expected = fixture[0];
    const actual = getHeaderSnippet(fixture);
    assert.equal(actual, expected);
}

function testWithoutHeader() {
    const fixture: SnippetDocument[] = [
        {
            name: "mySnippet1",
            variables: [],
            body: [],
        },
        {
            name: "mySnippet2",
            variables: [],
            body: [],
        },
    ];
    const expected = undefined;
    const actual = getHeaderSnippet(fixture);
    assert.equal(actual, expected);
}
