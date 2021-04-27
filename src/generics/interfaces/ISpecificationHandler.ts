
// Interface to detail what a SpecificationHandler should look like
export interface ISpecificationHandler{
    filepattern: Required<string>
    selector: Required<string>
    processor: Function

    sanitise(): void
    files(): Promise<string[]>
}
