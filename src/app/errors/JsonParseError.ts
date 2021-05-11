
export class JsonParseError extends Error {
    public name: string = 'JsonParseError'
    constructor(error_message:string) {
        super(error_message)
        Error.captureStackTrace(this, JsonParseError)
    }
}
