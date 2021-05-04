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
        const explode = selector.split(".")

        selector = explode.map(function(val, i) {
            const containsQuote = val.indexOf('"') >= 0
            const containsHyphen = val.indexOf('-') >= 0

            if (containsHyphen && !containsQuote) val = `"${val}"`

            return `${val}`

        }).join('.')
        return selector
    }

    // - jq needs selectors to have "" around them if - are present
    // - enforce array result
    sanitise(): void {
        this.selector = this.selector.map(i => this.per_selector(i) )
    }

}
