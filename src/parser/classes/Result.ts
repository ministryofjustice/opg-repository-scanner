import { PackageFile } from "../../config"

export class Result {
    // original package file this result relates to
    package_file:PackageFile = new PackageFile()
    // original selector string that this result came from
    selector:string = ''

    package_name:string = ''
    version:string = ''
    parent:string = ''

    constructor(package_file:PackageFile, selector:string, package_name:string, version:string, parent?:string){
        this.package_file = package_file
        this.selector = selector
        this.package_name = package_name
        this.version = version
        this.parent = parent ?? ''
    }
}
