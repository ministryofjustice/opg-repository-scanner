import * as core from '@actions/core'
import * as fs from 'fs'

import { Config, Manifest } from "../../config";
import { IResult, IPackages, ISpecification, ISpecificationHandler } from '../../generics';
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
        // expand on this later to allow a .with type overwrite of this properties
        return f(
            manifest.name,
            this.configuration?.filesystem

        ) as IPackages<ISpecification<ISpecificationHandler, IResult>,
                        ISpecification<ISpecificationHandler, IResult> >
    }


    // run_parser creates an instance and gets the resulting data
    //
    async run_parser(manifest:Manifest): Promise<IResult[]> {
        let results:IResult[] = []
        // check if this is available
        const available: boolean = AvailableManifestParsers.has(manifest.uses)
        const valid : boolean = manifest.valid()

        if(valid && available){
            const instance = this.instance(manifest)
            results = await instance.get(true)
        }

        core.debug('manifest available: ' + available)
        core.debug('manifest valid: ' + valid)

        return new Promise<IResult[]>( resolve => { resolve(results) } )
    }

    // process all the manifests from the config
    async manifests(): Promise<IResult[]> {
        let results:IResult[] = []
        // loop over each item in the config
        const manifest_parsers:Manifest[] = this.configuration?.manifests ?? []
        for(const parser of manifest_parsers) {
            core.debug('manifest parser: ' + parser.name)
            const found = await this.run_parser(parser)
            // if we found data, append to the overall results
            if (found && found.length) results.push(...found)
        }
        return new Promise<IResult[]>( resolve => { resolve(results) } )
    }


    async process(): Promise<void> {
        const manifest_results:IResult[] = await this.manifests()

        this.output.set('packages', manifest_results)

        return new Promise<void>( resolve => { resolve() } )

    }

    output_to_object(): object {
        let json_obj = {}
        Object.assign(json_obj, ...[...this.output.entries()].map(([k, v]) => ({[k]: v})) )
        return json_obj
    }

    async save(): Promise<void> {
        const json_obj = this.output_to_object()
        const json_string:string = JSON.stringify(json_obj)

        const path:string = './scan-results.json'
        fs.writeFileSync(path, json_string)

        return new Promise<void>( resolve => { resolve() } )
    }

}
