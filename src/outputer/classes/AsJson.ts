import * as fs from 'fs'
import { IOutputer } from "../interfaces/IOutputer";
import { Outputer } from './Outputer';

export class AsJson extends Outputer implements IOutputer{

    write(filename:string, data:Map<string,any>): void {
        const obj = this.to_object(data)
        const json_string:string = JSON.stringify(obj)
        fs.writeFileSync(filename + '.json', json_string)
    }

    to_object(data:Map<string,any>): object {
        let obj = {}
        Object.assign(obj, ...[...data.entries()].map(([k, v]) => ({[k]: v})) )
        return obj
    }
}
