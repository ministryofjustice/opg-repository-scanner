import { IJsonContent } from "../../../app/interfaces";
import { IComposerManifest } from "./ComposerManifestInterfaces";


export interface IComposerLock extends IJsonContent{
    // required
    packages: IComposerManifest[];
    'packages-dev'?: IComposerManifest[];
}
