import * as fs from 'fs'
import * as core from '@actions/core'

import { IResult, ISpecificationHandler, IValidateable } from "../../generics";
import { Result } from "../../generics";
import { ComposerManifestHandler } from './ComposerManifastHandler'
import { ManifestType } from '../../generics/enums';

export class ComposerLockHandler extends ComposerManifestHandler
        implements ISpecificationHandler, IValidateable {

    type:ManifestType = ManifestType.Lock
    recursive_prefix:string = 'third-party-'
    tags: string[] = ['language:php', 'type:composer', 'is:lock']
    // Loop over the rows (found via the matches_selector call) and find data from those
    // - put in to a map for better re-use with the lock files
    protected iterate_results(rows:object[], source:string, selector:string): IResult[] {
        let results: IResult[] = []

        for (const row of rows) {
            const map = new Map<string, any>(Object.entries(row))
            const res = this.result(map, source, selector)
            if (res !== false) results.push( res as IResult )
        }
        return results
    }

    // Lock files recursive element matches the format for the manifest
    // files, so call that with new selectors
    async recurse(): Promise<void> {
        const manifest = new ComposerManifestHandler(
            this.source,
            this.filepattern,
            this.recursive
        )
        //manifest.type =  this.recursive_prefix + this.type
        await manifest.process()
        // append the manifest results into this set of results
        this._results.push( ...await manifest.results() )

    }


    async process(): Promise<void> {
        const files:string[] = await this.files()
        const selectors:string[] = this.selector
        const primary:IResult[] = await this.process_files(files, selectors)

        this._results.push(...primary)

        if(typeof this.recursive !== 'undefined') await this.recurse()

        return new Promise<void>( resolve => { resolve() } )
    }
}
