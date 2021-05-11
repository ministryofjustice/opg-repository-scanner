import { PARSERS } from '../../app/parsers'
import { Pip } from './Pip'

// PUSH into the main PARSER list
PARSERS.push( new Pip() )

// export the composer object as well
export {
    Pip
} from './Pip'
