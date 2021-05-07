import {ComposerParser} from '../composer'
import {PackageParser} from '../npm'
import {PipParser} from '../pip'

const availableManifestParsers: Map<string, Function> = new Map()
availableManifestParsers.set('ComposerParser', ComposerParser)
availableManifestParsers.set('PackageParser', PackageParser)
availableManifestParsers.set('PipParser', PipParser)

export const AvailableManifestParsers: Map<string, Function> = availableManifestParsers
