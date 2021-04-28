export const enum ManifestSelectors {
    Main = '[.require]',
    Dev = '[.require-dev]'
}
export const enum LockSelectors {
    Main = '[.packages]',
    Dev = '[.packages-dev]'
}

export const enum LockSelectorsRecursive {
    PackageRequire = '[.packages[].require]',
    PackageRequireDev = '[.packages[]."require-dev"]',
    PackageDevRequire = '[."packages-dev"[].require]',
    PackageDevRequireDev = '[."packages-dev"[]."require-dev"]'
}
