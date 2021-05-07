import * as fs from 'fs'
import { map_to_object } from '../../conversion/map_to_object';
import { IOutputer } from "../interfaces/IOutputer";
import { Outputer } from './Outputer';

export class List extends Outputer implements IOutputer{

    protected filename = 'list.raw.json'

    write(data:Map<string,any>): string {
        const obj = map_to_object(data)
        const json_string:string = JSON.stringify(obj)
        fs.writeFileSync(this.filename, json_string)
        return this.filename
    }


}
