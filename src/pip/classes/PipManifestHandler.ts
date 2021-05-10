import * as JSPath from 'jspath'
import * as fs from 'fs'
import * as core from '@actions/core'

import { IResult, ISpecificationHandler, IValidateable, SpecificationHandler } from "../../generics";
import { Result } from "../../generics";
import { ManifestType } from '../../generics/enums';


export class PipManifestHandler extends SpecificationHandler
        implements ISpecificationHandler, IValidateable {

    type:ManifestType = ManifestType.Manifest
    tags: string[] = ['python', 'pip', ManifestType.Manifest]

    // overwrite the valid check, as we dont care about selectors
    valid(): boolean {
        let valid_filepattern = (this.filepattern.length > 0)
        core.debug(`[${this.constructor.name}](valid) valid_filepattern: ${valid_filepattern}`)
        return (valid_filepattern)
    }

    // return a result from a line in the source file
    protected result(line:string, source:string): IResult{
        return new Result(
            this.repository,
            line,
            '',
            source.replace( process.cwd(), '.'),
            this.type,
            '',
            this.tags
        )
    }

    // convert the file content to multiple lines
    protected by_line(content:string, source:string): IResult[] {
        let results: IResult[] = []
        const lines:string[] = content.split('\n')

        for (const line of lines) {
            if (line.length > 0) {
                let res:IResult = this.result(line, source)
                results.push(res)
            }
        }

        return results
    }

    // process all the files and generate result data
    protected async process_files(files:string[]): Promise<IResult[]> {
        let results: IResult[] = []
        for (const file of files) {
            core.debug(`[${this.constructor.name}](process_files) processing file: ${file}`)
            core.info(`Processing packages in file: [${file}]`)

            const content:string = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'}) as string
            // pip is new line based, so
            results.push(...this.by_line(content, file))

        }

        return new Promise<IResult[]>( resolve => {resolve(results) } )
    }

    async process(): Promise<void> {
        const files:string[] = await this.files()
        const selectors:string[] = this.selector
        const primary:IResult[] = await this.process_files(files)
        this._results.push(...primary)

        return new Promise<void>( resolve => { resolve() } )
    }
}
