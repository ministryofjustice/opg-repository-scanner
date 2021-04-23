import * as core from '@actions/core'

// base class to handle assignment from raw json and
// functions
export class base {

    constructor(json: object) {
        core.debug('assigning object')
        Object.assign(this, json)
        core.debug('converting')
        this.convert()
    }

    valid(): boolean {
        return true
    }
    convert(): void { }

    // use this to see if the class has and values setup or if its an empty class
    // - means you can give properties default values
    hasValues(): boolean {
        const has_val: boolean = Object.values(this).some(v => v !== null && typeof v !== "undefined")
        core.debug('hasValues: - ' + has_val)
        return has_val
    }
}
