import { PackageFile } from "../../config";
import { Result } from "../classes/Result";

export interface Parser {
    get_results( pkg:PackageFile, selector:string, packages:object[] ): Promise<Result[]>
    add_results(results: Result[]): void
    add_result(result: Result): void
    parse(): Promise<void>
}
