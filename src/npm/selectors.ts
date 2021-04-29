export const enum ManifestSelectors {
    Main = '[.dependencies]',
    Dev = '[.devDependencies]'
}

export const enum LockSelectors {
    // .dependencies exists for both v1 and v2 versions of package-lock files
    Main = '[.dependencies]'
}

export const ManifestSelectorsArray: string[] = [
    ManifestSelectors.Main,
    ManifestSelectors.Dev
]

export const LockSelectorsArray: string[] = [LockSelectors.Main]

export const LockSelectorsRecursiveArray: string[] = []
