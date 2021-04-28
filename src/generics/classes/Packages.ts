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
    all:IResult[] = []


    constructor(
        name: string,
        manifest: M,
        lock?: L
         ) {

        this.name = name
        this.manifest = manifest
        if(typeof lock !== 'undefined') this.lock = lock
    }


    async get(): Promise<IResult[]> {
        /* eslint-disable no-console */

        let manifest:IResult[] = []
        let lock:IResult[] = []

        await this.manifest.parse()
        await this.lock?.parse()

        // console.log("--LOCK--\n", typeof this.lock, this.lock)

        manifest.push(...this.manifest.results())
        if (typeof this.lock !== 'undefined'){
            lock = this.lock?.results() ?? []
        }

        this.all.push(...manifest, ...lock)

        return new Promise<IResult[]>(resolve => {
            resolve(this.all)
        })

        /* eslint-enable no-console */
    }


}
