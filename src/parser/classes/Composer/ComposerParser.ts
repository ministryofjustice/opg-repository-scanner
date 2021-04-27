import { ComposerManifest } from "./ComposerManifest";
import { Parser } from "../../interfaces";
import { ComposerManifestSpec } from "./ComposerManifestSpec";
import { ComposerLockSpec } from "./ComposerLockSpec";
import { ComposerLock } from "./ComposerLock";
import { Filesystem } from "../../../config";


export class ComposerParser implements Parser{
    private _manifest: ComposerManifest|undefined = undefined
    private _lock: ComposerLock|undefined = undefined

    //-- Public properties that can be overwrittern
    filesystem:Filesystem = new Filesystem()

    //--- MANIFEST
    // return spec data for a manifest
    manifest_spec(): ComposerManifestSpec{
        return new ComposerManifestSpec( this.filesystem)
    }

    manifest(): ComposerManifest {
        if (this._manifest === undefined){
            this._manifest = new ComposerManifest( this.manifest_spec() )
        }
        return this._manifest
    }

    //--- LOCK
    lock_spec(): ComposerLockSpec{
        return new ComposerLockSpec( this.filesystem )
    }

    lock(): ComposerLock {
        if (this._lock === undefined){
            this._lock = new ComposerLock( this.lock_spec() )
        }
        return this._lock
    }



}
