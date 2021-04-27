import * as glob from '@actions/glob'
import { PackageFile, Spec } from "../../interfaces"
import { ComposerManifestSpec } from "./ComposerManifestSpec"

export class ComposerManifest implements PackageFile{
    spec: Spec = new ComposerManifestSpec()
    files: string[] = []
    selectors: string[] = ['.require', '.require-dev']

    constructor(spec:Spec) {
        this.spec = spec
    }

    async load(): Promise<ComposerManifest> {
        this.files = await this.spec.search()
        return new Promise<ComposerManifest>( (resolve) => {
            resolve(this)
        })
    }

}
