import { Filesystem } from "../../config";
import * as glob from '@actions/glob'

export interface Spec {
    filesystem: Filesystem
    pattern: string

    glob(): Promise<glob.Globber>
    search(): Promise<string[]>
}
