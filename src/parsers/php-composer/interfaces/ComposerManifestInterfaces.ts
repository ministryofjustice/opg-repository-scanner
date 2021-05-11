import { IJsonContent } from "../../../app/interfaces";


export interface IComposerManifestRequire {
    [name: string]: string
}


export interface IComposerManifest extends IJsonContent {
    // required
    name:Required<string>,
    require: IComposerManifestRequire,

    // optional
    'require-dev'?: IComposerManifestRequire,
    version?:string,
    description?:string
}
