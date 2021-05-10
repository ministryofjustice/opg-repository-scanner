import * as fs from 'fs'
import { map_to_object } from '../../conversion/map_to_object';
import { IOutputer } from "../interfaces/IOutputer";
import { Outputer } from './Outputer';

export class List extends Outputer implements IOutputer{

    protected filename = 'list'

    write(data:Map<string,any>): string[] {
        let files:string[] = []
        const json_file = this.save_as_json(data, this.filename + '.json', this.dir)
        if(json_file !== false) files.push(json_file as string)
        return files
    }


}
