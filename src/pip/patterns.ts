export const enum PipPatterns {
    Manifest = '**/requirements.txt',
    // No lock file for pip
    Lock = '!**'
}
