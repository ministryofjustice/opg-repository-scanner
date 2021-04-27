import * as core from '@actions/core'
import * as glob from '@actions/glob'
import { Filesystem } from '../../config';
import { ISpecificationHandler } from "../interfaces/ISpecificationHandler";
import { IValidateable } from "../interfaces/IValidateable";

export class SpecificationHandler implements ISpecificationHandler, IValidateable{

    filesystem:Filesystem = new Filesystem()
    filepattern: Required<string> = ''
    selector: Required<string> = ''
    processor: Function = async function() {}

    constructor(filesystem?:Filesystem, filepattern?:string, selector?:string, processor?:Function){
        if(typeof filesystem !== 'undefined') this.filesystem = filesystem
        if(typeof filepattern !== 'undefined') this.filepattern = filepattern
        if(typeof selector !== 'undefined') this.selector = selector
        if(typeof processor !== 'undefined') this.processor = processor
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



    // used to clear up the selectors or anything else
    sanitise(): void {}

    // check if this is valid class
    valid(): boolean {
        let valid_filepattern = (this.filepattern.length > 0)
        let valid_selector = (this.selector.length > 0)
        let valid_processor = (typeof this.processor === 'function')

        core.debug('valid_filepattern: ' + valid_filepattern)
        core.debug('valid_selector: ' + valid_selector)
        core.debug('valid_processor: ' + valid_processor)

        return (valid_filepattern && valid_selector && valid_processor)
    }
}
