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
    async allPackages(): Promise<void> {
        let packages = []
        const parsers = this.parsers

        for(const parser of parsers) {
            const parserName = parser.constructor.name
            // run the set for the data
            parser.set(
                this.repository, this.directory, this.exclusions, this.followSymlinks
            )
            core.info(`[${parserName}]`)

            /* eslint-disable no-console */
            if(core.isDebug()) console.log('Parser object: ', parser)
            /* eslint-enable no-console */
            const tags = parser.tags()
            const patterns = parser.patterns()
            const found = await parser.packages(
                tags.manifest, tags.lock, patterns.manifest, patterns.lock
            )

            core.info(
                `[${parserName}] Found [${found.length}] packages.\n` +
                `   [${parser._manifests.length}] manifest packages from [${parser._manifestFiles.length}] files.\n` +
                `   [${parser._locks.length}] lock packages from [${parser._lockFiles.length}] files.\n`
            )
            // push the packages into the main data set
            this.packages.push(...found)
            // update meta data counters
            this.counters.manifest.packages += parser._manifests.length
            this.counters.manifest.files += parser._manifestFiles.length
            this.counters.lock.packages += parser._locks.length
            this.counters.lock.files += parser._lockFiles.length

        }

        // output total data
        core.info(
            `Found [${this.packages.length}] total packages.\n` +
            `   [${this.counters.manifest.packages}] manifest packages from [${this.counters.manifest.files}] files.\n` +
            `   [${this.counters.lock.packages}] lock packages from [${this.counters.lock.files}] files.\n`
        )

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
