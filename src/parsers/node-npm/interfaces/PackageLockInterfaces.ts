import { IJsonContent } from "../../../app/interfaces";


export interface IPackageLockDep {
    version:string
    dev?: boolean
}

export interface IPackageLockDependancy {
    [name: string]: IPackageLockDep
}

export interface IPackageLock extends IJsonContent{
    name:string
    dependencies?: IPackageLockDependancy[]
    lockfileVersion: 1 | 2
    version?:string
}
