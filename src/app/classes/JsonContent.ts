import { JsonParseError } from "../errors";
import { IContentReader, IJsonContent } from "../interfaces";


export class JsonContent implements IContentReader{

    as<T extends IJsonContent>(content: string): T{
        return JsonContent.as<T>(content)
    }
    // Parse the raw json content in `content` into a Interface of Type T
    public static as<T extends IJsonContent>(content: string): T {

        try {
            return JSON.parse(content)
        } catch (error) {
            throw new JsonParseError(`Failed to parse json content. Error: ${error}`)
        }
    }


}
