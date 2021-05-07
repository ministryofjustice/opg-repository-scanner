import * as fs from 'fs'
import { map_to_object } from '../../conversion/map_to_object';
import { Result, SummaryResult } from '../../generics';
import { IOutputer } from "../interfaces/IOutputer";
import { List } from './List';

export class SummarizedList extends List implements IOutputer{

    protected filename = 'list.summary.json'

    write(data:Map<string,any>): string {
        /* eslint-disable no-console */
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

        /* eslint-enable no-console */

        const obj = map_to_object(data)
        const json_string:string = JSON.stringify(obj)
        fs.writeFileSync(this.filename, json_string)
        return this.filename
    }


}
