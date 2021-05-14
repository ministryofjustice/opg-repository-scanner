import * as core from '@actions/core'
import { Report } from './Report';
import { IOutput } from '../interfaces';

export class Output{

    outputs:IOutput[] = []

    constructor(
        outputs?:IOutput[]
    ) {
        if(typeof outputs !== 'undefined') this.outputs = outputs
    }


    // Use the report to pass into each Outputter
    async from(report:Report): Promise<string[]> {
        let files:string[] = []
        let promises = []

        for(const handler of this.outputs) {
            promises.push(
                new Promise( (resolve) => {
                    core.debug(`[${handler.constructor.name}] Starting`)
                    resolve(
                        handler
                            .set(report)
                            .save()
                            .then((saved) => {
                                core.info(`[${handler.constructor.name}] generated [${saved.length}] files`)
                                files.push(...saved)
                            })
                    )

                })
            )
        }

        await Promise.all(promises)
        return new Promise<string[]>((resolve) => {
            resolve(files)
        })
    }

}
