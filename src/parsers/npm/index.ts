import { PARSERS } from '../../app/parsers'
import { Npm } from './Npm'

// PUSH into the main PARSER list
PARSERS.push(
    new Npm()
)

// export the composer object as well
export {
    Npm
} from './Npm'
