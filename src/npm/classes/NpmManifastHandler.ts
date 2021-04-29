import { ISpecificationHandler, IValidateable } from "../../generics";
import { ComposerManifestHandler } from '../../composer'


// NpmManifestHandler is identical to ComposerManifests in structure but
// cuse different selectors
export class NpmManifestHandler extends ComposerManifestHandler
        implements ISpecificationHandler, IValidateable {

    type:string = 'package-json'

}
