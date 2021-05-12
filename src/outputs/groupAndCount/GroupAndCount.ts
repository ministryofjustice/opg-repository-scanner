import * as fs from 'fs';

import { Raw } from '../raw/Raw'
import { Files, GroupPackages, Report } from "../../app/classes";
import { IOutput, IPackage } from "../../app/interfaces";
import { IOutputContent } from '../../app/interfaces/IOutputContent';


export class GroupAndCount extends Raw implements IOutput {

    directory:string = './__artifacts__/'
    report: Report = new Report('', '', [], false, [])


    process(): Map<string, string> {
        let files:Map<string, string> = new Map<string,string>()
        const flat = GroupPackages.byNameAndLocationWithCounts(this.report.packages)
        // json
        const json: IOutputContent = {packages: flat}
        files.set('groupedWithCount.json', JSON.stringify(json))
        // markdown
        let markdown = '| Repository | Package | Version | License | Occurances | Tags |\n| -- | -- | -- | -- | -- | -- |\n'
        for (const row of flat) {
            const cols:string[] = [ row.repository, row.name, row.version, row.license, row.source, row.tags]
            // output and escape the column data
            for(const col of cols) markdown += `| ${col.replace(/\|/g, "\\|")} `
            markdown += '|\n'
        }
        files.set('groupedWithCount.md', JSON.stringify(markdown))

        return files
    }



}
