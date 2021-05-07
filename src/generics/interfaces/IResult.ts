import { ResultMeta } from "../classes/ResultMeta";

export interface IResult {
    name:Required<string>
    tags: string[]
    occurances:ResultMeta[]

    expand(extra: IResult): void
}
