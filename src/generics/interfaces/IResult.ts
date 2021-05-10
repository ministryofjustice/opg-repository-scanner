import { ResultMeta } from "../classes/ResultMeta";

export interface IResult {
    repository:Required<string>
    name:Required<string>
    tags: string[]
    occurances:ResultMeta[]

    expand(extra: IResult): void
}
