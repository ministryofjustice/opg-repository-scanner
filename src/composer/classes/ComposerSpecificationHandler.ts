import {
    ISpecificationHandler,
    IValidateable,
    SpecificationHandler
} from "../../generics";


export class ComposerSpecificationHandler extends SpecificationHandler
        implements ISpecificationHandler, IValidateable {

    type:string = 'composer'

    // process each selector thats been set
    per_selector(selector:string): string {
        const first = selector.charAt(0)
        const explode = selector.split(".").filter(i => i)

        selector = explode.map(function(val, i) {
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
        if (first !== '[') selector = `[${selector}]`
        return selector
    }

    // - jq needs selectors to have "" around them if - are present
    // - enforce array result
    sanitise(): void {
        this.selector = this.selector.map(i => this.per_selector(i) )
    }

}
