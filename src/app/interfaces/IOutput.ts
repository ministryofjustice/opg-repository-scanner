import { PackageInfo, Report } from "../classes";

// Main interface for each parser
export interface IOutput {
    report:Report

    set(report:Report): IOutput
    // returns filename + content combinations
    process(): Map<string, string>
    save(): Promise<string[]>
}
