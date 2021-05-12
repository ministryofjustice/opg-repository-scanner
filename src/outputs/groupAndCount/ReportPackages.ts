import { ManifestTypes } from "../../app"
import { IPackage } from "../../app/interfaces"

export class ReportPackages implements IPackage{

    repository:string = ''
    name:string = ''
    version:string = ''
    type:ManifestTypes = ManifestTypes.Null
    license:string = ''
    source:string = ''
    tags:string = ''


}
