import * as fs from 'fs'
import { map_to_object } from '../../conversion/map_to_object';
import { Result, SummaryResult } from '../../generics';
import { IOutputer } from "../interfaces/IOutputer";
import { List } from './List';

export class SummarizedList extends List implements IOutputer{

    protected filename = 'list.summary'

    write(data:Map<string,any>): string[] {
        let packages:Result[] = data.get('packages')
        let summarised:SummaryResult[] = []
        // we do some post processing on the package data by
        // converting it to a summary result which reduces
        // data
        for(const pkg of packages){
            let summary = new SummaryResult()
            summarised.push( summary.from_result(pkg) )
        }
        data.set('packages', summarised)
        // write this out as json
        const obj = map_to_object(data)
        const json_string:string = JSON.stringify(obj)
        fs.writeFileSync(this.filename + ".json", json_string)
        // write to markdown as well, no headers so its easer to merge multiple files
        let markdown = '| Package | Version | Occurances | Tags |\n| -- | -- | -- | -- |\n'
        // now loop over data and add to rows
        for (const row of summarised) {
            const occ = row.occurances_to_string_array( row.sources() ).join('<br>')
            const tags = row.tags.join(', ')
            markdown += `| ${row.name} | ${row.version} | ${occ} | ${tags} |\n`
        }
        fs.writeFileSync(this.filename + ".md", markdown)

        return [
            this.filename + '.md',
            this.filename + ".json"
        ]
    }


}
