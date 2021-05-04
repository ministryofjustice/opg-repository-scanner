import * as fs from 'fs'
import { IOutputer } from "../interfaces/IOutputer";

export class Outputer implements IOutputer{
    write(filename:string, data:Map<string,any>): string { return ''}

}
