import * as glob from '@actions/glob'
import {Filesystem } from "../../config"
import {ISpecification, IPackageFile} from "../interfaces"


//--
// new PackageFile<Spec>
export class PackageFile<S> implements IPackageFile<S>{
    filesystem: Filesystem = new Filesystem()

    // creates a new specification object from the
    specification<ISpecification>(spec: (new () => S)): S {
        return new spec()
    }


    // constructor(filesystem?: Filesystem, specification?: ISpecification){
    //     if(typeof filesystem !== 'undefined') this.filesystem = filesystem
    //     if(typeof specification !== 'undefined') this.specification = specification
    // }

    // async parse(): Promise<void> {
    //     const handlers = this.specification.handlers()
    //     for (const handler of handlers){
    //         const func = handler.processor as Function
    //         const files = await this.files(handler.filepattern)
    //         const selector = handler.selector
    //         const found:Result[] = func(selector, files)

    //         if (found.length > 0) this.results.push(...found)
    //     }

    //     return new Promise<void>(resolve => {
    //         resolve()
    //     })
    // }


    // async files(pattern:string): Promise<void> {
    //     const lookup = this.filesystem.directory + pattern
    //     const globber = await glob.create(lookup, {
    //         followSymbolicLinks: this.filesystem.follow_symlinks
    //     })
    //     const files = globber.glob()
    //     return new Promise<void>( resolve => {
    //         resolve()
    //     })
    // }


}
