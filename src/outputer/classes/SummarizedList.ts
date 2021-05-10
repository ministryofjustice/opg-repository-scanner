import * as fs from 'fs'
import { map_to_object } from '../../conversion/map_to_object';
import { Result, SummaryResult } from '../../generics';
import { IOutputer } from "../interfaces/IOutputer";
import { List } from './List';

export class SummarizedList extends List implements IOutputer{

    protected filename = 'summarized-list'


    // we do some post processing on the package data by
    // converting it to a summary result which reduces
    // data
    summarised_packages(packages:Result[]): SummaryResult[] {
        let summarised:SummaryResult[] = []
        for(const pkg of packages){
            let summary = new SummaryResult()
            summarised.push( summary.from_result(pkg) )
        }
        return summarised
    }

    // escape | as they trigger cell splits
    protected markdown_escape(content:string) : string{
        return content.replace(/\|/g, "\\|")
    }

    // convert the packages data to markdown
    protected save_as_markdown(data:Map<string,any>, file:string, dir?:string) : string|boolean {
        const packages:SummaryResult[] = data.get('packages')
        // headers of the markdown content
        let markdown = '| Repository | Package | Version | Occurances | Tags |\n| -- | -- | -- | -- | -- |\n'
        // now loop over data and add to rows
        for (const row of packages) {
            const occ = row.occurances_to_string_array( row.sources() ).join('<br>')
            const tags = row.tags.join(', ')

            const cols:string[] = [ `${row.repository}`, `${row.name}`, `${row.version}`, `${occ}`, `${tags}`]
            // loop over all these bits
            for(const col of cols) {
                const escaped:string = this.markdown_escape(col)
                markdown += '| ' + escaped + ' '
            }
            markdown += '|\n'

        }
        // save content to the file
        const saved = this.save_file(markdown, file, dir)
        if ( saved && typeof dir !== 'undefined'  ) return dir + file
        else if (saved) return file
        return false

    }


    update_data(data:Map<string,any>) : Map<string,any>{
        const packages:Result[] = data.get('packages')
        const summarised:SummaryResult[] = this.summarised_packages(packages)
        data.set('packages', summarised)
        return data
    }


    write(data:Map<string,any>): string[] {
        let files:string[] = []
        // update data
        data = this.update_data(data)
        // save data to json & track file
        const json_saved:string|boolean = this.save_as_json(data, this.filename + '.json', this.dir)
        if (json_saved !== false) files.push(json_saved as string)
        // save markdown
        const markdown_saved:string|boolean = this.save_as_markdown(data, this.filename + '.md', this.dir)
        if (markdown_saved !== false) files.push(markdown_saved as string)

        return files
    }


}
