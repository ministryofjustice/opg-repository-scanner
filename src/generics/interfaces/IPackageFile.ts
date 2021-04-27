import {Filesystem} from "../../config";
import {ISpecification} from "./ISpecification"

export interface IPackageFile<S>{
    filesystem: Filesystem

    specification<ISpecification>(spec: (new () => S)): S

}
