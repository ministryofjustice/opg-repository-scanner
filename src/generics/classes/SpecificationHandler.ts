import * as core from '@actions/core'
import * as glob from '@actions/glob'
import { Filesystem } from '../../config';
import { ISpecificationHandler, IValidateable, IResult} from '../interfaces'
// SpecificationHandler provide method to find files of its type and
// uses a function (.processor) to parse the the content of the files it
// finds
// The .processor would be different for every type of manifest / file
// Generally only extended to change the sanitise method
export class SpecificationHandler implements ISpecificationHandler, IValidateable {
    protected _results:IResult[] = []

    type:string = ''
    filesystem:Filesystem = new Filesystem()
    filepattern: Required<string> = ''
    selector: Required<string[]> = []
    recursive?: string[]

    constructor(
        filesystem?:Filesystem,
        filepattern?:string,
        selector?:string[]|string,
        recursive?: string[]
        ){
        if(typeof filesystem !== 'undefined') this.filesystem = filesystem
        if(typeof filepattern !== 'undefined') this.filepattern = filepattern
        if(typeof recursive !== 'undefined') this.recursive = recursive

        if(typeof selector !== 'undefined') {
            if(typeof selector == 'string') this.selector = [selector] ?? []
            else this.selector = selector ?? []
        }

        this.sanitise()
    }

    // return all the files that this spec matches
    async files(): Promise<string[]> {
        const pattern = this.filesystem.directory + this.filepattern
        const glober = await glob.create(pattern, {followSymbolicLinks: this.filesystem.follow_symlinks})
        const files = await glober.glob()
        return new Promise<string[]>( (resolve) => {
            resolve(files)
        })
    }

    // check if this is valid class
    valid(): boolean {
        let valid_filepattern = (this.filepattern.length > 0)
        let valid_selector = (this.selector.length > 0)

        core.debug('valid_filepattern: ' + valid_filepattern)
        core.debug('valid_selector: ' + valid_selector)

        return (valid_filepattern && valid_selector)
    }

    // handle recursive selections
    async recurse(): Promise<void> {
        return new Promise<void>(resolve => { resolve() })
    }
    // do nothing in the generic handler
    async process(): Promise<void> {
        return new Promise<void>(resolve => { resolve() })
    }

    async results(): Promise<IResult[]> {
        return new Promise<IResult[]>( resolve => { resolve(this._results) })
    }
    // used to clear up the selectors and data of the class before use
    sanitise(): void {}

}
