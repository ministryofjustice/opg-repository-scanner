import { Source } from "../../config";
import { IResult } from "./IResult";

// Interface to detail what a SpecificationHandler should look like
export interface ISpecificationHandler{
    source:Source
    filepattern: Required<string>
    selector: Required<string[]>
    type: Required<string>
    recursive?: string[]


    sanitise(): void
    files(): Promise<string[]>
    recurse(): Promise<void>
    process(): Promise<void>
    results(): Promise<IResult[]>
}
