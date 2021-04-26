import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {Config} from '../src/config'
import {yaml_to_config} from '../src/yaml/yaml_to_config'

const sample_dir: string = './__samples__/'

test('working configuration load', async () => {
    const configuration_file: string = sample_dir + 'config/valid/simple.yml'
    const configuration: Config = await yaml_to_config(configuration_file)

    expect(configuration.filesystem.directory).toBe('./')
    expect(configuration.filesystem.follow_symlinks).toBeTruthy()
})
