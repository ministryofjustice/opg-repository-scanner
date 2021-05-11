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

        for(const handler of this.outputs) {
            const res = await handler.set(report).save()
            files.push(...res)
        }

        return new Promise<string[]>((resolve) => {
            resolve(files)
        })
    }

}
