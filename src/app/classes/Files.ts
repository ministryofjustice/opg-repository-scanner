import * as fs from 'fs';
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
    save(content:string, file:string, dir:string): boolean{
        if (typeof dir !== 'undefined') dir = this.create_directory(dir)
        const filepath = path.resolve(dir, file)
        fs.writeFileSync(filepath, content)
        return fs.existsSync(filepath)
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
