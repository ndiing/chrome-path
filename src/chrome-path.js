const fs = require("fs");
const path = require("path");
const os = require("os");

function chromePath() {
    const platform = os.platform();

    if (platform === "win32") {
        const prefixes = [
            process.env.LOCALAPPDATA,
            process.env.ProgramFiles,
            process.env["ProgramFiles(x86)"],
        ];
        const suffixes = [
            "Google\\Chrome\\Application\\chrome.exe",
            "Google\\Chrome Beta\\Application\\chrome.exe",
            "Google\\Chrome Dev\\Application\\chrome.exe",
            "Google\\Chrome SxS\\Application\\chrome.exe",
            "Google\\Chrome for Testing\\Application\\chrome.exe",
            "Chromium\\Application\\chrome.exe",
        ];

        for (const prefix of prefixes) {
            if (!prefix) continue;
            for (const suffix of suffixes) {
                const executablePath = path.join(prefix, suffix);
                if (fs.existsSync(executablePath)) return executablePath;
            }
        }
    } else if (platform === "darwin") {
        const targets = [
            ["Google Chrome.app", "Google Chrome"],
            ["Google Chrome Beta.app", "Google Chrome"],
            ["Google Chrome Dev.app", "Google Chrome"],
            ["Google Chrome Canary.app", "Google Chrome Canary"],
            ["Google Chrome for Testing.app", "Google Chrome for Testing"],
            ["Chromium.app", "Chromium"],
        ];

        const prefixes = [
            "/Applications",
            path.join(os.homedir(), "Applications"),
        ];

        for (const prefix of prefixes) {
            for (const [app, binary] of targets) {
                const executablePath = path.join(
                    prefix,
                    app,
                    "Contents/MacOS",
                    binary,
                );
                if (fs.existsSync(executablePath)) return executablePath;
            }
        }
    } else if (platform === "linux") {
        const executablePaths = [
            "/usr/bin/google-chrome",
            "/usr/bin/google-chrome-stable",
            "/usr/bin/google-chrome-beta",
            "/usr/bin/google-chrome-unstable",
            "/usr/bin/google-chrome-for-testing",
            "/usr/bin/chromium",
            "/usr/bin/chromium-browser",
            "/snap/bin/chromium",
            "/snap/bin/google-chrome",
            "/var/lib/flatpak/exports/bin/com.google.Chrome",
        ];

        for (const executablePath of executablePaths) {
            if (fs.existsSync(executablePath)) return executablePath;
        }
    }

    return null;
}

module.exports = chromePath;
