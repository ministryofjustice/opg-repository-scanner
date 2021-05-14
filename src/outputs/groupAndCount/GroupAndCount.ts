import * as core from '@actions/core'

import { Raw } from '../raw/Raw'
import { GroupPackages, Report } from "../../app/classes";
import { IOutput } from "../../app/interfaces";
import { IOutputContent } from '../../app/interfaces/IOutputContent';


export class GroupAndCount extends Raw implements IOutput {

    directory:string = './__artifacts__/'
    report: Report = new Report('', '', [], false, [])


    process(): Map<string, string> {
        let files:Map<string, string> = new Map<string,string>()
        const flat = GroupPackages.byNameAndLocationWithCounts(this.report.packages)
        core.info(`[${this.constructor.name}] contains [${flat.length}] packages.`)
        // json
        const json: IOutputContent = {packages: flat}
        files.set('groupedWithCount.json', JSON.stringify(json))
        // markdown
        let markdown = "| Repository | Package | Version | Occurances | Tags | License |\n| -- | -- | -- | -- | -- | -- |\n"
        for (const row of flat) {
            const cols:string[] = [ row.repository, row.name, row.version, row.source, row.tags, row.license]
            // output and escape the column data
            for(const col of cols) markdown += `| ${col.replace(/\|/g, "\\|")} `
            markdown += "|\n"
        }
        files.set('groupedWithCount.md', markdown)

        return files
    }



}
