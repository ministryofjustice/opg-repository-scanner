import {Filesystem} from "../../config";
import {ISpecification} from "./ISpecification"
import { IResult } from './IResult'

export interface IPackages<M,L>{
    name: string
    manifest: M
    lock?: L

    // returns all packages found
    get(combine: boolean): Promise<IResult[]>
}
