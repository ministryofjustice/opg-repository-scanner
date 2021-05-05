# OPG Repository Scanner

This action is intended to load various forms of manifest & lock files and parse the listed packages the repository requires to function as part of an awareness and to aid security capabilities.

## Currently Supported

At the moment, this action only supports the following tooling and languages:

- PHP
    - composer.json
    - composer.lock
- Javascript
    - package.json
    - package-lock.json

## Inputs

Currently, GitHub actions dont allow for complex / nested variable structures, so we are using `JSON.stringify` versions which are then parsed using `JSON.parse` - these are marked with a **\***

### `source_directory`

**Default: `./`**

This is the base directory to scan from and defaults to the root (`./`) of the repository and should be expressed as a relatiave string.

If your code has both source and built versions of files you may want to adjust this property to be the source (such as `./src/`) to avoid large number duplications.

### `source_follow_symlinks`

**Default: `false`**

Determines if symlinks within the repository should be followed or not.

### `source_exclude` **\***

**Default: `"['__samples__**', '__tests__**', 'node_modules**', 'vendor**']"`**

A `JSON.stringify()` result of an array. Contains a series of filepath patterns which will then be excluded from file pattern searches within `@actions/glob` lookups.

The intention here is to provide a way to remove known unhappy paths or folders.

### `manifests` **\***

**Default: `"[ {name: 'composer', uses: 'ComposerParser'}, {name: 'package', uses: 'PackageParser'} ]"`**

The `manifests` property sets which manifest & lock scans we should use for this repository. It will be compared to whats listed in `AvailableManifestParsers` [here](https://github.com/ministryofjustice/opg-repository-scanner/blob/main/src/manifestresults/AvailableManifestsParsers.ts).

Any unrecognised names will be ignroed and not run.


### `artifact_name`

**Default: `'repository-scan-result'`**

The artifact created at the end will be uploaded to the workflow under this name.

### `artifact_as` **\***

**Default: `"['json']"`**

Listing of output reports to be generated for this artifact. Allowed versions are listed in `AvailableOutputers` [here](https://github.com/ministryofjustice/opg-repository-scanner/blob/main/src/outputer/index.ts).


### `configuration_file`

If used, this should point to a `yaml` file that contains all the configuration data in a data structure with an exmaple shown [here](https://github.com/ministryofjustice/opg-repository-scanner/tree/main/__samples__/config/valid/sample.yml).


## Output

This action generates an artifact of all reports and uploads it to the completed workflow.
