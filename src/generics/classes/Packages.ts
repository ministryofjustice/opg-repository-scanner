import * as core from '@actions/core'
import {ISpecification, IPackages, IResult, ISpecificationHandler} from "../interfaces"


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

    // fetches the package data from both lock & manifest files and
    // merge into one result set
    // - does not do any processing
    async get(combine: boolean = true): Promise<IResult[]> {
        core.debug(`[${this.constructor.name}](get) >>>`)
        let manifest:IResult[] = []
        let lock:IResult[] = []
        let combined:IResult[] = []

        await this.manifest.parse()
        await this.lock?.parse()

        manifest.push(...this.manifest.results())
        // set lock
        if (typeof this.lock !== 'undefined') lock = this.lock?.results() ?? []

        if(combine && lock.length > 0 ) this.all = this.combine(manifest, lock)
        else this.all.push(...manifest, ...lock)

        core.debug(`[${this.constructor.name}](get) <<<`)
        return new Promise<IResult[]>(resolve => {
            resolve(this.all)
        })

    }

    // takes the manifest and lock, merges them together
    combine(manifest:IResult[], lock:IResult[]): IResult[] {
        core.debug(`[${this.constructor.name}](combine) >>>`)
        let combined: IResult[] = []
        // remove from lock files things that exist in manifest
        // and then expand the data in the manifest entry
        lock = lock.filter(function(l:IResult, i:number) {
            let record:IResult = manifest.find( m => m.name === l.name) as IResult
            // if we found a record that matches - expand and remove
            if (typeof record !== 'undefined' && record.name === l.name){
                record.expand(l)
                return false
            }
            return true
        })
        core.debug(`[${this.constructor.name}](combine) <<<`)
        combined.push(...manifest, ...lock)
        return combined

    }



}
