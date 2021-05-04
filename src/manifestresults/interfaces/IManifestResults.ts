import {
    Config,
    Manifest
} from "../../config";

import {
    IPackages,
    IResult,
    ISpecification,
    ISpecificationHandler
} from "../../generics";

export interface IManifestResults{
    configuration?: Config
    output:Map<string, any>

    //returns new class derived from the details within the manifest
    instance(manifest:Manifest):
        IPackages<ISpecification<ISpecificationHandler, IResult>, ISpecification<ISpecificationHandler, IResult>>
    // processes all the manifest data from config
    manifests(): Promise<IResult[]>
    // top level process that runs all tasks
    process(): Promise<void>
    // save the reports to a file - returns filenames saved to
    save(): Promise<string[]>
}
