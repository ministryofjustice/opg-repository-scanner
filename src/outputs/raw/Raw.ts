import * as core from '@actions/core'

import { Files, GroupPackages, Report } from "../../app/classes";
import { IOutput, IPackage } from "../../app/interfaces";
import { IOutputContent } from '../../app/interfaces/IOutputContent'
import { Simple } from '../simple/Simple';

export class Raw extends Simple implements IOutput {
    filename:string = 'raw.json'
    directory:string = './__artifacts__/'
    report: Report = new Report('', '', [], false, [])

    process(): Map<string,string> {
        const all:IPackage[] = GroupPackages.toFlat(this.report.packages)
        const obj: IOutputContent = {packages: all}
        core.info(`[${this.constructor.name}] contains [${all.length}] packages.`)

        return new Map<string,string>([
            [this.filename, JSON.stringify(obj)]
        ])
    }


}
