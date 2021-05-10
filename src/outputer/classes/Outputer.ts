import * as fs from 'fs'
import { IOutputer } from "../interfaces/IOutputer";
import { map_to_object } from '../../conversion/map_to_object';

export class Outputer implements IOutputer{

    protected dir = './__artifacts__/'

    // sanitisse directory name and create the directory if it doesnt exist
    // returning the updated dir value
    protected create_directory(dir:string):string{
        // trim and add trialing slash
        dir = dir.replace(/\/$/, "") + '/'
        // make the directory
        if(! fs.existsSync(dir)) fs.mkdirSync(dir)
        // return the dir string
        return dir
    }

    // save content to file (& dir) and return if the file exists
    protected save_file(content:string, file:string, dir?:string): boolean{
        if (typeof dir !== 'undefined') dir = this.create_directory(dir)
        const filename = dir + file
        fs.writeFileSync(filename, content)
        return fs.existsSync(filename)

    }

    // save data as a json based file, return the file path or false if fails
    protected save_as_json(data:Map<string,any>, file:string, dir?:string):string | boolean {
        const obj = map_to_object(data)
        const json_string:string = JSON.stringify(obj)
        const saved = this.save_file(json_string, file, dir)
        if ( saved && typeof dir !== 'undefined'  ) return dir + file
        else if (saved) return file
        return false
    }


    // write does nothing in this case
    write(data:Map<string,any>): string[] { return ['']}

}
