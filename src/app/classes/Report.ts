import * as core from '@actions/core'

import { IParser } from '../interfaces'
import { PackageInfo } from "./PackageInfo";

export class Report {

    repository:string = ''
    directory:string = ''
    followSymlinks: boolean = false
    exclusions:string[] = []
    parsers:IParser[] = []

    // set of meta counters to track what is found
    counters = {
        manifest:  { packages: 0, files: 0 },
        lock : { packages : 0, files: 0 }
    }

    // all packages found from all IParsers
    packages: PackageInfo[] = []


    constructor(
        repositoryName:string,
        directory:string,
        exclusions:string[],
        followSymlinks:boolean,
        parsers?:IParser[]
    ) {
        this.repository = repositoryName
        this.directory = directory
        this.followSymlinks = followSymlinks
        this.exclusions = exclusions

        if(typeof parsers !== 'undefined') this.parsers = parsers

        core.debug(`[${this.constructor.name}] repository: ${repositoryName}`)
        core.debug(`[${this.constructor.name}] directory: ${directory}`)
        core.debug(`[${this.constructor.name}] followSymlinks: ${followSymlinks}`)
        core.debug(`[${this.constructor.name}] exclusions: ${exclusions}`)
        core.debug(`[${this.constructor.name}] parsers: ${this.parsers}`)

    }

    // allPackages processes all parsers configured and pushes all
    // packages into top level array
    // the `.run()` is called as part of a promise which also outputs
    // meta details to stdout
    async allPackages(): Promise<void> {
        let packages = []
        const parsers = this.parsers
        let promises = []

        // run all the parsers as async
        for(const p of parsers) {
            promises.push(
                new Promise( (resolve) => {
                    core.info(`[${p.constructor.name}] Starting`)
                    resolve(
                        p
                        .set(this.repository, this.directory, this.exclusions, this.followSymlinks)
                        .run()
                        .then((pkgs) => {
                            this.packages.push(...pkgs)
                            this.counters.manifest.packages += p._manifests.length
                            this.counters.manifest.files += p._manifestFiles.length
                            this.counters.lock.packages += p._locks.length
                            this.counters.lock.files += p._lockFiles.length
                        })
                    )
                })
            )
        }

        await Promise.all(promises)
        // return empty
        return new Promise<void>( (resolve) => {
            resolve()
        })

    }

    // main function to generate a report of all packages
    async generate(): Promise<void> {
        await this.allPackages()

        return new Promise<void>( (resolve) => {
            resolve()
        })
    }

}
