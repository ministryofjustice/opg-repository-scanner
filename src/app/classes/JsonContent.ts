import { JsonParseError } from "../errors";
import { IJsonContent } from "../interfaces";


export class JsonContent {

    // Parse the raw json content in `content` into a Interface of Type T
    public static as<T extends IJsonContent>(content: string): T {

        try {
            return JSON.parse(content)
        } catch (error) {
            throw new JsonParseError(`Failed to parse json content. Error: ${error}`)
        }
    }


}
