import * as fs from 'fs'
import { IOutputer } from "../interfaces/IOutputer";

export class Outputer implements IOutputer{
    write(data:Map<string,any>): string[] { return ['']}

}
