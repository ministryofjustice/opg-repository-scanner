import * as core from '@actions/core'
import * as glob from '@actions/glob'
import { Source } from '../../config';
import { ManifestType } from '../enums';
import { ISpecificationHandler, IValidateable, IResult} from '../interfaces'
// SpecificationHandler provide method to find files of its type and
// uses a function (.processor) to parse the the content of the files it
// finds
// The .processor would be different for every type of manifest / file
// Generally only extended to change the sanitise method
export class SpecificationHandler implements ISpecificationHandler, IValidateable {
    protected _results:IResult[] = []

    repository:string = ''
    type:ManifestType = ManifestType.Null
    source:Source = new Source()
    filepattern: Required<string> = ''
    selector: Required<string[]> = []
    recursive?: string[]
    // tagging on the handlers to pass on the results
    tags: string[] = []

    constructor(
        repository?:string,
        source?:Source,
        filepattern?:string,
        selector?:string[]|string,
        recursive?: string[],
        tags?: string[]
        ){
        if(typeof repository !== 'undefined') this.repository = repository
        if(typeof source !== 'undefined') this.source = source
        if(typeof filepattern !== 'undefined') this.filepattern = filepattern
        if(typeof recursive !== 'undefined') this.recursive = recursive
        if(typeof tags !== 'undefined' && tags.length > 0) this.tags = tags

        if(typeof selector !== 'undefined') {
            if(typeof selector == 'string') this.selector = [selector] ?? []
            else this.selector = selector ?? []
        }

        this.sanitise()
    }

    // filter the files based on the exclusion regex passed in
    filter(files:string[], exclude:string[]): string[] {
        return files.filter(i => {
            let matched = false
            for(const p of exclude) {
                const r = new RegExp(p, 'i')
                const found = r.test(i)
                if (found) matched = true
            }
            return !matched
        })
    }

    // return all the files that this spec matches
    async files(): Promise<string[]> {
        this.source.directory = this.source.directory.replace(/\/$/, "") + '/'
        let files:string[] = []
        let pattern = this.source.directory + this.filepattern
        const glober = await glob.create(pattern, {followSymbolicLinks: this.source.follow_symlinks})
        files = await glober.glob()

        core.debug(`[${this.constructor.name}](files) before filter files length: ${files.length}`)

        // remove files based on exclusion regex
        if(this.source.exclude.length > 0) files = this.filter(files, this.source.exclude)

        core.debug(`[${this.constructor.name}](files) patterns: (${this.source.directory}) [${pattern}] length: ${files.length}`)
        core.info(`Found [${files.length}] files for patterns [${pattern.replace(/\n/g, ',')}] using directory (${this.source.directory})`)

        return new Promise<string[]>( (resolve) => {
            resolve(files)
        })
    }

    // check if this is valid class
    valid(): boolean {
        let valid_filepattern = (this.filepattern.length > 0)
        let valid_selector = (this.selector.length > 0)

        core.debug(`[${this.constructor.name}](valid) valid_filepattern: ${valid_filepattern}`)
        core.debug(`[${this.constructor.name}](valid) valid_selector: ${valid_selector}`)

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
