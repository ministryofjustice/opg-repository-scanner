import {Filesystem} from "../../config";
import {ISpecification} from "./ISpecification"

export interface IPackages<M,L>{
    name: string
    manifest: M
    lock?: L

}
