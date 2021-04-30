import {ComposerParser} from '../composer'
import {PackageParser} from '../npm'

export const AvailableManifestParsers: Map<string, Function> = new Map([
    ['ComposerParser', ComposerParser],
    ['PackageParser', PackageParser]
])
