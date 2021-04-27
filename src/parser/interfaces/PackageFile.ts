import { Spec } from "./Spec";

export interface PackageFile {
    spec: Spec
    files: string[]
    selectors: string[]
    // gets all the files that match the spec
    load(): Promise<PackageFile>
}
