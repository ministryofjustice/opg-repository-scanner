// Align settings here action.yml and matched defaults
export interface IActionParameters {
    // the name of the repository being actively scanned
    repository_name: string
    // the base directory to start scanning from
    source_directory: string
    // follow symlinks
    source_follow_symlinks: boolean
    // exclude these file paths from file scanning operations
    source_exclude: string[]
    // name of the uploaded file
    artifact_name: string

}
