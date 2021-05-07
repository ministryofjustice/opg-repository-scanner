import {PackageListing} from './classes'
import {Outputer} from './classes/Outputer'

export {IOutputer} from './interfaces'

export const AvailableOutputers: Map<string, Outputer> = new Map([['package-list', new PackageListing()]])
