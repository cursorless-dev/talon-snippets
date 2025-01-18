import { globSync } from "glob";
import Mocha from "mocha";
import * as path from "node:path";

function run() {
    const mocha = new Mocha({
        ui: "tdd",
        color: true,
    });

    const cwd = path.resolve(__dirname);

    const files = globSync("**/**.test.ts", { cwd }).sort();

    files.forEach((f) => mocha.addFile(path.resolve(cwd, f)));

    mocha.run((failures) => {
        if (failures > 0) {
            new Error(`${failures} tests failed.`);
        }
    });
}

run();
