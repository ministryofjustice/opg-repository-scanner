import { ISpecificationHandler, IValidateable } from "../../generics";
import { SpecificationHandler } from "../../generics";
import { composerManifest } from "../parsers/ComposerManifest";

export class ComposerSpecificationHandler extends SpecificationHandler
        implements ISpecificationHandler, IValidateable {

    processor: Function = composerManifest
    // jq needs selectors to have "" around them if - are present
    sanitise(): void {
        const explode = this.selector.split(".").filter(i => i)
        this.selector = explode.map(i => `."${i}"`).join('');
    }

}
