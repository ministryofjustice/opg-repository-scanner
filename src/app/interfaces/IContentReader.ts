import { IContent } from "./IContent";

export interface IContentReader {

    as<T>(content:string): T
}
