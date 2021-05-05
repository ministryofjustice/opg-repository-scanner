import * as core from '@actions/core'

const source_exclude: string[] = ['__samples__**', '__tests__**', 'node_modules**', 'vendor**']
const manifests: object[] = [
    {name: 'composer', uses: 'ComposerParser'},
    {name: 'package', uses: 'PackageParser'}
]
const as: string[] = ['json']

// This needs to be kept in sync with action.yml
export const action_yaml_inputs = new Map<string, Map<string, string>>([
    [
        'configuration_file',
        new Map<string, string>([
            ['required', 'false'],
            ['default', '-']
        ])
    ],
    [
        'source_directory',
        new Map<string, string>([
            ['required', 'false'],
            ['default', './']
        ])
    ],
    [
        'source_follow_symlinks',
        new Map<string, string>([
            ['required', 'false'],
            ['default', 'false']
        ])
    ],
    [
        'source_exclude',
        new Map<string, string>([
            ['required', 'false'],
            ['default', JSON.stringify(source_exclude)]
        ])
    ],
    [
        'manifests',
        new Map<string, string>([
            ['required', 'false'],
            ['default', JSON.stringify(manifests)]
        ])
    ],
    [
        'artifact_name',
        new Map<string, string>([
            ['required', 'false'],
            ['default', 'repository-scan-result']
        ])
    ],
    [
        'artifact_as',
        new Map<string, string>([
            ['required', 'false'],
            ['default', JSON.stringify(as)]
        ])
    ]
])

export function mapped_inputs(): Map<string, any> {
    const base = action_yaml_inputs

    for (const [key, item] of base) {
        const req: boolean = item.get('required') === 'true'
        const found: string = core.getInput(key, {required: req})
        if (found.length > 0) item.set('value', found)
        else item.set('value', item.get('default') ?? '')

        base.set(key, item)
    }

    return base
}