import { ResultMeta } from "../classes/ResultMeta";

export interface IResult {
    name:Required<string>
    occurances:ResultMeta[]
    tags: string[]

    expand(extra: IResult): void
}
