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
    - yarn
        - `yarn.lock`
- Python
    - pip
        - `requirements.txt`
- Go
    - mod
        - `go.mod` & `go.sum`



## Inputs

Currently, GitHub actions dont allow for complex / nested variable structures, so some inputs are parsed from json strings.

### `source_directory`

**Default: `./`**

This is the base directory to scan from and defaults to the root (`./`) of the repository and should be expressed as a relatiave string.

If your code has both source and built versions of files you may want to adjust this property to be the source (such as `./src/`) to avoid large number duplications.

### `source_exclude` **\***

**Default: `'["__samples__**","__tests__**","node_modules**","vendor**"]'`**

The intention here is to provide a way to remove known unhappy paths or folders.

## Output

This action generates an artifact of all reports and uploads it to the completed workflow as
