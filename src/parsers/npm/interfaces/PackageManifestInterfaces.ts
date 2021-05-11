import { IJsonContent } from "../../../app/interfaces";


export interface IPackageDependancy {
    [name: string]: string
}


export interface IPackageManifest extends IJsonContent {
    // required
    name:Required<string>,
    dependencies: IPackageDependancy,
    // optional
    devDependencies?: IPackageDependancy,
    version?:string,
    description?:string
    type?: string
}
