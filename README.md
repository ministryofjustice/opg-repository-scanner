# OPG Repository Scanner

This action is intended to load various forms of manifest & lock files and parse the listed packages the repository requires to function as part of an awareness and to aid security capabilities.

## Currently Supported

At the moment, this action only supports the following tooling and languages:

- PHP
    - composer
        - `composer.json` & `composer.lock`
- Javascript
    - npm
        - `package.json` & `package-lock.json`
- Python
    - pip
        - `requirements.txt`
- Go
    - mod
        - `go.mod` & `go.sum`



## Inputs

Currently, GitHub actions dont allow for complex / nested variable structures, so where required inputs are coverted using `JSON.parse` - these are marked with a **\***

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


### `artifact_name`

**Default: `'repository-scan-result'`**

The artifact created at the end will be uploaded to the workflow under this name.


## Output

This action generates an artifact of all reports and uploads it to the completed workflow as `artifact_name`


## Process flow

- **main.ts** reads and creates the configuration data
- **main.ts** contains `PARSERS` constant which contains every parser that will be run and `OUTPUTS` which has all the output handlers
- **main.ts** creates a new `Report` with the configuration data and the `PARSERS` and then calls `.generate()`
- **Report.generate()** iterates over the `PARSERS` passed in `.allPackages()` method which in turn calls `.packages()` on each parser which returns an array of `PackageInfo`.
- how this is handled is determined within the parser itself
- **main.ts** will then create an `Output` class with the `OUTPUTS` passed in and calls `.from(report)` to create all the report files and return the files that have been created

## Adding new parsers

Underneath the `src/parsers` folder create a new root named appropriately (`$lang-$tool`) with a base class called `${tool}Parser`. This class must implement `IParser`, beyond that its self contained with helpful classes and utilities in `src/app`.

Add testing under `./__tests__/` and then add the class to `PARSERS` in `main.ts`

## Adding new output reports

Under `src/outputs` folder, create a new folder and then a base class inside that which implements `IOutput`. Add testing to the main `./__tests__/` folder and add the class to `OUTPUTS` in `main.ts`.


## Adding new action inputs

Tried to reduce the amount of work required to add a new input param to the action, but its a bit messier than ideal. There are **4** areas that require changes:

- `./action.yml` - the actual action configuration file
- `IActionParameters` - will need the new fields adding
- `ActionParameters` - will need the fields and the `fromCoreInput` method updating
