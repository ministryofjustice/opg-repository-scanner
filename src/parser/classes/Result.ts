import { PackageFile } from "../../config"

export class Result {
    package_file:PackageFile = new PackageFile()
    selector:string = ''
    package_name:string = ''
    version:string = ''

    constructor(package_file:PackageFile, selector:string, package_name:string, version:string){
        this.package_file = package_file
        this.selector = selector
        this.package_name = package_name
        this.version = version
    }
}
