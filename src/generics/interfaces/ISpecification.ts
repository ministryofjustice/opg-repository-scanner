import { IResult } from './IResult';
import {ISpecificationHandler} from './ISpecificationHandler'

// new
export interface ISpecification<T extends ISpecificationHandler, R extends IResult>{
    name: string
    handlers(): T[]
    results(): R[]
    parse(): Promise<void>
}
