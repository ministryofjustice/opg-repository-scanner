import * as core from '@actions/core'

import { Config, Manifest } from "../../config";
import { Artifact } from '../../config/classes';
import { IResult, IPackages, ISpecification, ISpecificationHandler } from '../../generics';
import { AvailableOutputers, IOutputer } from '../../outputer';
import { Outputer } from '../../outputer/classes/Outputer';
import { AvailableManifestParsers } from "../AvailableManifestsParsers";
import { IManifestResults } from '../interfaces/IManifestResults';



export class ManifestResults implements IManifestResults{

    configuration?: Config
    output:Map<string, any> = new Map<string, any>()

    constructor(configuration?: Config) {
        if(typeof configuration !== 'undefined') this.configuration = configuration
    }

    // return an instance created vai the factory method call (f)
    // - the return type is a monster
    instance(manifest:Manifest):
        IPackages<ISpecification<ISpecificationHandler, IResult>,
        ISpecification<ISpecificationHandler, IResult>> {
        const f = AvailableManifestParsers.get(manifest.uses) as Function
        core.debug(`[${this.constructor.name}](instance) f: ${f.name}`)
        // expand on this later to allow a .with type overwrite of this properties
        return f(
            manifest.name,
            this.configuration?.source

        ) as IPackages<ISpecification<ISpecificationHandler, IResult>,
                        ISpecification<ISpecificationHandler, IResult> >
    }


    // run_parser creates an instance and gets the resulting data
    //
    async run_parser(manifest:Manifest): Promise<IResult[]> {
        let results:IResult[] = []
        const available: boolean = AvailableManifestParsers.has(manifest.uses)
        const valid : boolean = manifest.valid()

        core.debug(`[${this.constructor.name}](run_parser) manifest: ${manifest.name} available: ${available} valid: ${valid}`)

        if(valid && available){
            const instance = this.instance(manifest)
            results = await instance.get(true)
        }

        return new Promise<IResult[]>( resolve => { resolve(results) } )
    }

    // process all the manifests from the config
    async manifests(): Promise<IResult[]> {

        let results:IResult[] = []
        const manifest_parsers:Manifest[] = this.configuration?.manifests ?? []
        const len = manifest_parsers.length

        core.info(`Found [${len}] manifest types to parse`)
        for(const [x, parser] of manifest_parsers.entries() ) {
            core.info(`Parsing ${x+1}/${len} : [${parser.name}]`)
            const found = await this.run_parser(parser)
            core.info(`Packages for (${parser.name}): [${found.length}]`)
            // if we found data, append to the overall results
            if (found && found.length) results.push(...found)
            core.info("-------")
        }
        return new Promise<IResult[]>( resolve => { resolve(results) } )
    }


    async process(): Promise<void> {
        const manifest_results:IResult[] = await this.manifests()
        core.info(`Total packages found: [${manifest_results.length}]`)
        this.output.set('packages', manifest_results)
        return new Promise<void>( resolve => { resolve() } )
    }


    // use the output configuration data to save the result to a file
    async save(): Promise<string[]> {
        let saved:string[] = []
        const report = this.configuration?.artifact as Artifact
        const now = (new Date()).toISOString().slice(0, 19).replace(/:/g, '-')

        for(const as_name of report.as) {
            const as_exists = AvailableOutputers.has(as_name)
            if(as_exists) {
                const out = AvailableOutputers.get(as_name) as IOutputer
                const writtern_file = out.write(this.output)
                saved.push(writtern_file)
            }
        }

        return new Promise<string[]>( resolve => { resolve(saved) } )
    }

}
