import { PARSERS } from '../../app/parsers'
import { Composer } from './Composer'

// PUSH into the main PARSER list
PARSERS.push(
    new Composer()
)

// export the composer object as well
export {
    Composer
} from './Composer'
