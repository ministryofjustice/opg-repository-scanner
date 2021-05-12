import { PackageInfo, Report } from "../../../src/app/classes"
import { ManifestTypes } from "../../../src/app/enums"
import { IOutputContent } from "../../../src/app/interfaces/IOutputContent"
import { Raw } from "../../../src/outputs/raw/Raw"

const sample_dir: string = './__samples__/app/php/'


test(`+ Test the generated string matches expected content`, async () => {
    const packages:PackageInfo[] = [
        new PackageInfo('test-repo', 'php', '^7.0', ManifestTypes.Manifest, 'manifest.json', ['php', 'test'], 'MIT'),
        new PackageInfo('test-repo', 'php', '^7.3', ManifestTypes.Lock, 'manifest.lock', ['php', 'test', 'lock'], 'MIT'),
        new PackageInfo('test-repo', 'php', '7.3|7.4', ManifestTypes.Lock, 'manifest.lock', ['php', 'test', 'lock'], 'MIT'),
        new PackageInfo('test-repo', 'laminas', '^3.0', ManifestTypes.Manifest, 'test-manifest', ['php', 'manifest']),
    ]
    // create a new report, set the packages
    const report = new Report('test-repo', './', [], false, [])
    report.packages = packages

    // create the outputter
    const gc = new Raw().set(report)
    const result = gc.process()

    expect(result.has('test.json')).toBeFalsy()
    expect(result.has('raw.json')).toBeTruthy()

    //covert the json back to an object
    const jobj = JSON.parse(result.get('raw.json') as string) as IOutputContent
    const hasProp = jobj.hasOwnProperty('packages')
    expect(hasProp).toBeTruthy()

    const readPackages = jobj.packages
    expect(readPackages.length).toEqual(4)

    const php = readPackages.find(i => i.name === 'php')
    expect(php?.name).toEqual("php")

})
