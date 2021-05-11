import { PackageInfo, Report } from "../classes";

// Main interface for each parser
export interface IOutput {
    report:Report

    set(report:Report): IOutput
    save(): Promise<string[]>
}
