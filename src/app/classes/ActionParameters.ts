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
    //
    artifact_directory: string = ''

    static fromCoreInput() : IActionParameters {
        let input: ActionParameters = new ActionParameters()

        const repoName = core.getInput('repository_name')
        core.debug(`repository_name: ${repoName}`)
        const dir = core.getInput('source_directory')
        core.debug(`source_directory: ${dir}`)
        const symlink:boolean = (core.getInput('source_follow_symlinks') === 'true')
        core.debug(`symlink: ${symlink}`)
        const exclude = core.getInput('source_exclude')
        core.debug(`source_exclude: ${exclude}`)
        const artifact_name = core.getInput('artifact_name')
        core.debug(`artifact_name: ${exclude}`)
        const artifact_directory = core.getInput('artifact_directory')
        core.debug(`artifact_directory: ${exclude}`)

        if (repoName && repoName.length > 0) input.repository_name = repoName
        if (dir && dir.length > 0) input.source_directory = dir
        if (exclude && exclude.length > 0) input.source_exclude = JSON.parse(exclude)
        if (artifact_name && artifact_name.length > 0) input.artifact_name = artifact_name
        if (artifact_directory && artifact_directory.length > 0) input.artifact_directory = artifact_directory

        input.source_follow_symlinks = symlink

        return input
    }

}
