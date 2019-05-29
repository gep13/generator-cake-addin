import BaseGenerator from "../utils/base-generator";
import { GeneratorPrompts, licenses } from "../utils/generator-prompts";

const promptOptions = [
  "projectName",
  "repositoryOwner",
  "projectMaintainer",
  "description",
  "shortDescription",
  "licenseType",
  "author",
  "enableTravis",
  "enableContributing",
];

export = class ReadmeGenerator extends BaseGenerator {
  public async prompting() {
    for (const prompt of promptOptions) {
      if (
        prompt === "enableTravis" &&
        this.fs.exists(this.destinationPath(".travis.yml"))
      ) {
        this.setValue(prompt, true);
      } else if (
        prompt === "enableContributing" &&
        this.fs.exists(this.destinationPath("CONTRIBUTING.md"))
      ) {
        this.setValue(prompt, true);
      } else {
        this.addPrompt(GeneratorPrompts.getPrompt(prompt), true);
      }
    }

    await this.callPrompts();

    const repoOwner = this.getValue<string>("repositoryOwner") as string;
    if (repoOwner === "cake-contrib") {
      this.setValue("appveyorAccount", "cakecontrib");
    } else {
      this.setValue(
        "appveyorAccount",
        repoOwner.replace("-", "").toLowerCase()
      );
    }
    const fullProjectName = `Cake.${this.getValue("projectName")}`;
    this.setValue("fullProjectName", fullProjectName);
    this.setValue(
      "appveyorProjectName",
      fullProjectName.replace(".", "-").toLowerCase()
    );

    const licenseTypeSpdx = this.getValue<string>("licenseType", "MIT");
    const licenseType = licenses.find((value) => {
      return value.Spdx === licenseTypeSpdx;
    });

    this.setValue("licenseType", licenseType);
  }

  public writing() {
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      this.allValues
    );
  }

  protected _setup(): void {
    for (const option of promptOptions) {
      this.option(option, GeneratorPrompts.getOption(option));
    }
  }
};
