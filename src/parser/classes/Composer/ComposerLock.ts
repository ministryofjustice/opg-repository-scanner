import { PackageFile, Spec } from '../../interfaces'
import { ComposerLockSpec } from "./ComposerLockSpec"
import { ComposerManifest } from "./ComposerManifest"

export class ComposerLock implements PackageFile{
    spec: Spec = new ComposerLockSpec()
    files: string[] = []
    selectors: string[] = []

    constructor(spec:Spec) {
        this.spec = spec
    }

    async load(): Promise<ComposerLock> {
        this.files = await this.spec.search()
        return new Promise<ComposerLock>( (resolve) => {
            resolve(this)
        })
    }
}
