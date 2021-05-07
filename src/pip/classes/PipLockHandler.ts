import { ISpecificationHandler, IValidateable, SpecificationHandler } from "../../generics";
import { ManifestType } from '../../generics/enums';
import { PipManifestHandler } from "./PipManifestHandler";

export class PipLockHandler extends PipManifestHandler
        implements ISpecificationHandler, IValidateable {

    type:ManifestType = ManifestType.Lock
    tags: string[] = ['language:python', 'type:pip', 'is:' + ManifestType.Lock]

    // do nothing, there is no lock file for pip
    async process(): Promise<void> {
        return new Promise<void>( resolve => { resolve() } )
    }
}
