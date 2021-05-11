import { IContent, IJsonContent } from "../../../app/interfaces";
import { IComposerManifest } from "./ComposerManifestInterfaces";


export interface IComposerLock extends IContent{
    // required
    packages: IComposerManifest[];
    'packages-dev'?: IComposerManifest[];
}
