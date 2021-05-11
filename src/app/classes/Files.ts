import * as path from 'path';
import * as glob from '@actions/glob'

export class Files{


    filter(files:string[], exclusions:string[]) {
        const regexs = exclusions.map(pattern => new RegExp(pattern, 'i') )
        return files.filter(file => {
            const matched = regexs.map(r => r.test(file))
            // if files contained a match against the regexes
            // then that file should not be included
            return ! matched.includes(true)
        })
    }

    async get(
        directory:string,
        patterns:string[],
        exclusions:string[],
        followSymlinks: boolean = false
    ) : Promise<string[]>{

        let files:string[] = []
        for(const pattern of patterns){
            const filepath = path.resolve(directory, pattern)
            const glober = await glob.create(filepath, {followSymbolicLinks: followSymlinks})

            let found:string[] = await glober.glob()
            found = this.filter(found, exclusions)
            files.push(...found)
        }

        return new Promise<string[]>( (resolve) => {
            resolve(files)
        })

    }

}
