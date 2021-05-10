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

**Default: `'["__samples__**","__tests__**","node_modules**","vendor**"]'`**

A `JSON.stringify()` result of an array. Contains a series of filepath patterns which will then be excluded from file pattern searches within `@actions/glob` lookups.

The intention here is to provide a way to remove known unhappy paths or folders.

### `manifests` **\***

**Default: `'[{"name":"composer","uses":"ComposerParser"},{"name":"package","uses":"PackageParser"}]'`**

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



## Process flow

- **Main.ts** reads and creates the configuration data
- **Main.ts** creates an instance of `ManifestResults` passing in the configuration and calls `.process()`
- **ManifestResults** `.process()` calls `.manifests()` to loop over each `configuration.manifests` entry and calls `.run_parser(parser)`
- **ManifestResults** `.run_parser(parser)` looks for `parser.uses` within `AvailableManifestParsers` and if found, checks its valid. `AvailableManifestParsers` is map of name & function, the function is a factory creation method.
- **ManifestResults** `.run_parser(parser)` then calls `.instance(manifest)` to create a new IPackages compatible class using the function from `AvailableManifestParsers`. It then calls `.get(true)` on the newly created class.
- **Packages** has `manifest` & `lock` properties configured from the factory creation function
- **Packages** `.get(true)` calls `.parse()` on both the manifest and the lock. This is handled in a generic class - `Specification`
- **Specification** is also setup in the factory creation function and attached to `Packages` with handlers being passed in
- **Specification** `.parse()` iterates over its `.handlers` array and calls `.process()` on each. A handler is aimed at processing the specifics of an exact manifest / lock file, so these are targeted to languages.
- **ISpecificationHandler** classes contain a filepath pattern to find files, and create a `.results` array while processing files. How it processes those files is determined by the specific class within the overwridden `.process()` method. It is generally aimed at processing json like files using jspath selectors, but this is not true of all


## Adding new inputs

Tried to reduce the amount of work required to add a new input param to the action, but its a bit messier than ideal. There are **4** areas that require changes:

- `./action.yml` - the actual action configuration file
- `./src/input/action_yaml.ts` - a map structure and function to then iterate over and fetch details from `core.getInput`
- `./src/input/input_to_config.ts` - function that creates a skel object to map from the inputs in `action_yaml.ts` and converts to a `Config` class
- `./src/config/classes/Config.ts` - will need to add the property to this class so its parsed neatly
