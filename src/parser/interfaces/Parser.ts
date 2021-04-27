import { PackageFile } from "./Packagefile";
import { Spec } from "./Spec";

export interface Parser {
    //-- Manifest functions
    // get the spec
    manifest_spec(): Spec
    // manifest class
    manifest(): PackageFile

    //-- Lock functions
    // get the spec
    lock_spec(): Spec
    // get the lock
    lock(): PackageFile


    //this.manifest().load().parse()
}
