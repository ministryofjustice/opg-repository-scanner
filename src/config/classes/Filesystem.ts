import 'reflect-metadata';
import { jsonObject, jsonMember} from 'typedjson';

@jsonObject
export class Filesystem {
    @jsonMember
    directory: string = ''

    @jsonMember
    follow_symlinks: boolean = false
}
