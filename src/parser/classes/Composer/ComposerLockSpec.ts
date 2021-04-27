import { Named, Validateable } from "../../../interfaces"
import { Spec } from "../../interfaces/"
import { ComposerManifestSpec } from "./ComposerManifestSpec"

export class ComposerLockSpec extends ComposerManifestSpec implements Spec, Validateable, Named{
    pattern: string = '**/composer.lock'
}
