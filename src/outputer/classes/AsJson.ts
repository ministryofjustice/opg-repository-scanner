import * as fs from 'fs'
import { IOutputer } from "../interfaces/IOutputer";
import { Outputer } from './Outputer';

export class AsJson extends Outputer implements IOutputer{

    private filename = 'list.raw.json'

    write(data:Map<string,any>): string {
        const obj = this.to_object(data)
        const json_string:string = JSON.stringify(obj)
        fs.writeFileSync(this.filename, json_string)
        return this.filename
    }

    to_object(data:Map<string,any>): object {
        let obj = {}
        Object.assign(obj, ...[...data.entries()].map(([k, v]) => ({[k]: v})) )
        return obj
    }
}
