import * as fs from 'fs';

import { Files, Report } from "../../app/classes";
import { IOutput, IPackage } from "../../app/interfaces";
import { IRaw } from './IRaw'

export class Raw implements IOutput {
    filename:string = 'raw.json'
    directory:string = './__artifacts__/'
    report: Report = new Report('', '', [], false, [])


    set(report: Report) : IOutput {
        this.report = report
        return this
    }

    async save(): Promise<string[]> {
        let files:string[] = []

        let all:IPackage[] = []
        // save all packages without an duplication, just raw data
        for(const pkg of this.report.packages) {
            const flat = pkg.flat()
            all.push(...flat)
        }

        const obj: IRaw = {packages: all}
        const content = JSON.stringify(obj)
        const f = new Files()
        const saved = f.save(content, this.filename, this.directory)
        if(saved) files.push(this.directory + this.filename)


        return new Promise<string[]>((resolve) => {
            resolve(files)
        })
    }
}
