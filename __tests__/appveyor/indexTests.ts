import * as fs from "fs";
import * as path from "path";
import * as assert from "yeoman-assert";
import * as helpers from "yeoman-test";

const baseDir = path.join(__dirname, "../../src/appveyor");

describe("generator:appveyor", () => {
  describe("defaults", () => {
    beforeEach(() => {
      return helpers
        .run(baseDir)
        .withPrompts({ scriptName: "recipe.cake", enableLinux: false });
    });

    it("creates appveyor build file", () => {
      assert.file([".appveyor.yml"]);
    });

    it("creates file with default content", () => {
      assert.equalsFileContent(
        ".appveyor.yml",
        fs.readFileSync(path.join(__dirname, "default.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("custom-cake", () => {
    beforeEach(() => {
      return helpers
        .run(baseDir)
        .withPrompts({ scriptName: "build.cake", enableLinux: false });
    });

    it("creates appveyor build file", () => {
      assert.file([".appveyor.yml"]);
    });

    it("creates file with with custom cache", () => {
      assert.equalsFileContent(
        ".appveyor.yml",
        fs.readFileSync(path.join(__dirname, "custom_cake.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("with-linux", () => {
    beforeEach(() => {
      return helpers
        .run(baseDir)
        .withPrompts({ scriptName: "recipe.cake", enableLinux: true });
    });

    it("creates appveyor build file", () => {
      assert.file([".appveyor.yml"]);
    });

    it("creates file with linux enabled", () => {
      assert.equalsFileContent(
        ".appveyor.yml",
        fs.readFileSync(path.join(__dirname, "linux_enabled.yml"), {
          encoding: "utf8",
        })
      );
    });
  });

  describe("with-linux-and-custom-cake", () => {
    beforeAll(() => {
      return helpers
        .run(baseDir)
        .withPrompts({ scriptName: "build.cake", enableLinux: true });
    });

    it("creates appveyor build file", () => {
      assert.file([".appveyor.yml"]);
    });

    it("creates file with linux enabled and custom cake cache", () => {
      assert.equalsFileContent(
        ".appveyor.yml",
        fs.readFileSync(path.join(__dirname, "linux_enabled_cake_custom.yml"), {
          encoding: "utf8",
        })
      );
    });
  });
});
