

export interface IOutputer{

    // writes the data to a file, returns the file name
    write(data:Map<string,any>): string[]


}
