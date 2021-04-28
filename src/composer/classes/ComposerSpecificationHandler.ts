import { ISpecificationHandler, IValidateable } from "../../generics";
import { SpecificationHandler } from "../../generics";
import { composerManifest } from "../parsers/ComposerManifest";

export class ComposerSpecificationHandler extends SpecificationHandler
        implements ISpecificationHandler, IValidateable {

    processor: Function = composerManifest
    // jq needs selectors to have "" around them if - are present
    // enfoce array result
    sanitise(): void {
        const first = this.selector.charAt(0)
        const explode = this.selector.split(".").filter(i => i)

        this.selector = explode.map(function(val, i) {
            const containsQuote = val.indexOf('"') >= 0
            const containsHyphen = val.indexOf('-') >= 0
            const containsArray = val.indexOf('[') >= 0

            if (containsHyphen && containsArray && !containsQuote) {
                const trim = val.replace('[', '').replace(']', '')
                val = `"${trim}"[]`
            } else if (containsHyphen && !containsQuote) {
                val = `"${val}"`
            }

            if (first === '[' && i === 0) return val
            return `.${val}`
        }).join('')

        // ensure its an array selector
        if (first !== '[') this.selector = `[${this.selector}]`

    }

}
