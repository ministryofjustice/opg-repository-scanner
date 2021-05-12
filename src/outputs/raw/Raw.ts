import * as fs from 'fs';
import * as core from '@actions/core'
import { Files, GroupPackages, Report } from "../../app/classes";
import { IOutput, IPackage } from "../../app/interfaces";
import { IOutputContent } from '../../app/interfaces/IOutputContent'

export class Raw implements IOutput {
    filename:string = 'raw.json'
    directory:string = './__artifacts__/'
    report: Report = new Report('', '', [], false, [])


    set(report: Report) : IOutput {
        this.report = report
        return this
    }

    process(): Map<string,string> {
        const all:IPackage[] = GroupPackages.toFlat(this.report.packages)
        const obj: IOutputContent = {packages: all}

        return new Map<string,string>([
            [this.filename, JSON.stringify(obj)]
        ])
    }


    async save(): Promise<string[]> {
        let files:string[] = []
        const contentMap = this.process()
        const f = new Files()

        // loop over all returned content and save
        for(const [file, content] of contentMap.entries() ) {
            const saved = f.save( content ?? '', file, this.directory)
            if(saved) files.push(this.directory + file)
        }

        return new Promise<string[]>((resolve) => {
            resolve(files)
        })
    }
}
