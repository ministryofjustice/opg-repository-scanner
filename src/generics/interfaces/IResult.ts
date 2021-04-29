export interface IResult {
    name:Required<string>
    version:string
    source:string
    type:string
    selector:string

    expand(extra: IResult): void
}
