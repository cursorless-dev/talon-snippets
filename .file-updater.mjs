import { updater } from "file-updater";
import {
    updateGitignore,
    updateLicense,
    updatePrettierignore,
    updateVscodeSettings,
} from "ts-archetype";

const config = {
    author: "Andreas Arvidsson",
    authorRepository: "https://github.com/AndreasArvidsson",
    funding: "https://github.com/sponsors/AndreasArvidsson",
    projectName: "talon-rpc",
    displayName: "Talon rpc",
    projectType: "nodeLib",
};

export default async (workspaceDir) => {
    await updater({
        ".gitignore": updateGitignore(config),
        ".prettierignore": updatePrettierignore(config),
        ".vscode/settings.json": updateVscodeSettings(config),
        LICENSE: updateLicense(config),
    });
};
