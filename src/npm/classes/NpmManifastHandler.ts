import { ISpecificationHandler, IValidateable } from "../../generics";
import { ComposerManifestHandler } from '../../composer'
import { ManifestType } from "../../generics/enums";


// NpmManifestHandler is identical to ComposerManifests in structure but
// cuse different selectors
export class NpmManifestHandler extends ComposerManifestHandler
        implements ISpecificationHandler, IValidateable {

    type:ManifestType = ManifestType.Manifest
    tags: string[] = ['language:javascript', 'type:npm', 'is:manifest']
}
