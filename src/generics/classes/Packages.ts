import * as glob from '@actions/glob'
import {Filesystem } from "../../config"
import {ISpecification, IPackages, IResult, ISpecificationHandler} from "../interfaces"
import { Result } from './Result'
import { Specification } from './Specification'
import { SpecificationHandler } from './SpecificationHandler'


//--
// new Package<Manifest, Lock>
export class Packages <M extends ISpecification<ISpecificationHandler, IResult>,
                       L extends ISpecification<ISpecificationHandler, IResult> >
                            implements IPackages<M, L>{
    name: string = ''
    manifest: M
    lock?: L

    constructor(
        name: string,
        manifest: M,
        lock?: L
         ) {

        this.name = name
        this.manifest = manifest
        if(typeof lock !== 'undefined') this.lock = lock
    }

}
