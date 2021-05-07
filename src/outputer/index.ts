import {List, SummarizedList} from './classes'
import {Outputer} from './classes/Outputer'

export {IOutputer} from './interfaces'

export const AvailableOutputers: Map<string, Outputer> = new Map([
    ['list', new List()],
    ['summarized-list', new SummarizedList()]
])
