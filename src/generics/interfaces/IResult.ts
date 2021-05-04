import { ResultMeta } from "../classes/ResultMeta";

export interface IResult {
    name:Required<string>
    occurances:ResultMeta[]

    expand(extra: IResult): void
}
