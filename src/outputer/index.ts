import {AsJson} from './classes'
import {Outputer} from './classes/Outputer'

export {IOutputer} from './interfaces'
export {AsJson} from './classes'

export const AvailableOutputers: Map<string, Outputer> = new Map([['json', new AsJson()]])
