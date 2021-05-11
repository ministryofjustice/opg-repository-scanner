import * as core from '@actions/core'
import { IActionParameters } from "../interfaces/IActionParameters"

// Align settings here action.yml and matched defaults
export class ActionParameters implements IActionParameters{
    // the name of the repository being actively scanned
    repository_name: string = 'unknown'
    // the base directory to start scanning from
    source_directory: string = './'
    // follow symlinks
    source_follow_symlinks : boolean = false
    // exclude these file paths from file scanning operations
    source_exclude: string[] = [
        "(__samples__/*)",
        "(__tests__/*)",
        "(node_modules/*)",
        "(vendor/*)"
    ]
    // name of the uploaded file
    artifact_name: string = 'repository-scan-result'


    static fromCoreInput() : IActionParameters {
        let input: ActionParameters = new ActionParameters()

        const repoName = core.getInput('repository_name')
        const dir = core.getInput('source_directory')
        const symlink:boolean = (core.getInput('source_follow_symlinks') === 'true')
        const exclude = core.getInput('source_exclude')


        if (repoName && repoName.length > 0) input.repository_name = repoName
        if (dir && dir.length > 0) input.source_directory = dir
        if (exclude && exclude.length > 0) input.source_exclude = JSON.parse(exclude)

        input.source_follow_symlinks = symlink

        return input
    }

}
