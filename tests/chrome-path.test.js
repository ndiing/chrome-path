const chromePath = require("../src/chrome-path");

describe("example", () => {
    test("chrome path", () => {
        const result = chromePath();
        expect(result).toBe("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe");
    });
});
