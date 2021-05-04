require('./sourcemap-register.js');module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 2542:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"name\":\"@hapi/joi\",\"description\":\"Object schema validation\",\"version\":\"16.1.8\",\"repository\":\"git://github.com/hapijs/joi\",\"main\":\"lib/index.js\",\"browser\":\"dist/joi-browser.min.js\",\"keywords\":[\"schema\",\"validation\"],\"dependencies\":{\"@hapi/address\":\"^2.1.2\",\"@hapi/formula\":\"^1.2.0\",\"@hapi/hoek\":\"^8.2.4\",\"@hapi/pinpoint\":\"^1.0.2\",\"@hapi/topo\":\"^3.1.3\"},\"devDependencies\":{\"@hapi/bourne\":\"1.x.x\",\"@hapi/code\":\"6.x.x\",\"@hapi/lab\":\"20.x.x\",\"@hapi/joi-legacy-test\":\"npm:@hapi/joi@15.x.x\"},\"scripts\":{\"prepublishOnly\":\"cd browser && npm install && npm run build\",\"test\":\"lab -t 100 -a @hapi/code -L\",\"test-cov-html\":\"lab -r html -o coverage.html -a @hapi/code\"},\"files\":[\"lib/**/*\",\"dist/*\"],\"license\":\"BSD-3-Clause\"}");

/***/ }),

/***/ 1194:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComposerParser = void 0;
const generics_1 = __webpack_require__(9999);
const classes_1 = __webpack_require__(7609);
const selectors_1 = __webpack_require__(8118);
function ComposerParser(name = 'composer', filesystem, manifest_name = 'composer-json', lock_name = 'composer-lock', manifest_file_pattern = "**/composer.json" /* Manifest */, lock_file_pattern = "**/composer.lock" /* Lock */, manifest_selectors = selectors_1.ManifestSelectorsArray, lock_selectors = selectors_1.LockSelectorsArray, recursive_lock_selectors = selectors_1.LockSelectorsRecursiveArray) {
    //-- Create the specification handlers
    const manifestHandler = new classes_1.ComposerManifestHandler(filesystem, manifest_file_pattern, manifest_selectors);
    const lockHandler = new classes_1.ComposerLockHandler(filesystem, lock_file_pattern, lock_selectors, recursive_lock_selectors);
    //-- Create the specs
    const manifestSpec = new generics_1.Specification(manifest_name, [
        manifestHandler
    ]);
    const lockSpec = new generics_1.Specification(lock_name, [lockHandler]);
    //-- The main package
    return new generics_1.Packages(name, manifestSpec, lockSpec);
}
exports.ComposerParser = ComposerParser;


/***/ }),

/***/ 437:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComposerLockHandler = void 0;
const ComposerManifastHandler_1 = __webpack_require__(2386);
class ComposerLockHandler extends ComposerManifastHandler_1.ComposerManifestHandler {
    constructor() {
        super(...arguments);
        this.type = 'composer-lock';
        this.recursive_prefix = 'third-party-';
    }
    // Loop over the rows (found via the matches_selector call) and find data from those
    // - put in to a map for better re-use with the lock files
    iterate_results(rows, source, selector) {
        let results = [];
        for (const row of rows) {
            // subtle difference from manifest here - the lock file
            // will return an object as its item, so directly map
            for (const [key, item] of Object.entries(row)) {
                const map = new Map(Object.entries(item));
                const res = this.result(map, source, selector);
                if (res !== false)
                    results.push(res);
            }
        }
        return results;
    }
    // Lock files recursive element matches the format for the manifest
    // files, so call that with new selectors
    recurse() {
        return __awaiter(this, void 0, void 0, function* () {
            const manifest = new ComposerManifastHandler_1.ComposerManifestHandler(this.filesystem, this.filepattern, this.recursive);
            manifest.type = this.recursive_prefix + this.type;
            yield manifest.process();
            // append the manifest results into this set of results
            this._results.push(...yield manifest.results());
        });
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.files();
            const selectors = this.selector;
            const primary = yield this.process_files(files, selectors);
            this._results.push(...primary);
            if (typeof this.recursive !== 'undefined')
                yield this.recurse();
            return new Promise(resolve => { resolve(); });
        });
    }
}
exports.ComposerLockHandler = ComposerLockHandler;


/***/ }),

/***/ 2386:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComposerManifestHandler = void 0;
const jq = __importStar(__webpack_require__(7668));
const fs = __importStar(__webpack_require__(5747));
const generics_1 = __webpack_require__(9999);
const ComposerSpecificationHandler_1 = __webpack_require__(8106);
class ComposerManifestHandler extends ComposerSpecificationHandler_1.ComposerSpecificationHandler {
    constructor() {
        super(...arguments);
        this.type = 'composer-json';
    }
    // convert a map to a result
    result(map, source, selector) {
        if (map.has('name') && map.has('version')) {
            return new generics_1.Result(map.get('name'), map.get('version'), source, this.type, selector);
        }
        return false;
    }
    // get the objects that match the selector from the file
    matches_selector(content, selector = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            if (content !== null && content.length > 0 && selector.length > 0) {
                results = (yield jq.run(selector, content, { output: 'json', input: 'string' }));
            }
            return new Promise(resolve => { resolve(results); });
        });
    }
    // Loop over the rows (found via the matches_selector call) and find data from those
    // - as this is manifest, it comes out as key -> value
    // - put in to a map for better re-use with the lock files
    iterate_results(rows, source, selector) {
        let results = [];
        for (const row of rows) {
            for (const [key, version] of Object.entries(row)) {
                const map = new Map([['name', key], ['version', version]]);
                const res = this.result(map, source, selector);
                if (res !== false)
                    results.push(res);
            }
        }
        return results;
    }
    // Get content from the filepath passed in and iterate of each selector
    // Use each selector to find matching data from the file using the pattern
    // and then pass along to process the result
    process_file_and_selectors(file, selectors) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            for (const selector of selectors) {
                const content = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
                const matched = yield this.matches_selector(content, selector);
                const filtered = matched.filter((i) => (i !== null && i !== undefined));
                if (filtered !== null && filtered.length > 0) {
                    const iterated = this.iterate_results(filtered, file, selector);
                    results.push(...iterated);
                }
            }
            return new Promise(resolve => { resolve(results); });
        });
    }
    // Loop over each file and pass down the selectors to be processed
    //
    process_files(files, selectors) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            for (const file of files) {
                const found = yield this.process_file_and_selectors(file, selectors);
                results.push(...found);
            }
            return new Promise(resolve => { resolve(results); });
        });
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.files();
            const selectors = this.selector;
            const primary = yield this.process_files(files, selectors);
            this._results.push(...primary);
            return new Promise(resolve => { resolve(); });
        });
    }
}
exports.ComposerManifestHandler = ComposerManifestHandler;


/***/ }),

/***/ 8106:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComposerSpecificationHandler = void 0;
const generics_1 = __webpack_require__(9999);
class ComposerSpecificationHandler extends generics_1.SpecificationHandler {
    constructor() {
        super(...arguments);
        this.type = 'composer';
    }
    // process each selector thats been set
    per_selector(selector) {
        const first = selector.charAt(0);
        const explode = selector.split(".").filter(i => i);
        selector = explode.map(function (val, i) {
            const containsQuote = val.indexOf('"') >= 0;
            const containsHyphen = val.indexOf('-') >= 0;
            const containsArray = val.indexOf('[') >= 0;
            if (containsHyphen && containsArray && !containsQuote) {
                const trim = val.replace('[', '').replace(']', '');
                val = `"${trim}"[]`;
            }
            else if (containsHyphen && !containsQuote) {
                val = `"${val}"`;
            }
            if (first === '[' && i === 0)
                return val;
            return `.${val}`;
        }).join('');
        // ensure its an array selector
        if (first !== '[')
            selector = `[${selector}]`;
        return selector;
    }
    // - jq needs selectors to have "" around them if - are present
    // - enforce array result
    sanitise() {
        this.selector = this.selector.map(i => this.per_selector(i));
    }
}
exports.ComposerSpecificationHandler = ComposerSpecificationHandler;


/***/ }),

/***/ 7609:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComposerLockHandler = exports.ComposerManifestHandler = exports.ComposerSpecificationHandler = void 0;
var ComposerSpecificationHandler_1 = __webpack_require__(8106);
Object.defineProperty(exports, "ComposerSpecificationHandler", ({ enumerable: true, get: function () { return ComposerSpecificationHandler_1.ComposerSpecificationHandler; } }));
var ComposerManifastHandler_1 = __webpack_require__(2386);
Object.defineProperty(exports, "ComposerManifestHandler", ({ enumerable: true, get: function () { return ComposerManifastHandler_1.ComposerManifestHandler; } }));
var ComposerLockHandler_1 = __webpack_require__(437);
Object.defineProperty(exports, "ComposerLockHandler", ({ enumerable: true, get: function () { return ComposerLockHandler_1.ComposerLockHandler; } }));


/***/ }),

/***/ 6666:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComposerParser = exports.LockSelectorsRecursiveArray = exports.LockSelectorsArray = exports.ManifestSelectorsArray = exports.ComposerManifestHandler = exports.ComposerLockHandler = exports.ComposerSpecificationHandler = void 0;
var classes_1 = __webpack_require__(7609);
Object.defineProperty(exports, "ComposerSpecificationHandler", ({ enumerable: true, get: function () { return classes_1.ComposerSpecificationHandler; } }));
Object.defineProperty(exports, "ComposerLockHandler", ({ enumerable: true, get: function () { return classes_1.ComposerLockHandler; } }));
Object.defineProperty(exports, "ComposerManifestHandler", ({ enumerable: true, get: function () { return classes_1.ComposerManifestHandler; } }));
var selectors_1 = __webpack_require__(8118);
Object.defineProperty(exports, "ManifestSelectorsArray", ({ enumerable: true, get: function () { return selectors_1.ManifestSelectorsArray; } }));
Object.defineProperty(exports, "LockSelectorsArray", ({ enumerable: true, get: function () { return selectors_1.LockSelectorsArray; } }));
Object.defineProperty(exports, "LockSelectorsRecursiveArray", ({ enumerable: true, get: function () { return selectors_1.LockSelectorsRecursiveArray; } }));
var Factory_1 = __webpack_require__(1194);
Object.defineProperty(exports, "ComposerParser", ({ enumerable: true, get: function () { return Factory_1.ComposerParser; } }));


/***/ }),

/***/ 8118:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LockSelectorsRecursiveArray = exports.LockSelectorsArray = exports.ManifestSelectorsArray = void 0;
exports.ManifestSelectorsArray = ["[.require]" /* Main */, "[.\"require-dev\"]" /* Dev */];
exports.LockSelectorsArray = ["[.packages]" /* Main */, "[.\"packages-dev\"]" /* Dev */];
exports.LockSelectorsRecursiveArray = [
    "[.packages[].require]" /* PackageRequire */,
    "[.packages[].\"require-dev\"]" /* PackageRequireDev */,
    "[.\"packages-dev\"[].require]" /* PackageDevRequire */,
    "[.\"packages-dev\"[].\"require-dev\"]" /* PackageDevRequireDev */
];


/***/ }),

/***/ 4650:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.config = exports.manifest_and_lock = exports.package_file = void 0;
const enums_1 = __webpack_require__(7704);
//---
// base class to handle assignment from raw json and
// functions
class from_json_object {
    constructor(json) {
        Object.assign(this, json);
        this.convert();
    }
    valid() {
        return true;
    }
    convert() { }
}
// class that describes what and where to find manifest / locks
// files
// - file can be an exact path or regex expression
// - type determines how the file would be processed
// - selectors is array of jq syntax to find items within the
//   the file
class package_file extends from_json_object {
    // only valid if file, type and selectors are setup
    valid() {
        const file = this.file || '';
        const type = this.type || enums_1.package_file_types.none;
        const selectors = this.selectors || [];
        const valid_type = Object.values(enums_1.package_file_types).includes(type) && type !== enums_1.package_file_types.none;
        return file.length > 0 && type.length > 0 && valid_type && selectors.length > 0;
    }
}
exports.package_file = package_file;
// class describes the name (like composer), its manifest & lock files
class manifest_and_lock extends from_json_object {
    valid() {
        var _a;
        const name = this.name || '';
        return (name.length > 0 || false) && (((_a = this.manifest) === null || _a === void 0 ? void 0 : _a.valid()) || false);
    }
    // fix package files being classes
    convert() {
        const manifest = this.manifest || {};
        const lock = this.lock || {};
        this.manifest = new package_file(manifest);
        this.lock = new package_file(lock);
    }
}
exports.manifest_and_lock = manifest_and_lock;
// As the config class is pulled from a yaml file and uses
// Object.assign it has a conversion method to ensure
// the items below it are classes with prototypes methods
class config extends from_json_object {
    // ensure this is a valid class and contains all we want
    valid() {
        var _a;
        let valid = true;
        const is_array = Array.isArray(this.manifests_and_locks);
        if (is_array) {
            const existing = (_a = this.manifests_and_locks) !== null && _a !== void 0 ? _a : [];
            for (const m of existing) {
                if (!m.valid())
                    valid = false;
            }
        }
        else {
            valid = false;
        }
        return valid;
    }
    // Fix this. to be classes correctly
    convert() {
        var _a;
        const is_array = Array.isArray(this.manifests_and_locks);
        // only try to parse if this is an array
        if (is_array) {
            const existing = (_a = this.manifests_and_locks) !== null && _a !== void 0 ? _a : [];
            const manifest_classes = [];
            for (const item of existing) {
                const m = new manifest_and_lock(item);
                manifest_classes.push(m);
            }
            this.manifests_and_locks = manifest_classes;
        }
    }
}
exports.config = config;


/***/ }),

/***/ 7704:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PackageFileTypes = exports.PackageFileParsers = void 0;
// the types allowed
// - when a selector finds a result, this enum determines how to process it
var PackageFileParsers;
(function (PackageFileParsers) {
    PackageFileParsers["none"] = "";
    PackageFileParsers["ComposerManifest"] = "ComposerManifest";
    PackageFileParsers["ComposerLock"] = "ComposerLock";
})(PackageFileParsers = exports.PackageFileParsers || (exports.PackageFileParsers = {}));
var PackageFileTypes;
(function (PackageFileTypes) {
    PackageFileTypes["none"] = "";
    PackageFileTypes["manifest"] = "manifest";
    PackageFileTypes["lock"] = "lock";
})(PackageFileTypes = exports.PackageFileTypes || (exports.PackageFileTypes = {}));


/***/ }),

/***/ 6730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Config = exports.Manifest = exports.Filesystem = void 0;
var classes_1 = __webpack_require__(4650);
Object.defineProperty(exports, "Filesystem", ({ enumerable: true, get: function () { return classes_1.Filesystem; } }));
Object.defineProperty(exports, "Manifest", ({ enumerable: true, get: function () { return classes_1.Manifest; } }));
Object.defineProperty(exports, "Config", ({ enumerable: true, get: function () { return classes_1.Config; } }));


/***/ }),

/***/ 953:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Packages = void 0;
//--
// new Package<Manifest, Lock>
class Packages {
    constructor(name, manifest, lock) {
        this.name = '';
        this.all = [];
        this.name = name;
        this.manifest = manifest;
        if (typeof lock !== 'undefined')
            this.lock = lock;
    }
    // fetches the package data from both lock & manifest files and
    // merge into one result set
    // - does not do any processing
    get(combine = true) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let manifest = [];
            let lock = [];
            let combined = [];
            yield this.manifest.parse();
            yield ((_a = this.lock) === null || _a === void 0 ? void 0 : _a.parse());
            manifest.push(...this.manifest.results());
            // set lock
            if (typeof this.lock !== 'undefined')
                lock = (_c = (_b = this.lock) === null || _b === void 0 ? void 0 : _b.results()) !== null && _c !== void 0 ? _c : [];
            if (combine && lock.length > 0)
                this.all = this.combine(manifest, lock);
            else
                this.all.push(...manifest, ...lock);
            return new Promise(resolve => {
                resolve(this.all);
            });
        });
    }
    // takes the manifest and lock, merges them together
    combine(manifest, lock) {
        let combined = [];
        // remove from lock files things that exist in manifest
        // and then expand the data in the manifest entry
        lock = lock.filter(function (l, i) {
            let record = manifest.find(m => m.name === l.name);
            // if we found a record that matches - expand and remove
            if (typeof record !== 'undefined' && record.name === l.name) {
                record.expand(l);
                return false;
            }
            return true;
        });
        combined.push(...manifest, ...lock);
        return combined;
    }
}
exports.Packages = Packages;


/***/ }),

/***/ 8292:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Result = void 0;
const core = __importStar(__webpack_require__(2186));
// Results is used to capture details about every package found
class Result {
    constructor(name, version, source, type, selector) {
        this.name = '';
        this.version = '';
        this.source = '';
        this.type = '';
        this.selector = '';
        if (typeof name !== 'undefined')
            this.name = name;
        if (typeof version !== 'undefined')
            this.version = version;
        if (typeof source !== 'undefined')
            this.source = source;
        if (typeof type !== 'undefined')
            this.type = type;
        if (typeof selector !== 'undefined')
            this.selector = selector;
    }
    // valididation check
    // -- only needs the name to be true
    valid() {
        let valid_name = (this.name.length > 0);
        core.debug('valid_name: ' + valid_name);
        return (valid_name);
    }
    // join the fields from extra into this one
    expand(extra) {
        this.version = this.version + '\n' + extra.version;
        this.source = this.source + '\n' + extra.source;
        this.selector = this.selector + '\n' + extra.selector;
        this.type = this.type + '\n' + extra.type;
    }
}
exports.Result = Result;


/***/ }),

/***/ 6892:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Specification = void 0;
// Specification handles parsing of a manifest / lock file
// Uses a SpecificationHandler to get the packages out of the manifest / lock
class Specification {
    constructor(name, handlers) {
        this.name = '';
        this._handlers = [];
        this._results = [];
        this.name = name;
        this._handlers = handlers;
    }
    handlers() {
        return this._handlers;
    }
    results() {
        return this._results;
    }
    // parse the specification of this manifest
    parse() {
        return __awaiter(this, void 0, void 0, function* () {
            // go over each handler
            // find the files that match
            // process them
            for (const handler of this.handlers()) {
                yield handler.process();
                const handler_results = yield handler.results();
                this._results.push(...handler_results);
            }
            return new Promise((resolve) => {
                resolve();
            });
        });
    }
}
exports.Specification = Specification;


/***/ }),

/***/ 4459:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpecificationHandler = void 0;
const core = __importStar(__webpack_require__(2186));
const glob = __importStar(__webpack_require__(8090));
const config_1 = __webpack_require__(6730);
// SpecificationHandler provide method to find files of its type and
// uses a function (.processor) to parse the the content of the files it
// finds
// The .processor would be different for every type of manifest / file
// Generally only extended to change the sanitise method
class SpecificationHandler {
    constructor(filesystem, filepattern, selector, recursive) {
        var _a;
        this._results = [];
        this.type = '';
        this.filesystem = new config_1.Filesystem();
        this.filepattern = '';
        this.selector = [];
        if (typeof filesystem !== 'undefined')
            this.filesystem = filesystem;
        if (typeof filepattern !== 'undefined')
            this.filepattern = filepattern;
        if (typeof recursive !== 'undefined')
            this.recursive = recursive;
        if (typeof selector !== 'undefined') {
            if (typeof selector == 'string')
                this.selector = (_a = [selector]) !== null && _a !== void 0 ? _a : [];
            else
                this.selector = selector !== null && selector !== void 0 ? selector : [];
        }
        this.sanitise();
    }
    // return all the files that this spec matches
    files() {
        return __awaiter(this, void 0, void 0, function* () {
            const pattern = this.filesystem.directory + this.filepattern;
            const glober = yield glob.create(pattern, { followSymbolicLinks: this.filesystem.follow_symlinks });
            const files = yield glober.glob();
            return new Promise((resolve) => {
                resolve(files);
            });
        });
    }
    // check if this is valid class
    valid() {
        let valid_filepattern = (this.filepattern.length > 0);
        let valid_selector = (this.selector.length > 0);
        core.debug('valid_filepattern: ' + valid_filepattern);
        core.debug('valid_selector: ' + valid_selector);
        return (valid_filepattern && valid_selector);
    }
    // handle recursive selections
    recurse() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => { resolve(); });
        });
    }
    // do nothing in the generic handler
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => { resolve(); });
        });
    }
    results() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => { resolve(this._results); });
        });
    }
    // used to clear up the selectors and data of the class before use
    sanitise() { }
}
exports.SpecificationHandler = SpecificationHandler;


/***/ }),

/***/ 3427:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpecificationHandler = exports.Specification = exports.Result = exports.Packages = void 0;
var Packages_1 = __webpack_require__(953);
Object.defineProperty(exports, "Packages", ({ enumerable: true, get: function () { return Packages_1.Packages; } }));
var Result_1 = __webpack_require__(8292);
Object.defineProperty(exports, "Result", ({ enumerable: true, get: function () { return Result_1.Result; } }));
var Specification_1 = __webpack_require__(6892);
Object.defineProperty(exports, "Specification", ({ enumerable: true, get: function () { return Specification_1.Specification; } }));
var SpecificationHandler_1 = __webpack_require__(4459);
Object.defineProperty(exports, "SpecificationHandler", ({ enumerable: true, get: function () { return SpecificationHandler_1.SpecificationHandler; } }));


/***/ }),

/***/ 9999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpecificationHandler = exports.Specification = exports.Result = exports.Packages = void 0;
var classes_1 = __webpack_require__(3427);
Object.defineProperty(exports, "Packages", ({ enumerable: true, get: function () { return classes_1.Packages; } }));
Object.defineProperty(exports, "Result", ({ enumerable: true, get: function () { return classes_1.Result; } }));
Object.defineProperty(exports, "Specification", ({ enumerable: true, get: function () { return classes_1.Specification; } }));
Object.defineProperty(exports, "SpecificationHandler", ({ enumerable: true, get: function () { return classes_1.SpecificationHandler; } }));


/***/ }),

/***/ 3109:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__webpack_require__(2186));
const yaml_1 = __webpack_require__(4544);
const manifestresults_1 = __webpack_require__(7653);
// import * as glob from '@actions/glob'
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // -- Load configuration
            const configuration_file = (_a = core.getInput('configuration_file')) !== null && _a !== void 0 ? _a : './configuration.yml';
            const configuration = yield yaml_1.yaml_to_config(configuration_file);
            core.debug('configuration file loaded: ' + configuration_file);
            const handler = new manifestresults_1.ManifestResults(configuration);
            yield handler.process();
            yield handler.save();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 3537:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvailableManifestParsers = void 0;
const composer_1 = __webpack_require__(6666);
const npm_1 = __webpack_require__(502);
exports.AvailableManifestParsers = new Map([
    ['ComposerParser', composer_1.ComposerParser],
    ['PackageParser', npm_1.PackageParser]
]);


/***/ }),

/***/ 2094:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ManifestResults = void 0;
const core = __importStar(__webpack_require__(2186));
const outputer_1 = __webpack_require__(4506);
const AvailableManifestsParsers_1 = __webpack_require__(3537);
class ManifestResults {
    constructor(configuration) {
        this.output = new Map();
        if (typeof configuration !== 'undefined')
            this.configuration = configuration;
    }
    // return an instance created vai the factory method call (f)
    // - the return type is a monster
    instance(manifest) {
        var _a;
        const f = AvailableManifestsParsers_1.AvailableManifestParsers.get(manifest.uses);
        // expand on this later to allow a .with type overwrite of this properties
        return f(manifest.name, (_a = this.configuration) === null || _a === void 0 ? void 0 : _a.filesystem);
    }
    // run_parser creates an instance and gets the resulting data
    //
    run_parser(manifest) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            // check if this is available
            const available = AvailableManifestsParsers_1.AvailableManifestParsers.has(manifest.uses);
            const valid = manifest.valid();
            if (valid && available) {
                const instance = this.instance(manifest);
                results = yield instance.get(true);
            }
            core.debug('manifest available: ' + available);
            core.debug('manifest valid: ' + valid);
            return new Promise(resolve => { resolve(results); });
        });
    }
    // process all the manifests from the config
    manifests() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            // loop over each item in the config
            const manifest_parsers = (_b = (_a = this.configuration) === null || _a === void 0 ? void 0 : _a.manifests) !== null && _b !== void 0 ? _b : [];
            for (const parser of manifest_parsers) {
                core.debug('manifest parser: ' + parser.name);
                const found = yield this.run_parser(parser);
                // if we found data, append to the overall results
                if (found && found.length)
                    results.push(...found);
            }
            return new Promise(resolve => { resolve(results); });
        });
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const manifest_results = yield this.manifests();
            this.output.set('packages', manifest_results);
            return new Promise(resolve => { resolve(); });
        });
    }
    // use the output configuration data to save the result to a file
    save() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const outputters = (_a = this.configuration) === null || _a === void 0 ? void 0 : _a.output;
            console.log('out---->', outputters);
            for (const output of outputters) {
                const filename = (_b = output.location) !== null && _b !== void 0 ? _b : 'scan-result';
                const as_name = (_c = output.as) !== null && _c !== void 0 ? _c : 'json';
                const as_exists = outputer_1.AvailableOutputers.has(as_name);
                if (as_exists) {
                    const out = outputer_1.AvailableOutputers.get(as_name);
                    out.write(filename, this.output);
                }
            }
            return new Promise(resolve => { resolve(); });
        });
    }
}
exports.ManifestResults = ManifestResults;


/***/ }),

/***/ 9041:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ManifestResults = void 0;
var ManifestResults_1 = __webpack_require__(2094);
Object.defineProperty(exports, "ManifestResults", ({ enumerable: true, get: function () { return ManifestResults_1.ManifestResults; } }));


/***/ }),

/***/ 7653:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvailableManifestParsers = exports.ManifestResults = void 0;
var classes_1 = __webpack_require__(9041);
Object.defineProperty(exports, "ManifestResults", ({ enumerable: true, get: function () { return classes_1.ManifestResults; } }));
var AvailableManifestsParsers_1 = __webpack_require__(3537);
Object.defineProperty(exports, "AvailableManifestParsers", ({ enumerable: true, get: function () { return AvailableManifestsParsers_1.AvailableManifestParsers; } }));


/***/ }),

/***/ 9481:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PackageParser = void 0;
const generics_1 = __webpack_require__(9999);
const classes_1 = __webpack_require__(2299);
const selectors_1 = __webpack_require__(9249);
function PackageParser(name = 'package', filesystem, manifest_name = 'package-json', lock_name = 'package-lock', manifest_file_pattern = "**/package.json" /* Manifest */, lock_file_pattern = "**/package-lock.json" /* Lock */, manifest_selectors = selectors_1.ManifestSelectorsArray, lock_selectors = selectors_1.LockSelectorsArray, recursive_lock_selectors = selectors_1.LockSelectorsRecursiveArray) {
    //-- Create the specification handlers
    const manifestHandler = new classes_1.NpmManifestHandler(filesystem, manifest_file_pattern, manifest_selectors);
    const lockHandler = new classes_1.NpmLockHandler(filesystem, lock_file_pattern, lock_selectors, recursive_lock_selectors);
    //-- Create the specs
    const manifestSpec = new generics_1.Specification(manifest_name, [
        manifestHandler
    ]);
    const lockSpec = new generics_1.Specification(lock_name, [lockHandler]);
    //-- The main package
    return new generics_1.Packages(name, manifestSpec, lockSpec);
}
exports.PackageParser = PackageParser;


/***/ }),

/***/ 7166:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NpmLockHandler = void 0;
const composer_1 = __webpack_require__(6666);
class NpmLockHandler extends composer_1.ComposerLockHandler {
    constructor() {
        super(...arguments);
        this.type = 'package-lock';
    }
    // Lock files dont recurse for package-lock files
    recurse() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => { resolve(); });
        });
    }
    // Package locks are like composer lock, where its more of an object,
    // so this is closer to that.
    // As the name is the key we have to overwrite 'name'
    iterate_results(rows, source, selector) {
        var _a;
        let results = [];
        const popped = (_a = rows.pop()) !== null && _a !== void 0 ? _a : {};
        for (const [key, item] of Object.entries(popped)) {
            let map = new Map(Object.entries(item));
            map.set('name', key);
            const res = this.result(map, source, selector);
            if (res !== false)
                results.push(res);
        }
        return results;
    }
}
exports.NpmLockHandler = NpmLockHandler;


/***/ }),

/***/ 2659:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NpmManifestHandler = void 0;
const composer_1 = __webpack_require__(6666);
// NpmManifestHandler is identical to ComposerManifests in structure but
// cuse different selectors
class NpmManifestHandler extends composer_1.ComposerManifestHandler {
    constructor() {
        super(...arguments);
        this.type = 'package-json';
    }
}
exports.NpmManifestHandler = NpmManifestHandler;


/***/ }),

/***/ 2299:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NpmLockHandler = exports.NpmManifestHandler = void 0;
var NpmManifastHandler_1 = __webpack_require__(2659);
Object.defineProperty(exports, "NpmManifestHandler", ({ enumerable: true, get: function () { return NpmManifastHandler_1.NpmManifestHandler; } }));
var NpmLockHandler_1 = __webpack_require__(7166);
Object.defineProperty(exports, "NpmLockHandler", ({ enumerable: true, get: function () { return NpmLockHandler_1.NpmLockHandler; } }));


/***/ }),

/***/ 502:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PackageParser = exports.NpmLockHandler = exports.NpmManifestHandler = exports.LockSelectorsRecursiveArray = exports.LockSelectorsArray = exports.ManifestSelectorsArray = void 0;
var selectors_1 = __webpack_require__(9249);
Object.defineProperty(exports, "ManifestSelectorsArray", ({ enumerable: true, get: function () { return selectors_1.ManifestSelectorsArray; } }));
Object.defineProperty(exports, "LockSelectorsArray", ({ enumerable: true, get: function () { return selectors_1.LockSelectorsArray; } }));
Object.defineProperty(exports, "LockSelectorsRecursiveArray", ({ enumerable: true, get: function () { return selectors_1.LockSelectorsRecursiveArray; } }));
var classes_1 = __webpack_require__(2299);
Object.defineProperty(exports, "NpmManifestHandler", ({ enumerable: true, get: function () { return classes_1.NpmManifestHandler; } }));
Object.defineProperty(exports, "NpmLockHandler", ({ enumerable: true, get: function () { return classes_1.NpmLockHandler; } }));
var Factory_1 = __webpack_require__(9481);
Object.defineProperty(exports, "PackageParser", ({ enumerable: true, get: function () { return Factory_1.PackageParser; } }));


/***/ }),

/***/ 9249:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LockSelectorsRecursiveArray = exports.LockSelectorsArray = exports.ManifestSelectorsArray = void 0;
exports.ManifestSelectorsArray = ["[.dependencies]" /* Main */, "[.devDependencies]" /* Dev */];
exports.LockSelectorsArray = ["[.dependencies]" /* Main */];
exports.LockSelectorsRecursiveArray = [];


/***/ }),

/***/ 9806:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsJson = void 0;
const fs = __importStar(__webpack_require__(5747));
const Outputer_1 = __webpack_require__(6661);
class AsJson extends Outputer_1.Outputer {
    write(filename, data) {
        const obj = this.to_object(data);
        const json_string = JSON.stringify(obj);
        fs.writeFileSync(filename + '.json', json_string);
    }
    to_object(data) {
        let obj = {};
        Object.assign(obj, ...[...data.entries()].map(([k, v]) => ({ [k]: v })));
        return obj;
    }
}
exports.AsJson = AsJson;


/***/ }),

/***/ 6661:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Outputer = void 0;
class Outputer {
    write(filename, data) { }
}
exports.Outputer = Outputer;


/***/ }),

/***/ 7582:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsJson = void 0;
var AsJson_1 = __webpack_require__(9806);
Object.defineProperty(exports, "AsJson", ({ enumerable: true, get: function () { return AsJson_1.AsJson; } }));


/***/ }),

/***/ 4506:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvailableOutputers = exports.AsJson = void 0;
const classes_1 = __webpack_require__(7582);
var classes_2 = __webpack_require__(7582);
Object.defineProperty(exports, "AsJson", ({ enumerable: true, get: function () { return classes_2.AsJson; } }));
exports.AvailableOutputers = new Map([['json', new classes_1.AsJson()]]);


/***/ }),

/***/ 6169:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errors = exports.error_messages = void 0;
//---- ERROR HANDLING
exports.error_messages = {
    yaml_to_config: 'Failed to convert yaml to config'
};
exports.errors = {
    yaml_to_config() {
        return new Error(exports.error_messages.yaml_to_config);
    }
};


/***/ }),

/***/ 4544:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.yaml_to_config = exports.yaml_to_json_object = exports.errors = exports.error_messages = void 0;
var errors_1 = __webpack_require__(6169);
Object.defineProperty(exports, "error_messages", ({ enumerable: true, get: function () { return errors_1.error_messages; } }));
var errors_2 = __webpack_require__(6169);
Object.defineProperty(exports, "errors", ({ enumerable: true, get: function () { return errors_2.errors; } }));
var yaml_to_json_object_1 = __webpack_require__(1543);
Object.defineProperty(exports, "yaml_to_json_object", ({ enumerable: true, get: function () { return yaml_to_json_object_1.yaml_to_json_object; } }));
var yaml_to_config_1 = __webpack_require__(266);
Object.defineProperty(exports, "yaml_to_config", ({ enumerable: true, get: function () { return yaml_to_config_1.yaml_to_config; } }));


/***/ }),

/***/ 266:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.yaml_to_config = void 0;
const errors_1 = __webpack_require__(6169);
const yaml_to_json_object_1 = __webpack_require__(1543);
const config_1 = __webpack_require__(6730);
const typedjson_1 = __webpack_require__(9165);
// convert yaml configuration file over to a config class
function yaml_to_config(filename, encoding = 'utf8') {
    return __awaiter(this, void 0, void 0, function* () {
        const json = yield yaml_to_json_object_1.yaml_to_json_object(filename, encoding);
        return new Promise((resolve, reject) => {
            const config_class = typedjson_1.TypedJSON.parse(json, config_1.Config);
            const valid = config_class.valid();
            if (valid) {
                resolve(config_class);
            }
            else {
                reject(errors_1.errors.yaml_to_config());
            }
        });
    });
}
exports.yaml_to_config = yaml_to_config;


/***/ }),

/***/ 1543:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.yaml_to_json_object = void 0;
const js_yaml_1 = __importDefault(__webpack_require__(1917));
const fs = __importStar(__webpack_require__(5747));
// convert a yaml file over to a json object for processing
function yaml_to_json_object(filename, encoding = 'utf8') {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            const options = { encoding, flag: 'r' };
            const content = fs.readFileSync(filename, options).toString();
            const json = js_yaml_1.default.load(content);
            resolve(json);
        });
    });
}
exports.yaml_to_json_object = yaml_to_json_object;


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __webpack_require__(7351);
const file_command_1 = __webpack_require__(717);
const utils_1 = __webpack_require__(5278);
const os = __importStar(__webpack_require__(2087));
const path = __importStar(__webpack_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(5747));
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 8090:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const internal_globber_1 = __webpack_require__(8298);
/**
 * Constructs a globber
 *
 * @param patterns  Patterns separated by newlines
 * @param options   Glob options
 */
function create(patterns, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield internal_globber_1.DefaultGlobber.create(patterns, options);
    });
}
exports.create = create;
//# sourceMappingURL=glob.js.map

/***/ }),

/***/ 1026:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__webpack_require__(2186));
/**
 * Returns a copy with defaults filled in.
 */
function getOptions(copy) {
    const result = {
        followSymbolicLinks: true,
        implicitDescendants: true,
        omitBrokenSymbolicLinks: true
    };
    if (copy) {
        if (typeof copy.followSymbolicLinks === 'boolean') {
            result.followSymbolicLinks = copy.followSymbolicLinks;
            core.debug(`followSymbolicLinks '${result.followSymbolicLinks}'`);
        }
        if (typeof copy.implicitDescendants === 'boolean') {
            result.implicitDescendants = copy.implicitDescendants;
            core.debug(`implicitDescendants '${result.implicitDescendants}'`);
        }
        if (typeof copy.omitBrokenSymbolicLinks === 'boolean') {
            result.omitBrokenSymbolicLinks = copy.omitBrokenSymbolicLinks;
            core.debug(`omitBrokenSymbolicLinks '${result.omitBrokenSymbolicLinks}'`);
        }
    }
    return result;
}
exports.getOptions = getOptions;
//# sourceMappingURL=internal-glob-options-helper.js.map

/***/ }),

/***/ 8298:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__webpack_require__(2186));
const fs = __importStar(__webpack_require__(5747));
const globOptionsHelper = __importStar(__webpack_require__(1026));
const path = __importStar(__webpack_require__(5622));
const patternHelper = __importStar(__webpack_require__(9005));
const internal_match_kind_1 = __webpack_require__(1063);
const internal_pattern_1 = __webpack_require__(4536);
const internal_search_state_1 = __webpack_require__(9117);
const IS_WINDOWS = process.platform === 'win32';
class DefaultGlobber {
    constructor(options) {
        this.patterns = [];
        this.searchPaths = [];
        this.options = globOptionsHelper.getOptions(options);
    }
    getSearchPaths() {
        // Return a copy
        return this.searchPaths.slice();
    }
    glob() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            try {
                for (var _b = __asyncValues(this.globGenerator()), _c; _c = yield _b.next(), !_c.done;) {
                    const itemPath = _c.value;
                    result.push(itemPath);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        });
    }
    globGenerator() {
        return __asyncGenerator(this, arguments, function* globGenerator_1() {
            // Fill in defaults options
            const options = globOptionsHelper.getOptions(this.options);
            // Implicit descendants?
            const patterns = [];
            for (const pattern of this.patterns) {
                patterns.push(pattern);
                if (options.implicitDescendants &&
                    (pattern.trailingSeparator ||
                        pattern.segments[pattern.segments.length - 1] !== '**')) {
                    patterns.push(new internal_pattern_1.Pattern(pattern.negate, pattern.segments.concat('**')));
                }
            }
            // Push the search paths
            const stack = [];
            for (const searchPath of patternHelper.getSearchPaths(patterns)) {
                core.debug(`Search path '${searchPath}'`);
                // Exists?
                try {
                    // Intentionally using lstat. Detection for broken symlink
                    // will be performed later (if following symlinks).
                    yield __await(fs.promises.lstat(searchPath));
                }
                catch (err) {
                    if (err.code === 'ENOENT') {
                        continue;
                    }
                    throw err;
                }
                stack.unshift(new internal_search_state_1.SearchState(searchPath, 1));
            }
            // Search
            const traversalChain = []; // used to detect cycles
            while (stack.length) {
                // Pop
                const item = stack.pop();
                // Match?
                const match = patternHelper.match(patterns, item.path);
                const partialMatch = !!match || patternHelper.partialMatch(patterns, item.path);
                if (!match && !partialMatch) {
                    continue;
                }
                // Stat
                const stats = yield __await(DefaultGlobber.stat(item, options, traversalChain)
                // Broken symlink, or symlink cycle detected, or no longer exists
                );
                // Broken symlink, or symlink cycle detected, or no longer exists
                if (!stats) {
                    continue;
                }
                // Directory
                if (stats.isDirectory()) {
                    // Matched
                    if (match & internal_match_kind_1.MatchKind.Directory) {
                        yield yield __await(item.path);
                    }
                    // Descend?
                    else if (!partialMatch) {
                        continue;
                    }
                    // Push the child items in reverse
                    const childLevel = item.level + 1;
                    const childItems = (yield __await(fs.promises.readdir(item.path))).map(x => new internal_search_state_1.SearchState(path.join(item.path, x), childLevel));
                    stack.push(...childItems.reverse());
                }
                // File
                else if (match & internal_match_kind_1.MatchKind.File) {
                    yield yield __await(item.path);
                }
            }
        });
    }
    /**
     * Constructs a DefaultGlobber
     */
    static create(patterns, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new DefaultGlobber(options);
            if (IS_WINDOWS) {
                patterns = patterns.replace(/\r\n/g, '\n');
                patterns = patterns.replace(/\r/g, '\n');
            }
            const lines = patterns.split('\n').map(x => x.trim());
            for (const line of lines) {
                // Empty or comment
                if (!line || line.startsWith('#')) {
                    continue;
                }
                // Pattern
                else {
                    result.patterns.push(new internal_pattern_1.Pattern(line));
                }
            }
            result.searchPaths.push(...patternHelper.getSearchPaths(result.patterns));
            return result;
        });
    }
    static stat(item, options, traversalChain) {
        return __awaiter(this, void 0, void 0, function* () {
            // Note:
            // `stat` returns info about the target of a symlink (or symlink chain)
            // `lstat` returns info about a symlink itself
            let stats;
            if (options.followSymbolicLinks) {
                try {
                    // Use `stat` (following symlinks)
                    stats = yield fs.promises.stat(item.path);
                }
                catch (err) {
                    if (err.code === 'ENOENT') {
                        if (options.omitBrokenSymbolicLinks) {
                            core.debug(`Broken symlink '${item.path}'`);
                            return undefined;
                        }
                        throw new Error(`No information found for the path '${item.path}'. This may indicate a broken symbolic link.`);
                    }
                    throw err;
                }
            }
            else {
                // Use `lstat` (not following symlinks)
                stats = yield fs.promises.lstat(item.path);
            }
            // Note, isDirectory() returns false for the lstat of a symlink
            if (stats.isDirectory() && options.followSymbolicLinks) {
                // Get the realpath
                const realPath = yield fs.promises.realpath(item.path);
                // Fixup the traversal chain to match the item level
                while (traversalChain.length >= item.level) {
                    traversalChain.pop();
                }
                // Test for a cycle
                if (traversalChain.some((x) => x === realPath)) {
                    core.debug(`Symlink cycle detected for path '${item.path}' and realpath '${realPath}'`);
                    return undefined;
                }
                // Update the traversal chain
                traversalChain.push(realPath);
            }
            return stats;
        });
    }
}
exports.DefaultGlobber = DefaultGlobber;
//# sourceMappingURL=internal-globber.js.map

/***/ }),

/***/ 1063:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Indicates whether a pattern matches a path
 */
var MatchKind;
(function (MatchKind) {
    /** Not matched */
    MatchKind[MatchKind["None"] = 0] = "None";
    /** Matched if the path is a directory */
    MatchKind[MatchKind["Directory"] = 1] = "Directory";
    /** Matched if the path is a regular file */
    MatchKind[MatchKind["File"] = 2] = "File";
    /** Matched */
    MatchKind[MatchKind["All"] = 3] = "All";
})(MatchKind = exports.MatchKind || (exports.MatchKind = {}));
//# sourceMappingURL=internal-match-kind.js.map

/***/ }),

/***/ 1849:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const path = __importStar(__webpack_require__(5622));
const assert_1 = __importDefault(__webpack_require__(2357));
const IS_WINDOWS = process.platform === 'win32';
/**
 * Similar to path.dirname except normalizes the path separators and slightly better handling for Windows UNC paths.
 *
 * For example, on Linux/macOS:
 * - `/               => /`
 * - `/hello          => /`
 *
 * For example, on Windows:
 * - `C:\             => C:\`
 * - `C:\hello        => C:\`
 * - `C:              => C:`
 * - `C:hello         => C:`
 * - `\               => \`
 * - `\hello          => \`
 * - `\\hello         => \\hello`
 * - `\\hello\world   => \\hello\world`
 */
function dirname(p) {
    // Normalize slashes and trim unnecessary trailing slash
    p = safeTrimTrailingSeparator(p);
    // Windows UNC root, e.g. \\hello or \\hello\world
    if (IS_WINDOWS && /^\\\\[^\\]+(\\[^\\]+)?$/.test(p)) {
        return p;
    }
    // Get dirname
    let result = path.dirname(p);
    // Trim trailing slash for Windows UNC root, e.g. \\hello\world\
    if (IS_WINDOWS && /^\\\\[^\\]+\\[^\\]+\\$/.test(result)) {
        result = safeTrimTrailingSeparator(result);
    }
    return result;
}
exports.dirname = dirname;
/**
 * Roots the path if not already rooted. On Windows, relative roots like `\`
 * or `C:` are expanded based on the current working directory.
 */
function ensureAbsoluteRoot(root, itemPath) {
    assert_1.default(root, `ensureAbsoluteRoot parameter 'root' must not be empty`);
    assert_1.default(itemPath, `ensureAbsoluteRoot parameter 'itemPath' must not be empty`);
    // Already rooted
    if (hasAbsoluteRoot(itemPath)) {
        return itemPath;
    }
    // Windows
    if (IS_WINDOWS) {
        // Check for itemPath like C: or C:foo
        if (itemPath.match(/^[A-Z]:[^\\/]|^[A-Z]:$/i)) {
            let cwd = process.cwd();
            assert_1.default(cwd.match(/^[A-Z]:\\/i), `Expected current directory to start with an absolute drive root. Actual '${cwd}'`);
            // Drive letter matches cwd? Expand to cwd
            if (itemPath[0].toUpperCase() === cwd[0].toUpperCase()) {
                // Drive only, e.g. C:
                if (itemPath.length === 2) {
                    // Preserve specified drive letter case (upper or lower)
                    return `${itemPath[0]}:\\${cwd.substr(3)}`;
                }
                // Drive + path, e.g. C:foo
                else {
                    if (!cwd.endsWith('\\')) {
                        cwd += '\\';
                    }
                    // Preserve specified drive letter case (upper or lower)
                    return `${itemPath[0]}:\\${cwd.substr(3)}${itemPath.substr(2)}`;
                }
            }
            // Different drive
            else {
                return `${itemPath[0]}:\\${itemPath.substr(2)}`;
            }
        }
        // Check for itemPath like \ or \foo
        else if (normalizeSeparators(itemPath).match(/^\\$|^\\[^\\]/)) {
            const cwd = process.cwd();
            assert_1.default(cwd.match(/^[A-Z]:\\/i), `Expected current directory to start with an absolute drive root. Actual '${cwd}'`);
            return `${cwd[0]}:\\${itemPath.substr(1)}`;
        }
    }
    assert_1.default(hasAbsoluteRoot(root), `ensureAbsoluteRoot parameter 'root' must have an absolute root`);
    // Otherwise ensure root ends with a separator
    if (root.endsWith('/') || (IS_WINDOWS && root.endsWith('\\'))) {
        // Intentionally empty
    }
    else {
        // Append separator
        root += path.sep;
    }
    return root + itemPath;
}
exports.ensureAbsoluteRoot = ensureAbsoluteRoot;
/**
 * On Linux/macOS, true if path starts with `/`. On Windows, true for paths like:
 * `\\hello\share` and `C:\hello` (and using alternate separator).
 */
function hasAbsoluteRoot(itemPath) {
    assert_1.default(itemPath, `hasAbsoluteRoot parameter 'itemPath' must not be empty`);
    // Normalize separators
    itemPath = normalizeSeparators(itemPath);
    // Windows
    if (IS_WINDOWS) {
        // E.g. \\hello\share or C:\hello
        return itemPath.startsWith('\\\\') || /^[A-Z]:\\/i.test(itemPath);
    }
    // E.g. /hello
    return itemPath.startsWith('/');
}
exports.hasAbsoluteRoot = hasAbsoluteRoot;
/**
 * On Linux/macOS, true if path starts with `/`. On Windows, true for paths like:
 * `\`, `\hello`, `\\hello\share`, `C:`, and `C:\hello` (and using alternate separator).
 */
function hasRoot(itemPath) {
    assert_1.default(itemPath, `isRooted parameter 'itemPath' must not be empty`);
    // Normalize separators
    itemPath = normalizeSeparators(itemPath);
    // Windows
    if (IS_WINDOWS) {
        // E.g. \ or \hello or \\hello
        // E.g. C: or C:\hello
        return itemPath.startsWith('\\') || /^[A-Z]:/i.test(itemPath);
    }
    // E.g. /hello
    return itemPath.startsWith('/');
}
exports.hasRoot = hasRoot;
/**
 * Removes redundant slashes and converts `/` to `\` on Windows
 */
function normalizeSeparators(p) {
    p = p || '';
    // Windows
    if (IS_WINDOWS) {
        // Convert slashes on Windows
        p = p.replace(/\//g, '\\');
        // Remove redundant slashes
        const isUnc = /^\\\\+[^\\]/.test(p); // e.g. \\hello
        return (isUnc ? '\\' : '') + p.replace(/\\\\+/g, '\\'); // preserve leading \\ for UNC
    }
    // Remove redundant slashes
    return p.replace(/\/\/+/g, '/');
}
exports.normalizeSeparators = normalizeSeparators;
/**
 * Normalizes the path separators and trims the trailing separator (when safe).
 * For example, `/foo/ => /foo` but `/ => /`
 */
function safeTrimTrailingSeparator(p) {
    // Short-circuit if empty
    if (!p) {
        return '';
    }
    // Normalize separators
    p = normalizeSeparators(p);
    // No trailing slash
    if (!p.endsWith(path.sep)) {
        return p;
    }
    // Check '/' on Linux/macOS and '\' on Windows
    if (p === path.sep) {
        return p;
    }
    // On Windows check if drive root. E.g. C:\
    if (IS_WINDOWS && /^[A-Z]:\\$/i.test(p)) {
        return p;
    }
    // Otherwise trim trailing slash
    return p.substr(0, p.length - 1);
}
exports.safeTrimTrailingSeparator = safeTrimTrailingSeparator;
//# sourceMappingURL=internal-path-helper.js.map

/***/ }),

/***/ 6836:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const path = __importStar(__webpack_require__(5622));
const pathHelper = __importStar(__webpack_require__(1849));
const assert_1 = __importDefault(__webpack_require__(2357));
const IS_WINDOWS = process.platform === 'win32';
/**
 * Helper class for parsing paths into segments
 */
class Path {
    /**
     * Constructs a Path
     * @param itemPath Path or array of segments
     */
    constructor(itemPath) {
        this.segments = [];
        // String
        if (typeof itemPath === 'string') {
            assert_1.default(itemPath, `Parameter 'itemPath' must not be empty`);
            // Normalize slashes and trim unnecessary trailing slash
            itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
            // Not rooted
            if (!pathHelper.hasRoot(itemPath)) {
                this.segments = itemPath.split(path.sep);
            }
            // Rooted
            else {
                // Add all segments, while not at the root
                let remaining = itemPath;
                let dir = pathHelper.dirname(remaining);
                while (dir !== remaining) {
                    // Add the segment
                    const basename = path.basename(remaining);
                    this.segments.unshift(basename);
                    // Truncate the last segment
                    remaining = dir;
                    dir = pathHelper.dirname(remaining);
                }
                // Remainder is the root
                this.segments.unshift(remaining);
            }
        }
        // Array
        else {
            // Must not be empty
            assert_1.default(itemPath.length > 0, `Parameter 'itemPath' must not be an empty array`);
            // Each segment
            for (let i = 0; i < itemPath.length; i++) {
                let segment = itemPath[i];
                // Must not be empty
                assert_1.default(segment, `Parameter 'itemPath' must not contain any empty segments`);
                // Normalize slashes
                segment = pathHelper.normalizeSeparators(itemPath[i]);
                // Root segment
                if (i === 0 && pathHelper.hasRoot(segment)) {
                    segment = pathHelper.safeTrimTrailingSeparator(segment);
                    assert_1.default(segment === pathHelper.dirname(segment), `Parameter 'itemPath' root segment contains information for multiple segments`);
                    this.segments.push(segment);
                }
                // All other segments
                else {
                    // Must not contain slash
                    assert_1.default(!segment.includes(path.sep), `Parameter 'itemPath' contains unexpected path separators`);
                    this.segments.push(segment);
                }
            }
        }
    }
    /**
     * Converts the path to it's string representation
     */
    toString() {
        // First segment
        let result = this.segments[0];
        // All others
        let skipSlash = result.endsWith(path.sep) || (IS_WINDOWS && /^[A-Z]:$/i.test(result));
        for (let i = 1; i < this.segments.length; i++) {
            if (skipSlash) {
                skipSlash = false;
            }
            else {
                result += path.sep;
            }
            result += this.segments[i];
        }
        return result;
    }
}
exports.Path = Path;
//# sourceMappingURL=internal-path.js.map

/***/ }),

/***/ 9005:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const pathHelper = __importStar(__webpack_require__(1849));
const internal_match_kind_1 = __webpack_require__(1063);
const IS_WINDOWS = process.platform === 'win32';
/**
 * Given an array of patterns, returns an array of paths to search.
 * Duplicates and paths under other included paths are filtered out.
 */
function getSearchPaths(patterns) {
    // Ignore negate patterns
    patterns = patterns.filter(x => !x.negate);
    // Create a map of all search paths
    const searchPathMap = {};
    for (const pattern of patterns) {
        const key = IS_WINDOWS
            ? pattern.searchPath.toUpperCase()
            : pattern.searchPath;
        searchPathMap[key] = 'candidate';
    }
    const result = [];
    for (const pattern of patterns) {
        // Check if already included
        const key = IS_WINDOWS
            ? pattern.searchPath.toUpperCase()
            : pattern.searchPath;
        if (searchPathMap[key] === 'included') {
            continue;
        }
        // Check for an ancestor search path
        let foundAncestor = false;
        let tempKey = key;
        let parent = pathHelper.dirname(tempKey);
        while (parent !== tempKey) {
            if (searchPathMap[parent]) {
                foundAncestor = true;
                break;
            }
            tempKey = parent;
            parent = pathHelper.dirname(tempKey);
        }
        // Include the search pattern in the result
        if (!foundAncestor) {
            result.push(pattern.searchPath);
            searchPathMap[key] = 'included';
        }
    }
    return result;
}
exports.getSearchPaths = getSearchPaths;
/**
 * Matches the patterns against the path
 */
function match(patterns, itemPath) {
    let result = internal_match_kind_1.MatchKind.None;
    for (const pattern of patterns) {
        if (pattern.negate) {
            result &= ~pattern.match(itemPath);
        }
        else {
            result |= pattern.match(itemPath);
        }
    }
    return result;
}
exports.match = match;
/**
 * Checks whether to descend further into the directory
 */
function partialMatch(patterns, itemPath) {
    return patterns.some(x => !x.negate && x.partialMatch(itemPath));
}
exports.partialMatch = partialMatch;
//# sourceMappingURL=internal-pattern-helper.js.map

/***/ }),

/***/ 4536:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__webpack_require__(2087));
const path = __importStar(__webpack_require__(5622));
const pathHelper = __importStar(__webpack_require__(1849));
const assert_1 = __importDefault(__webpack_require__(2357));
const minimatch_1 = __webpack_require__(3973);
const internal_match_kind_1 = __webpack_require__(1063);
const internal_path_1 = __webpack_require__(6836);
const IS_WINDOWS = process.platform === 'win32';
class Pattern {
    constructor(patternOrNegate, segments, homedir) {
        /**
         * Indicates whether matches should be excluded from the result set
         */
        this.negate = false;
        // Pattern overload
        let pattern;
        if (typeof patternOrNegate === 'string') {
            pattern = patternOrNegate.trim();
        }
        // Segments overload
        else {
            // Convert to pattern
            segments = segments || [];
            assert_1.default(segments.length, `Parameter 'segments' must not empty`);
            const root = Pattern.getLiteral(segments[0]);
            assert_1.default(root && pathHelper.hasAbsoluteRoot(root), `Parameter 'segments' first element must be a root path`);
            pattern = new internal_path_1.Path(segments).toString().trim();
            if (patternOrNegate) {
                pattern = `!${pattern}`;
            }
        }
        // Negate
        while (pattern.startsWith('!')) {
            this.negate = !this.negate;
            pattern = pattern.substr(1).trim();
        }
        // Normalize slashes and ensures absolute root
        pattern = Pattern.fixupPattern(pattern, homedir);
        // Segments
        this.segments = new internal_path_1.Path(pattern).segments;
        // Trailing slash indicates the pattern should only match directories, not regular files
        this.trailingSeparator = pathHelper
            .normalizeSeparators(pattern)
            .endsWith(path.sep);
        pattern = pathHelper.safeTrimTrailingSeparator(pattern);
        // Search path (literal path prior to the first glob segment)
        let foundGlob = false;
        const searchSegments = this.segments
            .map(x => Pattern.getLiteral(x))
            .filter(x => !foundGlob && !(foundGlob = x === ''));
        this.searchPath = new internal_path_1.Path(searchSegments).toString();
        // Root RegExp (required when determining partial match)
        this.rootRegExp = new RegExp(Pattern.regExpEscape(searchSegments[0]), IS_WINDOWS ? 'i' : '');
        // Create minimatch
        const minimatchOptions = {
            dot: true,
            nobrace: true,
            nocase: IS_WINDOWS,
            nocomment: true,
            noext: true,
            nonegate: true
        };
        pattern = IS_WINDOWS ? pattern.replace(/\\/g, '/') : pattern;
        this.minimatch = new minimatch_1.Minimatch(pattern, minimatchOptions);
    }
    /**
     * Matches the pattern against the specified path
     */
    match(itemPath) {
        // Last segment is globstar?
        if (this.segments[this.segments.length - 1] === '**') {
            // Normalize slashes
            itemPath = pathHelper.normalizeSeparators(itemPath);
            // Append a trailing slash. Otherwise Minimatch will not match the directory immediately
            // preceding the globstar. For example, given the pattern `/foo/**`, Minimatch returns
            // false for `/foo` but returns true for `/foo/`. Append a trailing slash to handle that quirk.
            if (!itemPath.endsWith(path.sep)) {
                // Note, this is safe because the constructor ensures the pattern has an absolute root.
                // For example, formats like C: and C:foo on Windows are resolved to an absolute root.
                itemPath = `${itemPath}${path.sep}`;
            }
        }
        else {
            // Normalize slashes and trim unnecessary trailing slash
            itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
        }
        // Match
        if (this.minimatch.match(itemPath)) {
            return this.trailingSeparator ? internal_match_kind_1.MatchKind.Directory : internal_match_kind_1.MatchKind.All;
        }
        return internal_match_kind_1.MatchKind.None;
    }
    /**
     * Indicates whether the pattern may match descendants of the specified path
     */
    partialMatch(itemPath) {
        // Normalize slashes and trim unnecessary trailing slash
        itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
        // matchOne does not handle root path correctly
        if (pathHelper.dirname(itemPath) === itemPath) {
            return this.rootRegExp.test(itemPath);
        }
        return this.minimatch.matchOne(itemPath.split(IS_WINDOWS ? /\\+/ : /\/+/), this.minimatch.set[0], true);
    }
    /**
     * Escapes glob patterns within a path
     */
    static globEscape(s) {
        return (IS_WINDOWS ? s : s.replace(/\\/g, '\\\\')) // escape '\' on Linux/macOS
            .replace(/(\[)(?=[^/]+\])/g, '[[]') // escape '[' when ']' follows within the path segment
            .replace(/\?/g, '[?]') // escape '?'
            .replace(/\*/g, '[*]'); // escape '*'
    }
    /**
     * Normalizes slashes and ensures absolute root
     */
    static fixupPattern(pattern, homedir) {
        // Empty
        assert_1.default(pattern, 'pattern cannot be empty');
        // Must not contain `.` segment, unless first segment
        // Must not contain `..` segment
        const literalSegments = new internal_path_1.Path(pattern).segments.map(x => Pattern.getLiteral(x));
        assert_1.default(literalSegments.every((x, i) => (x !== '.' || i === 0) && x !== '..'), `Invalid pattern '${pattern}'. Relative pathing '.' and '..' is not allowed.`);
        // Must not contain globs in root, e.g. Windows UNC path \\foo\b*r
        assert_1.default(!pathHelper.hasRoot(pattern) || literalSegments[0], `Invalid pattern '${pattern}'. Root segment must not contain globs.`);
        // Normalize slashes
        pattern = pathHelper.normalizeSeparators(pattern);
        // Replace leading `.` segment
        if (pattern === '.' || pattern.startsWith(`.${path.sep}`)) {
            pattern = Pattern.globEscape(process.cwd()) + pattern.substr(1);
        }
        // Replace leading `~` segment
        else if (pattern === '~' || pattern.startsWith(`~${path.sep}`)) {
            homedir = homedir || os.homedir();
            assert_1.default(homedir, 'Unable to determine HOME directory');
            assert_1.default(pathHelper.hasAbsoluteRoot(homedir), `Expected HOME directory to be a rooted path. Actual '${homedir}'`);
            pattern = Pattern.globEscape(homedir) + pattern.substr(1);
        }
        // Replace relative drive root, e.g. pattern is C: or C:foo
        else if (IS_WINDOWS &&
            (pattern.match(/^[A-Z]:$/i) || pattern.match(/^[A-Z]:[^\\]/i))) {
            let root = pathHelper.ensureAbsoluteRoot('C:\\dummy-root', pattern.substr(0, 2));
            if (pattern.length > 2 && !root.endsWith('\\')) {
                root += '\\';
            }
            pattern = Pattern.globEscape(root) + pattern.substr(2);
        }
        // Replace relative root, e.g. pattern is \ or \foo
        else if (IS_WINDOWS && (pattern === '\\' || pattern.match(/^\\[^\\]/))) {
            let root = pathHelper.ensureAbsoluteRoot('C:\\dummy-root', '\\');
            if (!root.endsWith('\\')) {
                root += '\\';
            }
            pattern = Pattern.globEscape(root) + pattern.substr(1);
        }
        // Otherwise ensure absolute root
        else {
            pattern = pathHelper.ensureAbsoluteRoot(Pattern.globEscape(process.cwd()), pattern);
        }
        return pathHelper.normalizeSeparators(pattern);
    }
    /**
     * Attempts to unescape a pattern segment to create a literal path segment.
     * Otherwise returns empty string.
     */
    static getLiteral(segment) {
        let literal = '';
        for (let i = 0; i < segment.length; i++) {
            const c = segment[i];
            // Escape
            if (c === '\\' && !IS_WINDOWS && i + 1 < segment.length) {
                literal += segment[++i];
                continue;
            }
            // Wildcard
            else if (c === '*' || c === '?') {
                return '';
            }
            // Character set
            else if (c === '[' && i + 1 < segment.length) {
                let set = '';
                let closed = -1;
                for (let i2 = i + 1; i2 < segment.length; i2++) {
                    const c2 = segment[i2];
                    // Escape
                    if (c2 === '\\' && !IS_WINDOWS && i2 + 1 < segment.length) {
                        set += segment[++i2];
                        continue;
                    }
                    // Closed
                    else if (c2 === ']') {
                        closed = i2;
                        break;
                    }
                    // Otherwise
                    else {
                        set += c2;
                    }
                }
                // Closed?
                if (closed >= 0) {
                    // Cannot convert
                    if (set.length > 1) {
                        return '';
                    }
                    // Convert to literal
                    if (set) {
                        literal += set;
                        i = closed;
                        continue;
                    }
                }
                // Otherwise fall thru
            }
            // Append
            literal += c;
        }
        return literal;
    }
    /**
     * Escapes regexp special characters
     * https://javascript.info/regexp-escaping
     */
    static regExpEscape(s) {
        return s.replace(/[[\\^$.|?*+()]/g, '\\$&');
    }
}
exports.Pattern = Pattern;
//# sourceMappingURL=internal-pattern.js.map

/***/ }),

/***/ 9117:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class SearchState {
    constructor(path, level) {
        this.path = path;
        this.level = level;
    }
}
exports.SearchState = SearchState;
//# sourceMappingURL=internal-search-state.js.map

/***/ }),

/***/ 5541:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Url = __webpack_require__(8835);


const internals = {
    minDomainSegments: 2,
    nonAsciiRx: /[^\x00-\x7f]/,
    domainControlRx: /[\x00-\x20@\:\/]/,                                                // Control + space + separators
    tldSegmentRx: /^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/,
    domainSegmentRx: /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/,
    URL: Url.URL || URL                                                                 // $lab:coverage:ignore$
};


exports.analyze = function (domain, options = {}) {

    if (typeof domain !== 'string') {
        throw new Error('Invalid input: domain must be a string');
    }

    if (!domain) {
        return { error: 'Domain must be a non-empty string' };
    }

    if (domain.length > 256) {
        return { error: 'Domain too long' };
    }

    const ascii = !internals.nonAsciiRx.test(domain);
    if (!ascii) {
        if (options.allowUnicode === false) {                                           // Defaults to true
            return { error: 'Domain contains forbidden Unicode characters' };
        }

        domain = domain.normalize('NFC');
    }

    if (internals.domainControlRx.test(domain)) {
        return { error: 'Domain contains invalid character' };
    }

    domain = internals.punycode(domain);

    // https://tools.ietf.org/html/rfc1035 section 2.3.1

    const minDomainSegments = options.minDomainSegments || internals.minDomainSegments;

    const segments = domain.split('.');
    if (segments.length < minDomainSegments) {
        return { error: 'Domain lacks the minimum required number of segments' };
    }

    const tlds = options.tlds;
    if (tlds) {
        const tld = segments[segments.length - 1].toLowerCase();
        if (tlds.deny && tlds.deny.has(tld) ||
            tlds.allow && !tlds.allow.has(tld)) {

            return { error: 'Domain uses forbidden TLD' };
        }
    }

    for (let i = 0; i < segments.length; ++i) {
        const segment = segments[i];

        if (!segment.length) {
            return { error: 'Domain contains empty dot-separated segment' };
        }

        if (segment.length > 63) {
            return { error: 'Domain contains dot-separated segment that is too long' };
        }

        if (i < segments.length - 1) {
            if (!internals.domainSegmentRx.test(segment)) {
                return { error: 'Domain contains invalid character' };
            }
        }
        else {
            if (!internals.tldSegmentRx.test(segment)) {
                return { error: 'Domain contains invalid tld character' };
            }
        }
    }
};


exports.isValid = function (domain, options) {

    return !exports.analyze(domain, options);
};


internals.punycode = function (domain) {

    try {
        return new internals.URL(`http://${domain}`).host;
    }
    catch (err) {
        return domain;
    }
};


/***/ }),

/***/ 7318:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Util = __webpack_require__(9357);

const Domain = __webpack_require__(5541);


const internals = {
    nonAsciiRx: /[^\x00-\x7f]/,
    encoder: new (Util.TextEncoder || TextEncoder)()                                            // $lab:coverage:ignore$
};


exports.analyze = function (email, options) {

    return internals.email(email, options);
};


exports.isValid = function (email, options) {

    return !internals.email(email, options);
};


internals.email = function (email, options = {}) {

    if (typeof email !== 'string') {
        throw new Error('Invalid input: email must be a string');
    }

    if (!email) {
        return { error: 'Address must be a non-empty string' };
    }

    // Unicode

    const ascii = !internals.nonAsciiRx.test(email);
    if (!ascii) {
        if (options.allowUnicode === false) {                                                   // Defaults to true
            return { error: 'Address contains forbidden Unicode characters' };
        }

        email = email.normalize('NFC');
    }

    // Basic structure

    const parts = email.split('@');
    if (parts.length !== 2) {
        return { error: parts.length > 2 ? 'Address cannot contain more than one @ character' : 'Address must contain one @ character' };
    }

    const [local, domain] = parts;

    if (!local) {
        return { error: 'Address local part cannot be empty' };
    }

    if (!options.ignoreLength) {
        if (email.length > 254) {                                           // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.3
            return { error: 'Address too long' };
        }

        if (internals.encoder.encode(local).length > 64) {                  // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.1
            return { error: 'Address local part too long' };
        }
    }

    // Validate parts

    return internals.local(local, ascii) || Domain.analyze(domain, options);
};


internals.local = function (local, ascii) {

    const segments = local.split('.');
    for (const segment of segments) {
        if (!segment.length) {
            return { error: 'Address local part contains empty dot-separated segment' };
        }

        if (ascii) {
            if (!internals.atextRx.test(segment)) {
                return { error: 'Address local part contains invalid character' };
            }

            continue;
        }

        for (const char of segment) {
            if (internals.atextRx.test(char)) {
                continue;
            }

            const binary = internals.binary(char);
            if (!internals.atomRx.test(binary)) {
                return { error: 'Address local part contains invalid character' };
            }
        }
    }
};


internals.binary = function (char) {

    return Array.from(internals.encoder.encode(char)).map((v) => String.fromCharCode(v)).join('');
};


/*
    From RFC 5321:

        Mailbox         =   Local-part "@" ( Domain / address-literal )

        Local-part      =   Dot-string / Quoted-string
        Dot-string      =   Atom *("."  Atom)
        Atom            =   1*atext
        atext           =   ALPHA / DIGIT / "!" / "#" / "$" / "%" / "&" / "'" / "*" / "+" / "-" / "/" / "=" / "?" / "^" / "_" / "`" / "{" / "|" / "}" / "~"

        Domain          =   sub-domain *("." sub-domain)
        sub-domain      =   Let-dig [Ldh-str]
        Let-dig         =   ALPHA / DIGIT
        Ldh-str         =   *( ALPHA / DIGIT / "-" ) Let-dig

        ALPHA           =   %x41-5A / %x61-7A        ; a-z, A-Z
        DIGIT           =   %x30-39                  ; 0-9

    From RFC 6531:

        sub-domain      =/  U-label
        atext           =/  UTF8-non-ascii

        UTF8-non-ascii  =   UTF8-2 / UTF8-3 / UTF8-4

        UTF8-2          =   %xC2-DF UTF8-tail
        UTF8-3          =   %xE0 %xA0-BF UTF8-tail /
                            %xE1-EC 2( UTF8-tail ) /
                            %xED %x80-9F UTF8-tail /
                            %xEE-EF 2( UTF8-tail )
        UTF8-4          =   %xF0 %x90-BF 2( UTF8-tail ) /
                            %xF1-F3 3( UTF8-tail ) /
                            %xF4 %x80-8F 2( UTF8-tail )

        UTF8-tail       =   %x80-BF

    Note: The following are not supported:

        RFC 5321: address-literal, Quoted-string
        RFC 5322: obs-*, CFWS
*/


internals.atextRx = /^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/;               // _ included in \w


internals.atomRx = new RegExp([

    //  %xC2-DF UTF8-tail
    '(?:[\\xc2-\\xdf][\\x80-\\xbf])',

    //  %xE0 %xA0-BF UTF8-tail              %xE1-EC 2( UTF8-tail )            %xED %x80-9F UTF8-tail              %xEE-EF 2( UTF8-tail )
    '(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})',

    //  %xF0 %x90-BF 2( UTF8-tail )            %xF1-F3 3( UTF8-tail )            %xF4 %x80-8F 2( UTF8-tail )
    '(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'

].join('|'));


/***/ }),

/***/ 5026:
/***/ ((module) => {

"use strict";


const internals = {};


// http://data.iana.org/TLD/tlds-alpha-by-domain.txt
// # Version 2019091902, Last Updated Fri Sep 20 07: 07: 02 2019 UTC


internals.tlds = [
    'AAA',
    'AARP',
    'ABARTH',
    'ABB',
    'ABBOTT',
    'ABBVIE',
    'ABC',
    'ABLE',
    'ABOGADO',
    'ABUDHABI',
    'AC',
    'ACADEMY',
    'ACCENTURE',
    'ACCOUNTANT',
    'ACCOUNTANTS',
    'ACO',
    'ACTOR',
    'AD',
    'ADAC',
    'ADS',
    'ADULT',
    'AE',
    'AEG',
    'AERO',
    'AETNA',
    'AF',
    'AFAMILYCOMPANY',
    'AFL',
    'AFRICA',
    'AG',
    'AGAKHAN',
    'AGENCY',
    'AI',
    'AIG',
    'AIGO',
    'AIRBUS',
    'AIRFORCE',
    'AIRTEL',
    'AKDN',
    'AL',
    'ALFAROMEO',
    'ALIBABA',
    'ALIPAY',
    'ALLFINANZ',
    'ALLSTATE',
    'ALLY',
    'ALSACE',
    'ALSTOM',
    'AM',
    'AMERICANEXPRESS',
    'AMERICANFAMILY',
    'AMEX',
    'AMFAM',
    'AMICA',
    'AMSTERDAM',
    'ANALYTICS',
    'ANDROID',
    'ANQUAN',
    'ANZ',
    'AO',
    'AOL',
    'APARTMENTS',
    'APP',
    'APPLE',
    'AQ',
    'AQUARELLE',
    'AR',
    'ARAB',
    'ARAMCO',
    'ARCHI',
    'ARMY',
    'ARPA',
    'ART',
    'ARTE',
    'AS',
    'ASDA',
    'ASIA',
    'ASSOCIATES',
    'AT',
    'ATHLETA',
    'ATTORNEY',
    'AU',
    'AUCTION',
    'AUDI',
    'AUDIBLE',
    'AUDIO',
    'AUSPOST',
    'AUTHOR',
    'AUTO',
    'AUTOS',
    'AVIANCA',
    'AW',
    'AWS',
    'AX',
    'AXA',
    'AZ',
    'AZURE',
    'BA',
    'BABY',
    'BAIDU',
    'BANAMEX',
    'BANANAREPUBLIC',
    'BAND',
    'BANK',
    'BAR',
    'BARCELONA',
    'BARCLAYCARD',
    'BARCLAYS',
    'BAREFOOT',
    'BARGAINS',
    'BASEBALL',
    'BASKETBALL',
    'BAUHAUS',
    'BAYERN',
    'BB',
    'BBC',
    'BBT',
    'BBVA',
    'BCG',
    'BCN',
    'BD',
    'BE',
    'BEATS',
    'BEAUTY',
    'BEER',
    'BENTLEY',
    'BERLIN',
    'BEST',
    'BESTBUY',
    'BET',
    'BF',
    'BG',
    'BH',
    'BHARTI',
    'BI',
    'BIBLE',
    'BID',
    'BIKE',
    'BING',
    'BINGO',
    'BIO',
    'BIZ',
    'BJ',
    'BLACK',
    'BLACKFRIDAY',
    'BLOCKBUSTER',
    'BLOG',
    'BLOOMBERG',
    'BLUE',
    'BM',
    'BMS',
    'BMW',
    'BN',
    'BNPPARIBAS',
    'BO',
    'BOATS',
    'BOEHRINGER',
    'BOFA',
    'BOM',
    'BOND',
    'BOO',
    'BOOK',
    'BOOKING',
    'BOSCH',
    'BOSTIK',
    'BOSTON',
    'BOT',
    'BOUTIQUE',
    'BOX',
    'BR',
    'BRADESCO',
    'BRIDGESTONE',
    'BROADWAY',
    'BROKER',
    'BROTHER',
    'BRUSSELS',
    'BS',
    'BT',
    'BUDAPEST',
    'BUGATTI',
    'BUILD',
    'BUILDERS',
    'BUSINESS',
    'BUY',
    'BUZZ',
    'BV',
    'BW',
    'BY',
    'BZ',
    'BZH',
    'CA',
    'CAB',
    'CAFE',
    'CAL',
    'CALL',
    'CALVINKLEIN',
    'CAM',
    'CAMERA',
    'CAMP',
    'CANCERRESEARCH',
    'CANON',
    'CAPETOWN',
    'CAPITAL',
    'CAPITALONE',
    'CAR',
    'CARAVAN',
    'CARDS',
    'CARE',
    'CAREER',
    'CAREERS',
    'CARS',
    'CARTIER',
    'CASA',
    'CASE',
    'CASEIH',
    'CASH',
    'CASINO',
    'CAT',
    'CATERING',
    'CATHOLIC',
    'CBA',
    'CBN',
    'CBRE',
    'CBS',
    'CC',
    'CD',
    'CEB',
    'CENTER',
    'CEO',
    'CERN',
    'CF',
    'CFA',
    'CFD',
    'CG',
    'CH',
    'CHANEL',
    'CHANNEL',
    'CHARITY',
    'CHASE',
    'CHAT',
    'CHEAP',
    'CHINTAI',
    'CHRISTMAS',
    'CHROME',
    'CHRYSLER',
    'CHURCH',
    'CI',
    'CIPRIANI',
    'CIRCLE',
    'CISCO',
    'CITADEL',
    'CITI',
    'CITIC',
    'CITY',
    'CITYEATS',
    'CK',
    'CL',
    'CLAIMS',
    'CLEANING',
    'CLICK',
    'CLINIC',
    'CLINIQUE',
    'CLOTHING',
    'CLOUD',
    'CLUB',
    'CLUBMED',
    'CM',
    'CN',
    'CO',
    'COACH',
    'CODES',
    'COFFEE',
    'COLLEGE',
    'COLOGNE',
    'COM',
    'COMCAST',
    'COMMBANK',
    'COMMUNITY',
    'COMPANY',
    'COMPARE',
    'COMPUTER',
    'COMSEC',
    'CONDOS',
    'CONSTRUCTION',
    'CONSULTING',
    'CONTACT',
    'CONTRACTORS',
    'COOKING',
    'COOKINGCHANNEL',
    'COOL',
    'COOP',
    'CORSICA',
    'COUNTRY',
    'COUPON',
    'COUPONS',
    'COURSES',
    'CR',
    'CREDIT',
    'CREDITCARD',
    'CREDITUNION',
    'CRICKET',
    'CROWN',
    'CRS',
    'CRUISE',
    'CRUISES',
    'CSC',
    'CU',
    'CUISINELLA',
    'CV',
    'CW',
    'CX',
    'CY',
    'CYMRU',
    'CYOU',
    'CZ',
    'DABUR',
    'DAD',
    'DANCE',
    'DATA',
    'DATE',
    'DATING',
    'DATSUN',
    'DAY',
    'DCLK',
    'DDS',
    'DE',
    'DEAL',
    'DEALER',
    'DEALS',
    'DEGREE',
    'DELIVERY',
    'DELL',
    'DELOITTE',
    'DELTA',
    'DEMOCRAT',
    'DENTAL',
    'DENTIST',
    'DESI',
    'DESIGN',
    'DEV',
    'DHL',
    'DIAMONDS',
    'DIET',
    'DIGITAL',
    'DIRECT',
    'DIRECTORY',
    'DISCOUNT',
    'DISCOVER',
    'DISH',
    'DIY',
    'DJ',
    'DK',
    'DM',
    'DNP',
    'DO',
    'DOCS',
    'DOCTOR',
    'DODGE',
    'DOG',
    'DOMAINS',
    'DOT',
    'DOWNLOAD',
    'DRIVE',
    'DTV',
    'DUBAI',
    'DUCK',
    'DUNLOP',
    'DUPONT',
    'DURBAN',
    'DVAG',
    'DVR',
    'DZ',
    'EARTH',
    'EAT',
    'EC',
    'ECO',
    'EDEKA',
    'EDU',
    'EDUCATION',
    'EE',
    'EG',
    'EMAIL',
    'EMERCK',
    'ENERGY',
    'ENGINEER',
    'ENGINEERING',
    'ENTERPRISES',
    'EPSON',
    'EQUIPMENT',
    'ER',
    'ERICSSON',
    'ERNI',
    'ES',
    'ESQ',
    'ESTATE',
    'ESURANCE',
    'ET',
    'ETISALAT',
    'EU',
    'EUROVISION',
    'EUS',
    'EVENTS',
    'EVERBANK',
    'EXCHANGE',
    'EXPERT',
    'EXPOSED',
    'EXPRESS',
    'EXTRASPACE',
    'FAGE',
    'FAIL',
    'FAIRWINDS',
    'FAITH',
    'FAMILY',
    'FAN',
    'FANS',
    'FARM',
    'FARMERS',
    'FASHION',
    'FAST',
    'FEDEX',
    'FEEDBACK',
    'FERRARI',
    'FERRERO',
    'FI',
    'FIAT',
    'FIDELITY',
    'FIDO',
    'FILM',
    'FINAL',
    'FINANCE',
    'FINANCIAL',
    'FIRE',
    'FIRESTONE',
    'FIRMDALE',
    'FISH',
    'FISHING',
    'FIT',
    'FITNESS',
    'FJ',
    'FK',
    'FLICKR',
    'FLIGHTS',
    'FLIR',
    'FLORIST',
    'FLOWERS',
    'FLY',
    'FM',
    'FO',
    'FOO',
    'FOOD',
    'FOODNETWORK',
    'FOOTBALL',
    'FORD',
    'FOREX',
    'FORSALE',
    'FORUM',
    'FOUNDATION',
    'FOX',
    'FR',
    'FREE',
    'FRESENIUS',
    'FRL',
    'FROGANS',
    'FRONTDOOR',
    'FRONTIER',
    'FTR',
    'FUJITSU',
    'FUJIXEROX',
    'FUN',
    'FUND',
    'FURNITURE',
    'FUTBOL',
    'FYI',
    'GA',
    'GAL',
    'GALLERY',
    'GALLO',
    'GALLUP',
    'GAME',
    'GAMES',
    'GAP',
    'GARDEN',
    'GAY',
    'GB',
    'GBIZ',
    'GD',
    'GDN',
    'GE',
    'GEA',
    'GENT',
    'GENTING',
    'GEORGE',
    'GF',
    'GG',
    'GGEE',
    'GH',
    'GI',
    'GIFT',
    'GIFTS',
    'GIVES',
    'GIVING',
    'GL',
    'GLADE',
    'GLASS',
    'GLE',
    'GLOBAL',
    'GLOBO',
    'GM',
    'GMAIL',
    'GMBH',
    'GMO',
    'GMX',
    'GN',
    'GODADDY',
    'GOLD',
    'GOLDPOINT',
    'GOLF',
    'GOO',
    'GOODYEAR',
    'GOOG',
    'GOOGLE',
    'GOP',
    'GOT',
    'GOV',
    'GP',
    'GQ',
    'GR',
    'GRAINGER',
    'GRAPHICS',
    'GRATIS',
    'GREEN',
    'GRIPE',
    'GROCERY',
    'GROUP',
    'GS',
    'GT',
    'GU',
    'GUARDIAN',
    'GUCCI',
    'GUGE',
    'GUIDE',
    'GUITARS',
    'GURU',
    'GW',
    'GY',
    'HAIR',
    'HAMBURG',
    'HANGOUT',
    'HAUS',
    'HBO',
    'HDFC',
    'HDFCBANK',
    'HEALTH',
    'HEALTHCARE',
    'HELP',
    'HELSINKI',
    'HERE',
    'HERMES',
    'HGTV',
    'HIPHOP',
    'HISAMITSU',
    'HITACHI',
    'HIV',
    'HK',
    'HKT',
    'HM',
    'HN',
    'HOCKEY',
    'HOLDINGS',
    'HOLIDAY',
    'HOMEDEPOT',
    'HOMEGOODS',
    'HOMES',
    'HOMESENSE',
    'HONDA',
    'HORSE',
    'HOSPITAL',
    'HOST',
    'HOSTING',
    'HOT',
    'HOTELES',
    'HOTELS',
    'HOTMAIL',
    'HOUSE',
    'HOW',
    'HR',
    'HSBC',
    'HT',
    'HU',
    'HUGHES',
    'HYATT',
    'HYUNDAI',
    'IBM',
    'ICBC',
    'ICE',
    'ICU',
    'ID',
    'IE',
    'IEEE',
    'IFM',
    'IKANO',
    'IL',
    'IM',
    'IMAMAT',
    'IMDB',
    'IMMO',
    'IMMOBILIEN',
    'IN',
    'INC',
    'INDUSTRIES',
    'INFINITI',
    'INFO',
    'ING',
    'INK',
    'INSTITUTE',
    'INSURANCE',
    'INSURE',
    'INT',
    'INTEL',
    'INTERNATIONAL',
    'INTUIT',
    'INVESTMENTS',
    'IO',
    'IPIRANGA',
    'IQ',
    'IR',
    'IRISH',
    'IS',
    'ISMAILI',
    'IST',
    'ISTANBUL',
    'IT',
    'ITAU',
    'ITV',
    'IVECO',
    'JAGUAR',
    'JAVA',
    'JCB',
    'JCP',
    'JE',
    'JEEP',
    'JETZT',
    'JEWELRY',
    'JIO',
    'JLL',
    'JM',
    'JMP',
    'JNJ',
    'JO',
    'JOBS',
    'JOBURG',
    'JOT',
    'JOY',
    'JP',
    'JPMORGAN',
    'JPRS',
    'JUEGOS',
    'JUNIPER',
    'KAUFEN',
    'KDDI',
    'KE',
    'KERRYHOTELS',
    'KERRYLOGISTICS',
    'KERRYPROPERTIES',
    'KFH',
    'KG',
    'KH',
    'KI',
    'KIA',
    'KIM',
    'KINDER',
    'KINDLE',
    'KITCHEN',
    'KIWI',
    'KM',
    'KN',
    'KOELN',
    'KOMATSU',
    'KOSHER',
    'KP',
    'KPMG',
    'KPN',
    'KR',
    'KRD',
    'KRED',
    'KUOKGROUP',
    'KW',
    'KY',
    'KYOTO',
    'KZ',
    'LA',
    'LACAIXA',
    'LADBROKES',
    'LAMBORGHINI',
    'LAMER',
    'LANCASTER',
    'LANCIA',
    'LANCOME',
    'LAND',
    'LANDROVER',
    'LANXESS',
    'LASALLE',
    'LAT',
    'LATINO',
    'LATROBE',
    'LAW',
    'LAWYER',
    'LB',
    'LC',
    'LDS',
    'LEASE',
    'LECLERC',
    'LEFRAK',
    'LEGAL',
    'LEGO',
    'LEXUS',
    'LGBT',
    'LI',
    'LIAISON',
    'LIDL',
    'LIFE',
    'LIFEINSURANCE',
    'LIFESTYLE',
    'LIGHTING',
    'LIKE',
    'LILLY',
    'LIMITED',
    'LIMO',
    'LINCOLN',
    'LINDE',
    'LINK',
    'LIPSY',
    'LIVE',
    'LIVING',
    'LIXIL',
    'LK',
    'LLC',
    'LOAN',
    'LOANS',
    'LOCKER',
    'LOCUS',
    'LOFT',
    'LOL',
    'LONDON',
    'LOTTE',
    'LOTTO',
    'LOVE',
    'LPL',
    'LPLFINANCIAL',
    'LR',
    'LS',
    'LT',
    'LTD',
    'LTDA',
    'LU',
    'LUNDBECK',
    'LUPIN',
    'LUXE',
    'LUXURY',
    'LV',
    'LY',
    'MA',
    'MACYS',
    'MADRID',
    'MAIF',
    'MAISON',
    'MAKEUP',
    'MAN',
    'MANAGEMENT',
    'MANGO',
    'MAP',
    'MARKET',
    'MARKETING',
    'MARKETS',
    'MARRIOTT',
    'MARSHALLS',
    'MASERATI',
    'MATTEL',
    'MBA',
    'MC',
    'MCKINSEY',
    'MD',
    'ME',
    'MED',
    'MEDIA',
    'MEET',
    'MELBOURNE',
    'MEME',
    'MEMORIAL',
    'MEN',
    'MENU',
    'MERCKMSD',
    'METLIFE',
    'MG',
    'MH',
    'MIAMI',
    'MICROSOFT',
    'MIL',
    'MINI',
    'MINT',
    'MIT',
    'MITSUBISHI',
    'MK',
    'ML',
    'MLB',
    'MLS',
    'MM',
    'MMA',
    'MN',
    'MO',
    'MOBI',
    'MOBILE',
    'MODA',
    'MOE',
    'MOI',
    'MOM',
    'MONASH',
    'MONEY',
    'MONSTER',
    'MOPAR',
    'MORMON',
    'MORTGAGE',
    'MOSCOW',
    'MOTO',
    'MOTORCYCLES',
    'MOV',
    'MOVIE',
    'MOVISTAR',
    'MP',
    'MQ',
    'MR',
    'MS',
    'MSD',
    'MT',
    'MTN',
    'MTR',
    'MU',
    'MUSEUM',
    'MUTUAL',
    'MV',
    'MW',
    'MX',
    'MY',
    'MZ',
    'NA',
    'NAB',
    'NADEX',
    'NAGOYA',
    'NAME',
    'NATIONWIDE',
    'NATURA',
    'NAVY',
    'NBA',
    'NC',
    'NE',
    'NEC',
    'NET',
    'NETBANK',
    'NETFLIX',
    'NETWORK',
    'NEUSTAR',
    'NEW',
    'NEWHOLLAND',
    'NEWS',
    'NEXT',
    'NEXTDIRECT',
    'NEXUS',
    'NF',
    'NFL',
    'NG',
    'NGO',
    'NHK',
    'NI',
    'NICO',
    'NIKE',
    'NIKON',
    'NINJA',
    'NISSAN',
    'NISSAY',
    'NL',
    'NO',
    'NOKIA',
    'NORTHWESTERNMUTUAL',
    'NORTON',
    'NOW',
    'NOWRUZ',
    'NOWTV',
    'NP',
    'NR',
    'NRA',
    'NRW',
    'NTT',
    'NU',
    'NYC',
    'NZ',
    'OBI',
    'OBSERVER',
    'OFF',
    'OFFICE',
    'OKINAWA',
    'OLAYAN',
    'OLAYANGROUP',
    'OLDNAVY',
    'OLLO',
    'OM',
    'OMEGA',
    'ONE',
    'ONG',
    'ONL',
    'ONLINE',
    'ONYOURSIDE',
    'OOO',
    'OPEN',
    'ORACLE',
    'ORANGE',
    'ORG',
    'ORGANIC',
    'ORIGINS',
    'OSAKA',
    'OTSUKA',
    'OTT',
    'OVH',
    'PA',
    'PAGE',
    'PANASONIC',
    'PARIS',
    'PARS',
    'PARTNERS',
    'PARTS',
    'PARTY',
    'PASSAGENS',
    'PAY',
    'PCCW',
    'PE',
    'PET',
    'PF',
    'PFIZER',
    'PG',
    'PH',
    'PHARMACY',
    'PHD',
    'PHILIPS',
    'PHONE',
    'PHOTO',
    'PHOTOGRAPHY',
    'PHOTOS',
    'PHYSIO',
    'PIAGET',
    'PICS',
    'PICTET',
    'PICTURES',
    'PID',
    'PIN',
    'PING',
    'PINK',
    'PIONEER',
    'PIZZA',
    'PK',
    'PL',
    'PLACE',
    'PLAY',
    'PLAYSTATION',
    'PLUMBING',
    'PLUS',
    'PM',
    'PN',
    'PNC',
    'POHL',
    'POKER',
    'POLITIE',
    'PORN',
    'POST',
    'PR',
    'PRAMERICA',
    'PRAXI',
    'PRESS',
    'PRIME',
    'PRO',
    'PROD',
    'PRODUCTIONS',
    'PROF',
    'PROGRESSIVE',
    'PROMO',
    'PROPERTIES',
    'PROPERTY',
    'PROTECTION',
    'PRU',
    'PRUDENTIAL',
    'PS',
    'PT',
    'PUB',
    'PW',
    'PWC',
    'PY',
    'QA',
    'QPON',
    'QUEBEC',
    'QUEST',
    'QVC',
    'RACING',
    'RADIO',
    'RAID',
    'RE',
    'READ',
    'REALESTATE',
    'REALTOR',
    'REALTY',
    'RECIPES',
    'RED',
    'REDSTONE',
    'REDUMBRELLA',
    'REHAB',
    'REISE',
    'REISEN',
    'REIT',
    'RELIANCE',
    'REN',
    'RENT',
    'RENTALS',
    'REPAIR',
    'REPORT',
    'REPUBLICAN',
    'REST',
    'RESTAURANT',
    'REVIEW',
    'REVIEWS',
    'REXROTH',
    'RICH',
    'RICHARDLI',
    'RICOH',
    'RIGHTATHOME',
    'RIL',
    'RIO',
    'RIP',
    'RMIT',
    'RO',
    'ROCHER',
    'ROCKS',
    'RODEO',
    'ROGERS',
    'ROOM',
    'RS',
    'RSVP',
    'RU',
    'RUGBY',
    'RUHR',
    'RUN',
    'RW',
    'RWE',
    'RYUKYU',
    'SA',
    'SAARLAND',
    'SAFE',
    'SAFETY',
    'SAKURA',
    'SALE',
    'SALON',
    'SAMSCLUB',
    'SAMSUNG',
    'SANDVIK',
    'SANDVIKCOROMANT',
    'SANOFI',
    'SAP',
    'SARL',
    'SAS',
    'SAVE',
    'SAXO',
    'SB',
    'SBI',
    'SBS',
    'SC',
    'SCA',
    'SCB',
    'SCHAEFFLER',
    'SCHMIDT',
    'SCHOLARSHIPS',
    'SCHOOL',
    'SCHULE',
    'SCHWARZ',
    'SCIENCE',
    'SCJOHNSON',
    'SCOR',
    'SCOT',
    'SD',
    'SE',
    'SEARCH',
    'SEAT',
    'SECURE',
    'SECURITY',
    'SEEK',
    'SELECT',
    'SENER',
    'SERVICES',
    'SES',
    'SEVEN',
    'SEW',
    'SEX',
    'SEXY',
    'SFR',
    'SG',
    'SH',
    'SHANGRILA',
    'SHARP',
    'SHAW',
    'SHELL',
    'SHIA',
    'SHIKSHA',
    'SHOES',
    'SHOP',
    'SHOPPING',
    'SHOUJI',
    'SHOW',
    'SHOWTIME',
    'SHRIRAM',
    'SI',
    'SILK',
    'SINA',
    'SINGLES',
    'SITE',
    'SJ',
    'SK',
    'SKI',
    'SKIN',
    'SKY',
    'SKYPE',
    'SL',
    'SLING',
    'SM',
    'SMART',
    'SMILE',
    'SN',
    'SNCF',
    'SO',
    'SOCCER',
    'SOCIAL',
    'SOFTBANK',
    'SOFTWARE',
    'SOHU',
    'SOLAR',
    'SOLUTIONS',
    'SONG',
    'SONY',
    'SOY',
    'SPACE',
    'SPORT',
    'SPOT',
    'SPREADBETTING',
    'SR',
    'SRL',
    'SRT',
    'SS',
    'ST',
    'STADA',
    'STAPLES',
    'STAR',
    'STATEBANK',
    'STATEFARM',
    'STC',
    'STCGROUP',
    'STOCKHOLM',
    'STORAGE',
    'STORE',
    'STREAM',
    'STUDIO',
    'STUDY',
    'STYLE',
    'SU',
    'SUCKS',
    'SUPPLIES',
    'SUPPLY',
    'SUPPORT',
    'SURF',
    'SURGERY',
    'SUZUKI',
    'SV',
    'SWATCH',
    'SWIFTCOVER',
    'SWISS',
    'SX',
    'SY',
    'SYDNEY',
    'SYMANTEC',
    'SYSTEMS',
    'SZ',
    'TAB',
    'TAIPEI',
    'TALK',
    'TAOBAO',
    'TARGET',
    'TATAMOTORS',
    'TATAR',
    'TATTOO',
    'TAX',
    'TAXI',
    'TC',
    'TCI',
    'TD',
    'TDK',
    'TEAM',
    'TECH',
    'TECHNOLOGY',
    'TEL',
    'TELEFONICA',
    'TEMASEK',
    'TENNIS',
    'TEVA',
    'TF',
    'TG',
    'TH',
    'THD',
    'THEATER',
    'THEATRE',
    'TIAA',
    'TICKETS',
    'TIENDA',
    'TIFFANY',
    'TIPS',
    'TIRES',
    'TIROL',
    'TJ',
    'TJMAXX',
    'TJX',
    'TK',
    'TKMAXX',
    'TL',
    'TM',
    'TMALL',
    'TN',
    'TO',
    'TODAY',
    'TOKYO',
    'TOOLS',
    'TOP',
    'TORAY',
    'TOSHIBA',
    'TOTAL',
    'TOURS',
    'TOWN',
    'TOYOTA',
    'TOYS',
    'TR',
    'TRADE',
    'TRADING',
    'TRAINING',
    'TRAVEL',
    'TRAVELCHANNEL',
    'TRAVELERS',
    'TRAVELERSINSURANCE',
    'TRUST',
    'TRV',
    'TT',
    'TUBE',
    'TUI',
    'TUNES',
    'TUSHU',
    'TV',
    'TVS',
    'TW',
    'TZ',
    'UA',
    'UBANK',
    'UBS',
    'UCONNECT',
    'UG',
    'UK',
    'UNICOM',
    'UNIVERSITY',
    'UNO',
    'UOL',
    'UPS',
    'US',
    'UY',
    'UZ',
    'VA',
    'VACATIONS',
    'VANA',
    'VANGUARD',
    'VC',
    'VE',
    'VEGAS',
    'VENTURES',
    'VERISIGN',
    'VERSICHERUNG',
    'VET',
    'VG',
    'VI',
    'VIAJES',
    'VIDEO',
    'VIG',
    'VIKING',
    'VILLAS',
    'VIN',
    'VIP',
    'VIRGIN',
    'VISA',
    'VISION',
    'VISTAPRINT',
    'VIVA',
    'VIVO',
    'VLAANDEREN',
    'VN',
    'VODKA',
    'VOLKSWAGEN',
    'VOLVO',
    'VOTE',
    'VOTING',
    'VOTO',
    'VOYAGE',
    'VU',
    'VUELOS',
    'WALES',
    'WALMART',
    'WALTER',
    'WANG',
    'WANGGOU',
    'WARMAN',
    'WATCH',
    'WATCHES',
    'WEATHER',
    'WEATHERCHANNEL',
    'WEBCAM',
    'WEBER',
    'WEBSITE',
    'WED',
    'WEDDING',
    'WEIBO',
    'WEIR',
    'WF',
    'WHOSWHO',
    'WIEN',
    'WIKI',
    'WILLIAMHILL',
    'WIN',
    'WINDOWS',
    'WINE',
    'WINNERS',
    'WME',
    'WOLTERSKLUWER',
    'WOODSIDE',
    'WORK',
    'WORKS',
    'WORLD',
    'WOW',
    'WS',
    'WTC',
    'WTF',
    'XBOX',
    'XEROX',
    'XFINITY',
    'XIHUAN',
    'XIN',
    'XN--11B4C3D',
    'XN--1CK2E1B',
    'XN--1QQW23A',
    'XN--2SCRJ9C',
    'XN--30RR7Y',
    'XN--3BST00M',
    'XN--3DS443G',
    'XN--3E0B707E',
    'XN--3HCRJ9C',
    'XN--3OQ18VL8PN36A',
    'XN--3PXU8K',
    'XN--42C2D9A',
    'XN--45BR5CYL',
    'XN--45BRJ9C',
    'XN--45Q11C',
    'XN--4GBRIM',
    'XN--54B7FTA0CC',
    'XN--55QW42G',
    'XN--55QX5D',
    'XN--5SU34J936BGSG',
    'XN--5TZM5G',
    'XN--6FRZ82G',
    'XN--6QQ986B3XL',
    'XN--80ADXHKS',
    'XN--80AO21A',
    'XN--80AQECDR1A',
    'XN--80ASEHDB',
    'XN--80ASWG',
    'XN--8Y0A063A',
    'XN--90A3AC',
    'XN--90AE',
    'XN--90AIS',
    'XN--9DBQ2A',
    'XN--9ET52U',
    'XN--9KRT00A',
    'XN--B4W605FERD',
    'XN--BCK1B9A5DRE4C',
    'XN--C1AVG',
    'XN--C2BR7G',
    'XN--CCK2B3B',
    'XN--CG4BKI',
    'XN--CLCHC0EA0B2G2A9GCD',
    'XN--CZR694B',
    'XN--CZRS0T',
    'XN--CZRU2D',
    'XN--D1ACJ3B',
    'XN--D1ALF',
    'XN--E1A4C',
    'XN--ECKVDTC9D',
    'XN--EFVY88H',
    'XN--ESTV75G',
    'XN--FCT429K',
    'XN--FHBEI',
    'XN--FIQ228C5HS',
    'XN--FIQ64B',
    'XN--FIQS8S',
    'XN--FIQZ9S',
    'XN--FJQ720A',
    'XN--FLW351E',
    'XN--FPCRJ9C3D',
    'XN--FZC2C9E2C',
    'XN--FZYS8D69UVGM',
    'XN--G2XX48C',
    'XN--GCKR3F0F',
    'XN--GECRJ9C',
    'XN--GK3AT1E',
    'XN--H2BREG3EVE',
    'XN--H2BRJ9C',
    'XN--H2BRJ9C8C',
    'XN--HXT814E',
    'XN--I1B6B1A6A2E',
    'XN--IMR513N',
    'XN--IO0A7I',
    'XN--J1AEF',
    'XN--J1AMH',
    'XN--J6W193G',
    'XN--JLQ61U9W7B',
    'XN--JVR189M',
    'XN--KCRX77D1X4A',
    'XN--KPRW13D',
    'XN--KPRY57D',
    'XN--KPU716F',
    'XN--KPUT3I',
    'XN--L1ACC',
    'XN--LGBBAT1AD8J',
    'XN--MGB9AWBF',
    'XN--MGBA3A3EJT',
    'XN--MGBA3A4F16A',
    'XN--MGBA7C0BBN0A',
    'XN--MGBAAKC7DVF',
    'XN--MGBAAM7A8H',
    'XN--MGBAB2BD',
    'XN--MGBAH1A3HJKRD',
    'XN--MGBAI9AZGQP6J',
    'XN--MGBAYH7GPA',
    'XN--MGBBH1A',
    'XN--MGBBH1A71E',
    'XN--MGBC0A9AZCG',
    'XN--MGBCA7DZDO',
    'XN--MGBERP4A5D4AR',
    'XN--MGBGU82A',
    'XN--MGBI4ECEXP',
    'XN--MGBPL2FH',
    'XN--MGBT3DHD',
    'XN--MGBTX2B',
    'XN--MGBX4CD0AB',
    'XN--MIX891F',
    'XN--MK1BU44C',
    'XN--MXTQ1M',
    'XN--NGBC5AZD',
    'XN--NGBE9E0A',
    'XN--NGBRX',
    'XN--NODE',
    'XN--NQV7F',
    'XN--NQV7FS00EMA',
    'XN--NYQY26A',
    'XN--O3CW4H',
    'XN--OGBPF8FL',
    'XN--OTU796D',
    'XN--P1ACF',
    'XN--P1AI',
    'XN--PBT977C',
    'XN--PGBS0DH',
    'XN--PSSY2U',
    'XN--Q9JYB4C',
    'XN--QCKA1PMC',
    'XN--QXA6A',
    'XN--QXAM',
    'XN--RHQV96G',
    'XN--ROVU88B',
    'XN--RVC1E0AM3E',
    'XN--S9BRJ9C',
    'XN--SES554G',
    'XN--T60B56A',
    'XN--TCKWE',
    'XN--TIQ49XQYJ',
    'XN--UNUP4Y',
    'XN--VERMGENSBERATER-CTB',
    'XN--VERMGENSBERATUNG-PWB',
    'XN--VHQUV',
    'XN--VUQ861B',
    'XN--W4R85EL8FHU5DNRA',
    'XN--W4RS40L',
    'XN--WGBH1C',
    'XN--WGBL6A',
    'XN--XHQ521B',
    'XN--XKC2AL3HYE2A',
    'XN--XKC2DL3A5EE0H',
    'XN--Y9A3AQ',
    'XN--YFRO4I67O',
    'XN--YGBI2AMMX',
    'XN--ZFR164B',
    'XXX',
    'XYZ',
    'YACHTS',
    'YAHOO',
    'YAMAXUN',
    'YANDEX',
    'YE',
    'YODOBASHI',
    'YOGA',
    'YOKOHAMA',
    'YOU',
    'YOUTUBE',
    'YT',
    'YUN',
    'ZA',
    'ZAPPOS',
    'ZARA',
    'ZERO',
    'ZIP',
    'ZM',
    'ZONE',
    'ZUERICH',
    'ZW'
];


// Keep as upper-case to make updating from source easier

module.exports = new Set(internals.tlds.map((tld) => tld.toLowerCase()));


/***/ }),

/***/ 1991:
/***/ ((module, exports) => {

"use strict";


const internals = {
    operators: ['!', '^', '*', '/', '%', '+', '-', '<', '<=', '>', '>=', '==', '!=', '&&', '||', '??'],
    operatorCharacters: ['!', '^', '*', '/', '%', '+', '-', '<', '=', '>', '&', '|', '?'],
    operatorsOrder: [['^'], ['*', '/', '%'], ['+', '-'], ['<', '<=', '>', '>='], ['==', '!='], ['&&'], ['||', '??']],
    operatorsPrefix: ['!', 'n'],

    literals: {
        '"': '"',
        '`': '`',
        '\'': '\'',
        '[': ']'
    },

    numberRx: /^(?:[0-9]*\.?[0-9]*){1}$/,
    tokenRx: /^[\w\$\#\.\@\:\{\}]+$/,

    symbol: Symbol('formula'),
    settings: Symbol('settings')
};


exports = module.exports = internals.Formula = class {

    constructor(string, options = {}) {

        if (!options[internals.settings] &&
            options.constants) {

            for (const constant in options.constants) {
                const value = options.constants[constant];
                if (value !== null &&
                    !['boolean', 'number', 'string'].includes(typeof value)) {

                    throw new Error(`Formula constant ${constant} contains invalid ${typeof value} value type`);
                }
            }
        }

        this.settings = options[internals.settings] ? options : Object.assign({ [internals.settings]: true, constants: {}, functions: {} }, options);
        this.single = null;

        this._parts = null;
        this._parse(string);
    }

    _parse(string) {

        let parts = [];
        let current = '';
        let parenthesis = 0;
        let literal = false;

        const flush = (inner) => {

            if (parenthesis) {
                throw new Error('Formula missing closing parenthesis');
            }

            const last = parts.length ? parts[parts.length - 1] : null;

            if (!literal &&
                !current &&
                !inner) {

                return;
            }

            if (last &&
                last.type === 'reference' &&
                inner === ')') {                                                                // Function

                last.type = 'function';
                last.value = this._subFormula(current, last.value);
                current = '';
                return;
            }

            if (inner === ')') {                                                                // Segment
                const sub = new internals.Formula(current, this.settings);
                parts.push({ type: 'segment', value: sub });
            }
            else if (literal) {
                if (literal === ']') {                                                          // Reference
                    parts.push({ type: 'reference', value: current });
                    current = '';
                    return;
                }

                parts.push({ type: 'literal', value: current });                                // Literal
            }
            else if (internals.operatorCharacters.includes(current)) {                          // Operator
                if (last &&
                    last.type === 'operator' &&
                    internals.operators.includes(last.value + current)) {                       // 2 characters operator

                    last.value += current;
                }
                else {
                    parts.push({ type: 'operator', value: current });
                }
            }
            else if (current.match(internals.numberRx)) {                                       // Number
                parts.push({ type: 'constant', value: parseFloat(current) });
            }
            else if (this.settings.constants[current] !== undefined) {                          // Constant
                parts.push({ type: 'constant', value: this.settings.constants[current] });
            }
            else {                                                                              // Reference
                if (!current.match(internals.tokenRx)) {
                    throw new Error(`Formula contains invalid token: ${current}`);
                }

                parts.push({ type: 'reference', value: current });
            }

            current = '';
        };

        for (const c of string) {
            if (literal) {
                if (c === literal) {
                    flush();
                    literal = false;
                }
                else {
                    current += c;
                }
            }
            else if (parenthesis) {
                if (c === '(') {
                    current += c;
                    ++parenthesis;
                }
                else if (c === ')') {
                    --parenthesis;
                    if (!parenthesis) {
                        flush(c);
                    }
                    else {
                        current += c;
                    }
                }
                else {
                    current += c;
                }
            }
            else if (c in internals.literals) {
                literal = internals.literals[c];
            }
            else if (c === '(') {
                flush();
                ++parenthesis;
            }
            else if (internals.operatorCharacters.includes(c)) {
                flush();
                current = c;
                flush();
            }
            else if (c !== ' ') {
                current += c;
            }
            else {
                flush();
            }
        }

        flush();

        // Replace prefix - to internal negative operator

        parts = parts.map((part, i) => {

            if (part.type !== 'operator' ||
                part.value !== '-' ||
                i && parts[i - 1].type !== 'operator') {

                return part;
            }

            return { type: 'operator', value: 'n' };
        });

        // Validate tokens order

        let operator = false;
        for (const part of parts) {
            if (part.type === 'operator') {
                if (internals.operatorsPrefix.includes(part.value)) {
                    continue;
                }

                if (!operator) {
                    throw new Error('Formula contains an operator in invalid position');
                }

                if (!internals.operators.includes(part.value)) {
                    throw new Error(`Formula contains an unknown operator ${part.value}`);
                }
            }
            else if (operator) {
                throw new Error('Formula missing expected operator');
            }

            operator = !operator;
        }

        if (!operator) {
            throw new Error('Formula contains invalid trailing operator');
        }

        // Identify single part

        if (parts.length === 1 &&
            ['reference', 'literal', 'constant'].includes(parts[0].type)) {

            this.single = { type: parts[0].type === 'reference' ? 'reference' : 'value', value: parts[0].value };
        }

        // Process parts

        this._parts = parts.map((part) => {

            // Operators

            if (part.type === 'operator') {
                return internals.operatorsPrefix.includes(part.value) ? part : part.value;
            }

            // Literals, constants, segments

            if (part.type !== 'reference') {
                return part.value;
            }

            // References

            if (this.settings.tokenRx &&
                !this.settings.tokenRx.test(part.value)) {

                throw new Error(`Formula contains invalid reference ${part.value}`);
            }

            if (this.settings.reference) {
                return this.settings.reference(part.value);
            }

            return internals.reference(part.value);
        });
    }

    _subFormula(string, name) {

        const method = this.settings.functions[name];
        if (typeof method !== 'function') {
            throw new Error(`Formula contains unknown function ${name}`);
        }

        let args = [];
        if (string) {
            let current = '';
            let parenthesis = 0;
            let literal = false;

            const flush = () => {

                if (!current) {
                    throw new Error(`Formula contains function ${name} with invalid arguments ${string}`);
                }

                args.push(current);
                current = '';
            };

            for (let i = 0; i < string.length; ++i) {
                const c = string[i];
                if (literal) {
                    current += c;
                    if (c === literal) {
                        literal = false;
                    }
                }
                else if (c in internals.literals &&
                    !parenthesis) {

                    current += c;
                    literal = internals.literals[c];
                }
                else if (c === ',' &&
                    !parenthesis) {

                    flush();
                }
                else {
                    current += c;
                    if (c === '(') {
                        ++parenthesis;
                    }
                    else if (c === ')') {
                        --parenthesis;
                    }
                }
            }

            flush();
        }

        args = args.map((arg) => new internals.Formula(arg, this.settings));

        return function (context) {

            const innerValues = [];
            for (const arg of args) {
                innerValues.push(arg.evaluate(context));
            }

            return method.call(context, ...innerValues);
        };
    }

    evaluate(context) {

        const parts = this._parts.slice();

        // Prefix operators

        for (let i = parts.length - 2; i >= 0; --i) {
            const part = parts[i];
            if (part &&
                part.type === 'operator') {

                const current = parts[i + 1];
                parts.splice(i + 1, 1);
                const value = internals.evaluate(current, context);
                parts[i] = internals.single(part.value, value);
            }
        }

        // Left-right operators

        internals.operatorsOrder.forEach((set) => {

            for (let i = 1; i < parts.length - 1;) {
                if (set.includes(parts[i])) {
                    const operator = parts[i];
                    const left = internals.evaluate(parts[i - 1], context);
                    const right = internals.evaluate(parts[i + 1], context);

                    parts.splice(i, 2);
                    const result = internals.calculate(operator, left, right);
                    parts[i - 1] = result === 0 ? 0 : result;                               // Convert -0
                }
                else {
                    i += 2;
                }
            }
        });

        return internals.evaluate(parts[0], context);
    }
};


internals.Formula.prototype[internals.symbol] = true;


internals.reference = function (name) {

    return function (context) {

        return context && context[name] !== undefined ? context[name] : null;
    };
};


internals.evaluate = function (part, context) {

    if (part === null) {
        return null;
    }

    if (typeof part === 'function') {
        return part(context);
    }

    if (part[internals.symbol]) {
        return part.evaluate(context);
    }

    return part;
};


internals.single = function (operator, value) {

    if (operator === '!') {
        return value ? false : true;
    }

    // operator === 'n'

    const negative = -value;
    if (negative === 0) {       // Override -0
        return 0;
    }

    return negative;
};


internals.calculate = function (operator, left, right) {

    if (operator === '??') {
        return internals.exists(left) ? left : right;
    }

    if (typeof left === 'string' ||
        typeof right === 'string') {

        if (operator === '+') {
            left = internals.exists(left) ? left : '';
            right = internals.exists(right) ? right : '';
            return left + right;
        }
    }
    else {
        switch (operator) {
            case '^': return Math.pow(left, right);
            case '*': return left * right;
            case '/': return left / right;
            case '%': return left % right;
            case '+': return left + right;
            case '-': return left - right;
        }
    }

    switch (operator) {
        case '<': return left < right;
        case '<=': return left <= right;
        case '>': return left > right;
        case '>=': return left >= right;
        case '==': return left === right;
        case '!=': return left !== right;
        case '&&': return left && right;
        case '||': return left || right;
    }

    return null;
};


internals.exists = function (value) {

    return value !== null && value !== undefined;
};


/***/ }),

/***/ 5545:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);
const Merge = __webpack_require__(445);
const Utils = __webpack_require__(417);


const internals = {};


module.exports = function (defaults, source, options = {}) {

    Assert(defaults && typeof defaults === 'object', 'Invalid defaults value: must be an object');
    Assert(!source || source === true || typeof source === 'object', 'Invalid source value: must be true, falsy or an object');
    Assert(typeof options === 'object', 'Invalid options: must be an object');

    if (!source) {                                                  // If no source, return null
        return null;
    }

    if (options.shallow) {
        return internals.applyToDefaultsWithShallow(defaults, source, options);
    }

    const copy = Clone(defaults);

    if (source === true) {                                          // If source is set to true, use defaults
        return copy;
    }

    const nullOverride = options.nullOverride !== undefined ? options.nullOverride : false;
    return Merge(copy, source, { nullOverride, mergeArrays: false });
};


internals.applyToDefaultsWithShallow = function (defaults, source, options) {

    const keys = options.shallow;
    Assert(Array.isArray(keys), 'Invalid keys');

    options = Object.assign({}, options);
    options.shallow = false;

    const copy = Clone(defaults, { shallow: keys });

    if (source === true) {                                                      // If source is set to true, use defaults
        return copy;
    }

    const storage = Utils.store(source, keys);                              // Move shallow copy items to storage
    Merge(copy, source, { mergeArrays: false, nullOverride: false });   // Deep copy the rest
    Utils.restore(copy, source, storage);                                   // Shallow copy the stored items and restore
    return copy;
};


/***/ }),

/***/ 2718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const AssertError = __webpack_require__(5563);

const internals = {};


module.exports = function (condition, ...args) {

    if (condition) {
        return;
    }

    if (args.length === 1 &&
        args[0] instanceof Error) {

        throw args[0];
    }

    throw new AssertError(args);
};


/***/ }),

/***/ 5578:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Types = __webpack_require__(6657);
const Utils = __webpack_require__(417);


const internals = {
    needsProtoHack: new Set([Types.set, Types.map, Types.weakSet, Types.weakMap])
};


module.exports = internals.clone = function (obj, options = {}, _seen = null) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    let clone = internals.clone;
    let seen = _seen;

    if (options.shallow) {
        if (options.shallow !== true) {
            return internals.cloneWithShallow(obj, options);
        }

        clone = (value) => value;
    }
    else {
        seen = seen || new Map();

        const lookup = seen.get(obj);
        if (lookup) {
            return lookup;
        }
    }

    // Built-in object types

    const baseProto = Types.getInternalProto(obj);
    if (baseProto === Types.buffer) {
        return Buffer && Buffer.from(obj);              // $lab:coverage:ignore$
    }

    if (baseProto === Types.date) {
        return new Date(obj.getTime());
    }

    if (baseProto === Types.regex) {
        return new RegExp(obj);
    }

    // Generic objects

    const newObj = internals.base(obj, baseProto, options);
    if (newObj === obj) {
        return obj;
    }

    if (seen) {
        seen.set(obj, newObj);                              // Set seen, since obj could recurse
    }

    if (baseProto === Types.set) {
        for (const value of obj) {
            newObj.add(clone(value, options, seen));
        }
    }
    else if (baseProto === Types.map) {
        for (const [key, value] of obj) {
            newObj.set(key, clone(value, options, seen));
        }
    }

    const keys = Utils.keys(obj, options);
    for (const key of keys) {
        if (key === '__proto__') {
            continue;
        }

        if (baseProto === Types.array &&
            key === 'length') {

            newObj.length = obj.length;
            continue;
        }

        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor) {
            if (descriptor.get ||
                descriptor.set) {

                Object.defineProperty(newObj, key, descriptor);
            }
            else if (descriptor.enumerable) {
                newObj[key] = clone(obj[key], options, seen);
            }
            else {
                Object.defineProperty(newObj, key, { enumerable: false, writable: true, configurable: true, value: clone(obj[key], options, seen) });
            }
        }
        else {
            Object.defineProperty(newObj, key, {
                enumerable: true,
                writable: true,
                configurable: true,
                value: clone(obj[key], options, seen)
            });
        }
    }

    return newObj;
};


internals.cloneWithShallow = function (source, options) {

    const keys = options.shallow;
    options = Object.assign({}, options);
    options.shallow = false;

    const storage = Utils.store(source, keys);    // Move shallow copy items to storage
    const copy = internals.clone(source, options);      // Deep copy the rest
    Utils.restore(copy, source, storage);         // Shallow copy the stored items and restore
    return copy;
};


internals.base = function (obj, baseProto, options) {

    if (baseProto === Types.array) {
        return [];
    }

    if (options.prototype === false) {                  // Defaults to true
        if (internals.needsProtoHack.has(baseProto)) {
            return new baseProto.constructor();
        }

        return {};
    }

    const proto = Object.getPrototypeOf(obj);
    if (proto &&
        proto.isImmutable) {

        return obj;
    }

    if (internals.needsProtoHack.has(baseProto)) {
        const newObj = new proto.constructor();
        if (proto !== baseProto) {
            Object.setPrototypeOf(newObj, proto);
        }

        return newObj;
    }

    return Object.create(proto);
};


/***/ }),

/***/ 5801:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Types = __webpack_require__(6657);


const internals = {
    mismatched: null
};


module.exports = function (obj, ref, options) {

    options = Object.assign({ prototype: true }, options);

    return !!internals.isDeepEqual(obj, ref, options, []);
};


internals.isDeepEqual = function (obj, ref, options, seen) {

    if (obj === ref) {                                                      // Copied from Deep-eql, copyright(c) 2013 Jake Luer, jake@alogicalparadox.com, MIT Licensed, https://github.com/chaijs/deep-eql
        return obj !== 0 || 1 / obj === 1 / ref;
    }

    const type = typeof obj;

    if (type !== typeof ref) {
        return false;
    }

    if (obj === null ||
        ref === null) {

        return false;
    }

    if (type === 'function') {
        if (!options.deepFunction ||
            obj.toString() !== ref.toString()) {

            return false;
        }

        // Continue as object
    }
    else if (type !== 'object') {
        return obj !== obj && ref !== ref;                                  // NaN
    }

    const instanceType = internals.getSharedType(obj, ref, !!options.prototype);
    switch (instanceType) {
        case Types.buffer:
            return Buffer && Buffer.prototype.equals.call(obj, ref);        // $lab:coverage:ignore$
        case Types.promise:
            return obj === ref;
        case Types.regex:
            return obj.toString() === ref.toString();
        case internals.mismatched:
            return false;
    }

    for (let i = seen.length - 1; i >= 0; --i) {
        if (seen[i].isSame(obj, ref)) {
            return true;                                                    // If previous comparison failed, it would have stopped execution
        }
    }

    seen.push(new internals.SeenEntry(obj, ref));

    try {
        return !!internals.isDeepEqualObj(instanceType, obj, ref, options, seen);
    }
    finally {
        seen.pop();
    }
};


internals.getSharedType = function (obj, ref, checkPrototype) {

    if (checkPrototype) {
        if (Object.getPrototypeOf(obj) !== Object.getPrototypeOf(ref)) {
            return internals.mismatched;
        }

        return Types.getInternalProto(obj);
    }

    const type = Types.getInternalProto(obj);
    if (type !== Types.getInternalProto(ref)) {
        return internals.mismatched;
    }

    return type;
};


internals.valueOf = function (obj) {

    const objValueOf = obj.valueOf;
    if (objValueOf === undefined) {
        return obj;
    }

    try {
        return objValueOf.call(obj);
    }
    catch (err) {
        return err;
    }
};


internals.hasOwnEnumerableProperty = function (obj, key) {

    return Object.prototype.propertyIsEnumerable.call(obj, key);
};


internals.isSetSimpleEqual = function (obj, ref) {

    for (const entry of obj) {
        if (!ref.has(entry)) {
            return false;
        }
    }

    return true;
};


internals.isDeepEqualObj = function (instanceType, obj, ref, options, seen) {

    const { isDeepEqual, valueOf, hasOwnEnumerableProperty } = internals;
    const { keys, getOwnPropertySymbols } = Object;

    if (instanceType === Types.array) {
        if (options.part) {

            // Check if any index match any other index

            for (const objValue of obj) {
                for (const refValue of ref) {
                    if (isDeepEqual(objValue, refValue, options, seen)) {
                        return true;
                    }
                }
            }
        }
        else {
            if (obj.length !== ref.length) {
                return false;
            }

            for (let i = 0; i < obj.length; ++i) {
                if (!isDeepEqual(obj[i], ref[i], options, seen)) {
                    return false;
                }
            }

            return true;
        }
    }
    else if (instanceType === Types.set) {
        if (obj.size !== ref.size) {
            return false;
        }

        if (!internals.isSetSimpleEqual(obj, ref)) {

            // Check for deep equality

            const ref2 = new Set(ref);
            for (const objEntry of obj) {
                if (ref2.delete(objEntry)) {
                    continue;
                }

                let found = false;
                for (const refEntry of ref2) {
                    if (isDeepEqual(objEntry, refEntry, options, seen)) {
                        ref2.delete(refEntry);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    return false;
                }
            }
        }
    }
    else if (instanceType === Types.map) {
        if (obj.size !== ref.size) {
            return false;
        }

        for (const [key, value] of obj) {
            if (value === undefined && !ref.has(key)) {
                return false;
            }

            if (!isDeepEqual(value, ref.get(key), options, seen)) {
                return false;
            }
        }
    }
    else if (instanceType === Types.error) {

        // Always check name and message

        if (obj.name !== ref.name ||
            obj.message !== ref.message) {

            return false;
        }
    }

    // Check .valueOf()

    const valueOfObj = valueOf(obj);
    const valueOfRef = valueOf(ref);
    if ((obj !== valueOfObj || ref !== valueOfRef) &&
        !isDeepEqual(valueOfObj, valueOfRef, options, seen)) {

        return false;
    }

    // Check properties

    const objKeys = keys(obj);
    if (!options.part &&
        objKeys.length !== keys(ref).length &&
        !options.skip) {

        return false;
    }

    let skipped = 0;
    for (const key of objKeys) {
        if (options.skip &&
            options.skip.includes(key)) {

            if (ref[key] === undefined) {
                ++skipped;
            }

            continue;
        }

        if (!hasOwnEnumerableProperty(ref, key)) {
            return false;
        }

        if (!isDeepEqual(obj[key], ref[key], options, seen)) {
            return false;
        }
    }

    if (!options.part &&
        objKeys.length - skipped !== keys(ref).length) {

        return false;
    }

    // Check symbols

    if (options.symbols !== false) {                                // Defaults to true
        const objSymbols = getOwnPropertySymbols(obj);
        const refSymbols = new Set(getOwnPropertySymbols(ref));

        for (const key of objSymbols) {
            if (!options.skip ||
                !options.skip.includes(key)) {

                if (hasOwnEnumerableProperty(obj, key)) {
                    if (!hasOwnEnumerableProperty(ref, key)) {
                        return false;
                    }

                    if (!isDeepEqual(obj[key], ref[key], options, seen)) {
                        return false;
                    }
                }
                else if (hasOwnEnumerableProperty(ref, key)) {
                    return false;
                }
            }

            refSymbols.delete(key);
        }

        for (const key of refSymbols) {
            if (hasOwnEnumerableProperty(ref, key)) {
                return false;
            }
        }
    }

    return true;
};


internals.SeenEntry = class {

    constructor(obj, ref) {

        this.obj = obj;
        this.ref = ref;
    }

    isSame(obj, ref) {

        return this.obj === obj && this.ref === ref;
    }
};


/***/ }),

/***/ 5563:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


const Stringify = __webpack_require__(7577);


const internals = {};


module.exports = class extends Error {

    constructor(args) {

        const msgs = args
            .filter((arg) => arg !== '')
            .map((arg) => {

                return typeof arg === 'string' ? arg : arg instanceof Error ? arg.message : Stringify(arg);
            });

        super(msgs.join(' ') || 'Unknown error');

        if (typeof Error.captureStackTrace === 'function') {            // $lab:coverage:ignore$
            Error.captureStackTrace(this, exports.assert);
        }
    }
};


/***/ }),

/***/ 4752:
/***/ ((module) => {

"use strict";


const internals = {};


module.exports = function (input) {

    if (!input) {
        return '';
    }

    let escaped = '';

    for (let i = 0; i < input.length; ++i) {

        const charCode = input.charCodeAt(i);

        if (internals.isSafe(charCode)) {
            escaped += input[i];
        }
        else {
            escaped += internals.escapeHtmlChar(charCode);
        }
    }

    return escaped;
};


internals.escapeHtmlChar = function (charCode) {

    const namedEscape = internals.namedHtml[charCode];
    if (typeof namedEscape !== 'undefined') {
        return namedEscape;
    }

    if (charCode >= 256) {
        return '&#' + charCode + ';';
    }

    const hexValue = charCode.toString(16).padStart(2, '0');
    return `&#x${hexValue};`;
};


internals.isSafe = function (charCode) {

    return (typeof internals.safeCharCodes[charCode] !== 'undefined');
};


internals.namedHtml = {
    '38': '&amp;',
    '60': '&lt;',
    '62': '&gt;',
    '34': '&quot;',
    '160': '&nbsp;',
    '162': '&cent;',
    '163': '&pound;',
    '164': '&curren;',
    '169': '&copy;',
    '174': '&reg;'
};


internals.safeCharCodes = (function () {

    const safe = {};

    for (let i = 32; i < 123; ++i) {

        if ((i >= 97) ||                    // a-z
            (i >= 65 && i <= 90) ||         // A-Z
            (i >= 48 && i <= 57) ||         // 0-9
            i === 32 ||                     // space
            i === 46 ||                     // .
            i === 44 ||                     // ,
            i === 45 ||                     // -
            i === 58 ||                     // :
            i === 95) {                     // _

            safe[i] = null;
        }
    }

    return safe;
}());


/***/ }),

/***/ 1965:
/***/ ((module) => {

"use strict";


const internals = {};


module.exports = function (string) {

    // Escape ^$.*+-?=!:|\/()[]{},

    return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&');
};


/***/ }),

/***/ 2887:
/***/ ((module) => {

"use strict";


const internals = {};


module.exports = function () { };


/***/ }),

/***/ 445:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);
const Utils = __webpack_require__(417);


const internals = {};


module.exports = internals.merge = function (target, source, options) {

    Assert(target && typeof target === 'object', 'Invalid target value: must be an object');
    Assert(source === null || source === undefined || typeof source === 'object', 'Invalid source value: must be null, undefined, or an object');

    if (!source) {
        return target;
    }

    options = Object.assign({ nullOverride: true, mergeArrays: true }, options);

    if (Array.isArray(source)) {
        Assert(Array.isArray(target), 'Cannot merge array onto an object');
        if (!options.mergeArrays) {
            target.length = 0;                                                          // Must not change target assignment
        }

        for (let i = 0; i < source.length; ++i) {
            target.push(Clone(source[i], { symbols: options.symbols }));
        }

        return target;
    }

    const keys = Utils.keys(source, options);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key === '__proto__' ||
            !Object.prototype.propertyIsEnumerable.call(source, key)) {

            continue;
        }

        const value = source[key];
        if (value &&
            typeof value === 'object') {

            if (!target[key] ||
                typeof target[key] !== 'object' ||
                (Array.isArray(target[key]) !== Array.isArray(value)) ||
                value instanceof Date ||
                (Buffer && Buffer.isBuffer(value)) ||               // $lab:coverage:ignore$
                value instanceof RegExp) {

                target[key] = Clone(value, { symbols: options.symbols });
            }
            else {
                internals.merge(target[key], value, options);
            }
        }
        else {
            if (value !== null &&
                value !== undefined) {                              // Explicit to preserve empty strings

                target[key] = value;
            }
            else if (options.nullOverride) {
                target[key] = value;
            }
        }
    }

    return target;
};


/***/ }),

/***/ 8891:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);


const internals = {};


module.exports = function (obj, chain, options) {

    if (chain === false ||
        chain === null ||
        chain === undefined) {

        return obj;
    }

    options = options || {};
    if (typeof options === 'string') {
        options = { separator: options };
    }

    const isChainArray = Array.isArray(chain);

    Assert(!isChainArray || !options.separator, 'Separator option no valid for array-based chain');

    const path = isChainArray ? chain : chain.split(options.separator || '.');
    let ref = obj;
    for (let i = 0; i < path.length; ++i) {
        let key = path[i];
        const type = options.iterables && internals.iterables(ref);

        if (Array.isArray(ref) ||
            type === 'set') {

            const number = Number(key);
            if (Number.isInteger(number)) {
                key = number < 0 ? ref.length + number : number;
            }
        }

        if (!ref ||
            typeof ref === 'function' && options.functions === false ||         // Defaults to true
            !type && ref[key] === undefined) {

            Assert(!options.strict || i + 1 === path.length, 'Missing segment', key, 'in reach path ', chain);
            Assert(typeof ref === 'object' || options.functions === true || typeof ref !== 'function', 'Invalid segment', key, 'in reach path ', chain);
            ref = options.default;
            break;
        }

        if (!type) {
            ref = ref[key];
        }
        else if (type === 'set') {
            ref = [...ref][key];
        }
        else {  // type === 'map'
            ref = ref.get(key);
        }
    }

    return ref;
};


internals.iterables = function (ref) {

    if (ref instanceof Set) {
        return 'set';
    }

    if (ref instanceof Map) {
        return 'map';
    }
};


/***/ }),

/***/ 7577:
/***/ ((module) => {

"use strict";


const internals = {};


module.exports = function (...args) {

    try {
        return JSON.stringify.apply(null, args);
    }
    catch (err) {
        return '[Cannot display object: ' + err.message + ']';
    }
};


/***/ }),

/***/ 6657:
/***/ ((module, exports) => {

"use strict";


const internals = {};


exports = module.exports = {
    array: Array.prototype,
    buffer: Buffer && Buffer.prototype,             // $lab:coverage:ignore$
    date: Date.prototype,
    error: Error.prototype,
    generic: Object.prototype,
    map: Map.prototype,
    promise: Promise.prototype,
    regex: RegExp.prototype,
    set: Set.prototype,
    weakMap: WeakMap.prototype,
    weakSet: WeakSet.prototype
};


internals.typeMap = new Map([
    ['[object Error]', exports.error],
    ['[object Map]', exports.map],
    ['[object Promise]', exports.promise],
    ['[object Set]', exports.set],
    ['[object WeakMap]', exports.weakMap],
    ['[object WeakSet]', exports.weakSet]
]);


exports.getInternalProto = function (obj) {

    if (Array.isArray(obj)) {
        return exports.array;
    }

    if (Buffer && obj instanceof Buffer) {          // $lab:coverage:ignore$
        return exports.buffer;
    }

    if (obj instanceof Date) {
        return exports.date;
    }

    if (obj instanceof RegExp) {
        return exports.regex;
    }

    if (obj instanceof Error) {
        return exports.error;
    }

    const objName = Object.prototype.toString.call(obj);
    return internals.typeMap.get(objName) || exports.generic;
};


/***/ }),

/***/ 417:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Reach = __webpack_require__(8891);


const internals = {};


exports.keys = function (obj, options = {}) {

    return options.symbols !== false ? Reflect.ownKeys(obj) : Object.getOwnPropertyNames(obj);  // Defaults to true
};


exports.store = function (source, keys) {

    const storage = new Map();
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        const value = Reach(source, key);
        if (typeof value === 'object' ||
            typeof value === 'function') {

            storage.set(key, value);
            internals.reachSet(source, key, undefined);
        }
    }

    return storage;
};


exports.restore = function (copy, source, storage) {

    for (const [key, value] of storage) {
        internals.reachSet(copy, key, value);
        internals.reachSet(source, key, value);
    }
};


internals.reachSet = function (obj, key, value) {

    const path = Array.isArray(key) ? key : key.split('.');
    let ref = obj;
    for (let i = 0; i < path.length; ++i) {
        const segment = path[i];
        if (i + 1 === path.length) {
            ref[segment] = value;
        }

        ref = ref[segment];
    }
};


/***/ }),

/***/ 5403:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);
const DeepEqual = __webpack_require__(5801);
const Merge = __webpack_require__(445);

const Cache = __webpack_require__(6773);
const Common = __webpack_require__(3221);
const Compile = __webpack_require__(3579);
const Errors = __webpack_require__(2150);
const Extend = __webpack_require__(1669);
const Manifest = __webpack_require__(8937);
const Messages = __webpack_require__(676);
const Modify = __webpack_require__(4462);
const Ref = __webpack_require__(1802);
const Trace = __webpack_require__(121);
const Validator = __webpack_require__(9862);
const Values = __webpack_require__(566);


const internals = {};


internals.Base = class {

    constructor(type) {

        // Naming: public, _private, $_extension, $_mutate{action}

        this.type = type;

        this.$_root = null;
        this._definition = {};
        this._ids = new Modify.Ids();
        this._preferences = null;
        this._refs = new Ref.Manager();
        this._cache = null;

        this._valids = null;
        this._invalids = null;

        this._flags = {};
        this._rules = [];
        this._singleRules = new Map();              // The rule options passed for non-multi rules

        this.$_terms = {};                          // Hash of arrays of immutable objects (extended by other types)

        this.$_temp = {                             // Runtime state (not cloned)
            ruleset: null,                          // null: use last, false: error, number: start position
            whens: {}                               // Runtime cache of generated whens
        };
    }

    // Manifest

    describe() {

        Assert(typeof Manifest.describe === 'function', 'Manifest functionality disabled');
        return Manifest.describe(this);
    }

    // Rules

    allow(...values) {

        Common.verifyFlat(values, 'allow');
        return this._values(values, '_valids');
    }

    alter(targets) {

        Assert(targets && typeof targets === 'object' && !Array.isArray(targets), 'Invalid targets argument');
        Assert(!this._inRuleset(), 'Cannot set alterations inside a ruleset');

        const obj = this.clone();
        obj.$_terms.alterations = obj.$_terms.alterations || [];
        for (const target in targets) {
            const adjuster = targets[target];
            Assert(typeof adjuster === 'function', 'Alteration adjuster for', target, 'must be a function');
            obj.$_terms.alterations.push({ target, adjuster });
        }

        obj.$_temp.ruleset = false;
        return obj;
    }

    cast(to) {

        Assert(to === false || typeof to === 'string', 'Invalid to value');
        Assert(to === false || this._definition.cast[to], 'Type', this.type, 'does not support casting to', to);

        return this.$_setFlag('cast', to === false ? undefined : to);
    }

    default(value, options) {

        return this._default('default', value, options);
    }

    description(desc) {

        Assert(desc && typeof desc === 'string', 'Description must be a non-empty string');

        return this.$_setFlag('description', desc);
    }

    empty(schema) {

        const obj = this.clone();

        if (schema !== undefined) {
            schema = obj.$_compile(schema, { override: false });
        }

        return obj.$_setFlag('empty', schema, { clone: false });
    }

    error(err) {

        Assert(err, 'Missing error');
        Assert(err instanceof Error || typeof err === 'function', 'Must provide a valid Error object or a function');

        return this.$_setFlag('error', err);
    }

    example(example, options = {}) {

        Assert(example !== undefined, 'Missing example');
        Common.assertOptions(options, ['override']);

        return this._inner('examples', example, { single: true, override: options.override });
    }

    external(method, description) {

        if (typeof method === 'object') {
            Assert(!description, 'Cannot combine options with description');
            description = method.description;
            method = method.method;
        }

        Assert(typeof method === 'function', 'Method must be a function');
        Assert(description === undefined || description && typeof description === 'string', 'Description must be a non-empty string');

        return this._inner('externals', { method, description }, { single: true });
    }

    failover(value, options) {

        return this._default('failover', value, options);
    }

    forbidden() {

        return this.presence('forbidden');
    }

    id(id) {

        if (!id) {
            return this.$_setFlag('id', undefined);
        }

        Assert(typeof id === 'string', 'id must be a non-empty string');
        Assert(/^[^\.]+$/.test(id), 'id cannot contain period character');

        return this.$_setFlag('id', id);
    }

    invalid(...values) {

        return this._values(values, '_invalids');
    }

    label(name) {

        Assert(name && typeof name === 'string', 'Label name must be a non-empty string');

        return this.$_setFlag('label', name);
    }

    meta(meta) {

        Assert(meta !== undefined, 'Meta cannot be undefined');

        return this._inner('metas', meta, { single: true });
    }

    note(...notes) {

        Assert(notes.length, 'Missing notes');
        for (const note of notes) {
            Assert(note && typeof note === 'string', 'Notes must be non-empty strings');
        }

        return this._inner('notes', notes);
    }

    only(mode = true) {

        Assert(typeof mode === 'boolean', 'Invalid mode:', mode);

        return this.$_setFlag('only', mode);
    }

    optional() {

        return this.presence('optional');
    }

    prefs(prefs) {

        Assert(prefs, 'Missing preferences');
        Assert(prefs.context === undefined, 'Cannot override context');
        Assert(prefs.externals === undefined, 'Cannot override externals');
        Assert(prefs.warnings === undefined, 'Cannot override warnings');
        Assert(prefs.debug === undefined, 'Cannot override debug');

        Common.checkPreferences(prefs);

        const obj = this.clone();
        obj._preferences = Common.preferences(obj._preferences, prefs);
        return obj;
    }

    presence(mode) {

        Assert(['optional', 'required', 'forbidden'].includes(mode), 'Unknown presence mode', mode);

        return this.$_setFlag('presence', mode);
    }

    raw(enabled = true) {

        return this.$_setFlag('result', enabled ? 'raw' : undefined);
    }

    result(mode) {

        Assert(['raw', 'strip'].includes(mode), 'Unknown result mode', mode);

        return this.$_setFlag('result', mode);
    }

    required() {

        return this.presence('required');
    }

    strict(enabled) {

        const obj = this.clone();

        const convert = enabled === undefined ? false : !enabled;
        obj._preferences = Common.preferences(obj._preferences, { convert });
        return obj;
    }

    strip(enabled = true) {

        return this.$_setFlag('result', enabled ? 'strip' : undefined);
    }

    tag(...tags) {

        Assert(tags.length, 'Missing tags');
        for (const tag of tags) {
            Assert(tag && typeof tag === 'string', 'Tags must be non-empty strings');
        }

        return this._inner('tags', tags);
    }

    unit(name) {

        Assert(name && typeof name === 'string', 'Unit name must be a non-empty string');

        return this.$_setFlag('unit', name);
    }

    valid(...values) {

        const obj = this.allow(...values);
        obj.$_setFlag('only', !!obj._valids, { clone: false });
        return obj;
    }

    when(condition, options) {

        const obj = this.clone();

        if (!obj.$_terms.whens) {
            obj.$_terms.whens = [];
        }

        const when = Compile.when(obj, condition, options);
        if (!['any', 'link'].includes(obj.type)) {
            const conditions = when.is ? [when] : when.switch;
            for (const item of conditions) {
                Assert(!item.then || item.then.type === 'any' || item.then.type === obj.type, 'Cannot combine', obj.type, 'with', item.then && item.then.type);
                Assert(!item.otherwise || item.otherwise.type === 'any' || item.otherwise.type === obj.type, 'Cannot combine', obj.type, 'with', item.otherwise && item.otherwise.type);

            }
        }

        obj.$_terms.whens.push(when);
        return obj.$_mutateRebuild();
    }

    // Helpers

    cache(cache) {

        Assert(!this._inRuleset(), 'Cannot set caching inside a ruleset');
        Assert(!this._cache, 'Cannot override schema cache');

        const obj = this.clone();
        obj._cache = cache || Cache.provider.provision();
        obj.$_temp.ruleset = false;
        return obj;
    }

    clone() {

        const obj = Object.create(Object.getPrototypeOf(this));
        return this._assign(obj);
    }

    concat(source) {

        Assert(Common.isSchema(source), 'Invalid schema object');
        Assert(this.type === 'any' || source.type === 'any' || source.type === this.type, 'Cannot merge type', this.type, 'with another type:', source.type);
        Assert(!this._inRuleset(), 'Cannot concatenate onto a schema with open ruleset');
        Assert(!source._inRuleset(), 'Cannot concatenate a schema with open ruleset');

        let obj = this.clone();

        if (this.type === 'any' &&
            source.type !== 'any') {

            // Change obj to match source type

            const tmpObj = source.clone();
            for (const key of Object.keys(obj)) {
                if (key !== 'type') {
                    tmpObj[key] = obj[key];
                }
            }

            obj = tmpObj;
        }

        obj._ids.concat(source._ids);
        obj._refs.register(source, Ref.toSibling);

        obj._preferences = obj._preferences ? Common.preferences(obj._preferences, source._preferences) : source._preferences;
        obj._valids = Values.merge(obj._valids, source._valids, source._invalids);
        obj._invalids = Values.merge(obj._invalids, source._invalids, source._valids);

        // Remove unique rules present in source

        for (const name of source._singleRules.keys()) {
            if (obj._singleRules.has(name)) {
                obj._rules = obj._rules.filter((target) => target.keep || target.name !== name);
                obj._singleRules.delete(name);
            }
        }

        // Rules

        for (const test of source._rules) {
            if (!source._definition.rules[test.method].multi) {
                obj._singleRules.set(test.name, test);
            }

            obj._rules.push(test);
        }

        // Flags

        if (obj._flags.empty &&
            source._flags.empty) {

            obj._flags.empty = obj._flags.empty.concat(source._flags.empty);
            const flags = Object.assign({}, source._flags);
            delete flags.empty;
            Merge(obj._flags, flags);
        }
        else if (source._flags.empty) {
            obj._flags.empty = source._flags.empty;
            const flags = Object.assign({}, source._flags);
            delete flags.empty;
            Merge(obj._flags, flags);
        }
        else {
            Merge(obj._flags, source._flags);
        }

        // Terms

        for (const key in source.$_terms) {
            const terms = source.$_terms[key];
            if (!terms) {
                if (!obj.$_terms[key]) {
                    obj.$_terms[key] = terms;
                }

                continue;
            }

            if (!obj.$_terms[key]) {
                obj.$_terms[key] = terms.slice();
                continue;
            }

            obj.$_terms[key] = obj.$_terms[key].concat(terms);
        }

        // Tracing

        if (this.$_root._tracer) {
            this.$_root._tracer._combine(obj, [this, source]);
        }

        // Rebuild

        return obj.$_mutateRebuild();
    }

    extend(options) {

        Assert(!options.base, 'Cannot extend type with another base');

        return Extend.type(this, options);
    }

    extract(path) {

        path = Array.isArray(path) ? path : path.split('.');
        return this._ids.reach(path);
    }

    fork(paths, adjuster) {

        Assert(!this._inRuleset(), 'Cannot fork inside a ruleset');

        let obj = this;                                             // eslint-disable-line consistent-this
        for (let path of [].concat(paths)) {
            path = Array.isArray(path) ? path : path.split('.');
            obj = obj._ids.fork(path, adjuster, obj);
        }

        obj.$_temp.ruleset = false;
        return obj;
    }

    rule(options) {

        const def = this._definition;
        Common.assertOptions(options, Object.keys(def.modifiers));

        Assert(this.$_temp.ruleset !== false, 'Cannot apply rules to empty ruleset or the last rule added does not support rule properties');
        const start = this.$_temp.ruleset === null ? this._rules.length - 1 : this.$_temp.ruleset;
        Assert(start >= 0 && start < this._rules.length, 'Cannot apply rules to empty ruleset');

        const obj = this.clone();

        for (let i = start; i < obj._rules.length; ++i) {
            const original = obj._rules[i];
            const rule = Clone(original);

            for (const name in options) {
                def.modifiers[name](rule, options[name]);
                Assert(rule.name === original.name, 'Cannot change rule name');
            }

            obj._rules[i] = rule;

            if (obj._singleRules.get(rule.name) === original) {
                obj._singleRules.set(rule.name, rule);
            }
        }

        obj.$_temp.ruleset = false;
        return obj.$_mutateRebuild();
    }

    get ruleset() {

        Assert(!this._inRuleset(), 'Cannot start a new ruleset without closing the previous one');

        const obj = this.clone();
        obj.$_temp.ruleset = obj._rules.length;
        return obj;
    }

    get $() {

        return this.ruleset;
    }

    tailor(targets) {

        targets = [].concat(targets);

        Assert(!this._inRuleset(), 'Cannot tailor inside a ruleset');

        let obj = this;                                                     // eslint-disable-line consistent-this

        if (this.$_terms.alterations) {
            for (const { target, adjuster } of this.$_terms.alterations) {
                if (targets.includes(target)) {
                    obj = adjuster(obj);
                    Assert(Common.isSchema(obj), 'Alteration adjuster for', target, 'failed to return a schema object');
                }
            }
        }

        obj = obj.$_modify({ each: (item) => item.tailor(targets), ref: false });
        obj.$_temp.ruleset = false;
        return obj.$_mutateRebuild();
    }

    tracer() {

        return Trace.location ? Trace.location(this) : this;                // $lab:coverage:ignore$
    }

    validate(value, options) {

        return Validator.entry(value, this, options);
    }

    validateAsync(value, options) {

        return Validator.entryAsync(value, this, options);
    }

    // Extensions

    $_addRule(options) {

        // Normalize rule

        if (typeof options === 'string') {
            options = { name: options };
        }

        Assert(options && typeof options === 'object', 'Invalid options');
        Assert(options.name && typeof options.name === 'string', 'Invalid rule name');

        for (const key in options) {
            Assert(key[0] !== '_', 'Cannot set private rule properties');
        }

        const rule = Object.assign({}, options);        // Shallow cloned
        rule._resolve = [];
        rule.method = rule.method || rule.name;

        const definition = this._definition.rules[rule.method];
        const args = rule.args;

        Assert(definition, 'Unknown rule', rule.method);

        // Args

        const obj = this.clone();

        if (args) {
            Assert(Object.keys(args).length === 1 || Object.keys(args).length === this._definition.rules[rule.name].args.length, 'Invalid rule definition for', this.type, rule.name);

            for (const key in args) {
                let arg = args[key];
                if (arg === undefined) {
                    delete args[key];
                    continue;
                }

                if (definition.argsByName) {
                    const resolver = definition.argsByName.get(key);

                    if (resolver.ref &&
                        Common.isResolvable(arg)) {

                        rule._resolve.push(key);
                        obj.$_mutateRegister(arg);
                    }
                    else {
                        if (resolver.normalize) {
                            arg = resolver.normalize(arg);
                            args[key] = arg;
                        }

                        if (resolver.assert) {
                            const error = Common.validateArg(arg, key, resolver);
                            Assert(!error, error, 'or reference');
                        }
                    }
                }

                args[key] = arg;
            }
        }

        // Unique rules

        if (!definition.multi) {
            obj._ruleRemove(rule.name, { clone: false });
            obj._singleRules.set(rule.name, rule);
        }

        if (obj.$_temp.ruleset === false) {
            obj.$_temp.ruleset = null;
        }

        if (definition.priority) {
            obj._rules.unshift(rule);
        }
        else {
            obj._rules.push(rule);
        }

        return obj;
    }

    $_compile(schema, options) {

        return Compile.schema(this.$_root, schema, options);
    }

    $_createError(code, value, local, state, prefs, options = {}) {

        const flags = options.flags !== false ? this._flags : {};
        const messages = options.messages ? Messages.merge(this._definition.messages, options.messages) : this._definition.messages;
        return new Errors.Report(code, value, local, flags, messages, state, prefs);
    }

    $_getFlag(name) {

        return this._flags[name];
    }

    $_getRule(name) {

        return this._singleRules.get(name);
    }

    $_mapLabels(path) {

        path = Array.isArray(path) ? path : path.split('.');
        return this._ids.labels(path);
    }

    $_match(value, state, prefs, overrides) {

        prefs = Object.assign({}, prefs);       // Shallow cloned
        prefs.abortEarly = true;
        prefs._externals = false;

        state.snapshot();
        const result = !Validator.validate(value, this, state, prefs, overrides).errors;
        state.restore();

        return result;
    }

    $_modify(options) {

        Common.assertOptions(options, ['each', 'once', 'ref', 'schema']);
        return Modify.schema(this, options) || this;
    }

    $_mutateRebuild() {

        Assert(!this._inRuleset(), 'Cannot add this rule inside a ruleset');

        this._refs.reset();
        this._ids.reset();

        const each = (item, { source, name, path, key }) => {

            const family = this._definition[source][name] && this._definition[source][name].register;
            if (family !== false) {
                this.$_mutateRegister(item, { family, key });
            }
        };

        this.$_modify({ each });

        if (this._definition.rebuild) {
            this._definition.rebuild(this);
        }

        this.$_temp.ruleset = false;
        return this;
    }

    $_mutateRegister(schema, { family, key } = {}) {

        this._refs.register(schema, family);
        this._ids.register(schema, { key });
    }

    $_property(name) {

        return this._definition.properties[name];
    }

    $_reach(path) {

        return this._ids.reach(path);
    }

    $_rootReferences() {

        return this._refs.roots();
    }

    $_setFlag(name, value, options = {}) {

        Assert(name[0] === '_' || !this._inRuleset(), 'Cannot set flag inside a ruleset');

        const flag = this._definition.flags[name] || {};
        if (DeepEqual(value, flag.default)) {
            value = undefined;
        }

        if (DeepEqual(value, this._flags[name])) {
            return this;
        }

        const obj = options.clone !== false ? this.clone() : this;

        if (value !== undefined) {
            obj._flags[name] = value;
            obj.$_mutateRegister(value);
        }
        else {
            delete obj._flags[name];
        }

        if (name[0] !== '_') {
            obj.$_temp.ruleset = false;
        }

        return obj;
    }

    $_validate(value, state, prefs) {

        return Validator.validate(value, this, state, prefs);
    }

    // Internals

    _assign(target) {

        target.type = this.type;

        target.$_root = this.$_root;

        target.$_temp = Object.assign({}, this.$_temp);
        target.$_temp.whens = {};

        target._ids = this._ids.clone();
        target._preferences = this._preferences;
        target._valids = this._valids && this._valids.clone();
        target._invalids = this._invalids && this._invalids.clone();
        target._rules = this._rules.slice();
        target._singleRules = Clone(this._singleRules, { shallow: true });
        target._refs = this._refs.clone();
        target._flags = Object.assign({}, this._flags);
        target._cache = null;

        target.$_terms = {};
        for (const key in this.$_terms) {
            target.$_terms[key] = this.$_terms[key] ? this.$_terms[key].slice() : null;
        }

        target.$_super = {};
        for (const override in this.$_super) {
            target.$_super[override] = this._super[override].bind(target);
        }

        return target;
    }

    _default(flag, value, options = {}) {

        Common.assertOptions(options, 'literal');

        Assert(value !== undefined, 'Missing', flag, 'value');
        Assert(typeof value === 'function' || !options.literal, 'Only function value supports literal option');

        if (typeof value === 'function' &&
            options.literal) {

            value = {
                [Common.symbols.literal]: true,
                literal: value
            };
        }

        const obj = this.$_setFlag(flag, value);
        return obj;
    }

    _generate(value, state, prefs) {

        if (!this.$_terms.whens) {
            return { schema: this };
        }

        // Collect matching whens

        const whens = [];
        const ids = [];
        for (let i = 0; i < this.$_terms.whens.length; ++i) {
            const when = this.$_terms.whens[i];

            if (when.concat) {
                whens.push(when.concat);
                ids.push(`${i}.concat`);
                continue;
            }

            const input = when.ref ? when.ref.resolve(value, state, prefs) : value;
            const tests = when.is ? [when] : when.switch;
            const before = ids.length;

            for (let j = 0; j < tests.length; ++j) {
                const { is, then, otherwise } = tests[j];

                const baseId = `${i}${when.switch ? '.' + j : ''}`;
                if (is.$_match(input, state.nest(is, `${baseId}.is`), prefs)) {
                    if (then) {
                        const localState = state.localize([...state.path, `${baseId}.then`], state.ancestors, state.schemas);
                        const { schema: generated, id } = then._generate(value, localState, prefs);
                        whens.push(generated);
                        ids.push(`${baseId}.then${id ? `(${id})` : ''}`);
                        break;
                    }
                }
                else if (otherwise) {
                    const localState = state.localize([...state.path, `${baseId}.otherwise`], state.ancestors, state.schemas);
                    const { schema: generated, id } = otherwise._generate(value, localState, prefs);
                    whens.push(generated);
                    ids.push(`${baseId}.otherwise${id ? `(${id})` : ''}`);
                    break;
                }
            }

            if (when.break &&
                ids.length > before) {          // Something matched

                break;
            }
        }

        // Check cache

        const id = ids.join(', ');
        state.mainstay.tracer.debug(state, 'rule', 'when', id);

        if (!id) {
            return { schema: this };
        }

        if (!state.mainstay.tracer.active &&
            this.$_temp.whens[id]) {

            return { schema: this.$_temp.whens[id], id };
        }

        // Generate dynamic schema

        let obj = this;                                             // eslint-disable-line consistent-this
        if (this._definition.generate) {
            obj = this._definition.generate(this, value, state, prefs);
        }

        // Apply whens

        for (const when of whens) {
            obj = obj.concat(when);
        }

        // Tracing

        if (this.$_root._tracer) {
            this.$_root._tracer._combine(obj, [this, ...whens]);
        }

        // Cache result

        this.$_temp.whens[id] = obj;
        return { schema: obj, id };
    }

    _inner(type, values, options = {}) {

        Assert(!this._inRuleset(), `Cannot set ${type} inside a ruleset`);

        const obj = this.clone();
        if (!obj.$_terms[type] ||
            options.override) {

            obj.$_terms[type] = [];
        }

        if (options.single) {
            obj.$_terms[type].push(values);
        }
        else {
            obj.$_terms[type].push(...values);
        }

        obj.$_temp.ruleset = false;
        return obj;
    }

    _inRuleset() {

        return this.$_temp.ruleset !== null && this.$_temp.ruleset !== false;
    }

    _ruleRemove(name, options = {}) {

        if (!this._singleRules.has(name)) {
            return this;
        }

        const obj = options.clone !== false ? this.clone() : this;

        obj._singleRules.delete(name);

        const filtered = [];
        for (let i = 0; i < obj._rules.length; ++i) {
            const test = obj._rules[i];
            if (test.name === name &&
                !test.keep) {

                if (obj._inRuleset() &&
                    i < obj.$_temp.ruleset) {

                    --obj.$_temp.ruleset;
                }

                continue;
            }

            filtered.push(test);
        }

        obj._rules = filtered;
        return obj;
    }

    _values(values, key) {

        Common.verifyFlat(values, key.slice(1, -1));

        const obj = this.clone();

        const override = values[0] === Common.symbols.override;
        if (override) {
            values = values.slice(1);
        }

        if (!obj[key] &&
            values.length) {

            obj[key] = new Values();
        }
        else if (override) {
            obj[key] = values.length ? new Values() : null;
            obj.$_mutateRebuild();
        }

        if (!obj[key]) {
            return obj;
        }

        if (override) {
            obj[key].override();
        }

        for (const value of values) {
            Assert(value !== undefined, 'Cannot call allow/valid/invalid with undefined');
            Assert(value !== Common.symbols.override, 'Override must be the first value');

            const other = key === '_invalids' ? '_valids' : '_invalids';
            if (obj[other]) {
                obj[other].remove(value);
                if (!obj[other].length) {
                    Assert(key === '_valids' || !obj._flags.only, 'Setting invalid value', value, 'leaves schema rejecting all values due to previous valid rule');
                    obj[other] = null;
                }
            }

            obj[key].add(value, obj._refs);
        }

        return obj;
    }
};


internals.Base.prototype.isImmutable = true;                        // Prevents Hoek from deep cloning schema objects


internals.Base.prototype[Common.symbols.any] = {
    version: Common.version,
    compile: Compile.compile,
    root: '$_root'
};


// Aliases

internals.Base.prototype.deny = internals.Base.prototype.invalid;
internals.Base.prototype.disallow = internals.Base.prototype.invalid;
internals.Base.prototype.equal = internals.Base.prototype.valid;
internals.Base.prototype.exist = internals.Base.prototype.required;
internals.Base.prototype.not = internals.Base.prototype.invalid;
internals.Base.prototype.options = internals.Base.prototype.prefs;
internals.Base.prototype.preferences = internals.Base.prototype.prefs;


module.exports = new internals.Base();


/***/ }),

/***/ 6773:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);

const Common = __webpack_require__(3221);


const internals = {
    max: 1000,
    supported: new Set(['undefined', 'boolean', 'number', 'string'])
};


exports.provider = {

    provision(options) {

        return new internals.Cache(options);
    }
};


// Least Recently Used (LRU) Cache

internals.Cache = class {

    constructor(options = {}) {

        Common.assertOptions(options, ['max']);
        Assert(options.max === undefined || options.max && options.max > 0 && isFinite(options.max), 'Invalid max cache size');

        this._max = options.max || internals.max;

        this._map = new Map();                          // Map of nodes by key
        this._list = new internals.List();              // List of nodes (most recently used in head)
    }

    get length() {

        return this._map.size;
    }

    set(key, value) {

        if (key !== null &&
            !internals.supported.has(typeof key)) {

            return;
        }

        let node = this._map.get(key);
        if (node) {
            node.value = value;
            this._list.first(node);
            return;
        }

        node = this._list.unshift({ key, value });
        this._map.set(key, node);
        this._compact();
    }

    get(key) {

        const node = this._map.get(key);
        if (node) {
            this._list.first(node);
            return Clone(node.value);
        }
    }

    _compact() {

        if (this._map.size > this._max) {
            const node = this._list.pop();
            this._map.delete(node.key);
        }
    }
};


internals.List = class {

    constructor() {

        this.tail = null;
        this.head = null;
    }

    unshift(node) {

        node.next = null;
        node.prev = this.head;

        if (this.head) {
            this.head.next = node;
        }

        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }

        return node;
    }

    first(node) {

        if (node === this.head) {
            return;
        }

        this._remove(node);
        this.unshift(node);
    }

    pop() {

        return this._remove(this.tail);
    }

    _remove(node) {

        const { next, prev } = node;

        next.prev = prev;

        if (prev) {
            prev.next = next;
        }

        if (node === this.tail) {
            this.tail = next;
        }

        node.prev = null;
        node.next = null;

        return node;
    }
};


/***/ }),

/***/ 3221:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const AssertError = __webpack_require__(5563);

const Pkg = __webpack_require__(2542);

let Messages;
let Schemas;


const internals = {
    isoDate: /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/
};


exports.version = Pkg.version;


exports.defaults = {
    abortEarly: true,
    allowUnknown: false,
    cache: true,
    context: null,
    convert: true,
    dateFormat: 'iso',
    errors: {
        escapeHtml: false,
        label: 'path',
        language: null,
        render: true,
        stack: false,
        wrapArrays: true
    },
    externals: true,
    messages: {},
    nonEnumerables: false,
    noDefaults: false,
    presence: 'optional',
    skipFunctions: false,
    stripUnknown: false,
    warnings: false
};


exports.symbols = {
    any: Symbol.for('@hapi/joi/schema'),            // Used to internally identify any-based types (shared with other joi versions)
    arraySingle: Symbol('arraySingle'),
    deepDefault: Symbol('deepDefault'),
    literal: Symbol('literal'),
    override: Symbol('override'),
    prefs: Symbol('prefs'),
    ref: Symbol('ref'),
    values: Symbol('values'),
    template: Symbol('template')
};


exports.assertOptions = function (options, keys, name = 'Options') {

    Assert(options && typeof options === 'object' && !Array.isArray(options), 'Options must be of type object');
    const unknownKeys = Object.keys(options).filter((k) => !keys.includes(k));
    Assert(unknownKeys.length === 0, `${name} contain unknown keys: ${unknownKeys}`);
};


exports.checkPreferences = function (prefs) {

    Schemas = Schemas || __webpack_require__(3723);

    const result = Schemas.preferences.validate(prefs);

    if (result.error) {
        throw new AssertError([result.error.details[0].message]);
    }
};


exports.compare = function (a, b, operator) {

    switch (operator) {
        case '=': return a === b;
        case '>': return a > b;
        case '<': return a < b;
        case '>=': return a >= b;
        case '<=': return a <= b;
    }
};


exports.default = function (value, defaultValue) {

    return value === undefined ? defaultValue : value;
};


exports.isIsoDate = function (date) {

    return internals.isoDate.test(date);
};


exports.isNumber = function (value) {

    return typeof value === 'number' && !isNaN(value);
};


exports.isResolvable = function (obj) {

    if (!obj) {
        return false;
    }

    return obj[exports.symbols.ref] || obj[exports.symbols.template];
};


exports.isSchema = function (schema, options = {}) {

    const any = schema && schema[exports.symbols.any];
    if (!any) {
        return false;
    }

    Assert(options.legacy || any.version === exports.version, 'Cannot mix different versions of joi schemas');
    return true;
};


exports.isValues = function (obj) {

    return obj[exports.symbols.values];
};


exports.limit = function (value) {

    return Number.isSafeInteger(value) && value >= 0;
};


exports.preferences = function (target, source) {

    Messages = Messages || __webpack_require__(676);

    target = target || {};
    source = source || {};

    const merged = Object.assign({}, target, source);
    if (source.errors &&
        target.errors) {

        merged.errors = Object.assign({}, target.errors, source.errors);
    }

    if (source.messages) {
        merged.messages = Messages.compile(source.messages, target.messages);
    }

    delete merged[exports.symbols.prefs];
    return merged;
};


exports.tryWithPath = function (fn, key, options = {}) {

    try {
        return fn();
    }
    catch (err) {
        if (err.path !== undefined) {
            err.path = key + '.' + err.path;
        }
        else {
            err.path = key;
        }

        if (options.append) {
            err.message = `${err.message} (${err.path})`;
        }

        throw err;
    }
};


exports.validateArg = function (value, label, { assert, message }) {

    if (exports.isSchema(assert)) {
        const result = assert.validate(value);
        if (!result.error) {
            return;
        }

        return result.error.message;
    }
    else if (!assert(value)) {
        return label ? `${label} ${message}` : message;
    }
};


exports.verifyFlat = function (args, method) {

    for (const arg of args) {
        Assert(!Array.isArray(arg), 'Method no longer accepts array arguments:', method);
    }
};


/***/ }),

/***/ 3579:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Common = __webpack_require__(3221);
const Ref = __webpack_require__(1802);


const internals = {};


exports.schema = function (Joi, config, options = {}) {

    Common.assertOptions(options, ['appendPath', 'override']);

    try {
        return internals.schema(Joi, config, options);
    }
    catch (err) {
        if (options.appendPath &&
            err.path !== undefined) {

            err.message = `${err.message} (${err.path})`;
        }

        throw err;
    }
};


internals.schema = function (Joi, config, options) {

    Assert(config !== undefined, 'Invalid undefined schema');

    if (Array.isArray(config)) {
        Assert(config.length, 'Invalid empty array schema');

        if (config.length === 1) {
            config = config[0];
        }
    }

    const valid = (base, ...values) => {

        if (options.override !== false) {
            return base.valid(Joi.override, ...values);
        }

        return base.valid(...values);
    };

    if (internals.simple(config)) {
        return valid(Joi, config);
    }

    if (typeof config === 'function') {
        return Joi.custom(config);
    }

    Assert(typeof config === 'object', 'Invalid schema content:', typeof config);

    if (Common.isResolvable(config)) {
        return valid(Joi, config);
    }

    if (Common.isSchema(config)) {
        return config;
    }

    if (Array.isArray(config)) {
        for (const item of config) {
            if (!internals.simple(item)) {
                return Joi.alternatives().try(...config);
            }
        }

        return valid(Joi, ...config);
    }

    if (config instanceof RegExp) {
        return Joi.string().regex(config);
    }

    if (config instanceof Date) {
        return valid(Joi.date(), config);
    }

    Assert(Object.getPrototypeOf(config) === Object.getPrototypeOf({}), 'Schema can only contain plain objects');

    return Joi.object().keys(config);
};


exports.ref = function (id, options) {

    return Ref.isRef(id) ? id : Ref.create(id, options);
};


exports.compile = function (root, schema, options = {}) {

    Common.assertOptions(options, ['legacy']);

    // Compiled by any supported version

    const any = schema && schema[Common.symbols.any];
    if (any) {
        Assert(options.legacy || any.version === Common.version, 'Cannot mix different versions of joi schemas:', any.version, Common.version);
        return schema;
    }

    // Uncompiled root

    if (typeof schema !== 'object' ||
        !options.legacy) {

        return exports.schema(root, schema, { appendPath: true });          // Will error if schema contains other versions
    }

    // Scan schema for compiled parts

    const compiler = internals.walk(schema);
    if (!compiler) {
        return exports.schema(root, schema, { appendPath: true });
    }

    return compiler.compile(compiler.root, schema);
};


internals.walk = function (schema) {

    if (typeof schema !== 'object') {
        return null;
    }

    if (Array.isArray(schema)) {
        for (const item of schema) {
            const compiler = internals.walk(item);
            if (compiler) {
                return compiler;
            }
        }

        return null;
    }

    const any = schema[Common.symbols.any];
    if (any) {
        return { root: schema[any.root], compile: any.compile };
    }

    Assert(Object.getPrototypeOf(schema) === Object.getPrototypeOf({}), 'Schema can only contain plain objects');

    for (const key in schema) {
        const compiler = internals.walk(schema[key]);
        if (compiler) {
            return compiler;
        }
    }

    return null;
};


internals.simple = function (value) {

    return value === null || ['boolean', 'string', 'number'].includes(typeof value);
};


exports.when = function (schema, condition, options) {

    if (options === undefined) {
        Assert(condition && typeof condition === 'object', 'Missing options');

        options = condition;
        condition = Ref.create('.');
    }

    if (Array.isArray(options)) {
        options = { switch: options };
    }

    Common.assertOptions(options, ['is', 'not', 'then', 'otherwise', 'switch', 'break']);

    // Schema condition

    if (Common.isSchema(condition)) {
        Assert(options.is === undefined, '"is" can not be used with a schema condition');
        Assert(options.not === undefined, '"not" can not be used with a schema condition');
        Assert(options.switch === undefined, '"switch" can not be used with a schema condition');

        return internals.condition(schema, { is: condition, then: options.then, otherwise: options.otherwise, break: options.break });
    }

    // Single condition

    Assert(Ref.isRef(condition) || typeof condition === 'string', 'Invalid condition:', condition);
    Assert(options.not === undefined || options.is === undefined, 'Cannot combine "is" with "not"');

    if (options.switch === undefined) {
        let rule = options;
        if (options.not !== undefined) {
            rule = { is: options.not, then: options.otherwise, otherwise: options.then, break: options.break };
        }

        let is = rule.is !== undefined ? schema.$_compile(rule.is) : schema.$_root.invalid(null, false, 0, '').required();
        Assert(rule.then !== undefined || rule.otherwise !== undefined, 'options must have at least one of "then", "otherwise", or "switch"');
        Assert(rule.break === undefined || rule.then === undefined || rule.otherwise === undefined, 'Cannot specify then, otherwise, and break all together');

        if (options.is !== undefined &&
            !Ref.isRef(options.is) &&
            !Common.isSchema(options.is)) {

            is = is.required();                     // Only apply required if this wasn't already a schema or a ref
        }

        return internals.condition(schema, { ref: exports.ref(condition), is, then: rule.then, otherwise: rule.otherwise, break: rule.break });
    }

    // Switch statement

    Assert(Array.isArray(options.switch), '"switch" must be an array');
    Assert(options.is === undefined, 'Cannot combine "switch" with "is"');
    Assert(options.not === undefined, 'Cannot combine "switch" with "not"');
    Assert(options.then === undefined, 'Cannot combine "switch" with "then"');

    const rule = {
        ref: exports.ref(condition),
        switch: [],
        break: options.break
    };

    for (let i = 0; i < options.switch.length; ++i) {
        const test = options.switch[i];
        const last = i === options.switch.length - 1;

        Common.assertOptions(test, last ? ['is', 'then', 'otherwise'] : ['is', 'then']);

        Assert(test.is !== undefined, 'Switch statement missing "is"');
        Assert(test.then !== undefined, 'Switch statement missing "then"');

        const item = {
            is: schema.$_compile(test.is),
            then: schema.$_compile(test.then)
        };

        if (!Ref.isRef(test.is) &&
            !Common.isSchema(test.is)) {

            item.is = item.is.required();           // Only apply required if this wasn't already a schema or a ref
        }

        if (last) {
            Assert(options.otherwise === undefined || test.otherwise === undefined, 'Cannot specify "otherwise" inside and outside a "switch"');
            const otherwise = options.otherwise !== undefined ? options.otherwise : test.otherwise;
            if (otherwise !== undefined) {
                Assert(rule.break === undefined, 'Cannot specify both otherwise and break');
                item.otherwise = schema.$_compile(otherwise);
            }
        }

        rule.switch.push(item);
    }

    return rule;
};


internals.condition = function (schema, condition) {

    for (const key of ['then', 'otherwise']) {
        if (condition[key] === undefined) {
            delete condition[key];
        }
        else {
            condition[key] = schema.$_compile(condition[key]);
        }
    }

    return condition;
};


/***/ }),

/***/ 2150:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Clone = __webpack_require__(5578);

const Common = __webpack_require__(3221);
const Template = __webpack_require__(5547);


const internals = {
    annotations: Symbol('annotations')
};


exports.Report = class {

    constructor(code, value, local, flags, messages, state, prefs) {

        this.code = code;
        this.flags = flags;
        this.messages = messages;
        this.path = state.path;
        this.prefs = prefs;
        this.state = state;
        this.value = value;

        this.message = null;
        this.template = null;

        this.local = local || {};
        this.local.label = exports.label(this.flags, this.state, this.prefs, this.messages);

        if (this.value !== undefined &&
            !this.local.hasOwnProperty('value')) {

            this.local.value = this.value;
        }

        if (this.path.length) {
            const key = this.path[this.path.length - 1];
            if (typeof key !== 'object') {
                this.local.key = key;
            }
        }
    }

    _setTemplate(template) {

        this.template = template;

        if (!this.flags.label &&
            this.path.length === 0) {

            const localized = this._template(this.template, 'root');
            if (localized) {
                this.local.label = localized;
            }
        }
    }

    toString() {

        if (this.message) {
            return this.message;
        }

        const code = this.code;

        if (!this.prefs.errors.render) {
            return this.code;
        }

        const template = this._template(this.template) ||
            this._template(this.prefs.messages) ||
            this._template(this.messages);

        if (template === undefined) {
            return `Error code "${code}" is not defined, your custom type is missing the correct messages definition`;
        }

        // Render and cache result

        this.message = template.render(this.value, this.state, this.prefs, this.local, { errors: this.prefs.errors, messages: [this.prefs.messages, this.messages] });
        if (!this.prefs.errors.label) {
            this.message = this.message.replace(/^"" /, '').trim();
        }

        return this.message;
    }

    _template(messages, code) {

        return exports.template(this.value, messages, code || this.code, this.state, this.prefs);
    }
};


exports.path = function (path) {

    let label = '';
    for (const segment of path) {
        if (typeof segment === 'object') {          // Exclude array single path segment
            continue;
        }

        if (typeof segment === 'string') {
            if (label) {
                label += '.';
            }

            label += segment;
        }
        else {
            label += `[${segment}]`;
        }
    }

    return label;
};


exports.template = function (value, messages, code, state, prefs) {

    if (!messages) {
        return;
    }

    if (Template.isTemplate(messages)) {
        return code !== 'root' ? messages : null;
    }

    let lang = prefs.errors.language;
    if (Common.isResolvable(lang)) {
        lang = lang.resolve(value, state, prefs);
    }

    if (lang &&
        messages[lang] &&
        messages[lang][code] !== undefined) {

        return messages[lang][code];
    }

    return messages[code];
};


exports.label = function (flags, state, prefs, messages) {

    if (flags.label) {
        return flags.label;
    }

    if (!prefs.errors.label) {
        return '';
    }

    let path = state.path;
    if (prefs.errors.label === 'key' &&
        state.path.length > 1) {

        path = state.path.slice(-1);
    }

    return exports.path(path) ||
        exports.template(null, prefs.messages, 'root', state, prefs) ||
        messages && exports.template(null, messages, 'root', state, prefs) ||
        'value';
};


exports.process = function (errors, original, prefs) {

    if (!errors) {
        return null;
    }

    const { override, message, details } = exports.details(errors);
    if (override) {
        return override;
    }

    if (prefs.errors.stack) {
        return new exports.ValidationError(message, details, original);
    }

    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    const validationError = new exports.ValidationError(message, details, original);
    Error.stackTraceLimit = limit;
    return validationError;
};


exports.details = function (errors, options = {}) {

    let messages = [];
    const details = [];

    for (const item of errors) {

        // Override

        if (item instanceof Error) {
            if (options.override !== false) {
                return { override: item };
            }

            const message = item.toString();
            messages.push(message);

            details.push({
                message,
                type: 'override',
                context: { error: item }
            });

            continue;
        }

        // Report

        const message = item.toString();
        messages.push(message);

        details.push({
            message,
            path: item.path.filter((v) => typeof v !== 'object'),
            type: item.code,
            context: item.local
        });
    }

    if (messages.length > 1) {
        messages = [...new Set(messages)];
    }

    return { message: messages.join('. '), details };
};


exports.ValidationError = class extends Error {

    constructor(message, details, original) {

        super(message);
        this._original = original;
        this.details = details;
    }

    annotate(stripColorCodes) {

        if (!this._original ||
            typeof this._original !== 'object') {

            return this.details[0].message;
        }

        const redFgEscape = stripColorCodes ? '' : '\u001b[31m';
        const redBgEscape = stripColorCodes ? '' : '\u001b[41m';
        const endColor = stripColorCodes ? '' : '\u001b[0m';

        const obj = Clone(this._original);

        for (let i = this.details.length - 1; i >= 0; --i) {        // Reverse order to process deepest child first
            const pos = i + 1;
            const error = this.details[i];
            const path = error.path;
            let node = obj;
            for (let j = 0; ; ++j) {
                const seg = path[j];

                if (Common.isSchema(node)) {
                    node = node.clone();                              // joi schemas are not cloned by hoek, we have to take this extra step
                }

                if (j + 1 < path.length &&
                    typeof node[seg] !== 'string') {

                    node = node[seg];
                }
                else {
                    const refAnnotations = node[internals.annotations] || { errors: {}, missing: {} };
                    node[internals.annotations] = refAnnotations;

                    const cacheKey = seg || error.context.key;

                    if (node[seg] !== undefined) {
                        refAnnotations.errors[cacheKey] = refAnnotations.errors[cacheKey] || [];
                        refAnnotations.errors[cacheKey].push(pos);
                    }
                    else {
                        refAnnotations.missing[cacheKey] = pos;
                    }

                    break;
                }
            }
        }

        const replacers = {
            key: /_\$key\$_([, \d]+)_\$end\$_"/g,
            missing: /"_\$miss\$_([^|]+)\|(\d+)_\$end\$_": "__missing__"/g,
            arrayIndex: /\s*"_\$idx\$_([, \d]+)_\$end\$_",?\n(.*)/g,
            specials: /"\[(NaN|Symbol.*|-?Infinity|function.*|\(.*)]"/g
        };

        let message = internals.safeStringify(obj, 2)
            .replace(replacers.key, ($0, $1) => `" ${redFgEscape}[${$1}]${endColor}`)
            .replace(replacers.missing, ($0, $1, $2) => `${redBgEscape}"${$1}"${endColor}${redFgEscape} [${$2}]: -- missing --${endColor}`)
            .replace(replacers.arrayIndex, ($0, $1, $2) => `\n${$2} ${redFgEscape}[${$1}]${endColor}`)
            .replace(replacers.specials, ($0, $1) => $1);

        message = `${message}\n${redFgEscape}`;

        for (let i = 0; i < this.details.length; ++i) {
            const pos = i + 1;
            message = `${message}\n[${pos}] ${this.details[i].message}`;
        }

        message = message + endColor;

        return message;
    }
};


exports.ValidationError.prototype.isJoi = true;


exports.ValidationError.prototype.name = 'ValidationError';


// Inspired by json-stringify-safe

internals.safeStringify = function (obj, spaces) {

    return JSON.stringify(obj, internals.serializer(), spaces);
};


internals.serializer = function () {

    const keys = [];
    const stack = [];

    const cycleReplacer = (key, value) => {

        if (stack[0] === value) {
            return '[Circular ~]';
        }

        return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']';
    };

    return function (key, value) {

        if (stack.length > 0) {
            const thisPos = stack.indexOf(this);
            if (~thisPos) {
                stack.length = thisPos + 1;
                keys.length = thisPos + 1;
                keys[thisPos] = key;
            }
            else {
                stack.push(this);
                keys.push(key);
            }

            if (~stack.indexOf(value)) {
                value = cycleReplacer.call(this, key, value);
            }
        }
        else {
            stack.push(value);
        }

        if (value) {
            const annotations = value[internals.annotations];
            if (annotations) {
                if (Array.isArray(value)) {
                    const annotated = [];

                    for (let i = 0; i < value.length; ++i) {
                        if (annotations.errors[i]) {
                            annotated.push(`_$idx$_${annotations.errors[i].sort().join(', ')}_$end$_`);
                        }

                        annotated.push(value[i]);
                    }

                    value = annotated;
                }
                else {
                    for (const errorKey in annotations.errors) {
                        value[`${errorKey}_$key$_${annotations.errors[errorKey].sort().join(', ')}_$end$_`] = value[errorKey];
                        value[errorKey] = undefined;
                    }

                    for (const missingKey in annotations.missing) {
                        value[`_$miss$_${missingKey}|${annotations.missing[missingKey]}_$end$_`] = '__missing__';
                    }
                }

                return value;
            }
        }

        if (value === Infinity ||
            value === -Infinity ||
            Number.isNaN(value) ||
            typeof value === 'function' ||
            typeof value === 'symbol') {

            return '[' + value.toString() + ']';
        }

        return value;
    };
};


/***/ }),

/***/ 1669:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);

const Common = __webpack_require__(3221);
const Messages = __webpack_require__(676);


const internals = {};


exports.type = function (from, options) {

    const base = Object.getPrototypeOf(from);
    const prototype = Clone(base);
    const schema = from._assign(Object.create(prototype));
    const def = Object.assign({}, options);                                 // Shallow cloned
    delete def.base;

    prototype._definition = def;

    const parent = base._definition || {};
    def.messages = Messages.merge(parent.messages, def.messages);
    def.properties = Object.assign({}, parent.properties, def.properties);

    // Type

    schema.type = def.type;

    // Flags

    def.flags = Object.assign({}, parent.flags, def.flags);

    // Terms

    const terms = Object.assign({}, parent.terms);
    if (def.terms) {
        for (const name in def.terms) {                                     // Only apply own terms
            const term = def.terms[name];
            Assert(schema.$_terms[name] === undefined, 'Invalid term override for', def.type, name);
            schema.$_terms[name] = term.init;
            terms[name] = term;
        }
    }

    def.terms = terms;

    // Constructor arguments

    if (!def.args) {
        def.args = parent.args;
    }

    // Prepare

    def.prepare = internals.prepare(def.prepare, parent.prepare);

    // Coerce

    if (def.coerce) {
        if (typeof def.coerce === 'function') {
            def.coerce = { method: def.coerce };
        }

        if (def.coerce.from &&
            !Array.isArray(def.coerce.from)) {

            def.coerce = { method: def.coerce.method, from: [].concat(def.coerce.from) };
        }
    }

    def.coerce = internals.coerce(def.coerce, parent.coerce);

    // Validate

    def.validate = internals.validate(def.validate, parent.validate);

    // Rules

    const rules = Object.assign({}, parent.rules);
    if (def.rules) {
        for (const name in def.rules) {
            const rule = def.rules[name];
            Assert(typeof rule === 'object', 'Invalid rule definition for', def.type, name);

            let method = rule.method;
            if (method === undefined) {
                method = function () {

                    return this.$_addRule(name);
                };
            }

            if (method) {
                Assert(!prototype[name], 'Rule conflict in', def.type, name);
                prototype[name] = method;
            }

            Assert(!rules[name], 'Rule conflict in', def.type, name);
            rules[name] = rule;

            if (rule.alias) {
                const aliases = [].concat(rule.alias);
                for (const alias of aliases) {
                    prototype[alias] = rule.method;
                }
            }

            if (rule.args) {
                rule.argsByName = new Map();
                rule.args = rule.args.map((arg) => {

                    if (typeof arg === 'string') {
                        arg = { name: arg };
                    }

                    Assert(!rule.argsByName.has(arg.name), 'Duplicated argument name', arg.name);

                    if (Common.isSchema(arg.assert)) {
                        arg.assert = arg.assert.strict().label(arg.name);
                    }

                    rule.argsByName.set(arg.name, arg);
                    return arg;
                });
            }
        }
    }

    def.rules = rules;

    // Modifiers

    const modifiers = Object.assign({}, parent.modifiers);
    if (def.modifiers) {
        for (const name in def.modifiers) {
            Assert(!prototype[name], 'Rule conflict in', def.type, name);

            const modifier = def.modifiers[name];
            Assert(typeof modifier === 'function', 'Invalid modifier definition for', def.type, name);

            const method = function (arg) {

                return this.rule({ [name]: arg });
            };

            prototype[name] = method;
            modifiers[name] = modifier;
        }
    }

    def.modifiers = modifiers;

    // Overrides

    if (def.overrides) {
        prototype._super = base;
        schema.$_super = {};
        for (const override in def.overrides) {
            Assert(base[override], 'Cannot override missing', override);
            schema.$_super[override] = base[override].bind(schema);
        }

        Object.assign(prototype, def.overrides);
    }

    // Casts

    def.cast = Object.assign({}, parent.cast, def.cast);

    // Manifest

    const manifest = Object.assign({}, parent.manifest, def.manifest);
    manifest.build = internals.build(def.manifest && def.manifest.build, parent.manifest && parent.manifest.build);
    def.manifest = manifest;

    // Rebuild

    def.rebuild = internals.rebuild(def.rebuild, parent.rebuild);

    return schema;
};


// Helpers

internals.build = function (child, parent) {

    if (!child ||
        !parent) {

        return child || parent;
    }

    return function (obj, desc) {

        return parent(child(obj, desc), desc);
    };
};


internals.coerce = function (child, parent) {

    if (!child ||
        !parent) {

        return child || parent;
    }

    return {
        from: child.from && parent.from ? [...new Set([...child.from, ...parent.from])] : null,
        method(value, helpers) {

            let coerced;
            if (!parent.from ||
                parent.from.includes(typeof value)) {

                coerced = parent.method(value, helpers);
                if (coerced) {
                    if (coerced.errors ||
                        coerced.value === undefined) {

                        return coerced;
                    }

                    value = coerced.value;
                }
            }

            if (!child.from ||
                child.from.includes(typeof value)) {

                const own = child.method(value, helpers);
                if (own) {
                    return own;
                }
            }

            return coerced;
        }
    };
};


internals.prepare = function (child, parent) {

    if (!child ||
        !parent) {

        return child || parent;
    }

    return function (value, helpers) {

        const prepared = child(value, helpers);
        if (prepared) {
            if (prepared.errors ||
                prepared.value === undefined) {

                return prepared;
            }

            value = prepared.value;
        }

        return parent(value, helpers) || prepared;
    };
};


internals.rebuild = function (child, parent) {

    if (!child ||
        !parent) {

        return child || parent;
    }

    return function (schema) {

        parent(schema);
        child(schema);
    };
};


internals.validate = function (child, parent) {

    if (!child ||
        !parent) {

        return child || parent;
    }

    return function (value, helpers) {

        const result = parent(value, helpers);
        if (result) {
            if (result.errors &&
                (!Array.isArray(result.errors) || result.errors.length)) {

                return result;
            }

            value = result.value;
        }

        return child(value, helpers) || result;
    };
};


/***/ }),

/***/ 4010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);

const Cache = __webpack_require__(6773);
const Common = __webpack_require__(3221);
const Compile = __webpack_require__(3579);
const Errors = __webpack_require__(2150);
const Extend = __webpack_require__(1669);
const Manifest = __webpack_require__(8937);
const Ref = __webpack_require__(1802);
const Template = __webpack_require__(5547);
const Trace = __webpack_require__(121);

let Schemas;


const internals = {
    types: {
        alternatives: __webpack_require__(7216),
        any: __webpack_require__(6866),
        array: __webpack_require__(9762),
        boolean: __webpack_require__(8686),
        date: __webpack_require__(9408),
        function: __webpack_require__(8146),
        link: __webpack_require__(9713),
        number: __webpack_require__(3730),
        object: __webpack_require__(1443),
        string: __webpack_require__(7769),
        symbol: __webpack_require__(9737)
    },
    aliases: {
        alt: 'alternatives',
        bool: 'boolean',
        func: 'function'
    }
};


if (Buffer) {                                                           // $lab:coverage:ignore$
    internals.types.binary = __webpack_require__(6754);
}


internals.root = function () {

    const root = {
        _types: new Set(Object.keys(internals.types))
    };

    // Types

    for (const type of root._types) {
        root[type] = function (...args) {

            Assert(!args.length || ['alternatives', 'link', 'object'].includes(type), 'The', type, 'type does not allow arguments');
            return internals.generate(this, internals.types[type], args);
        };
    }

    // Shortcuts

    for (const method of ['allow', 'custom', 'disallow', 'equal', 'exist', 'forbidden', 'invalid', 'not', 'only', 'optional', 'options', 'prefs', 'preferences', 'required', 'strip', 'valid', 'when']) {
        root[method] = function (...args) {

            return this.any()[method](...args);
        };
    }

    // Methods

    Object.assign(root, internals.methods);

    // Aliases

    for (const alias in internals.aliases) {
        const target = internals.aliases[alias];
        root[alias] = root[target];
    }

    root.x = root.expression;

    // Trace

    if (Trace.setup) {                                          // $lab:coverage:ignore$
        Trace.setup(root);
    }

    return root;
};


internals.methods = {

    ValidationError: Errors.ValidationError,
    version: Common.version,
    cache: Cache.provider,

    assert(value, schema, ...args /* [message], [options] */) {

        internals.assert(value, schema, true, args);
    },

    attempt(value, schema, ...args /* [message], [options] */) {

        return internals.assert(value, schema, false, args);
    },

    build(desc) {

        Assert(typeof Manifest.build === 'function', 'Manifest functionality disabled');
        return Manifest.build(this, desc);
    },

    checkPreferences(prefs) {

        Common.checkPreferences(prefs);
    },

    compile(schema, options) {

        return Compile.compile(this, schema, options);
    },

    defaults(modifier) {

        Assert(typeof modifier === 'function', 'modifier must be a function');

        const joi = Object.assign({}, this);
        for (const type of joi._types) {
            const schema = modifier(joi[type]());
            Assert(Common.isSchema(schema), 'modifier must return a valid schema object');

            joi[type] = function (...args) {

                return internals.generate(this, schema, args);
            };
        }

        return joi;
    },

    expression(...args) {

        return new Template(...args);
    },

    extend(...extensions) {

        Common.verifyFlat(extensions, 'extend');

        Schemas = Schemas || __webpack_require__(3723);

        Assert(extensions.length, 'You need to provide at least one extension');
        this.assert(extensions, Schemas.extensions);

        const joi = Object.assign({}, this);
        joi._types = new Set(joi._types);

        for (let extension of extensions) {
            if (typeof extension === 'function') {
                extension = extension(joi);
            }

            this.assert(extension, Schemas.extension);

            Assert(joi[extension.type] === undefined || joi._types.has(extension.type), 'Cannot override name', extension.type);

            const base = extension.base || this.any();
            const schema = Extend.type(base, extension);

            joi._types.add(extension.type);
            joi[extension.type] = function (...args) {

                return internals.generate(this, schema, args);
            };
        }

        return joi;
    },

    isExpression: Template.isTemplate,
    isRef: Ref.isRef,
    isSchema: Common.isSchema,

    in(...args) {

        return Ref.in(...args);
    },

    override: Common.symbols.override,

    ref(...args) {

        return Ref.create(...args);
    },

    types() {

        const types = {};
        for (const type of this._types) {
            types[type] = this[type]();
        }

        for (const target in internals.aliases) {
            types[target] = this[target]();
        }

        return types;
    }
};


// Helpers

internals.assert = function (value, schema, annotate, args /* [message], [options] */) {

    const message = args[0] instanceof Error || typeof args[0] === 'string' ? args[0] : null;
    const options = message ? args[1] : args[0];
    const result = schema.validate(value, Common.preferences({ errors: { stack: true } }, options || {}));

    let error = result.error;
    if (!error) {
        return result.value;
    }

    if (message instanceof Error) {
        throw message;
    }

    annotate = annotate && typeof error.annotate === 'function';
    const display = annotate ? error.annotate() : error.message;

    if (error instanceof Errors.ValidationError === false) {
        error = Clone(error);
    }

    error.message = message ? `${message} ${display}` : display;
    throw error;
};


internals.generate = function (root, schema, args) {

    Assert(root, 'Must be invoked on a Joi instance.');

    schema.$_root = root;

    if (!schema._definition.args ||
        !args.length) {

        return schema;
    }

    return schema._definition.args(schema, ...args);
};


module.exports = internals.root();


/***/ }),

/***/ 8937:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);

const Common = __webpack_require__(3221);
const Messages = __webpack_require__(676);
const Ref = __webpack_require__(1802);
const Template = __webpack_require__(5547);

let Schemas;


const internals = {};


exports.describe = function (schema) {

    const def = schema._definition;

    // Type

    const desc = {
        type: schema.type,
        flags: {},
        rules: []
    };

    // Flags

    for (const flag in schema._flags) {
        if (flag[0] !== '_') {
            desc.flags[flag] = internals.describe(schema._flags[flag]);
        }
    }

    if (!Object.keys(desc.flags).length) {
        delete desc.flags;
    }

    // Preferences

    if (schema._preferences) {
        desc.preferences = Clone(schema._preferences, { shallow: ['messages'] });
        delete desc.preferences[Common.symbols.prefs];
        if (desc.preferences.messages) {
            desc.preferences.messages = Messages.decompile(desc.preferences.messages);
        }
    }

    // Allow / Invalid

    if (schema._valids) {
        desc.allow = schema._valids.describe();
    }

    if (schema._invalids) {
        desc.invalid = schema._invalids.describe();
    }

    // Rules

    for (const rule of schema._rules) {
        const ruleDef = def.rules[rule.name];
        if (ruleDef.manifest === false) {                           // Defaults to true
            continue;
        }

        const item = { name: rule.name };

        for (const custom in def.modifiers) {
            if (rule[custom] !== undefined) {
                item[custom] = internals.describe(rule[custom]);
            }
        }

        if (rule.args) {
            item.args = {};
            for (const key in rule.args) {
                const arg = rule.args[key];
                if (key === 'options' &&
                    !Object.keys(arg).length) {

                    continue;
                }

                item.args[key] = internals.describe(arg, { assign: key });
            }

            if (!Object.keys(item.args).length) {
                delete item.args;
            }
        }

        desc.rules.push(item);
    }

    if (!desc.rules.length) {
        delete desc.rules;
    }

    // Terms (must be last to verify no name conflicts)

    for (const term in schema.$_terms) {
        if (term[0] === '_') {
            continue;
        }

        Assert(!desc[term], 'Cannot describe schema due to internal name conflict with', term);

        const items = schema.$_terms[term];
        if (!items) {
            continue;
        }

        if (items instanceof Map) {
            if (items.size) {
                desc[term] = [...items.entries()];
            }

            continue;
        }

        if (Common.isValues(items)) {
            desc[term] = items.describe();
            continue;
        }

        Assert(def.terms[term], 'Term', term, 'missing configuration');
        const manifest = def.terms[term].manifest;
        const mapped = typeof manifest === 'object';
        if (!items.length &&
            !mapped) {

            continue;
        }

        const normalized = [];
        for (const item of items) {
            normalized.push(internals.describe(item));
        }

        // Mapped

        if (mapped) {
            const { from, to } = manifest.mapped;
            desc[term] = {};
            for (const item of normalized) {
                desc[term][item[to]] = item[from];
            }

            continue;
        }

        // Single

        if (manifest === 'single') {
            Assert(normalized.length === 1, 'Term', term, 'contains more than one item');
            desc[term] = normalized[0];
            continue;
        }

        // Array

        desc[term] = normalized;
    }

    internals.validate(schema.$_root, desc);
    return desc;
};


internals.describe = function (item, options = {}) {

    if (Array.isArray(item)) {
        return item.map(internals.describe);
    }

    if (item === Common.symbols.deepDefault) {
        return { special: 'deep' };
    }

    if (typeof item !== 'object' ||
        item === null) {

        return item;
    }

    if (options.assign === 'options') {
        return Clone(item);
    }

    if (Buffer && Buffer.isBuffer(item)) {                          // $lab:coverage:ignore$
        return { buffer: item.toString('binary') };
    }

    if (item instanceof Date) {
        return item.toISOString();
    }

    if (item instanceof Error) {
        return item;
    }

    if (item instanceof RegExp) {
        if (options.assign === 'regex') {
            return item.toString();
        }

        return { regex: item.toString() };
    }

    if (item[Common.symbols.literal]) {
        return { function: item.literal };
    }

    if (typeof item.describe === 'function') {
        if (options.assign === 'ref') {
            return item.describe().ref;
        }

        return item.describe();
    }

    const normalized = {};
    for (const key in item) {
        const value = item[key];
        if (value === undefined) {
            continue;
        }

        normalized[key] = internals.describe(value, { assign: key });
    }

    return normalized;
};


exports.build = function (joi, desc) {

    const builder = new internals.Builder(joi);
    return builder.parse(desc);
};


internals.Builder = class {

    constructor(joi) {

        this.joi = joi;
    }

    parse(desc) {

        internals.validate(this.joi, desc);

        // Type

        let schema = this.joi[desc.type]();
        const def = schema._definition;

        // Flags

        if (desc.flags) {
            for (const flag in desc.flags) {
                const setter = def.flags[flag] && def.flags[flag].setter || flag;
                Assert(typeof schema[setter] === 'function', 'Invalid flag', flag, 'for type', desc.type);
                schema = schema[setter](this.build(desc.flags[flag]));
            }
        }

        // Preferences

        if (desc.preferences) {
            schema = schema.preferences(this.build(desc.preferences));
        }

        // Allow / Invalid

        if (desc.allow) {
            schema = schema.allow(...this.build(desc.allow));
        }

        if (desc.invalid) {
            schema = schema.invalid(...this.build(desc.invalid));
        }

        // Rules

        if (desc.rules) {
            for (const rule of desc.rules) {
                Assert(typeof schema[rule.name] === 'function', 'Invalid rule', rule.name, 'for type', desc.type);

                const args = [];
                if (rule.args) {
                    const built = {};
                    for (const key in rule.args) {
                        built[key] = this.build(rule.args[key], { assign: key });
                    }

                    const keys = Object.keys(built);
                    const definition = def.rules[rule.name].args;
                    if (definition) {
                        Assert(keys.length <= definition.length, 'Invalid number of arguments for', desc.type, rule.name, '(expected up to', definition.length, ', found', keys.length, ')');
                        for (const { name } of definition) {
                            args.push(built[name]);
                        }
                    }
                    else {
                        Assert(keys.length === 1, 'Invalid number of arguments for', desc.type, rule.name, '(expected up to 1, found', keys.length, ')');
                        args.push(built[keys[0]]);
                    }
                }

                // Apply

                schema = schema[rule.name](...args);

                // Ruleset

                const options = {};
                for (const custom in def.modifiers) {
                    if (rule[custom] !== undefined) {
                        options[custom] = this.build(rule[custom]);
                    }
                }

                if (Object.keys(options).length) {
                    schema = schema.rule(options);
                }
            }
        }

        // Terms

        const terms = {};
        for (const key in desc) {
            if (['allow', 'flags', 'invalid', 'whens', 'preferences', 'rules', 'type'].includes(key)) {
                continue;
            }

            Assert(def.terms[key], 'Term', key, 'missing configuration');
            const manifest = def.terms[key].manifest;

            if (manifest === 'schema') {
                terms[key] = desc[key].map((item) => this.parse(item));
                continue;
            }

            if (manifest === 'values') {
                terms[key] = desc[key].map((item) => this.build(item));
                continue;
            }

            if (manifest === 'single') {
                terms[key] = this.build(desc[key]);
                continue;
            }

            if (typeof manifest === 'object') {
                terms[key] = {};
                for (const name in desc[key]) {
                    const value = desc[key][name];
                    terms[key][name] = this.parse(value);
                }

                continue;
            }

            terms[key] = this.build(desc[key]);
        }

        if (desc.whens) {
            terms.whens = desc.whens.map((when) => this.build(when));
        }

        schema = def.manifest.build(schema, terms);
        schema.$_temp.ruleset = false;
        return schema;
    }

    build(desc, options = {}) {

        if (desc === null) {
            return null;
        }

        if (Array.isArray(desc)) {
            return desc.map((item) => this.build(item));
        }

        if (desc instanceof Error) {
            return desc;
        }

        if (options.assign === 'options') {
            return Clone(desc);
        }

        if (options.assign === 'regex') {
            return internals.regex(desc);
        }

        if (options.assign === 'ref') {
            return Ref.build(desc);
        }

        if (typeof desc !== 'object') {
            return desc;
        }

        if (Object.keys(desc).length === 1) {
            if (desc.buffer) {
                Assert(Buffer, 'Buffers are not supported');
                return Buffer && Buffer.from(desc.buffer, 'binary');                    // $lab:coverage:ignore$
            }

            if (desc.function) {
                return { [Common.symbols.literal]: true, literal: desc.function };
            }

            if (desc.override) {
                return Common.symbols.override;
            }

            if (desc.ref) {
                return Ref.build(desc.ref);
            }

            if (desc.regex) {
                return internals.regex(desc.regex);
            }

            if (desc.special) {
                Assert(['deep'].includes(desc.special), 'Unknown special value', desc.special);
                return Common.symbols.deepDefault;
            }

            if (desc.value) {
                return Clone(desc.value);
            }
        }

        if (desc.type) {
            return this.parse(desc);
        }

        if (desc.template) {
            return Template.build(desc);
        }

        const normalized = {};
        for (const key in desc) {
            normalized[key] = this.build(desc[key], { assign: key });
        }

        return normalized;
    }
};


internals.regex = function (string) {

    const end = string.lastIndexOf('/');
    const exp = string.slice(1, end);
    const flags = string.slice(end + 1);
    return new RegExp(exp, flags);
};


internals.validate = function (joi, desc) {

    Schemas = Schemas || __webpack_require__(3723);

    joi.assert(desc, Schemas.description);
};


/***/ }),

/***/ 676:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);

const Template = __webpack_require__(5547);


const internals = {};


exports.compile = function (messages, target) {

    // Single value string ('plain error message', 'template {error} message')

    if (typeof messages === 'string') {
        Assert(!target, 'Cannot set single message string');
        return new Template(messages);
    }

    // Single value template

    if (Template.isTemplate(messages)) {
        Assert(!target, 'Cannot set single message template');
        return messages;
    }

    // By error code { 'number.min': <string | template> }

    Assert(typeof messages === 'object' && !Array.isArray(messages), 'Invalid message options');

    target = target ? Clone(target) : {};

    for (let code in messages) {
        const message = messages[code];

        if (code === 'root' ||
            Template.isTemplate(message)) {

            target[code] = message;
            continue;
        }

        if (typeof message === 'string') {
            target[code] = new Template(message);
            continue;
        }

        // By language { english: { 'number.min': <string | template> } }

        Assert(typeof message === 'object' && !Array.isArray(message), 'Invalid message for', code);

        const language = code;
        target[language] = target[language] || {};

        for (code in message) {
            const localized = message[code];

            if (code === 'root' ||
                Template.isTemplate(localized)) {

                target[language][code] = localized;
                continue;
            }

            Assert(typeof localized === 'string', 'Invalid message for', code, 'in', language);
            target[language][code] = new Template(localized);
        }
    }

    return target;
};


exports.decompile = function (messages) {

    // By error code { 'number.min': <string | template> }

    const target = {};
    for (let code in messages) {
        const message = messages[code];

        if (code === 'root') {
            target[code] = message;
            continue;
        }

        if (Template.isTemplate(message)) {
            target[code] = message.describe({ compact: true });
            continue;
        }

        // By language { english: { 'number.min': <string | template> } }

        const language = code;
        target[language] = {};

        for (code in message) {
            const localized = message[code];

            if (code === 'root') {
                target[language][code] = localized;
                continue;
            }

            target[language][code] = localized.describe({ compact: true });
        }
    }

    return target;
};


exports.merge = function (base, extended) {

    if (!base) {
        return exports.compile(extended);
    }

    if (!extended) {
        return base;
    }

    // Single value string

    if (typeof extended === 'string') {
        return new Template(extended);
    }

    // Single value template

    if (Template.isTemplate(extended)) {
        return extended;
    }

    // By error code { 'number.min': <string | template> }

    const target = Clone(base);

    for (let code in extended) {
        const message = extended[code];

        if (code === 'root' ||
            Template.isTemplate(message)) {

            target[code] = message;
            continue;
        }

        if (typeof message === 'string') {
            target[code] = new Template(message);
            continue;
        }

        // By language { english: { 'number.min': <string | template> } }

        Assert(typeof message === 'object' && !Array.isArray(message), 'Invalid message for', code);

        const language = code;
        target[language] = target[language] || {};

        for (code in message) {
            const localized = message[code];

            if (code === 'root' ||
                Template.isTemplate(localized)) {

                target[language][code] = localized;
                continue;
            }

            Assert(typeof localized === 'string', 'Invalid message for', code, 'in', language);
            target[language][code] = new Template(localized);
        }
    }

    return target;
};


/***/ }),

/***/ 4462:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Common = __webpack_require__(3221);
const Ref = __webpack_require__(1802);


const internals = {};



exports.Ids = internals.Ids = class {

    constructor() {

        this._byId = new Map();
        this._byKey = new Map();
        this._schemaChain = false;
    }

    clone() {

        const clone = new internals.Ids();
        clone._byId = new Map(this._byId);
        clone._byKey = new Map(this._byKey);
        clone._schemaChain = this._schemaChain;
        return clone;
    }

    concat(source) {

        if (source._schemaChain) {
            this._schemaChain = true;
        }

        for (const [id, value] of source._byId.entries()) {
            Assert(!this._byKey.has(id), 'Schema id conflicts with existing key:', id);
            this._byId.set(id, value);
        }

        for (const [key, value] of source._byKey.entries()) {
            Assert(!this._byId.has(key), 'Schema key conflicts with existing id:', key);
            this._byKey.set(key, value);
        }
    }

    fork(path, adjuster, root) {

        const chain = this._collect(path);
        chain.push({ schema: root });
        const tail = chain.shift();
        let adjusted = { id: tail.id, schema: adjuster(tail.schema) };

        Assert(Common.isSchema(adjusted.schema), 'adjuster function failed to return a joi schema type');

        for (const node of chain) {
            adjusted = { id: node.id, schema: internals.fork(node.schema, adjusted.id, adjusted.schema) };
        }

        return adjusted.schema;
    }

    labels(path, behind = []) {

        const current = path[0];
        const node = this._get(current);
        if (!node) {
            return [...behind, ...path].join('.');
        }

        const forward = path.slice(1);
        behind = [...behind, node.schema._flags.label || current];
        if (!forward.length) {
            return behind.join('.');
        }

        return node.schema._ids.labels(forward, behind);
    }

    reach(path, behind = []) {

        const current = path[0];
        const node = this._get(current);
        Assert(node, 'Schema does not contain path', [...behind, ...path].join('.'));

        const forward = path.slice(1);
        if (!forward.length) {
            return node.schema;
        }

        return node.schema._ids.reach(forward, [...behind, current]);
    }

    register(schema, { key } = {}) {

        if (!schema ||
            !Common.isSchema(schema)) {

            return;
        }

        if (schema.$_property('schemaChain') ||
            schema._ids._schemaChain) {

            this._schemaChain = true;
        }

        const id = schema._flags.id;
        if (id) {
            const existing = this._byId.get(id);
            Assert(!existing || existing.schema === schema, 'Cannot add different schemas with the same id:', id);
            Assert(!this._byKey.has(id), 'Schema id conflicts with existing key:', id);

            this._byId.set(id, { schema, id });
        }

        if (key) {
            Assert(!this._byKey.has(key), 'Schema already contains key:', key);
            Assert(!this._byId.has(key), 'Schema key conflicts with existing id:', key);

            this._byKey.set(key, { schema, id: key });
        }
    }

    reset() {

        this._byId = new Map();
        this._byKey = new Map();
        this._schemaChain = false;
    }

    _collect(path, behind = [], nodes = []) {

        const current = path[0];
        const node = this._get(current);
        Assert(node, 'Schema does not contain path', [...behind, ...path].join('.'));

        nodes = [node, ...nodes];

        const forward = path.slice(1);
        if (!forward.length) {
            return nodes;
        }

        return node.schema._ids._collect(forward, [...behind, current], nodes);
    }

    _get(id) {

        return this._byId.get(id) || this._byKey.get(id);
    }
};


internals.fork = function (schema, id, replacement) {

    const each = (item, { key }) => {

        if (id === (item._flags.id || key)) {
            return replacement;
        }
    };

    const obj = exports.schema(schema, { each, ref: false });
    return obj.$_mutateRebuild();
};


exports.schema = function (schema, options) {

    let obj;

    for (const name in schema._flags) {
        if (name[0] === '_') {
            continue;
        }

        const result = internals.scan(schema._flags[name], { source: 'flags', name }, options);
        if (result !== undefined) {
            obj = obj || schema.clone();
            obj._flags[name] = result;
        }
    }

    for (let i = 0; i < schema._rules.length; ++i) {
        const rule = schema._rules[i];
        const result = internals.scan(rule.args, { source: 'rules', name: rule.name }, options);
        if (result !== undefined) {
            obj = obj || schema.clone();
            const clone = Object.assign({}, rule);
            clone.args = result;
            obj._rules[i] = clone;

            const existingUnique = obj._singleRules.get(rule.name);
            if (existingUnique === rule) {
                obj._singleRules.set(rule.name, clone);
            }
        }
    }

    for (const name in schema.$_terms) {
        if (name[0] === '_') {
            continue;
        }

        const result = internals.scan(schema.$_terms[name], { source: 'terms', name }, options);
        if (result !== undefined) {
            obj = obj || schema.clone();
            obj.$_terms[name] = result;
        }
    }

    return obj;
};


internals.scan = function (item, source, options, _path, _key) {

    const path = _path || [];

    if (item === null ||
        typeof item !== 'object') {

        return;
    }

    let clone;

    if (Array.isArray(item)) {
        for (let i = 0; i < item.length; ++i) {
            const key = source.source === 'terms' && source.name === 'keys' && item[i].key;
            const result = internals.scan(item[i], source, options, [i, ...path], key);
            if (result !== undefined) {
                clone = clone || item.slice();
                clone[i] = result;
            }
        }

        return clone;
    }

    if (options.schema !== false && Common.isSchema(item) ||
        options.ref !== false && Ref.isRef(item)) {

        const result = options.each(item, { ...source, path, key: _key });
        if (result === item) {
            return;
        }

        return result;
    }

    for (const key in item) {
        if (key[0] === '_') {
            continue;
        }

        const result = internals.scan(item[key], source, options, [key, ...path], _key);
        if (result !== undefined) {
            clone = clone || Object.assign({}, item);
            clone[key] = result;
        }
    }

    return clone;
};


/***/ }),

/***/ 1802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);
const Reach = __webpack_require__(8891);

const Common = __webpack_require__(3221);

let Template;


const internals = {
    symbol: Symbol('ref'),      // Used to internally identify references (shared with other joi versions)
    defaults: {
        adjust: null,
        in: false,
        iterables: null,
        map: null,
        separator: '.',
        type: 'value'
    }
};


exports.create = function (key, options = {}) {

    Assert(typeof key === 'string', 'Invalid reference key:', key);
    Common.assertOptions(options, ['adjust', 'ancestor', 'in', 'iterables', 'map', 'prefix', 'separator']);
    Assert(!options.prefix || typeof options.prefix === 'object', 'options.prefix must be of type object');

    const ref = Object.assign({}, internals.defaults, options);
    delete ref.prefix;

    const separator = ref.separator;
    const context = internals.context(key, separator, options.prefix);
    ref.type = context.type;
    key = context.key;

    if (ref.type === 'value') {
        if (context.root) {
            Assert(!separator || key[0] !== separator, 'Cannot specify relative path with root prefix');
            ref.ancestor = 'root';
            if (!key) {
                key = null;
            }
        }

        if (separator &&
            separator === key) {

            key = null;
            ref.ancestor = 0;
        }
        else {
            if (ref.ancestor !== undefined) {
                Assert(!separator || !key || key[0] !== separator, 'Cannot combine prefix with ancestor option');
            }
            else {
                const [ancestor, slice] = internals.ancestor(key, separator);
                if (slice) {
                    key = key.slice(slice);
                    if (key === '') {
                        key = null;
                    }
                }

                ref.ancestor = ancestor;
            }
        }
    }

    ref.path = separator ? (key === null ? [] : key.split(separator)) : [key];

    return new internals.Ref(ref);
};


exports.in = function (key, options = {}) {

    return exports.create(key, Object.assign({}, options, { in: true }));
};


exports.isRef = function (ref) {

    return ref ? !!ref[Common.symbols.ref] : false;
};


internals.Ref = class {

    constructor(options) {

        Assert(typeof options === 'object', 'Invalid reference construction');
        Common.assertOptions(options, [
            'adjust', 'ancestor', 'in', 'iterables', 'map', 'path', 'separator', 'type',    // Copied
            'depth', 'key', 'root', 'display'                                               // Overridden
        ]);

        Assert([false, undefined].includes(options.separator) || typeof options.separator === 'string' && options.separator.length === 1, 'Invalid separator');
        Assert(!options.adjust || typeof options.adjust === 'function', 'options.adjust must be a function');
        Assert(!options.map || Array.isArray(options.map), 'options.map must be an array');
        Assert(!options.map || !options.adjust, 'Cannot set both map and adjust options');

        Object.assign(this, internals.defaults, options);

        Assert(this.type === 'value' || this.ancestor === undefined, 'Non-value references cannot reference ancestors');

        if (Array.isArray(this.map)) {
            this.map = new Map(this.map);
        }

        this.depth = this.path.length;
        this.key = this.path.length ? this.path.join(this.separator) : null;
        this.root = this.path[0];

        this.updateDisplay();
    }

    resolve(value, state, prefs, local, options = {}) {

        Assert(!this.in || options.in, 'Invalid in() reference usage');

        if (this.type === 'global') {
            return this._resolve(prefs.context, state, options);
        }

        if (this.type === 'local') {
            return this._resolve(local, state, options);
        }

        if (!this.ancestor) {
            return this._resolve(value, state, options);
        }

        if (this.ancestor === 'root') {
            return this._resolve(state.ancestors[state.ancestors.length - 1], state, options);
        }

        Assert(this.ancestor <= state.ancestors.length, 'Invalid reference exceeds the schema root:', this.display);
        return this._resolve(state.ancestors[this.ancestor - 1], state, options);
    }

    _resolve(target, state, options) {

        let resolved;

        if (this.type === 'value' &&
            state.mainstay.shadow &&
            options.shadow !== false) {

            resolved = state.mainstay.shadow.get(this.absolute(state));
        }

        if (resolved === undefined) {
            resolved = Reach(target, this.path, { iterables: this.iterables, functions: true });
        }

        if (this.adjust) {
            resolved = this.adjust(resolved);
        }

        if (this.map) {
            const mapped = this.map.get(resolved);
            if (mapped !== undefined) {
                resolved = mapped;
            }
        }

        if (state.mainstay) {
            state.mainstay.tracer.resolve(state, this, resolved);
        }

        return resolved;
    }

    toString() {

        return this.display;
    }

    absolute(state) {

        return [...state.path.slice(0, -this.ancestor), ...this.path];
    }

    clone() {

        return new internals.Ref(this);
    }

    describe() {

        const ref = { path: this.path };

        if (this.type !== 'value') {
            ref.type = this.type;
        }

        if (this.separator !== '.') {
            ref.separator = this.separator;
        }

        if (this.type === 'value' &&
            this.ancestor !== 1) {

            ref.ancestor = this.ancestor;
        }

        if (this.map) {
            ref.map = [...this.map];
        }

        for (const key of ['adjust', 'iterables']) {
            if (this[key] !== null) {
                ref[key] = this[key];
            }
        }

        if (this.in !== false) {
            ref.in = true;
        }

        return { ref };
    }

    updateDisplay() {

        const key = this.key !== null ? this.key : '';
        if (this.type !== 'value') {
            this.display = `ref:${this.type}:${key}`;
            return;
        }

        if (!this.separator) {
            this.display = `ref:${key}`;
            return;
        }

        if (!this.ancestor) {
            this.display = `ref:${this.separator}${key}`;
            return;
        }

        if (this.ancestor === 'root') {
            this.display = `ref:root:${key}`;
            return;
        }

        if (this.ancestor === 1) {
            this.display = `ref:${key || '..'}`;
            return;
        }

        const lead = new Array(this.ancestor + 1).fill(this.separator).join('');
        this.display = `ref:${lead}${key || ''}`;
    }
};


internals.Ref.prototype[Common.symbols.ref] = true;


exports.build = function (desc) {

    desc = Object.assign({}, internals.defaults, desc);
    if (desc.type === 'value' &&
        desc.ancestor === undefined) {

        desc.ancestor = 1;
    }

    return new internals.Ref(desc);
};


internals.context = function (key, separator, prefix = {}) {

    key = key.trim();

    if (prefix) {
        const globalp = prefix.global === undefined ? '$' : prefix.global;
        if (globalp !== separator &&
            key.startsWith(globalp)) {

            return { key: key.slice(globalp.length), type: 'global' };
        }

        const local = prefix.local === undefined ? '#' : prefix.local;
        if (local !== separator &&
            key.startsWith(local)) {

            return { key: key.slice(local.length), type: 'local' };
        }

        const root = prefix.root === undefined ? '/' : prefix.root;
        if (root !== separator &&
            key.startsWith(root)) {

            return { key: key.slice(root.length), type: 'value', root: true };
        }
    }

    return { key, type: 'value' };
};


internals.ancestor = function (key, separator) {

    if (!separator) {
        return [1, 0];              // 'a_b' -> 1 (parent)
    }

    if (key[0] !== separator) {     // 'a.b' -> 1 (parent)
        return [1, 0];
    }

    if (key[1] !== separator) {     // '.a.b' -> 0 (self)
        return [0, 1];
    }

    let i = 2;
    while (key[i] === separator) {
        ++i;
    }

    return [i - 1, i];              // '...a.b.' -> 2 (grandparent)
};


exports.toSibling = 0;

exports.toParent = 1;


exports.Manager = class {

    constructor() {

        this.refs = [];                     // 0: [self refs], 1: [parent refs], 2: [grandparent refs], ...
    }

    register(source, target) {

        if (!source) {
            return;
        }

        target = target === undefined ? exports.toParent : target;

        // Array

        if (Array.isArray(source)) {
            for (const ref of source) {
                this.register(ref, target);
            }

            return;
        }

        // Schema

        if (Common.isSchema(source)) {
            for (const item of source._refs.refs) {
                if (item.ancestor - target >= 0) {
                    this.refs.push({ ancestor: item.ancestor - target, root: item.root });
                }
            }

            return;
        }

        // Reference

        if (exports.isRef(source) &&
            source.type === 'value' &&
            source.ancestor - target >= 0) {

            this.refs.push({ ancestor: source.ancestor - target, root: source.root });
        }

        // Template

        Template = Template || __webpack_require__(5547);

        if (Template.isTemplate(source)) {
            this.register(source.refs(), target);
        }
    }

    get length() {

        return this.refs.length;
    }

    clone() {

        const copy = new exports.Manager();
        copy.refs = Clone(this.refs);
        return copy;
    }

    reset() {

        this.refs = [];
    }

    roots() {

        return this.refs.filter((ref) => !ref.ancestor).map((ref) => ref.root);
    }
};


/***/ }),

/***/ 3723:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Joi = __webpack_require__(4010);


const internals = {};


// Preferences

exports.preferences = Joi.object({
    allowUnknown: Joi.boolean(),
    abortEarly: Joi.boolean(),
    cache: Joi.boolean(),
    context: Joi.object(),
    convert: Joi.boolean(),
    dateFormat: Joi.valid('date', 'iso', 'string', 'time', 'utc'),
    debug: Joi.boolean(),
    errors: {
        escapeHtml: Joi.boolean(),
        label: Joi.valid('path', 'key', false),
        language: [
            Joi.string(),
            Joi.object().ref()
        ],
        render: Joi.boolean(),
        stack: Joi.boolean(),
        wrapArrays: Joi.boolean()
    },
    externals: Joi.boolean(),
    messages: Joi.object(),
    noDefaults: Joi.boolean(),
    nonEnumerables: Joi.boolean(),
    presence: Joi.valid('required', 'optional', 'forbidden'),
    skipFunctions: Joi.boolean(),
    stripUnknown: Joi.object({
        arrays: Joi.boolean(),
        objects: Joi.boolean()
    })
        .or('arrays', 'objects')
        .allow(true, false),
    warnings: Joi.boolean()
})
    .strict();


// Extensions

internals.nameRx = /^[a-zA-Z0-9]+$/;


internals.rule = Joi.object({
    alias: Joi.array().items(Joi.string().pattern(internals.nameRx)).single(),
    args: Joi.array().items(
        Joi.string(),
        Joi.object({
            name: Joi.string().pattern(internals.nameRx).required(),
            ref: Joi.boolean(),
            assert: Joi.alternatives([
                Joi.function(),
                Joi.object().schema()
            ])
                .conditional('ref', { is: true, then: Joi.required() }),
            normalize: Joi.function(),
            message: Joi.string().when('assert', { is: Joi.function(), then: Joi.required() })
        })
    ),
    convert: Joi.boolean(),
    manifest: Joi.boolean(),
    method: Joi.function().allow(false),
    multi: Joi.boolean(),
    validate: Joi.function()
});


exports.extension = Joi.object({
    type: Joi.string().required(),

    args: Joi.function(),
    base: Joi.object().schema(),
    coerce: [
        Joi.function().maxArity(3),
        Joi.object({ method: Joi.function().maxArity(3).required(), from: Joi.array().items(Joi.string()).single() })
    ],
    flags: Joi.object().pattern(internals.nameRx, Joi.object({
        setter: Joi.string(),
        default: Joi.any()
    })),
    manifest: {
        build: Joi.function().arity(2)
    },
    messages: [Joi.object(), Joi.string()],
    modifiers: Joi.object().pattern(internals.nameRx, Joi.function().minArity(1).maxArity(2)),
    overrides: Joi.object().pattern(internals.nameRx, Joi.function()),
    prepare: Joi.function().maxArity(3),
    rebuild: Joi.function().arity(1),
    rules: Joi.object().pattern(internals.nameRx, internals.rule),
    terms: Joi.object().pattern(internals.nameRx, Joi.object({
        init: Joi.array().allow(null).required(),
        manifest: Joi.object().pattern(/.+/, [
            Joi.valid('schema', 'single'),
            Joi.object({
                mapped: Joi.object({
                    from: Joi.string().required(),
                    to: Joi.string().required()
                })
                    .required()
            })
        ])
    })),
    validate: Joi.function().maxArity(3)
})
    .strict();


exports.extensions = Joi.array().items(Joi.object(), Joi.function().arity(1)).strict();


// Manifest

internals.desc = {

    buffer: Joi.object({
        buffer: Joi.string()
    }),

    func: Joi.object({
        function: Joi.function().required(),
        options: {
            literal: true
        }
    }),

    override: Joi.object({
        override: true
    }),

    ref: Joi.object({
        ref: Joi.object({
            type: Joi.valid('value', 'global', 'local'),
            path: Joi.array().required(),
            separator: Joi.string().length(1).allow(false),
            ancestor: Joi.number().min(0).integer().allow('root'),
            map: Joi.array().items(Joi.array().length(2)).min(1),
            adjust: Joi.function(),
            iterables: Joi.boolean(),
            in: Joi.boolean()
        })
            .required()
    }),

    regex: Joi.object({
        regex: Joi.string().min(3)
    }),

    special: Joi.object({
        special: Joi.valid('deep').required()
    }),

    template: Joi.object({
        template: Joi.string().required(),
        options: Joi.object()
    }),

    value: Joi.object({
        value: Joi.alternatives([Joi.object(), Joi.array()]).required()
    })
};


internals.desc.entity = Joi.alternatives([
    Joi.array().items(Joi.link('...')),
    Joi.boolean(),
    Joi.function(),
    Joi.number(),
    Joi.string(),
    internals.desc.buffer,
    internals.desc.func,
    internals.desc.ref,
    internals.desc.regex,
    internals.desc.special,
    internals.desc.template,
    internals.desc.value,
    Joi.link('/')
]);


internals.desc.values = Joi.array()
    .items(
        null,
        Joi.boolean(),
        Joi.function(),
        Joi.number().allow(Infinity, -Infinity),
        Joi.string().allow(''),
        Joi.symbol(),
        internals.desc.buffer,
        internals.desc.func,
        internals.desc.override,
        internals.desc.ref,
        internals.desc.regex,
        internals.desc.template,
        internals.desc.value
    );


internals.desc.messages = Joi.object()
    .pattern(/.+/, [
        Joi.string(),
        internals.desc.template,
        Joi.object().pattern(/.+/, [Joi.string(), internals.desc.template])
    ]);


exports.description = Joi.object({
    type: Joi.string().required(),
    flags: Joi.object({
        cast: Joi.string(),
        default: Joi.any(),
        description: Joi.string(),
        empty: Joi.link('/'),
        failover: internals.desc.entity,
        id: Joi.string(),
        label: Joi.string(),
        only: true,
        presence: ['optional', 'required', 'forbidden'],
        result: ['raw', 'strip'],
        strip: Joi.boolean(),
        unit: Joi.string()
    })
        .unknown(),
    preferences: {
        allowUnknown: Joi.boolean(),
        abortEarly: Joi.boolean(),
        cache: Joi.boolean(),
        convert: Joi.boolean(),
        dateFormat: ['date', 'iso', 'string', 'time', 'utc'],
        errors: {
            escapeHtml: Joi.boolean(),
            label: ['path', 'key'],
            language: [
                Joi.string(),
                internals.desc.ref
            ],
            wrapArrays: Joi.boolean()
        },
        externals: Joi.boolean(),
        messages: internals.desc.messages,
        noDefaults: Joi.boolean(),
        nonEnumerables: Joi.boolean(),
        presence: ['required', 'optional', 'forbidden'],
        skipFunctions: Joi.boolean(),
        stripUnknown: Joi.object({
            arrays: Joi.boolean(),
            objects: Joi.boolean()
        })
            .or('arrays', 'objects')
            .allow(true, false),
        warnings: Joi.boolean()
    },
    allow: internals.desc.values,
    invalid: internals.desc.values,
    rules: Joi.array().min(1).items({
        name: Joi.string().required(),
        args: Joi.object().min(1),
        keep: Joi.boolean(),
        message: [
            Joi.string(),
            internals.desc.messages
        ],
        warn: Joi.boolean()
    }),

    // Terms

    keys: Joi.object().pattern(/.*/, Joi.link('/')),
    link: internals.desc.ref
})
    .pattern(/^[a-z]\w*$/, Joi.any());


/***/ }),

/***/ 9856:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Clone = __webpack_require__(5578);
const Reach = __webpack_require__(8891);

const Common = __webpack_require__(3221);


const internals = {
    value: Symbol('value')
};


module.exports = internals.State = class {

    constructor(path, ancestors, state) {

        this.path = path;
        this.ancestors = ancestors;                 // [parent, ..., root]

        this.mainstay = state.mainstay;
        this.schemas = state.schemas;               // [current, ..., root]
        this.debug = null;
    }

    localize(path, ancestors = null, schema = null) {

        const state = new internals.State(path, ancestors, this);

        if (schema &&
            state.schemas) {

            state.schemas = [internals.schemas(schema), ...state.schemas];
        }

        return state;
    }

    nest(schema, debug) {

        const state = new internals.State(this.path, this.ancestors, this);
        state.schemas = state.schemas && [internals.schemas(schema), ...state.schemas];
        state.debug = debug;
        return state;
    }

    shadow(value, reason) {

        this.mainstay.shadow = this.mainstay.shadow || new internals.Shadow();
        this.mainstay.shadow.set(this.path, value, reason);
    }

    snapshot() {

        if (this.mainstay.shadow) {
            this._snapshot = Clone(this.mainstay.shadow.node(this.path));
        }
    }

    restore() {

        if (this.mainstay.shadow) {
            this.mainstay.shadow.override(this.path, this._snapshot);
            this._snapshot = undefined;
        }
    }
};


internals.schemas = function (schema) {

    if (Common.isSchema(schema)) {
        return { schema };
    }

    return schema;
};


internals.Shadow = class {

    constructor() {

        this._values = null;
    }

    set(path, value, reason) {

        if (!path.length) {                                     // No need to store root value
            return;
        }

        if (reason === 'strip' &&
            typeof path[path.length - 1] === 'number') {        // Cannot store stripped array values (due to shift)

            return;
        }

        this._values = this._values || new Map();

        let node = this._values;
        for (let i = 0; i < path.length; ++i) {
            const segment = path[i];
            let next = node.get(segment);
            if (!next) {
                next = new Map();
                node.set(segment, next);
            }

            node = next;
        }

        node[internals.value] = value;
    }

    get(path) {

        const node = this.node(path);
        if (node) {
            return node[internals.value];
        }
    }

    node(path) {

        if (!this._values) {
            return;
        }

        return Reach(this._values, path, { iterables: true });
    }

    override(path, node) {

        if (!this._values) {
            return;
        }

        const parents = path.slice(0, -1);
        const own = path[path.length - 1];
        const parent = Reach(this._values, parents, { iterables: true });

        if (node) {
            parent.set(own, node);
            return;
        }

        if (parent) {
            parent.delete(own);
        }
    }
};


/***/ }),

/***/ 5547:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);
const EscapeHtml = __webpack_require__(4752);
const Formula = __webpack_require__(1991);

const Common = __webpack_require__(3221);
const Errors = __webpack_require__(2150);
const Ref = __webpack_require__(1802);


const internals = {
    symbol: Symbol('template'),

    opens: new Array(1000).join('\u0000'),
    closes: new Array(1000).join('\u0001'),

    dateFormat: {
        date: Date.prototype.toDateString,
        iso: Date.prototype.toISOString,
        string: Date.prototype.toString,
        time: Date.prototype.toTimeString,
        utc: Date.prototype.toUTCString
    }
};


module.exports = exports = internals.Template = class {

    constructor(source, options) {

        Assert(typeof source === 'string', 'Template source must be a string');
        Assert(!source.includes('\u0000') && !source.includes('\u0001'), 'Template source cannot contain reserved control characters');

        this.source = source;
        this.rendered = source;

        this._template = null;
        this._settings = Clone(options);

        this._parse();
    }

    _parse() {

        // 'text {raw} {{ref}} \\{{ignore}} {{ignore\\}} {{ignore {{ignore}'

        if (!this.source.includes('{')) {
            return;
        }

        // Encode escaped \\{{{{{

        const encoded = internals.encode(this.source);

        // Split on first { in each set

        const parts = internals.split(encoded);

        // Process parts

        let refs = false;
        const processed = [];
        const head = parts.shift();
        if (head) {
            processed.push(head);
        }

        for (const part of parts) {
            const raw = part[0] !== '{';
            const ender = raw ? '}' : '}}';
            const end = part.indexOf(ender);
            if (end === -1 ||                               // Ignore non-matching closing
                part[1] === '{') {                          // Ignore more than two {

                processed.push(`{${internals.decode(part)}`);
                continue;
            }

            const variable = part.slice(raw ? 0 : 1, end);
            const dynamic = this._ref(internals.decode(variable), raw);
            processed.push(dynamic);
            if (typeof dynamic !== 'string') {
                refs = true;
            }

            const rest = part.slice(end + ender.length);
            if (rest) {
                processed.push(internals.decode(rest));
            }
        }

        if (!refs) {
            this.rendered = processed.join('');
            return;
        }

        this._template = processed;
    }

    static date(date, prefs) {

        return internals.dateFormat[prefs.dateFormat].call(date);
    }

    describe(options = {}) {

        if (!this._settings &&
            options.compact) {

            return this.source;
        }

        const desc = { template: this.source };
        if (this._settings) {
            desc.options = this._settings;
        }

        return desc;
    }

    static build(desc) {

        return new internals.Template(desc.template, desc.options);
    }

    isDynamic() {

        return !!this._template;
    }

    static isTemplate(template) {

        return template ? !!template[Common.symbols.template] : false;
    }

    refs() {

        if (!this._template) {
            return;
        }

        const refs = [];
        for (const part of this._template) {
            if (typeof part !== 'string') {
                refs.push(...part.refs);
            }
        }

        return refs;
    }

    resolve(value, state, prefs, local) {

        if (this._template &&
            this._template.length === 1) {

            return this._part(this._template[0], /* context -> [*/ value, state, prefs, local, {} /*] */);
        }

        return this.render(value, state, prefs, local);
    }

    _part(part, ...args) {

        if (part.ref) {
            return part.ref.resolve(...args);
        }

        return part.formula.evaluate(args);
    }

    render(value, state, prefs, local, options = {}) {

        if (!this.isDynamic()) {
            return this.rendered;
        }

        const parts = [];
        for (const part of this._template) {
            if (typeof part === 'string') {
                parts.push(part);
            }
            else {
                const rendered = this._part(part, /* context -> [*/ value, state, prefs, local, options /*] */);
                const string = internals.stringify(rendered, prefs, options.errors);
                if (string !== undefined) {
                    const result = part.raw || (options.errors && options.errors.escapeHtml) === false ? string : EscapeHtml(string);
                    parts.push(result);
                }
            }
        }

        return parts.join('');
    }

    _ref(content, raw) {

        const refs = [];
        const reference = (variable) => {

            const ref = Ref.create(variable, this._settings);
            refs.push(ref);
            return (context) => ref.resolve(...context);
        };

        try {
            var formula = new Formula(content, { reference, functions: internals.functions, constants: internals.constants });
        }
        catch (err) {
            err.message = `Invalid template variable "${content}" fails due to: ${err.message}`;
            throw err;
        }

        if (formula.single) {
            if (formula.single.type === 'reference') {
                return { ref: refs[0], raw, refs };
            }

            return internals.stringify(formula.single.value);
        }

        return { formula, raw, refs };
    }

    toString() {

        return this.source;
    }
};


internals.Template.prototype[Common.symbols.template] = true;
internals.Template.prototype.isImmutable = true;                // Prevents Hoek from deep cloning schema objects


internals.encode = function (string) {

    return string
        .replace(/\\(\{+)/g, ($0, $1) => {

            return internals.opens.slice(0, $1.length);
        })
        .replace(/\\(\}+)/g, ($0, $1) => {

            return internals.closes.slice(0, $1.length);
        });
};


internals.decode = function (string) {

    return string
        .replace(/\u0000/g, '{')
        .replace(/\u0001/g, '}');
};


internals.split = function (string) {

    const parts = [];
    let current = '';

    for (let i = 0; i < string.length; ++i) {
        const char = string[i];

        if (char === '{') {
            let next = '';
            while (i + 1 < string.length &&
                string[i + 1] === '{') {

                next += '{';
                ++i;
            }

            parts.push(current);
            current = next;
        }
        else {
            current += char;
        }
    }

    parts.push(current);
    return parts;
};


internals.stringify = function (value, prefs, options) {

    const type = typeof value;

    if (value === null) {
        return 'null';
    }

    if (type === 'string') {
        return value;
    }

    if (type === 'number' ||
        type === 'function' ||
        type === 'symbol') {

        return value.toString();
    }

    if (type !== 'object') {
        return JSON.stringify(value);
    }

    if (value instanceof Date) {
        return internals.Template.date(value, prefs);
    }

    if (value instanceof Map) {
        const pairs = [];
        for (const [key, sym] of value.entries()) {
            pairs.push(`${key.toString()} -> ${sym.toString()}`);
        }

        value = pairs;
    }

    if (!Array.isArray(value)) {
        return value.toString();
    }

    let partial = '';
    for (const item of value) {
        partial = partial + (partial.length ? ', ' : '') + internals.stringify(item, prefs, options);
    }

    return options.wrapArrays ? '[' + partial + ']' : partial;
};


internals.constants = {

    true: true,
    false: false,
    null: null,

    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000
};


internals.functions = {

    if(condition, then, otherwise) {

        return condition ? then : otherwise;
    },

    msg(code) {

        const [value, state, prefs, local, options] = this;
        const messages = options.messages;
        if (!messages) {
            return '';
        }

        const template = Errors.template(value, messages[0], code, state, prefs) || Errors.template(value, messages[1], code, state, prefs);
        if (!template) {
            return '';
        }

        return template.render(value, state, prefs, local, options);
    },

    number(value) {

        if (typeof value === 'number') {
            return value;
        }

        if (typeof value === 'string') {
            return parseFloat(value);
        }

        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }

        if (value instanceof Date) {
            return value.getTime();
        }

        return null;
    }
};


/***/ }),

/***/ 121:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const DeepEqual = __webpack_require__(5801);
const Pinpoint = __webpack_require__(989);

const Errors = __webpack_require__(2150);


const internals = {
    codes: {
        error: 1,
        pass: 2,
        full: 3
    },
    labels: {
        0: 'never used',
        1: 'always error',
        2: 'always pass'
    }
};


exports.setup = function (root) {

    const trace = function () {

        root._tracer = root._tracer || new internals.Tracer();
        return root._tracer;
    };

    root.trace = trace;
    root[Symbol.for('@hapi/lab/coverage/initialize')] = trace;

    root.untrace = () => {

        root._tracer = null;
    };
};


exports.location = function (schema) {

    return schema.$_setFlag('_tracerLocation', Pinpoint.location(2));                       // base.tracer(), caller
};


internals.Tracer = class {

    constructor() {

        this.name = 'Joi';
        this._schemas = new Map();
    }

    _register(schema) {

        const existing = this._schemas.get(schema);
        if (existing) {
            return existing.store;
        }

        const store = new internals.Store(schema);
        const { filename, line } = schema._flags._tracerLocation || Pinpoint.location(5);   // internals.tracer(), internals.entry(), exports.entry(), validate(), caller
        this._schemas.set(schema, { filename, line, store });
        return store;
    }

    _combine(merged, sources) {

        for (const { store } of this._schemas.values()) {
            store._combine(merged, sources);
        }
    }

    report(file) {

        const coverage = [];

        // Process each registered schema

        for (const { filename, line, store } of this._schemas.values()) {
            if (file &&
                file !== filename) {

                continue;
            }

            // Process sub schemas of the registered root

            const missing = [];
            const skipped = [];

            for (const [schema, log] of store._sources.entries()) {

                // Check if sub schema parent skipped

                if (internals.sub(log.paths, skipped)) {
                    continue;
                }

                // Check if sub schema reached

                if (!log.entry) {
                    missing.push({
                        status: 'never reached',
                        paths: [...log.paths]
                    });

                    skipped.push(...log.paths);
                    continue;
                }

                // Check values

                for (const type of ['valid', 'invalid']) {
                    const set = schema[`_${type}s`];
                    if (!set) {
                        continue;
                    }

                    const values = new Set(set._values);
                    const refs = new Set(set._refs);
                    for (const { value, ref } of log[type]) {
                        values.delete(value);
                        refs.delete(ref);
                    }

                    if (values.size ||
                        refs.size) {

                        missing.push({
                            status: [...values, ...[...refs].map((ref) => ref.display)],
                            rule: `${type}s`
                        });
                    }
                }

                // Check rules status

                const rules = schema._rules.map((rule) => rule.name);
                for (const type of ['default', 'failover']) {
                    if (schema._flags[type] !== undefined) {
                        rules.push(type);
                    }
                }

                for (const name of rules) {
                    const status = internals.labels[log.rule[name] || 0];
                    if (status) {
                        const report = { rule: name, status };
                        if (log.paths.size) {
                            report.paths = [...log.paths];
                        }

                        missing.push(report);
                    }
                }
            }

            if (missing.length) {
                coverage.push({
                    filename,
                    line,
                    missing,
                    severity: 'error',
                    message: `Schema missing tests for ${missing.map(internals.message).join(', ')}`
                });
            }
        }

        return coverage.length ? coverage : null;
    }
};


internals.Store = class {

    constructor(schema) {

        this.active = true;
        this._sources = new Map();          // schema -> { paths, entry, rule, valid, invalid }
        this._combos = new Map();           // merged -> [sources]
        this._scan(schema);
    }

    debug(state, source, name, result) {

        state.mainstay.debug && state.mainstay.debug.push({ type: source, name, result, path: state.path });
    }

    entry(schema, state) {

        internals.debug(state, { type: 'entry' });

        this._record(schema, (log) => {

            log.entry = true;
        });
    }

    filter(schema, state, source, value) {

        internals.debug(state, { type: source, ...value });

        this._record(schema, (log) => {

            log[source].add(value);
        });
    }

    log(schema, state, source, name, result) {

        internals.debug(state, { type: source, name, result: result === 'full' ? 'pass' : result });

        this._record(schema, (log) => {

            log[source][name] = log[source][name] || 0;
            log[source][name] |= internals.codes[result];
        });
    }

    resolve(state, ref, to) {

        if (!state.mainstay.debug) {
            return;
        }

        const log = { type: 'resolve', ref: ref.display, to, path: state.path };
        state.mainstay.debug.push(log);
    }

    value(state, by, from, to, name) {

        if (!state.mainstay.debug ||
            DeepEqual(from, to)) {

            return;
        }

        const log = { type: 'value', by, from, to, path: state.path };
        if (name) {
            log.name = name;
        }

        state.mainstay.debug.push(log);
    }

    _record(schema, each) {

        const log = this._sources.get(schema);
        if (log) {
            each(log);
            return;
        }

        const sources = this._combos.get(schema);
        for (const source of sources) {
            this._record(source, each);
        }
    }

    _scan(schema, _path) {

        const path = _path || [];

        let log = this._sources.get(schema);
        if (!log) {
            log = {
                paths: new Set(),
                entry: false,
                rule: {},
                valid: new Set(),
                invalid: new Set()
            };

            this._sources.set(schema, log);
        }

        if (path.length) {
            log.paths.add(path);
        }

        const each = (sub, source) => {

            const subId = internals.id(sub, source);
            this._scan(sub, path.concat(subId));
        };

        schema.$_modify({ each, ref: false });
    }

    _combine(merged, sources) {

        this._combos.set(merged, sources);
    }
};


internals.message = function (item) {

    const path = item.paths ? Errors.path(item.paths[0]) + (item.rule ? ':' : '') : '';
    return `${path}${item.rule || ''} (${item.status})`;
};


internals.id = function (schema, { source, name, path, key }) {

    if (schema._flags.id) {
        return schema._flags.id;
    }

    if (key) {
        return key;
    }

    name = `@${name}`;

    if (source === 'terms') {
        return [name, path[Math.min(path.length - 1, 1)]];
    }

    return name;
};


internals.sub = function (paths, skipped) {

    for (const path of paths) {
        for (const skip of skipped) {
            if (DeepEqual(path.slice(0, skip.length), skip)) {
                return true;
            }
        }
    }

    return false;
};


internals.debug = function (state, event) {

    if (state.mainstay.debug) {
        event.path = state.debug ? [...state.path, state.debug] : state.path;
        state.mainstay.debug.push(event);
    }
};


/***/ }),

/***/ 7216:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Any = __webpack_require__(6866);
const Common = __webpack_require__(3221);
const Compile = __webpack_require__(3579);
const Errors = __webpack_require__(2150);
const Ref = __webpack_require__(1802);


const internals = {};


module.exports = Any.extend({

    type: 'alternatives',

    flags: {

        match: { default: 'any' }                 // 'any', 'one', 'all'
    },

    terms: {

        matches: { init: [], register: Ref.toSibling }
    },

    args(schema, ...schemas) {

        if (schemas.length === 1) {
            if (Array.isArray(schemas[0])) {
                return schema.try(...schemas[0]);
            }
        }

        return schema.try(...schemas);
    },

    validate(value, helpers) {

        const { schema, error, state, prefs } = helpers;

        // Match all or one

        if (schema._flags.match) {
            let hits = 0;
            let matched;

            for (let i = 0; i < schema.$_terms.matches.length; ++i) {
                const item = schema.$_terms.matches[i];
                const localState = state.nest(item.schema, `match.${i}`);
                localState.snapshot();

                const result = item.schema.$_validate(value, localState, prefs);
                if (!result.errors) {
                    ++hits;
                    matched = result.value;
                }
                else {
                    localState.restore();
                }
            }

            if (!hits) {
                return { errors: error('alternatives.any') };
            }

            if (schema._flags.match === 'one') {
                return hits === 1 ? { value: matched } : { errors: error('alternatives.one') };
            }

            return hits === schema.$_terms.matches.length ? { value } : { errors: error('alternatives.all') };
        }

        // Match any

        const errors = [];
        for (let i = 0; i < schema.$_terms.matches.length; ++i) {
            const item = schema.$_terms.matches[i];

            // Try

            if (item.schema) {
                const localState = state.nest(item.schema, `match.${i}`);
                localState.snapshot();

                const result = item.schema.$_validate(value, localState, prefs);
                if (!result.errors) {
                    return result;
                }

                localState.restore();
                errors.push({ schema: item.schema, reports: result.errors });
                continue;
            }

            // Conditional

            const input = item.ref ? item.ref.resolve(value, state, prefs) : value;
            const tests = item.is ? [item] : item.switch;

            for (let j = 0; j < tests.length; ++j) {
                const test = tests[j];
                const { is, then, otherwise } = test;

                const id = `match.${i}${item.switch ? '.' + j : ''}`;
                if (!is.$_match(input, state.nest(is, `${id}.is`), prefs)) {
                    if (otherwise) {
                        return otherwise.$_validate(value, state.nest(otherwise, `${id}.otherwise`), prefs);
                    }
                }
                else if (then) {
                    return then.$_validate(value, state.nest(then, `${id}.then`), prefs);
                }
            }
        }

        return internals.errors(errors, helpers);
    },

    rules: {

        conditional: {
            method(condition, options) {

                Assert(!this._flags._endedSwitch, 'Unreachable condition');
                Assert(!this._flags.match, 'Cannot combine match mode', this._flags.match, 'with conditional rule');
                Assert(options.break === undefined, 'Cannot use break option with alternatives conditional');

                const obj = this.clone();

                const match = Compile.when(obj, condition, options);
                const conditions = match.is ? [match] : match.switch;
                for (const item of conditions) {
                    if (item.then &&
                        item.otherwise) {

                        obj.$_setFlag('_endedSwitch', true, { clone: false });
                        break;
                    }
                }

                obj.$_terms.matches.push(match);
                return obj.$_mutateRebuild();
            }
        },

        match: {
            method(mode) {

                Assert(['any', 'one', 'all'].includes(mode), 'Invalid alternatives match mode', mode);

                if (mode !== 'any') {
                    for (const match of this.$_terms.matches) {
                        Assert(match.schema, 'Cannot combine match mode', mode, 'with conditional rules');
                    }
                }

                return this.$_setFlag('match', mode);
            }
        },

        try: {
            method(...schemas) {

                Assert(schemas.length, 'Missing alternative schemas');
                Common.verifyFlat(schemas, 'try');

                Assert(!this._flags._endedSwitch, 'Unreachable condition');

                const obj = this.clone();
                for (const schema of schemas) {
                    obj.$_terms.matches.push({ schema: obj.$_compile(schema) });
                }

                return obj.$_mutateRebuild();
            }
        }
    },

    overrides: {

        label(name) {

            const obj = this.$_super.label(name);
            const each = (item, source) => (source.path[0] !== 'is' ? item.label(name) : undefined);
            return obj.$_modify({ each, ref: false });
        }
    },

    rebuild(schema) {

        // Flag when an alternative type is an array

        const each = (item) => {

            if (Common.isSchema(item) &&
                item.type === 'array') {

                schema.$_setFlag('_arrayItems', true, { clone: false });
            }
        };

        schema.$_modify({ each });
    },

    manifest: {

        build(obj, desc) {

            if (desc.matches) {
                for (const match of desc.matches) {
                    const { schema, ref, is, not, then, otherwise } = match;
                    if (schema) {
                        obj = obj.try(schema);
                    }
                    else if (ref) {
                        obj = obj.conditional(ref, { is, then, not, otherwise, switch: match.switch });
                    }
                    else {
                        obj = obj.conditional(is, { then, otherwise });
                    }
                }
            }

            return obj;
        }
    },

    messages: {
        'alternatives.all': '"{{#label}}" does not match all of the required types',
        'alternatives.any': '"{{#label}}" does not match any of the allowed types',
        'alternatives.match': '"{{#label}}" does not match any of the allowed types',
        'alternatives.one': '"{{#label}}" matches more than one allowed type',
        'alternatives.types': '"{{#label}}" must be one of {{#types}}'
    }
});


// Helpers

internals.errors = function (failures, { error, state }) {

    // Nothing matched due to type criteria rules

    if (!failures.length) {
        return { errors: error('alternatives.any') };
    }

    // Single error

    if (failures.length === 1) {
        return { errors: failures[0].reports };
    }

    // Analyze reasons

    const valids = new Set();
    const complex = [];

    for (const { reports, schema } of failures) {

        // Multiple errors (!abortEarly)

        if (reports.length > 1) {
            return internals.unmatched(failures, error);
        }

        // Custom error

        const report = reports[0];
        if (report instanceof Errors.Report === false) {
            return internals.unmatched(failures, error);
        }

        // Internal object or array error

        if (report.state.path.length !== state.path.length) {
            complex.push({ type: schema.type, report });
            continue;
        }

        // Valids

        if (report.code === 'any.only') {
            for (const valid of report.local.valids) {
                valids.add(valid);
            }

            continue;
        }

        // Base type

        const [type, code] = report.code.split('.');
        if (code !== 'base') {
            complex.push({ type: schema.type, report });
            continue;
        }

        valids.add(type);
    }

    // All errors are base types or valids

    if (!complex.length) {
        return { errors: error('alternatives.types', { types: [...valids] }) };
    }

    // Single complex error

    if (complex.length === 1) {
        return { errors: complex[0].report };
    }

    return internals.unmatched(failures, error);
};


internals.unmatched = function (failures, error) {

    const errors = [];
    for (const failure of failures) {
        errors.push(...failure.reports);
    }

    return { errors: error('alternatives.match', Errors.details(errors, { override: false })) };
};


/***/ }),

/***/ 6866:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Base = __webpack_require__(5403);
const Common = __webpack_require__(3221);
const Messages = __webpack_require__(676);


const internals = {};


module.exports = Base.extend({

    type: 'any',

    flags: {

        only: { default: false }
    },

    terms: {

        alterations: { init: null },
        examples: { init: null },
        externals: { init: null },
        metas: { init: [] },
        notes: { init: [] },
        shared: { init: null },
        tags: { init: [] },
        whens: { init: null }
    },

    rules: {

        custom: {
            method(method, description) {

                Assert(typeof method === 'function', 'Method must be a function');
                Assert(description === undefined || description && typeof description === 'string', 'Description must be a non-empty string');

                return this.$_addRule({ name: 'custom', args: { method, description } });
            },
            validate(value, helpers, { method }) {

                try {
                    return method(value, helpers);
                }
                catch (err) {
                    return helpers.error('any.custom', { error: err });
                }
            },
            args: ['method', 'description'],
            multi: true
        },

        messages: {
            method(messages) {

                return this.prefs({ messages });
            }
        },

        shared: {
            method(schema) {

                Assert(Common.isSchema(schema) && schema._flags.id, 'Schema must be a schema with an id');

                const obj = this.clone();
                obj.$_terms.shared = obj.$_terms.shared || [];
                obj.$_terms.shared.push(schema);
                obj.$_mutateRegister(schema);
                return obj;
            }
        },

        warning: {
            method(code, local) {

                Assert(code && typeof code === 'string', 'Invalid warning code');

                return this.$_addRule({ name: 'warning', args: { code, local }, warn: true });
            },
            validate(value, helpers, { code, local }) {

                return helpers.error(code, local);
            },
            args: ['code', 'local'],
            multi: true
        }
    },

    modifiers: {

        keep(rule, enabled = true) {

            rule.keep = enabled;
        },

        message(rule, message) {

            rule.message = Messages.compile(message);
        },

        warn(rule, enabled = true) {

            rule.warn = enabled;
        }
    },

    manifest: {

        build(obj, desc) {

            for (const key in desc) {
                const values = desc[key];

                if (['examples', 'externals', 'metas', 'notes', 'tags'].includes(key)) {
                    for (const value of values) {
                        obj = obj[key.slice(0, -1)](value);
                    }

                    continue;
                }

                if (key === 'alterations') {
                    const alter = {};
                    for (const { target, adjuster } of values) {
                        alter[target] = adjuster;
                    }

                    obj = obj.alter(alter);
                    continue;
                }

                if (key === 'whens') {
                    for (const value of values) {
                        const { ref, is, not, then, otherwise, concat } = value;
                        if (concat) {
                            obj = obj.concat(concat);
                        }
                        else if (ref) {
                            obj = obj.when(ref, { is, not, then, otherwise, switch: value.switch, break: value.break });
                        }
                        else {
                            obj = obj.when(is, { then, otherwise, break: value.break });
                        }
                    }

                    continue;
                }

                if (key === 'shared') {
                    for (const value of values) {
                        obj = obj.shared(value);
                    }
                }
            }

            return obj;
        }
    },

    messages: {
        'any.custom': '"{{#label}}" failed custom validation because {{#error.message}}',
        'any.default': '"{{#label}}" threw an error when running default method',
        'any.failover': '"{{#label}}" threw an error when running failover method',
        'any.invalid': '"{{#label}}" contains an invalid value',
        'any.only': '"{{#label}}" must be {if(#valids.length == 1, "", "one of ")}{{#valids}}',
        'any.ref': '"{{#label}}" {{#arg}} references "{{#ref}}" which {{#reason}}',
        'any.required': '"{{#label}}" is required',
        'any.unknown': '"{{#label}}" is not allowed'
    }
});


/***/ }),

/***/ 9762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const DeepEqual = __webpack_require__(5801);
const Reach = __webpack_require__(8891);

const Any = __webpack_require__(6866);
const Common = __webpack_require__(3221);
const Compile = __webpack_require__(3579);


const internals = {};


module.exports = Any.extend({

    type: 'array',

    flags: {

        single: { default: false },
        sparse: { default: false }
    },

    terms: {

        items: { init: [], manifest: 'schema' },
        ordered: { init: [], manifest: 'schema' },

        _exclusions: { init: [] },
        _inclusions: { init: [] },
        _requireds: { init: [] }
    },

    coerce: {
        from: 'object',
        method(value, { schema, state, prefs }) {

            if (!Array.isArray(value)) {
                return;
            }

            const sort = schema.$_getRule('sort');
            if (!sort) {
                return;
            }

            return internals.sort(schema, value, sort.args.options, state, prefs);
        }
    },

    validate(value, { schema, error }) {

        if (!Array.isArray(value)) {
            if (schema._flags.single) {
                const single = [value];
                single[Common.symbols.arraySingle] = true;
                return { value: single };
            }

            return { errors: error('array.base') };
        }

        if (!schema.$_getRule('items') &&
            !schema.$_terms.externals) {

            return;
        }

        return { value: value.slice() };        // Clone the array so that we don't modify the original
    },

    rules: {

        has: {
            method(schema) {

                schema = this.$_compile(schema, { appendPath: true });
                const obj = this.$_addRule({ name: 'has', args: { schema } });
                obj.$_mutateRegister(schema);
                return obj;
            },
            validate(value, { state, prefs, error }, { schema: has }) {

                const ancestors = [value, ...state.ancestors];
                for (let i = 0; i < value.length; ++i) {
                    const localState = state.localize([...state.path, i], ancestors, has);
                    if (has.$_match(value[i], localState, prefs)) {
                        return value;
                    }
                }

                const patternLabel = has._flags.label;
                if (patternLabel) {
                    return error('array.hasKnown', { patternLabel });
                }

                return error('array.hasUnknown', null);
            },
            multi: true
        },

        items: {
            method(...schemas) {

                Common.verifyFlat(schemas, 'items');

                const obj = this.$_addRule('items');

                for (let i = 0; i < schemas.length; ++i) {
                    const type = Common.tryWithPath(() => this.$_compile(schemas[i]), i, { append: true });
                    obj.$_terms.items.push(type);
                }

                return obj.$_mutateRebuild();
            },
            validate(value, { schema, error, state, prefs }) {

                const requireds = schema.$_terms._requireds.slice();
                const ordereds = schema.$_terms.ordered.slice();
                const inclusions = [...schema.$_terms._inclusions, ...requireds];

                const wasArray = !value[Common.symbols.arraySingle];
                delete value[Common.symbols.arraySingle];

                const errors = [];
                let il = value.length;
                for (let i = 0; i < il; ++i) {
                    const item = value[i];

                    let errored = false;
                    let isValid = false;

                    const key = wasArray ? i : new Number(i);       // eslint-disable-line no-new-wrappers
                    const path = [...state.path, key];

                    // Sparse

                    if (!schema._flags.sparse &&
                        item === undefined) {

                        errors.push(error('array.sparse', { key, path, pos: i, value: undefined }, state.localize(path)));
                        if (prefs.abortEarly) {
                            return errors;
                        }

                        ordereds.shift();
                        continue;
                    }

                    // Exclusions

                    const ancestors = [value, ...state.ancestors];

                    for (const exclusion of schema.$_terms._exclusions) {
                        if (!exclusion.$_match(item, state.localize(path, ancestors, exclusion), prefs, { presence: 'ignore' })) {
                            continue;
                        }

                        errors.push(error('array.excludes', { pos: i, value: item }, state.localize(path)));
                        if (prefs.abortEarly) {
                            return errors;
                        }

                        errored = true;
                        ordereds.shift();
                        break;
                    }

                    if (errored) {
                        continue;
                    }

                    // Ordered

                    if (schema.$_terms.ordered.length) {
                        if (ordereds.length) {
                            const ordered = ordereds.shift();
                            const res = ordered.$_validate(item, state.localize(path, ancestors, ordered), prefs);
                            if (!res.errors) {
                                if (ordered._flags.result === 'strip') {
                                    internals.fastSplice(value, i);
                                    --i;
                                    --il;
                                }
                                else if (!schema._flags.sparse && res.value === undefined) {
                                    errors.push(error('array.sparse', { key, path, pos: i, value: undefined }, state.localize(path)));
                                    if (prefs.abortEarly) {
                                        return errors;
                                    }

                                    continue;
                                }
                                else {
                                    value[i] = res.value;
                                }
                            }
                            else {
                                errors.push(...res.errors);
                                if (prefs.abortEarly) {
                                    return errors;
                                }
                            }

                            continue;
                        }
                        else if (!schema.$_terms.items.length) {
                            errors.push(error('array.orderedLength', { pos: i, limit: schema.$_terms.ordered.length }));
                            if (prefs.abortEarly) {
                                return errors;
                            }

                            break;      // No reason to continue since there are no other rules to validate other than array.orderedLength
                        }
                    }

                    // Requireds

                    const requiredChecks = [];
                    let jl = requireds.length;
                    for (let j = 0; j < jl; ++j) {
                        const localState = state.localize(path, ancestors, requireds[j]);
                        localState.snapshot();

                        const res = requireds[j].$_validate(item, localState, prefs);
                        requiredChecks[j] = res;

                        if (!res.errors) {
                            value[i] = res.value;
                            isValid = true;
                            internals.fastSplice(requireds, j);
                            --j;
                            --jl;

                            if (!schema._flags.sparse &&
                                res.value === undefined) {

                                errors.push(error('array.sparse', { key, path, pos: i, value: undefined }, state.localize(path)));
                                if (prefs.abortEarly) {
                                    return errors;
                                }
                            }

                            break;
                        }

                        localState.restore();
                    }

                    if (isValid) {
                        continue;
                    }

                    // Inclusions

                    const stripUnknown = prefs.stripUnknown && !!prefs.stripUnknown.arrays || false;

                    jl = inclusions.length;
                    for (const inclusion of inclusions) {

                        // Avoid re-running requireds that already didn't match in the previous loop

                        let res;
                        const previousCheck = requireds.indexOf(inclusion);
                        if (previousCheck !== -1) {
                            res = requiredChecks[previousCheck];
                        }
                        else {
                            const localState = state.localize(path, ancestors, inclusion);
                            localState.snapshot();

                            res = inclusion.$_validate(item, localState, prefs);
                            if (!res.errors) {
                                if (inclusion._flags.result === 'strip') {
                                    internals.fastSplice(value, i);
                                    --i;
                                    --il;
                                }
                                else if (!schema._flags.sparse &&
                                    res.value === undefined) {

                                    errors.push(error('array.sparse', { key, path, pos: i, value: undefined }, state.localize(path)));
                                    errored = true;
                                }
                                else {
                                    value[i] = res.value;
                                }

                                isValid = true;
                                break;
                            }

                            localState.restore();
                        }

                        // Return the actual error if only one inclusion defined

                        if (jl === 1) {
                            if (stripUnknown) {
                                internals.fastSplice(value, i);
                                --i;
                                --il;
                                isValid = true;
                                break;
                            }

                            errors.push(...res.errors);
                            if (prefs.abortEarly) {
                                return errors;
                            }

                            errored = true;
                            break;
                        }
                    }

                    if (errored) {
                        continue;
                    }

                    if (schema.$_terms._inclusions.length &&
                        !isValid) {

                        if (stripUnknown) {
                            internals.fastSplice(value, i);
                            --i;
                            --il;
                            continue;
                        }

                        errors.push(error('array.includes', { pos: i, value: item }, state.localize(path)));
                        if (prefs.abortEarly) {
                            return errors;
                        }
                    }
                }

                if (requireds.length) {
                    internals.fillMissedErrors(schema, errors, requireds, value, state, prefs);
                }

                if (ordereds.length) {
                    internals.fillOrderedErrors(schema, errors, ordereds, value, state, prefs);
                }

                return errors.length ? errors : value;
            },

            priority: true,
            manifest: false
        },

        length: {
            method(limit) {

                return this.$_addRule({ name: 'length', args: { limit }, operator: '=' });
            },
            validate(value, helpers, { limit }, { name, operator, args }) {

                if (Common.compare(value.length, limit, operator)) {
                    return value;
                }

                return helpers.error('array.' + name, { limit: args.limit, value });
            },
            args: [
                {
                    name: 'limit',
                    ref: true,
                    assert: Common.limit,
                    message: 'must be a positive integer'
                }
            ]
        },

        max: {
            method(limit) {

                return this.$_addRule({ name: 'max', method: 'length', args: { limit }, operator: '<=' });
            }
        },

        min: {
            method(limit) {

                return this.$_addRule({ name: 'min', method: 'length', args: { limit }, operator: '>=' });
            }
        },

        ordered: {
            method(...schemas) {

                Common.verifyFlat(schemas, 'ordered');

                const obj = this.$_addRule('items');

                for (let i = 0; i < schemas.length; ++i) {
                    const type = Common.tryWithPath(() => this.$_compile(schemas[i]), i, { append: true });
                    internals.validateSingle(type, obj);

                    obj.$_mutateRegister(type);
                    obj.$_terms.ordered.push(type);
                }

                return obj.$_mutateRebuild();
            }
        },

        single: {
            method(enabled) {

                const value = enabled === undefined ? true : !!enabled;
                Assert(!value || !this._flags._arrayItems, 'Cannot specify single rule when array has array items');

                return this.$_setFlag('single', value);
            }
        },

        sort: {
            method(options = {}) {

                Common.assertOptions(options, ['by', 'order']);

                const settings = {
                    order: options.order || 'ascending'
                };

                if (options.by) {
                    settings.by = Compile.ref(options.by, { ancestor: 0 });
                    Assert(!settings.by.ancestor, 'Cannot sort by ancestor');
                }

                return this.$_addRule({ name: 'sort', args: { options: settings } });
            },
            validate(value, { error, state, prefs, schema }, { options }) {

                const { value: sorted, errors } = internals.sort(schema, value, options, state, prefs);
                if (errors) {
                    return errors;
                }

                for (let i = 0; i < value.length; ++i) {
                    if (value[i] !== sorted[i]) {
                        return error('array.sort', { order: options.order, by: options.by ? options.by.key : 'value' });
                    }
                }

                return value;
            },
            convert: true
        },

        sparse: {
            method(enabled) {

                const value = enabled === undefined ? true : !!enabled;

                if (this._flags.sparse === value) {
                    return this;
                }

                const obj = value ? this.clone() : this.$_addRule('items');
                return obj.$_setFlag('sparse', value, { clone: false });
            }
        },

        unique: {
            method(comparator, options = {}) {

                Assert(!comparator || typeof comparator === 'function' || typeof comparator === 'string', 'comparator must be a function or a string');
                Common.assertOptions(options, ['ignoreUndefined', 'separator']);

                const rule = { name: 'unique', args: { options, comparator } };

                if (comparator) {
                    if (typeof comparator === 'string') {
                        const separator = Common.default(options.separator, '.');
                        rule.path = separator ? comparator.split(separator) : [comparator];
                    }
                    else {
                        rule.comparator = comparator;
                    }
                }

                return this.$_addRule(rule);
            },
            validate(value, { state, error, schema }, { comparator: raw, options }, { comparator, path }) {

                const found = {
                    string: Object.create(null),
                    number: Object.create(null),
                    undefined: Object.create(null),
                    boolean: Object.create(null),
                    object: new Map(),
                    function: new Map(),
                    custom: new Map()
                };

                const compare = comparator || DeepEqual;
                const ignoreUndefined = options.ignoreUndefined;

                for (let i = 0; i < value.length; ++i) {
                    const item = path ? Reach(value[i], path) : value[i];
                    const records = comparator ? found.custom : found[typeof item];
                    Assert(records, 'Failed to find unique map container for type', typeof item);

                    if (records instanceof Map) {
                        const entries = records.entries();
                        let current;
                        while (!(current = entries.next()).done) {
                            if (compare(current.value[0], item)) {
                                const localState = state.localize([...state.path, i], [value, ...state.ancestors]);
                                const context = {
                                    pos: i,
                                    value: value[i],
                                    dupePos: current.value[1],
                                    dupeValue: value[current.value[1]]
                                };

                                if (path) {
                                    context.path = raw;
                                }

                                return error('array.unique', context, localState);
                            }
                        }

                        records.set(item, i);
                    }
                    else {
                        if ((!ignoreUndefined || item !== undefined) &&
                            records[item] !== undefined) {

                            const context = {
                                pos: i,
                                value: value[i],
                                dupePos: records[item],
                                dupeValue: value[records[item]]
                            };

                            if (path) {
                                context.path = raw;
                            }

                            const localState = state.localize([...state.path, i], [value, ...state.ancestors]);
                            return error('array.unique', context, localState);
                        }

                        records[item] = i;
                    }
                }

                return value;
            },
            args: ['comparator', 'options'],
            multi: true
        }
    },

    cast: {
        set: {
            from: Array.isArray,
            to(value, helpers) {

                return new Set(value);
            }
        }
    },

    rebuild(schema) {

        schema.$_terms._inclusions = [];
        schema.$_terms._exclusions = [];
        schema.$_terms._requireds = [];

        for (const type of schema.$_terms.items) {
            internals.validateSingle(type, schema);

            if (type._flags.presence === 'required') {
                schema.$_terms._requireds.push(type);
            }
            else if (type._flags.presence === 'forbidden') {
                schema.$_terms._exclusions.push(type);
            }
            else {
                schema.$_terms._inclusions.push(type);
            }
        }

        for (const type of schema.$_terms.ordered) {
            internals.validateSingle(type, schema);
        }
    },

    manifest: {

        build(obj, desc) {

            if (desc.items) {
                obj = obj.items(...desc.items);
            }

            if (desc.ordered) {
                obj = obj.ordered(...desc.ordered);
            }

            return obj;
        }
    },

    messages: {
        'array.base': '"{{#label}}" must be an array',
        'array.excludes': '"{{#label}}" contains an excluded value',
        'array.hasKnown': '"{{#label}}" does not contain at least one required match for type "{#patternLabel}"',
        'array.hasUnknown': '"{{#label}}" does not contain at least one required match',
        'array.includes': '"{{#label}}" does not match any of the allowed types',
        'array.includesRequiredBoth': '"{{#label}}" does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)',
        'array.includesRequiredKnowns': '"{{#label}}" does not contain {{#knownMisses}}',
        'array.includesRequiredUnknowns': '"{{#label}}" does not contain {{#unknownMisses}} required value(s)',
        'array.length': '"{{#label}}" must contain {{#limit}} items',
        'array.max': '"{{#label}}" must contain less than or equal to {{#limit}} items',
        'array.min': '"{{#label}}" must contain at least {{#limit}} items',
        'array.orderedLength': '"{{#label}}" must contain at most {{#limit}} items',
        'array.sort': '"{{#label}}" must be sorted in {#order} order by {{#by}}',
        'array.sort.mismatching': '"{{#label}}" cannot be sorted due to mismatching types',
        'array.sort.unsupported': '"{{#label}}" cannot be sorted due to unsupported type {#type}',
        'array.sparse': '"{{#label}}" must not be a sparse array item',
        'array.unique': '"{{#label}}" contains a duplicate value'
    }
});


// Helpers

internals.fillMissedErrors = function (schema, errors, requireds, value, state, prefs) {

    const knownMisses = [];
    let unknownMisses = 0;
    for (const required of requireds) {
        const label = required._flags.label;
        if (label) {
            knownMisses.push(label);
        }
        else {
            ++unknownMisses;
        }
    }

    if (knownMisses.length) {
        if (unknownMisses) {
            errors.push(schema.$_createError('array.includesRequiredBoth', value, { knownMisses, unknownMisses }, state, prefs));
        }
        else {
            errors.push(schema.$_createError('array.includesRequiredKnowns', value, { knownMisses }, state, prefs));
        }
    }
    else {
        errors.push(schema.$_createError('array.includesRequiredUnknowns', value, { unknownMisses }, state, prefs));
    }
};


internals.fillOrderedErrors = function (schema, errors, ordereds, value, state, prefs) {

    const requiredOrdereds = [];

    for (const ordered of ordereds) {
        if (ordered._flags.presence === 'required') {
            requiredOrdereds.push(ordered);
        }
    }

    if (requiredOrdereds.length) {
        internals.fillMissedErrors(schema, errors, requiredOrdereds, value, state, prefs);
    }
};


internals.fastSplice = function (arr, i) {

    let pos = i;
    while (pos < arr.length) {
        arr[pos++] = arr[pos];
    }

    --arr.length;
};


internals.validateSingle = function (type, obj) {

    if (type.type === 'array' ||
        type._flags._arrayItems) {

        Assert(!obj._flags.single, 'Cannot specify array item with single rule enabled');
        obj.$_setFlag('_arrayItems', true, { clone: false });
    }
};


internals.sort = function (schema, value, settings, state, prefs) {

    const order = settings.order === 'ascending' ? 1 : -1;
    const aFirst = -1 * order;
    const bFirst = order;

    const sort = (a, b) => {

        let compare = internals.compare(a, b, aFirst, bFirst);
        if (compare !== null) {
            return compare;
        }

        if (settings.by) {
            a = settings.by.resolve(a, state, prefs);
            b = settings.by.resolve(b, state, prefs);
        }

        compare = internals.compare(a, b, aFirst, bFirst);
        if (compare !== null) {
            return compare;
        }

        const type = typeof a;
        if (type !== typeof b) {
            throw schema.$_createError('array.sort.mismatching', value, null, state, prefs);
        }

        if (type !== 'number' &&
            type !== 'string') {

            throw schema.$_createError('array.sort.unsupported', value, { type }, state, prefs);
        }

        if (type === 'number') {
            return (a - b) * order;
        }

        return a < b ? aFirst : bFirst;
    };

    try {
        return { value: value.slice().sort(sort) };
    }
    catch (err) {
        return { errors: err };
    }
};


internals.compare = function (a, b, aFirst, bFirst) {

    if (a === b) {
        return 0;
    }

    if (a === undefined) {
        return 1;           // Always last regardless of sort order
    }

    if (b === undefined) {
        return -1;           // Always last regardless of sort order
    }

    if (a === null) {
        return bFirst;
    }

    if (b === null) {
        return aFirst;
    }

    return null;
};


/***/ }),

/***/ 6754:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Any = __webpack_require__(6866);
const Common = __webpack_require__(3221);


const internals = {};


module.exports = Any.extend({

    type: 'binary',

    coerce: {
        from: 'string',
        method(value, { schema }) {

            try {
                return { value: Buffer.from(value, schema._flags.encoding) };
            }
            catch (ignoreErr) { }
        }
    },

    validate(value, { error }) {

        if (!Buffer.isBuffer(value)) {
            return { value, errors: error('binary.base') };
        }
    },

    rules: {
        encoding: {
            method(encoding) {

                Assert(Buffer.isEncoding(encoding), 'Invalid encoding:', encoding);

                return this.$_setFlag('encoding', encoding);
            }
        },

        length: {
            method(limit) {

                return this.$_addRule({ name: 'length', method: 'length', args: { limit }, operator: '=' });
            },
            validate(value, helpers, { limit }, { name, operator, args }) {

                if (Common.compare(value.length, limit, operator)) {
                    return value;
                }

                return helpers.error('binary.' + name, { limit: args.limit, value });
            },
            args: [
                {
                    name: 'limit',
                    ref: true,
                    assert: Common.limit,
                    message: 'must be a positive integer'
                }
            ]
        },

        max: {
            method(limit) {

                return this.$_addRule({ name: 'max', method: 'length', args: { limit }, operator: '<=' });
            }
        },

        min: {
            method(limit) {

                return this.$_addRule({ name: 'min', method: 'length', args: { limit }, operator: '>=' });
            }
        }
    },

    cast: {
        string: {
            from: (value) => Buffer.isBuffer(value),
            to(value, helpers) {

                return value.toString();
            }
        }
    },

    messages: {
        'binary.base': '"{{#label}}" must be a buffer or a string',
        'binary.length': '"{{#label}}" must be {{#limit}} bytes',
        'binary.max': '"{{#label}}" must be less than or equal to {{#limit}} bytes',
        'binary.min': '"{{#label}}" must be at least {{#limit}} bytes'
    }
});


/***/ }),

/***/ 8686:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Any = __webpack_require__(6866);
const Common = __webpack_require__(3221);
const Values = __webpack_require__(566);


const internals = {};


internals.isBool = function (value) {

    return typeof value === 'boolean';
};


module.exports = Any.extend({

    type: 'boolean',

    flags: {

        sensitive: { default: false }
    },

    terms: {

        falsy: {
            init: null,
            manifest: 'values'
        },

        truthy: {
            init: null,
            manifest: 'values'
        }
    },

    coerce(value, { schema }) {

        if (typeof value === 'boolean') {
            return;
        }

        if (typeof value === 'string') {
            const normalized = schema._flags.sensitive ? value : value.toLowerCase();
            value = normalized === 'true' ? true : (normalized === 'false' ? false : value);
        }

        if (typeof value !== 'boolean') {
            value = schema.$_terms.truthy && schema.$_terms.truthy.has(value, null, null, !schema._flags.sensitive) ||
                (schema.$_terms.falsy && schema.$_terms.falsy.has(value, null, null, !schema._flags.sensitive) ? false : value);
        }

        return { value };
    },

    validate(value, { error }) {

        if (typeof value !== 'boolean') {
            return { value, errors: error('boolean.base') };
        }
    },

    rules: {
        truthy: {
            method(...values) {

                Common.verifyFlat(values, 'truthy');

                const obj = this.clone();
                obj.$_terms.truthy = obj.$_terms.truthy || new Values();

                for (let i = 0; i < values.length; ++i) {
                    const value = values[i];

                    Assert(value !== undefined, 'Cannot call truthy with undefined');
                    obj.$_terms.truthy.add(value);
                }

                return obj;
            }
        },

        falsy: {
            method(...values) {

                Common.verifyFlat(values, 'falsy');

                const obj = this.clone();
                obj.$_terms.falsy = obj.$_terms.falsy || new Values();

                for (let i = 0; i < values.length; ++i) {
                    const value = values[i];

                    Assert(value !== undefined, 'Cannot call falsy with undefined');
                    obj.$_terms.falsy.add(value);
                }

                return obj;
            }
        },

        sensitive: {
            method(enabled = true) {

                return this.$_setFlag('sensitive', enabled);
            }
        }
    },

    cast: {
        number: {
            from: internals.isBool,
            to(value, helpers) {

                return value ? 1 : 0;
            }
        },
        string: {
            from: internals.isBool,
            to(value, helpers) {

                return value ? 'true' : 'false';
            }
        }
    },

    manifest: {

        build(obj, desc) {

            if (desc.truthy) {
                obj = obj.truthy(...desc.truthy);
            }

            if (desc.falsy) {
                obj = obj.falsy(...desc.falsy);
            }

            return obj;
        }
    },

    messages: {
        'boolean.base': '"{{#label}}" must be a boolean'
    }
});


/***/ }),

/***/ 9408:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Any = __webpack_require__(6866);
const Common = __webpack_require__(3221);
const Template = __webpack_require__(5547);


const internals = {};


internals.isDate = function (value) {

    return value instanceof Date;
};


module.exports = Any.extend({

    type: 'date',

    coerce: {
        from: ['number', 'string'],
        method(value, { schema }) {

            return { value: internals.parse(value, schema._flags.format) || value };
        }
    },

    validate(value, { schema, error, prefs }) {

        if (value instanceof Date &&
            !isNaN(value.getTime())) {

            return;
        }

        const format = schema._flags.format;

        if (!prefs.convert ||
            !format ||
            typeof value !== 'string') {

            return { value, errors: error('date.base') };
        }

        return { value, errors: error('date.format', { format }) };
    },

    rules: {

        compare: {
            method: false,
            validate(value, helpers, { date }, { name, operator, args }) {

                const to = date === 'now' ? Date.now() : date.getTime();
                if (Common.compare(value.getTime(), to, operator)) {
                    return value;
                }

                return helpers.error('date.' + name, { limit: args.date, value });
            },
            args: [
                {
                    name: 'date',
                    ref: true,
                    normalize: (date) => {

                        return date === 'now' ? date : internals.parse(date);
                    },
                    assert: (date) => date !== null,
                    message: 'must have a valid date format'
                }
            ]
        },

        format: {
            method(format) {

                Assert(['iso', 'javascript', 'unix'].includes(format), 'Unknown date format', format);

                return this.$_setFlag('format', format);
            }
        },

        greater: {
            method(date) {

                return this.$_addRule({ name: 'greater', method: 'compare', args: { date }, operator: '>' });
            }
        },

        iso: {
            method() {

                return this.format('iso');
            }
        },

        less: {
            method(date) {

                return this.$_addRule({ name: 'less', method: 'compare', args: { date }, operator: '<' });
            }
        },

        max: {
            method(date) {

                return this.$_addRule({ name: 'max', method: 'compare', args: { date }, operator: '<=' });
            }
        },

        min: {
            method(date) {

                return this.$_addRule({ name: 'min', method: 'compare', args: { date }, operator: '>=' });
            }
        },

        timestamp: {
            method(type = 'javascript') {

                Assert(['javascript', 'unix'].includes(type), '"type" must be one of "javascript, unix"');

                return this.format(type);
            }
        }
    },

    cast: {
        number: {
            from: internals.isDate,
            to(value, helpers) {

                return value.getTime();
            }
        },
        string: {
            from: internals.isDate,
            to(value, { prefs }) {

                return Template.date(value, prefs);
            }
        }
    },

    messages: {
        'date.base': '"{{#label}}" must be a valid date',
        'date.format': '"{{#label}}" must be in {msg("date.format." + #format) || #format} format',
        'date.greater': '"{{#label}}" must be greater than "{{#limit}}"',
        'date.less': '"{{#label}}" must be less than "{{#limit}}"',
        'date.max': '"{{#label}}" must be less than or equal to "{{#limit}}"',
        'date.min': '"{{#label}}" must be larger than or equal to "{{#limit}}"',

        // Messages used in date.format

        'date.format.iso': 'ISO 8601 date',
        'date.format.javascript': 'timestamp or number of milliseconds',
        'date.format.unix': 'timestamp or number of seconds'
    }
});


// Helpers

internals.parse = function (value, format) {

    if (value instanceof Date) {
        return value;
    }

    if (typeof value !== 'string' &&
        (isNaN(value) || !isFinite(value))) {

        return null;
    }

    if (/^\s*$/.test(value)) {
        return null;
    }

    // ISO

    if (format === 'iso') {
        if (!Common.isIsoDate(value)) {
            return null;
        }

        return internals.date(value.toString());
    }

    // Normalize number string

    const original = value;
    if (typeof value === 'string' &&
        /^[+-]?\d+(\.\d+)?$/.test(value)) {

        value = parseFloat(value);
    }

    // Timestamp

    if (format) {
        if (format === 'javascript') {
            return internals.date(1 * value);        // Casting to number
        }

        if (format === 'unix') {
            return internals.date(1000 * value);
        }

        if (typeof original === 'string') {
            return null;
        }
    }

    // Plain

    return internals.date(value);
};


internals.date = function (value) {

    const date = new Date(value);
    if (!isNaN(date.getTime())) {
        return date;
    }

    return null;
};


/***/ }),

/***/ 8146:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Keys = __webpack_require__(1732);


const internals = {};


module.exports = Keys.extend({

    type: 'function',

    properties: {
        typeof: 'function'
    },

    rules: {
        arity: {
            method(n) {

                Assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');

                return this.$_addRule({ name: 'arity', args: { n } });
            },
            validate(value, helpers, { n }) {

                if (value.length === n) {
                    return value;
                }

                return helpers.error('function.arity', { n });
            }
        },

        class: {
            method() {

                return this.$_addRule('class');
            },
            validate(value, helpers) {

                if ((/^\s*class\s/).test(value.toString())) {
                    return value;
                }

                return helpers.error('function.class', { value });
            }
        },

        minArity: {
            method(n) {

                Assert(Number.isSafeInteger(n) && n > 0, 'n must be a strict positive integer');

                return this.$_addRule({ name: 'minArity', args: { n } });
            },
            validate(value, helpers, { n }) {

                if (value.length >= n) {
                    return value;
                }

                return helpers.error('function.minArity', { n });
            }
        },

        maxArity: {
            method(n) {

                Assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');

                return this.$_addRule({ name: 'maxArity', args: { n } });
            },
            validate(value, helpers, { n }) {

                if (value.length <= n) {
                    return value;
                }

                return helpers.error('function.maxArity', { n });
            }
        }
    },

    messages: {
        'function.arity': '"{{#label}}" must have an arity of {{#n}}',
        'function.class': '"{{#label}}" must be a class',
        'function.maxArity': '"{{#label}}" must have an arity lesser or equal to {{#n}}',
        'function.minArity': '"{{#label}}" must have an arity greater or equal to {{#n}}'
    }
});


/***/ }),

/***/ 1732:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const ApplyToDefaults = __webpack_require__(5545);
const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);
const Topo = __webpack_require__(8392);

const Any = __webpack_require__(6866);
const Common = __webpack_require__(3221);
const Compile = __webpack_require__(3579);
const Errors = __webpack_require__(2150);
const Ref = __webpack_require__(1802);
const Template = __webpack_require__(5547);


const internals = {
    renameDefaults: {
        alias: false,                   // Keep old value in place
        multiple: false,                // Allow renaming multiple keys into the same target
        override: false                 // Overrides an existing key
    }
};


module.exports = Any.extend({

    type: '_keys',

    properties: {
        typeof: 'object'
    },

    flags: {

        unknown: { default: false }
    },

    terms: {

        dependencies: { init: null },
        keys: { init: null, manifest: { mapped: { from: 'schema', to: 'key' } } },
        patterns: { init: null },
        renames: { init: null }
    },

    args(schema, keys) {

        return schema.keys(keys);
    },

    validate(value, { schema, error, state, prefs }) {

        if (!value ||
            typeof value !== schema.$_property('typeof') ||
            Array.isArray(value)) {

            return { value, errors: error('object.base', { type: schema.$_property('typeof') }) };
        }

        // Skip if there are no other rules to test

        if (!schema.$_terms.renames &&
            !schema.$_terms.dependencies &&
            !schema.$_terms.keys &&                       // null allows any keys
            !schema.$_terms.patterns &&
            !schema.$_terms.externals) {

            return;
        }

        // Shallow clone value

        value = internals.clone(value, prefs);
        const errors = [];

        // Rename keys

        if (schema.$_terms.renames &&
            !internals.rename(schema, value, state, prefs, errors)) {

            return { value, errors };
        }

        // Anything allowed

        if (!schema.$_terms.keys &&                       // null allows any keys
            !schema.$_terms.patterns &&
            !schema.$_terms.dependencies) {

            return { value, errors };
        }

        // Defined keys

        const unprocessed = new Set(Object.keys(value));

        if (schema.$_terms.keys) {
            const ancestors = [value, ...state.ancestors];

            for (const child of schema.$_terms.keys) {
                const key = child.key;
                const item = value[key];

                unprocessed.delete(key);

                const localState = state.localize([...state.path, key], ancestors, child);
                const result = child.schema.$_validate(item, localState, prefs);

                if (result.errors) {
                    if (prefs.abortEarly) {
                        return { value, errors: result.errors };
                    }

                    errors.push(...result.errors);
                }
                else if (child.schema._flags.result === 'strip' ||
                    result.value === undefined && item !== undefined) {

                    delete value[key];
                }
                else if (result.value !== undefined) {
                    value[key] = result.value;
                }
            }
        }

        // Unknown keys

        if (unprocessed.size ||
            schema._flags._hasPatternMatch) {

            const early = internals.unknown(schema, value, unprocessed, errors, state, prefs);
            if (early) {
                return early;
            }
        }

        // Validate dependencies

        if (schema.$_terms.dependencies) {
            for (const dep of schema.$_terms.dependencies) {
                if (dep.key &&
                    dep.key.resolve(value, state, prefs, null, { shadow: false }) === undefined) {

                    continue;
                }

                const failed = internals.dependencies[dep.rel](schema, dep, value, state, prefs);
                if (failed) {
                    const report = schema.$_createError(failed.code, value, failed.context, state, prefs);
                    if (prefs.abortEarly) {
                        return { value, errors: report };
                    }

                    errors.push(report);
                }
            }
        }

        return { value, errors };
    },

    rules: {

        and: {
            method(...peers /*, [options] */) {

                Common.verifyFlat(peers, 'and');

                return internals.dependency(this, 'and', null, peers);
            }
        },

        append: {
            method(schema) {

                if (schema === null ||
                    schema === undefined ||
                    Object.keys(schema).length === 0) {

                    return this;
                }

                return this.keys(schema);
            }
        },

        assert: {
            method(subject, schema, message) {

                if (!Template.isTemplate(subject)) {
                    subject = Compile.ref(subject);
                }

                Assert(message === undefined || typeof message === 'string', 'Message must be a string');

                schema = this.$_compile(schema, { appendPath: true });

                const obj = this.$_addRule({ name: 'assert', args: { subject, schema, message } });
                obj.$_mutateRegister(subject);
                obj.$_mutateRegister(schema);
                return obj;
            },
            validate(value, { error, prefs, state }, { subject, schema, message }) {

                const about = subject.resolve(value, state, prefs);
                const path = Ref.isRef(subject) ? subject.absolute(state) : [];
                if (schema.$_match(about, state.localize(path, [value, ...state.ancestors], schema), prefs)) {
                    return value;
                }

                return error('object.assert', { subject, message });
            },
            args: ['subject', 'schema', 'message'],
            multi: true
        },

        instance: {
            method(constructor, name) {

                Assert(typeof constructor === 'function', 'constructor must be a function');

                name = name || constructor.name;

                return this.$_addRule({ name: 'instance', args: { constructor, name } });
            },
            validate(value, helpers, { constructor, name }) {

                if (value instanceof constructor) {
                    return value;
                }

                return helpers.error('object.instance', { type: name, value });
            },
            args: ['constructor', 'name']
        },

        keys: {
            method(schema) {

                Assert(schema === undefined || typeof schema === 'object', 'Object schema must be a valid object');
                Assert(!Common.isSchema(schema), 'Object schema cannot be a joi schema');

                const obj = this.clone();

                if (!schema) {                                      // Allow all
                    obj.$_terms.keys = null;
                }
                else if (!Object.keys(schema).length) {             // Allow none
                    obj.$_terms.keys = [];
                }
                else {
                    obj.$_terms.keys = obj.$_terms.keys ? obj.$_terms.keys.filter((child) => !schema.hasOwnProperty(child.key)) : [];
                    for (const key in schema) {
                        Common.tryWithPath(() => obj.$_terms.keys.push({ key, schema: this.$_compile(schema[key]) }), key);
                    }
                }

                return obj.$_mutateRebuild();
            }
        },

        length: {
            method(limit) {

                return this.$_addRule({ name: 'length', args: { limit }, operator: '=' });
            },
            validate(value, helpers, { limit }, { name, operator, args }) {

                if (Common.compare(Object.keys(value).length, limit, operator)) {
                    return value;
                }

                return helpers.error('object.' + name, { limit: args.limit, value });
            },
            args: [
                {
                    name: 'limit',
                    ref: true,
                    assert: Common.limit,
                    message: 'must be a positive integer'
                }
            ]
        },

        max: {
            method(limit) {

                return this.$_addRule({ name: 'max', method: 'length', args: { limit }, operator: '<=' });
            }
        },

        min: {
            method(limit) {

                return this.$_addRule({ name: 'min', method: 'length', args: { limit }, operator: '>=' });
            }
        },

        nand: {
            method(...peers /*, [options] */) {

                Common.verifyFlat(peers, 'nand');

                return internals.dependency(this, 'nand', null, peers);
            }
        },

        or: {
            method(...peers /*, [options] */) {

                Common.verifyFlat(peers, 'or');

                return internals.dependency(this, 'or', null, peers);
            }
        },

        oxor: {
            method(...peers /*, [options] */) {

                return internals.dependency(this, 'oxor', null, peers);
            }
        },

        pattern: {
            method(pattern, schema, options = {}) {

                const isRegExp = pattern instanceof RegExp;
                if (!isRegExp) {
                    pattern = this.$_compile(pattern, { appendPath: true });
                }

                Assert(schema !== undefined, 'Invalid rule');
                Common.assertOptions(options, ['fallthrough', 'matches']);

                if (isRegExp) {
                    Assert(!pattern.flags.includes('g') && !pattern.flags.includes('y'), 'pattern should not use global or sticky mode');
                }

                schema = this.$_compile(schema, { appendPath: true });

                const obj = this.clone();
                obj.$_terms.patterns = obj.$_terms.patterns || [];
                const config = { [isRegExp ? 'regex' : 'schema']: pattern, rule: schema };
                if (options.matches) {
                    config.matches = this.$_compile(options.matches);
                    if (config.matches.type !== 'array') {
                        config.matches = config.matches.$_root.array().items(config.matches);
                    }

                    obj.$_mutateRegister(config.matches);
                    obj.$_setFlag('_hasPatternMatch', true, { clone: false });
                }

                if (options.fallthrough) {
                    config.fallthrough = true;
                }

                obj.$_terms.patterns.push(config);
                obj.$_mutateRegister(schema);
                return obj;
            }
        },

        ref: {
            method() {

                return this.$_addRule('ref');
            },
            validate(value, helpers) {

                if (Ref.isRef(value)) {
                    return value;
                }

                return helpers.error('object.refType', { value });
            }
        },

        rename: {
            method(from, to, options = {}) {

                Assert(typeof from === 'string' || from instanceof RegExp, 'Rename missing the from argument');
                Assert(typeof to === 'string' || to instanceof Template, 'Invalid rename to argument');
                Assert(to !== from, 'Cannot rename key to same name:', from);

                Common.assertOptions(options, ['alias', 'ignoreUndefined', 'override', 'multiple']);

                const obj = this.clone();

                obj.$_terms.renames = obj.$_terms.renames || [];
                for (const rename of obj.$_terms.renames) {
                    Assert(rename.from !== from, 'Cannot rename the same key multiple times');
                }

                if (to instanceof Template) {
                    obj.$_mutateRegister(to);
                }

                obj.$_terms.renames.push({
                    from,
                    to,
                    options: ApplyToDefaults(internals.renameDefaults, options)
                });

                return obj;
            }
        },

        schema: {
            method(type = 'any') {

                return this.$_addRule({ name: 'schema', args: { type } });
            },
            validate(value, helpers, { type }) {

                if (Common.isSchema(value) &&
                    (type === 'any' || value.type === type)) {

                    return value;
                }

                return helpers.error('object.schema', { type });
            }
        },

        unknown: {
            method(allow) {

                return this.$_setFlag('unknown', allow !== false);
            }
        },

        with: {
            method(key, peers, options = {}) {

                return internals.dependency(this, 'with', key, peers, options);
            }
        },

        without: {
            method(key, peers, options = {}) {

                return internals.dependency(this, 'without', key, peers, options);
            }
        },

        xor: {
            method(...peers /*, [options] */) {

                Common.verifyFlat(peers, 'xor');

                return internals.dependency(this, 'xor', null, peers);
            }
        }
    },

    overrides: {

        default(value, options) {

            if (value === undefined) {
                value = Common.symbols.deepDefault;
            }

            return this.$_super.default(value, options);
        }
    },

    rebuild(schema) {

        if (schema.$_terms.keys) {
            const topo = new Topo();
            for (const child of schema.$_terms.keys) {
                Common.tryWithPath(() => topo.add(child, { after: child.schema.$_rootReferences(), group: child.key }), child.key);
            }

            schema.$_terms.keys = new internals.Keys(...topo.nodes);
        }
    },

    manifest: {

        build(obj, desc) {

            if (desc.keys) {
                obj = obj.keys(desc.keys);
            }

            if (desc.dependencies) {
                for (const { rel, key = null, peers, options } of desc.dependencies) {
                    obj = internals.dependency(obj, rel, key, peers, options);
                }
            }

            if (desc.patterns) {
                for (const { regex, schema, rule, fallthrough, matches } of desc.patterns) {
                    obj = obj.pattern(regex || schema, rule, { fallthrough, matches });
                }
            }

            if (desc.renames) {
                for (const { from, to, options } of desc.renames) {
                    obj = obj.rename(from, to, options);
                }
            }

            return obj;
        }
    },

    messages: {
        'object.and': '"{{#label}}" contains {{#presentWithLabels}} without its required peers {{#missingWithLabels}}',
        'object.assert': '"{{#label}}" is invalid because {if(#subject.key, `"` + #subject.key + `" failed to ` + (#message || "pass the assertion test"), #message || "the assertion failed")}',
        'object.base': '"{{#label}}" must be of type {{#type}}',
        'object.instance': '"{{#label}}" must be an instance of "{{#type}}"',
        'object.length': '"{{#label}}" must have {{#limit}} key{if(#limit == 1, "", "s")}',
        'object.max': '"{{#label}}" must have less than or equal to {{#limit}} key{if(#limit == 1, "", "s")}',
        'object.min': '"{{#label}}" must have at least {{#limit}} key{if(#limit == 1, "", "s")}',
        'object.missing': '"{{#label}}" must contain at least one of {{#peersWithLabels}}',
        'object.nand': '"{{#mainWithLabel}}" must not exist simultaneously with {{#peersWithLabels}}',
        'object.oxor': '"{{#label}}" contains a conflict between optional exclusive peers {{#peersWithLabels}}',
        'object.pattern.match': '"{{#label}}" keys failed to match pattern requirements',
        'object.refType': '"{{#label}}" must be a Joi reference',
        'object.rename.multiple': '"{{#label}}" cannot rename "{{#from}}" because multiple renames are disabled and another key was already renamed to "{{#to}}"',
        'object.rename.override': '"{{#label}}" cannot rename "{{#from}}" because override is disabled and target "{{#to}}" exists',
        'object.schema': '"{{#label}}" must be a Joi schema of {{#type}} type',
        'object.unknown': '"{{#label}}" is not allowed',
        'object.with': '"{{#mainWithLabel}}" missing required peer "{{#peerWithLabel}}"',
        'object.without': '"{{#mainWithLabel}}" conflict with forbidden peer "{{#peerWithLabel}}"',
        'object.xor': '"{{#label}}" contains a conflict between exclusive peers {{#peersWithLabels}}'
    }
});


// Helpers

internals.clone = function (value, prefs) {

    // Object

    if (typeof value === 'object') {
        if (prefs.nonEnumerables) {
            return Clone(value, { shallow: true });
        }

        const clone = Object.create(Object.getPrototypeOf(value));
        Object.assign(clone, value);
        return clone;
    }

    // Function

    const clone = function (...args) {

        return value.apply(this, args);
    };

    clone.prototype = Clone(value.prototype);
    Object.defineProperty(clone, 'name', { value: value.name, writable: false });
    Object.defineProperty(clone, 'length', { value: value.length, writable: false });
    Object.assign(clone, value);
    return clone;
};


internals.dependency = function (schema, rel, key, peers, options) {

    Assert(key === null || typeof key === 'string', rel, 'key must be a strings');

    // Extract options from peers array

    if (!options) {
        options = peers.length > 1 && typeof peers[peers.length - 1] === 'object' ? peers.pop() : {};
    }

    Common.assertOptions(options, ['separator']);

    peers = [].concat(peers);

    // Cast peer paths

    const separator = Common.default(options.separator, '.');
    const paths = [];
    for (const peer of peers) {
        Assert(typeof peer === 'string', rel, 'peers must be a string or a reference');
        paths.push(Compile.ref(peer, { separator, ancestor: 0, prefix: false }));
    }

    // Cast key

    if (key !== null) {
        key = Compile.ref(key, { separator, ancestor: 0, prefix: false });
    }

    // Add rule

    const obj = schema.clone();
    obj.$_terms.dependencies = obj.$_terms.dependencies || [];
    obj.$_terms.dependencies.push(new internals.Dependency(rel, key, paths, peers));
    return obj;
};


internals.dependencies = {

    and(schema, dep, value, state, prefs) {

        const missing = [];
        const present = [];
        const count = dep.peers.length;
        for (const peer of dep.peers) {
            if (peer.resolve(value, state, prefs, null, { shadow: false }) === undefined) {
                missing.push(peer.key);
            }
            else {
                present.push(peer.key);
            }
        }

        if (missing.length !== count &&
            present.length !== count) {

            return {
                code: 'object.and',
                context: {
                    present,
                    presentWithLabels: internals.keysToLabels(schema, present),
                    missing,
                    missingWithLabels: internals.keysToLabels(schema, missing)
                }
            };
        }
    },

    nand(schema, dep, value, state, prefs) {

        const present = [];
        for (const peer of dep.peers) {
            if (peer.resolve(value, state, prefs, null, { shadow: false }) !== undefined) {
                present.push(peer.key);
            }
        }

        if (present.length !== dep.peers.length) {
            return;
        }

        const main = dep.paths[0];
        const values = dep.paths.slice(1);
        return {
            code: 'object.nand',
            context: {
                main,
                mainWithLabel: internals.keysToLabels(schema, main),
                peers: values,
                peersWithLabels: internals.keysToLabels(schema, values)
            }
        };
    },

    or(schema, dep, value, state, prefs) {

        for (const peer of dep.peers) {
            if (peer.resolve(value, state, prefs, null, { shadow: false }) !== undefined) {
                return;
            }
        }

        return {
            code: 'object.missing',
            context: {
                peers: dep.paths,
                peersWithLabels: internals.keysToLabels(schema, dep.paths)
            }
        };
    },

    oxor(schema, dep, value, state, prefs) {

        const present = [];
        for (const peer of dep.peers) {
            if (peer.resolve(value, state, prefs, null, { shadow: false }) !== undefined) {
                present.push(peer.key);
            }
        }

        if (!present.length ||
            present.length === 1) {

            return;
        }

        const context = { peers: dep.paths, peersWithLabels: internals.keysToLabels(schema, dep.paths) };
        context.present = present;
        context.presentWithLabels = internals.keysToLabels(schema, present);
        return { code: 'object.oxor', context };
    },

    with(schema, dep, value, state, prefs) {

        for (const peer of dep.peers) {
            if (peer.resolve(value, state, prefs, null, { shadow: false }) === undefined) {
                return {
                    code: 'object.with',
                    context: {
                        main: dep.key.key,
                        mainWithLabel: internals.keysToLabels(schema, dep.key.key),
                        peer: peer.key,
                        peerWithLabel: internals.keysToLabels(schema, peer.key)
                    }
                };
            }
        }
    },

    without(schema, dep, value, state, prefs) {

        for (const peer of dep.peers) {
            if (peer.resolve(value, state, prefs, null, { shadow: false }) !== undefined) {
                return {
                    code: 'object.without',
                    context: {
                        main: dep.key.key,
                        mainWithLabel: internals.keysToLabels(schema, dep.key.key),
                        peer: peer.key,
                        peerWithLabel: internals.keysToLabels(schema, peer.key)
                    }
                };
            }
        }
    },

    xor(schema, dep, value, state, prefs) {

        const present = [];
        for (const peer of dep.peers) {
            if (peer.resolve(value, state, prefs, null, { shadow: false }) !== undefined) {
                present.push(peer.key);
            }
        }

        if (present.length === 1) {
            return;
        }

        const context = { peers: dep.paths, peersWithLabels: internals.keysToLabels(schema, dep.paths) };
        if (present.length === 0) {
            return { code: 'object.missing', context };
        }

        context.present = present;
        context.presentWithLabels = internals.keysToLabels(schema, present);
        return { code: 'object.xor', context };
    }
};


internals.keysToLabels = function (schema, keys) {

    if (Array.isArray(keys)) {
        return keys.map((key) => schema.$_mapLabels(key));
    }

    return schema.$_mapLabels(keys);
};


internals.rename = function (schema, value, state, prefs, errors) {

    const renamed = {};
    for (const rename of schema.$_terms.renames) {
        const matches = [];
        const pattern = typeof rename.from !== 'string';

        if (!pattern) {
            if (Object.prototype.hasOwnProperty.call(value, rename.from) &&
                (value[rename.from] !== undefined || !rename.options.ignoreUndefined)) {

                matches.push(rename);
            }
        }
        else {
            for (const from in value) {
                if (value[from] === undefined &&
                    rename.options.ignoreUndefined) {

                    continue;
                }

                if (from === rename.to) {
                    continue;
                }

                const match = rename.from.exec(from);
                if (!match) {
                    continue;
                }

                matches.push({ from, to: rename.to, match });
            }
        }

        for (const match of matches) {
            const from = match.from;
            let to = match.to;
            if (to instanceof Template) {
                to = to.render(value, state, prefs, match.match);
            }

            if (from === to) {
                continue;
            }

            if (!rename.options.multiple &&
                renamed[to]) {

                errors.push(schema.$_createError('object.rename.multiple', value, { from, to, pattern }, state, prefs));
                if (prefs.abortEarly) {
                    return false;
                }
            }

            if (Object.prototype.hasOwnProperty.call(value, to) &&
                !rename.options.override &&
                !renamed[to]) {

                errors.push(schema.$_createError('object.rename.override', value, { from, to, pattern }, state, prefs));
                if (prefs.abortEarly) {
                    return false;
                }
            }

            if (value[from] === undefined) {
                delete value[to];
            }
            else {
                value[to] = value[from];
            }

            renamed[to] = true;

            if (!rename.options.alias) {
                delete value[from];
            }
        }
    }

    return true;
};


internals.unknown = function (schema, value, unprocessed, errors, state, prefs) {

    if (schema.$_terms.patterns) {
        let hasMatches = false;
        const matches = schema.$_terms.patterns.map((pattern) => {

            if (pattern.matches) {
                hasMatches = true;
                return [];
            }
        });

        const ancestors = [value, ...state.ancestors];

        for (const key of unprocessed) {
            const item = value[key];
            const path = [...state.path, key];

            for (let i = 0; i < schema.$_terms.patterns.length; ++i) {
                const pattern = schema.$_terms.patterns[i];
                if (pattern.regex) {
                    const match = pattern.regex.test(key);
                    state.mainstay.tracer.debug(state, 'rule', `pattern.${i}`, match ? 'pass' : 'error');
                    if (!match) {
                        continue;
                    }
                }
                else {
                    if (!pattern.schema.$_match(key, state.nest(pattern.schema, `pattern.${i}`), prefs)) {
                        continue;
                    }
                }

                unprocessed.delete(key);

                const localState = state.localize(path, ancestors, { schema: pattern.rule, key });
                const result = pattern.rule.$_validate(item, localState, prefs);
                if (result.errors) {
                    if (prefs.abortEarly) {
                        return { value, errors: result.errors };
                    }

                    errors.push(...result.errors);
                }

                if (pattern.matches) {
                    matches[i].push(key);
                }

                value[key] = result.value;
                if (!pattern.fallthrough) {
                    break;
                }
            }
        }

        // Validate pattern matches rules

        if (hasMatches) {
            for (let i = 0; i < matches.length; ++i) {
                const match = matches[i];
                if (!match) {
                    continue;
                }

                const stpm = schema.$_terms.patterns[i].matches;
                const localState = state.localize(state.path, ancestors, stpm);
                const result = stpm.$_validate(match, localState, prefs);
                if (result.errors) {
                    const details = Errors.details(result.errors, { override: false });
                    details.matches = match;
                    const report = schema.$_createError('object.pattern.match', value, details, state, prefs);
                    if (prefs.abortEarly) {
                        return { value, errors: report };
                    }

                    errors.push(report);
                }
            }
        }
    }

    if (!unprocessed.size ||
        !schema.$_terms.keys && !schema.$_terms.patterns) {     // If no keys or patterns specified, unknown keys allowed

        return;
    }

    if (prefs.stripUnknown && !schema._flags.unknown ||
        prefs.skipFunctions) {

        const stripUnknown = prefs.stripUnknown ? (prefs.stripUnknown === true ? true : !!prefs.stripUnknown.objects) : false;

        for (const key of unprocessed) {
            if (stripUnknown) {
                delete value[key];
                unprocessed.delete(key);
            }
            else if (typeof value[key] === 'function') {
                unprocessed.delete(key);
            }
        }
    }

    const forbidUnknown = !Common.default(schema._flags.unknown, prefs.allowUnknown);
    if (forbidUnknown) {
        for (const unprocessedKey of unprocessed) {
            const localState = state.localize([...state.path, unprocessedKey], []);
            const report = schema.$_createError('object.unknown', value[unprocessedKey], { child: unprocessedKey }, localState, prefs, { flags: false });
            if (prefs.abortEarly) {
                return { value, errors: report };
            }

            errors.push(report);
        }
    }
};


internals.Dependency = class {

    constructor(rel, key, peers, paths) {

        this.rel = rel;
        this.key = key;
        this.peers = peers;
        this.paths = paths;
    }

    describe() {

        const desc = {
            rel: this.rel,
            peers: this.paths
        };

        if (this.key !== null) {
            desc.key = this.key.key;
        }

        if (this.peers[0].separator !== '.') {
            desc.options = { separator: this.peers[0].separator };
        }

        return desc;
    }
};


internals.Keys = class extends Array {

    concat(source) {

        const result = this.slice();

        const keys = new Map();
        for (let i = 0; i < result.length; ++i) {
            keys.set(result[i].key, i);
        }

        for (const item of source) {
            const key = item.key;
            const pos = keys.get(key);
            if (pos !== undefined) {
                result[pos] = { key, schema: result[pos].schema.concat(item.schema) };
            }
            else {
                result.push(item);
            }
        }

        return result;
    }
};


/***/ }),

/***/ 9713:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Any = __webpack_require__(6866);
const Common = __webpack_require__(3221);
const Compile = __webpack_require__(3579);
const Errors = __webpack_require__(2150);


const internals = {};


module.exports = Any.extend({

    type: 'link',

    properties: {
        schemaChain: true
    },

    terms: {

        link: { init: null, manifest: 'single', register: false }
    },

    args(schema, ref) {

        return schema.ref(ref);
    },

    validate(value, { schema, state, prefs }) {

        Assert(schema.$_terms.link, 'Uninitialized link schema');

        const linked = internals.generate(schema, value, state, prefs);
        const ref = schema.$_terms.link[0].ref;
        return linked.$_validate(value, state.nest(linked, `link:${ref.display}:${linked.type}`), prefs);
    },

    generate(schema, value, state, prefs) {

        return internals.generate(schema, value, state, prefs);
    },

    rules: {

        ref: {
            method(ref) {

                Assert(!this.$_terms.link, 'Cannot reinitialize schema');

                ref = Compile.ref(ref);

                Assert(ref.type === 'value' || ref.type === 'local', 'Invalid reference type:', ref.type);
                Assert(ref.type === 'local' || ref.ancestor === 'root' || ref.ancestor > 0, 'Link cannot reference itself');

                const obj = this.clone();
                obj.$_terms.link = [{ ref }];
                return obj;
            }
        },

        relative: {
            method(enabled = true) {

                return this.$_setFlag('relative', enabled);
            }
        }
    },

    overrides: {

        concat(source) {

            Assert(this.$_terms.link, 'Uninitialized link schema');
            Assert(Common.isSchema(source), 'Invalid schema object');
            Assert(source.type !== 'link', 'Cannot merge type link with another link');

            const obj = this.clone();

            if (!obj.$_terms.whens) {
                obj.$_terms.whens = [];
            }

            obj.$_terms.whens.push({ concat: source });
            return obj.$_mutateRebuild();
        }
    },

    manifest: {

        build(obj, desc) {

            Assert(desc.link, 'Invalid link description missing link');
            return obj.ref(desc.link);
        }
    }
});


// Helpers

internals.generate = function (schema, value, state, prefs) {

    let linked = state.mainstay.links.get(schema);
    if (linked) {
        return linked._generate(value, state, prefs).schema;
    }

    const ref = schema.$_terms.link[0].ref;
    const { perspective, path } = internals.perspective(ref, state);
    internals.assert(perspective, 'which is outside of schema boundaries', ref, schema, state, prefs);

    try {
        linked = path.length ? perspective.$_reach(path) : perspective;
    }
    catch (ignoreErr) {
        internals.assert(false, 'to non-existing schema', ref, schema, state, prefs);
    }

    internals.assert(linked.type !== 'link', 'which is another link', ref, schema, state, prefs);

    if (!schema._flags.relative) {
        state.mainstay.links.set(schema, linked);
    }

    return linked._generate(value, state, prefs).schema;
};


internals.perspective = function (ref, state) {

    if (ref.type === 'local') {
        for (const { schema, key } of state.schemas) {                              // From parent to root
            const id = schema._flags.id || key;
            if (id === ref.path[0]) {
                return { perspective: schema, path: ref.path.slice(1) };
            }

            if (schema.$_terms.shared) {
                for (const shared of schema.$_terms.shared) {
                    if (shared._flags.id === ref.path[0]) {
                        return { perspective: shared, path: ref.path.slice(1) };
                    }
                }
            }
        }

        return { perspective: null, path: null };
    }

    if (ref.ancestor === 'root') {
        return { perspective: state.schemas[state.schemas.length - 1].schema, path: ref.path };
    }

    return { perspective: state.schemas[ref.ancestor] && state.schemas[ref.ancestor].schema, path: ref.path };
};


internals.assert = function (condition, message, ref, schema, state, prefs) {

    if (condition) {                // Manual check to avoid generating error message on success
        return;
    }

    Assert(false, `"${Errors.label(schema._flags, state, prefs)}" contains link reference "${ref.display}" ${message}`);
};


/***/ }),

/***/ 3730:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Any = __webpack_require__(6866);
const Common = __webpack_require__(3221);


const internals = {
    numberRx: /^\s*[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:e([+-]?\d+))?\s*$/i,
    precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/
};


module.exports = Any.extend({

    type: 'number',

    flags: {

        unsafe: { default: false }
    },

    coerce: {
        from: 'string',
        method(value, { schema, error }) {

            const matches = value.match(internals.numberRx);
            if (!matches) {
                return;
            }

            value = value.trim();
            const result = { value: parseFloat(value) };

            if (result.value === 0) {
                result.value = 0;           // -0
            }

            if (!schema._flags.unsafe) {
                if (value.match(/e/i)) {
                    const constructed = internals.normalizeExponent(`${result.value / Math.pow(10, matches[1])}e${matches[1]}`);
                    if (constructed !== internals.normalizeExponent(value)) {
                        result.errors = error('number.unsafe');
                        return result;
                    }
                }
                else {
                    const string = result.value.toString();
                    if (string.match(/e/i)) {
                        return result;
                    }

                    if (string !== internals.normalizeDecimal(value)) {
                        result.errors = error('number.unsafe');
                        return result;
                    }
                }
            }

            return result;
        }
    },

    validate(value, { schema, error, prefs }) {

        if (value === Infinity ||
            value === -Infinity) {

            return { value, errors: error('number.infinity') };
        }

        if (!Common.isNumber(value)) {
            return { value, errors: error('number.base') };
        }

        const result = { value };

        if (prefs.convert) {
            const rule = schema.$_getRule('precision');
            if (rule) {
                const precision = Math.pow(10, rule.args.limit);                    // This is conceptually equivalent to using toFixed but it should be much faster
                result.value = Math.round(result.value * precision) / precision;
            }
        }

        if (result.value === 0) {
            result.value = 0;           // -0
        }

        if (!schema._flags.unsafe &&
            (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER)) {

            result.errors = error('number.unsafe');
        }

        return result;
    },

    rules: {

        compare: {
            method: false,
            validate(value, helpers, { limit }, { name, operator, args }) {

                if (Common.compare(value, limit, operator)) {
                    return value;
                }

                return helpers.error('number.' + name, { limit: args.limit, value });
            },
            args: [
                {
                    name: 'limit',
                    ref: true,
                    assert: Common.isNumber,
                    message: 'must be a number'
                }
            ]
        },

        greater: {
            method(limit) {

                return this.$_addRule({ name: 'greater', method: 'compare', args: { limit }, operator: '>' });
            }
        },

        integer: {
            method() {

                return this.$_addRule('integer');
            },
            validate(value, helpers) {

                if (Math.trunc(value) - value === 0) {
                    return value;
                }

                return helpers.error('number.integer');
            }
        },

        less: {
            method(limit) {

                return this.$_addRule({ name: 'less', method: 'compare', args: { limit }, operator: '<' });
            }
        },

        max: {
            method(limit) {

                return this.$_addRule({ name: 'max', method: 'compare', args: { limit }, operator: '<=' });
            }
        },

        min: {
            method(limit) {

                return this.$_addRule({ name: 'min', method: 'compare', args: { limit }, operator: '>=' });
            }
        },

        multiple: {
            method(base) {

                return this.$_addRule({ name: 'multiple', args: { base } });
            },
            validate(value, helpers, { base }, options) {

                if (value % base === 0) {
                    return value;
                }

                return helpers.error('number.multiple', { multiple: options.args.base, value });
            },
            args: [
                {
                    name: 'base',
                    ref: true,
                    assert: (value) => typeof value === 'number' && isFinite(value) && value > 0,
                    message: 'must be a positive number'
                }
            ],
            multi: true
        },

        negative: {
            method() {

                return this.sign('negative');
            }
        },

        port: {
            method() {

                return this.$_addRule('port');
            },
            validate(value, helpers) {

                if (Number.isSafeInteger(value) &&
                    value >= 0 &&
                    value <= 65535) {

                    return value;
                }

                return helpers.error('number.port');
            }
        },

        positive: {
            method() {

                return this.sign('positive');
            }
        },

        precision: {
            method(limit) {

                Assert(Number.isSafeInteger(limit), 'limit must be an integer');

                return this.$_addRule({ name: 'precision', args: { limit } });
            },
            validate(value, helpers, { limit }) {

                const places = value.toString().match(internals.precisionRx);
                const decimals = Math.max((places[1] ? places[1].length : 0) - (places[2] ? parseInt(places[2], 10) : 0), 0);
                if (decimals <= limit) {
                    return value;
                }

                return helpers.error('number.precision', { limit, value });
            },
            convert: true
        },

        sign: {
            method(sign) {

                Assert(['negative', 'positive'].includes(sign), 'Invalid sign', sign);

                return this.$_addRule({ name: 'sign', args: { sign } });
            },
            validate(value, helpers, { sign }) {

                if (sign === 'negative' && value < 0 ||
                    sign === 'positive' && value > 0) {

                    return value;
                }

                return helpers.error(`number.${sign}`);
            }
        },

        unsafe: {
            method(enabled = true) {

                Assert(typeof enabled === 'boolean', 'enabled must be a boolean');

                return this.$_setFlag('unsafe', enabled);
            }
        }
    },

    cast: {
        string: {
            from: (value) => typeof value === 'number',
            to(value, helpers) {

                return value.toString();
            }
        }
    },

    messages: {
        'number.base': '"{{#label}}" must be a number',
        'number.greater': '"{{#label}}" must be greater than {{#limit}}',
        'number.infinity': '"{{#label}}" cannot be infinity',
        'number.integer': '"{{#label}}" must be an integer',
        'number.less': '"{{#label}}" must be less than {{#limit}}',
        'number.max': '"{{#label}}" must be less than or equal to {{#limit}}',
        'number.min': '"{{#label}}" must be larger than or equal to {{#limit}}',
        'number.multiple': '"{{#label}}" must be a multiple of {{#multiple}}',
        'number.negative': '"{{#label}}" must be a negative number',
        'number.port': '"{{#label}}" must be a valid port',
        'number.positive': '"{{#label}}" must be a positive number',
        'number.precision': '"{{#label}}" must have no more than {{#limit}} decimal places',
        'number.unsafe': '"{{#label}}" must be a safe number'
    }
});


// Helpers

internals.normalizeExponent = function (str) {

    return str
        .replace(/E/, 'e')
        .replace(/\.(\d*[1-9])?0+e/, '.$1e')
        .replace(/\.e/, 'e')
        .replace(/e\+/, 'e')
        .replace(/^\+/, '')
        .replace(/^(-?)0+([1-9])/, '$1$2');
};


internals.normalizeDecimal = function (str) {

    str = str
        .replace(/^\+/, '')
        .replace(/\.0+$/, '')
        .replace(/^(-?)\.([^\.]*)$/, '$10.$2')
        .replace(/^(-?)0+([1-9])/, '$1$2');

    if (str.includes('.') &&
        str.endsWith('0')) {

        str = str.replace(/0+$/, '');
    }

    if (str === '-0') {
        return '0';
    }

    return str;
};


/***/ }),

/***/ 1443:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Keys = __webpack_require__(1732);


const internals = {};


module.exports = Keys.extend({

    type: 'object',

    cast: {
        map: {
            from: (value) => value && typeof value === 'object',
            to(value, helpers) {

                return new Map(Object.entries(value));
            }
        }
    }
});


/***/ }),

/***/ 7769:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Domain = __webpack_require__(5541);
const Email = __webpack_require__(7318);
const EscapeRegex = __webpack_require__(1965);
const Tlds = __webpack_require__(5026);

const Any = __webpack_require__(6866);
const Common = __webpack_require__(3221);

const Ip = __webpack_require__(8751);
const Uri = __webpack_require__(18);


const internals = {
    tlds: Tlds instanceof Set ? { tlds: { allow: Tlds, deny: null } } : false,              // $lab:coverage:ignore$
    base64Regex: {
        // paddingRequired
        true: {
            // urlSafe
            true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}==|[\w\-]{3}=)?$/,
            false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/
        },
        false: {
            true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}(==)?|[\w\-]{3}=?)?$/,
            false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/
        }
    },
    dataUriRegex: /^data:[\w+.-]+\/[\w+.-]+;((charset=[\w-]+|base64),)?(.*)$/,
    hexRegex: /^[a-f0-9]+$/i,
    hostRegex: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
    ipRegex: Ip.createIpRegex(['ipv4', 'ipv6', 'ipvfuture'], 'optional'),
    isoDurationRegex: /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/,

    guidBrackets: {
        '{': '}', '[': ']', '(': ')', '': ''
    },
    guidVersions: {
        uuidv1: '1',
        uuidv2: '2',
        uuidv3: '3',
        uuidv4: '4',
        uuidv5: '5'
    },

    cidrPresences: ['required', 'optional', 'forbidden'],
    normalizationForms: ['NFC', 'NFD', 'NFKC', 'NFKD']
};


module.exports = Any.extend({

    type: 'string',

    flags: {

        insensitive: { default: false },
        truncate: { default: false }
    },

    terms: {

        replacements: { init: null }
    },

    coerce: {
        from: 'string',
        method(value, { schema, state, prefs }) {

            const normalize = schema.$_getRule('normalize');
            if (normalize) {
                value = value.normalize(normalize.args.form);
            }

            const casing = schema.$_getRule('case');
            if (casing) {
                value = casing.args.direction === 'upper' ? value.toLocaleUpperCase() : value.toLocaleLowerCase();
            }

            const trim = schema.$_getRule('trim');
            if (trim &&
                trim.args.enabled) {

                value = value.trim();
            }

            if (schema.$_terms.replacements) {
                for (const replacement of schema.$_terms.replacements) {
                    value = value.replace(replacement.pattern, replacement.replacement);
                }
            }

            const hex = schema.$_getRule('hex');
            if (hex &&
                hex.args.options.byteAligned &&
                value.length % 2 !== 0) {

                value = `0${value}`;
            }

            if (schema.$_getRule('isoDate')) {
                const iso = internals.isoDate(value);
                if (iso) {
                    value = iso;
                }
            }

            if (schema._flags.truncate) {
                const rule = schema.$_getRule('max');
                if (rule) {
                    let limit = rule.args.limit;
                    if (Common.isResolvable(limit)) {
                        limit = limit.resolve(value, state, prefs);
                        if (!Common.limit(limit)) {
                            return { value, errors: schema.$_createError('any.ref', limit, { ref: rule.args.limit, arg: 'limit', reason: 'must be a positive integer' }, state, prefs) };
                        }
                    }

                    value = value.slice(0, limit);
                }
            }

            return { value };
        }
    },

    validate(value, { error }) {

        if (typeof value !== 'string') {
            return { value, errors: error('string.base') };
        }

        if (value === '') {
            return { value, errors: error('string.empty') };
        }
    },

    rules: {

        alphanum: {
            method() {

                return this.$_addRule('alphanum');
            },
            validate(value, helpers) {

                if (/^[a-zA-Z0-9]+$/.test(value)) {
                    return value;
                }

                return helpers.error('string.alphanum');
            }
        },

        base64: {
            method(options = {}) {

                Common.assertOptions(options, ['paddingRequired', 'urlSafe']);

                options = { urlSafe: false, paddingRequired: true, ...options };
                Assert(typeof options.paddingRequired === 'boolean', 'paddingRequired must be boolean');
                Assert(typeof options.urlSafe === 'boolean', 'urlSafe must be boolean');

                return this.$_addRule({ name: 'base64', args: { options } });
            },
            validate(value, helpers, { options }) {

                const regex = internals.base64Regex[options.paddingRequired][options.urlSafe];
                if (regex.test(value)) {
                    return value;
                }

                return helpers.error('string.base64');
            }
        },

        case: {
            method(direction) {

                Assert(['lower', 'upper'].includes(direction), 'Invalid case:', direction);

                return this.$_addRule({ name: 'case', args: { direction } });
            },
            validate(value, helpers, { direction }) {

                if (direction === 'lower' && value === value.toLocaleLowerCase() ||
                    direction === 'upper' && value === value.toLocaleUpperCase()) {

                    return value;
                }

                return helpers.error(`string.${direction}case`);
            },
            convert: true
        },

        creditCard: {
            method() {

                return this.$_addRule('creditCard');
            },
            validate(value, helpers) {

                let i = value.length;
                let sum = 0;
                let mul = 1;

                while (i--) {
                    const char = value.charAt(i) * mul;
                    sum = sum + (char - (char > 9) * 9);
                    mul = mul ^ 3;
                }

                if (sum > 0 &&
                    sum % 10 === 0) {

                    return value;
                }

                return helpers.error('string.creditCard');
            }
        },

        dataUri: {
            method(options = {}) {

                Common.assertOptions(options, ['paddingRequired']);

                options = { paddingRequired: true, ...options };
                Assert(typeof options.paddingRequired === 'boolean', 'paddingRequired must be boolean');

                return this.$_addRule({ name: 'dataUri', args: { options } });
            },
            validate(value, helpers, { options }) {

                const matches = value.match(internals.dataUriRegex);

                if (matches) {
                    if (!matches[2]) {
                        return value;
                    }

                    if (matches[2] !== 'base64') {
                        return value;
                    }

                    const base64regex = internals.base64Regex[options.paddingRequired].false;
                    if (base64regex.test(matches[3])) {
                        return value;
                    }
                }

                return helpers.error('string.dataUri');
            }
        },

        domain: {
            method(options) {

                if (options) {
                    Common.assertOptions(options, ['allowUnicode', 'minDomainSegments', 'tlds']);
                }

                const address = internals.addressOptions(options);
                return this.$_addRule({ name: 'domain', args: { options }, address });
            },
            validate(value, helpers, args, { address }) {

                if (Domain.isValid(value, address)) {
                    return value;
                }

                return helpers.error('string.domain');
            }
        },

        email: {
            method(options = {}) {

                Common.assertOptions(options, ['allowUnicode', 'ignoreLength', 'minDomainSegments', 'multiple', 'separator', 'tlds']);
                Assert(options.multiple === undefined || typeof options.multiple === 'boolean', 'multiple option must be an boolean');

                const address = internals.addressOptions(options);
                const regex = new RegExp(`\\s*[${options.separator ? EscapeRegex(options.separator) : ','}]\\s*`);

                return this.$_addRule({ name: 'email', args: { options }, regex, address });
            },
            validate(value, helpers, { options }, { regex, address }) {

                const emails = options.multiple ? value.split(regex) : [value];
                const invalids = [];
                for (const email of emails) {
                    if (!Email.isValid(email, address)) {
                        invalids.push(email);
                    }
                }

                if (!invalids.length) {
                    return value;
                }

                return helpers.error('string.email', { value, invalids });
            }
        },

        guid: {
            alias: 'uuid',
            method(options = {}) {

                Common.assertOptions(options, ['version']);

                let versionNumbers = '';

                if (options.version) {
                    const versions = [].concat(options.version);

                    Assert(versions.length >= 1, 'version must have at least 1 valid version specified');
                    const set = new Set();

                    for (let i = 0; i < versions.length; ++i) {
                        const version = versions[i];
                        Assert(typeof version === 'string', 'version at position ' + i + ' must be a string');
                        const versionNumber = internals.guidVersions[version.toLowerCase()];
                        Assert(versionNumber, 'version at position ' + i + ' must be one of ' + Object.keys(internals.guidVersions).join(', '));
                        Assert(!set.has(versionNumber), 'version at position ' + i + ' must not be a duplicate');

                        versionNumbers += versionNumber;
                        set.add(versionNumber);
                    }
                }

                const regex = new RegExp(`^([\\[{\\(]?)[0-9A-F]{8}([:-]?)[0-9A-F]{4}\\2?[${versionNumbers || '0-9A-F'}][0-9A-F]{3}\\2?[${versionNumbers ? '89AB' : '0-9A-F'}][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$`, 'i');

                return this.$_addRule({ name: 'guid', args: { options }, regex });
            },
            validate(value, helpers, args, { regex }) {

                const results = regex.exec(value);

                if (!results) {
                    return helpers.error('string.guid');
                }

                // Matching braces

                if (internals.guidBrackets[results[1]] !== results[results.length - 1]) {
                    return helpers.error('string.guid');
                }

                return value;
            }
        },

        hex: {
            method(options = {}) {

                Common.assertOptions(options, ['byteAligned']);

                options = { byteAligned: false, ...options };
                Assert(typeof options.byteAligned === 'boolean', 'byteAligned must be boolean');

                return this.$_addRule({ name: 'hex', args: { options } });
            },
            validate(value, helpers, { options }) {

                if (!internals.hexRegex.test(value)) {
                    return helpers.error('string.hex');
                }

                if (options.byteAligned &&
                    value.length % 2 !== 0) {

                    return helpers.error('string.hexAlign');
                }

                return value;
            }
        },

        hostname: {
            method() {

                return this.$_addRule('hostname');
            },
            validate(value, helpers) {

                if (value.length <= 255 && internals.hostRegex.test(value) ||
                    internals.ipRegex.test(value)) {

                    return value;
                }

                return helpers.error('string.hostname');
            }
        },

        insensitive: {
            method() {

                return this.$_setFlag('insensitive', true);
            }
        },

        ip: {
            method(options = {}) {

                Common.assertOptions(options, ['cidr', 'version']);

                options = Object.assign({}, options);       // Shallow cloned

                let regex = internals.ipRegex;
                if (options.cidr) {
                    Assert(typeof options.cidr === 'string', 'cidr must be a string');
                    options.cidr = options.cidr.toLowerCase();

                    Assert(internals.cidrPresences.includes(options.cidr), 'cidr must be one of ' + internals.cidrPresences.join(', '));

                    if (!options.version &&
                        options.cidr !== 'optional') {

                        regex = Ip.createIpRegex(['ipv4', 'ipv6', 'ipvfuture'], options.cidr);
                    }
                }
                else {
                    options.cidr = 'optional';
                }

                let versions;
                if (options.version) {
                    if (!Array.isArray(options.version)) {
                        options.version = [options.version];
                    }

                    Assert(options.version.length >= 1, 'version must have at least 1 version specified');

                    versions = [];
                    for (let i = 0; i < options.version.length; ++i) {
                        let version = options.version[i];
                        Assert(typeof version === 'string', 'version at position ' + i + ' must be a string');
                        version = version.toLowerCase();
                        Assert(Ip.versions[version], 'version at position ' + i + ' must be one of ' + Object.keys(Ip.versions).join(', '));
                        versions.push(version);
                    }

                    versions = Array.from(new Set(versions));
                    regex = Ip.createIpRegex(versions, options.cidr);
                }

                return this.$_addRule({ name: 'ip', args: { options }, versions, regex });
            },
            validate(value, helpers, { options }, { versions, regex }) {

                if (regex.test(value)) {
                    return value;
                }

                if (versions) {
                    return helpers.error('string.ipVersion', { value, cidr: options.cidr, version: versions });
                }

                return helpers.error('string.ip', { value, cidr: options.cidr });
            }
        },

        isoDate: {
            method() {

                return this.$_addRule('isoDate');
            },
            validate(value, { error }) {

                if (internals.isoDate(value)) {
                    return value;
                }

                return error('string.isoDate');
            }
        },

        isoDuration: {
            method() {

                return this.$_addRule('isoDuration');
            },
            validate(value, helpers) {

                if (internals.isoDurationRegex.test(value)) {
                    return value;
                }

                return helpers.error('string.isoDuration');
            }
        },

        length: {
            method(limit, encoding) {

                return internals.length(this, 'length', limit, '=', encoding);
            },
            validate(value, helpers, { limit, encoding }, { name, operator, args }) {

                const length = encoding ? Buffer && Buffer.byteLength(value, encoding) : value.length;      // $lab:coverage:ignore$
                if (Common.compare(length, limit, operator)) {
                    return value;
                }

                return helpers.error('string.' + name, { limit: args.limit, value, encoding });
            },
            args: [
                {
                    name: 'limit',
                    ref: true,
                    assert: Common.limit,
                    message: 'must be a positive integer'
                },
                'encoding'
            ]
        },

        lowercase: {
            method() {

                return this.case('lower');
            }
        },

        max: {
            method(limit, encoding) {

                return internals.length(this, 'max', limit, '<=', encoding);
            },
            args: ['limit', 'encoding']
        },

        min: {
            method(limit, encoding) {

                return internals.length(this, 'min', limit, '>=', encoding);
            },
            args: ['limit', 'encoding']
        },

        normalize: {
            method(form = 'NFC') {

                Assert(internals.normalizationForms.includes(form), 'normalization form must be one of ' + internals.normalizationForms.join(', '));

                return this.$_addRule({ name: 'normalize', args: { form } });
            },
            validate(value, { error }, { form }) {

                if (value === value.normalize(form)) {
                    return value;
                }

                return error('string.normalize', { value, form });
            },
            convert: true
        },

        pattern: {
            alias: 'regex',
            method(regex, options = {}) {

                Assert(regex instanceof RegExp, 'regex must be a RegExp');
                Assert(!regex.flags.includes('g') && !regex.flags.includes('y'), 'regex should not use global or sticky mode');

                if (typeof options === 'string') {
                    options = { name: options };
                }

                Common.assertOptions(options, ['invert', 'name']);

                const errorCode = ['string.pattern', options.invert ? '.invert' : '', options.name ? '.name' : '.base'].join('');
                return this.$_addRule({ name: 'pattern', args: { regex, options }, errorCode });
            },
            validate(value, helpers, { regex, options }, { errorCode }) {

                const patternMatch = regex.test(value);

                if (patternMatch ^ options.invert) {
                    return value;
                }

                return helpers.error(errorCode, { name: options.name, regex, value });
            },
            args: ['regex', 'options'],
            multi: true
        },

        replace: {
            method(pattern, replacement) {

                if (typeof pattern === 'string') {
                    pattern = new RegExp(EscapeRegex(pattern), 'g');
                }

                Assert(pattern instanceof RegExp, 'pattern must be a RegExp');
                Assert(typeof replacement === 'string', 'replacement must be a String');

                const obj = this.clone();

                if (!obj.$_terms.replacements) {
                    obj.$_terms.replacements = [];
                }

                obj.$_terms.replacements.push({ pattern, replacement });
                return obj;
            }
        },

        token: {
            method() {

                return this.$_addRule('token');
            },
            validate(value, helpers) {

                if (/^\w+$/.test(value)) {
                    return value;
                }

                return helpers.error('string.token');
            }
        },

        trim: {
            method(enabled = true) {

                Assert(typeof enabled === 'boolean', 'enabled must be a boolean');

                return this.$_addRule({ name: 'trim', args: { enabled } });
            },
            validate(value, helpers, { enabled }) {

                if (!enabled ||
                    value === value.trim()) {

                    return value;
                }

                return helpers.error('string.trim');
            },
            convert: true
        },

        truncate: {
            method(enabled = true) {

                Assert(typeof enabled === 'boolean', 'enabled must be a boolean');

                return this.$_setFlag('truncate', enabled);
            }
        },

        uppercase: {
            method() {

                return this.case('upper');
            }
        },

        uri: {
            method(options = {}) {

                Common.assertOptions(options, ['allowRelative', 'allowQuerySquareBrackets', 'domain', 'relativeOnly', 'scheme']);

                if (options.domain) {
                    Common.assertOptions(options.domain, ['allowUnicode', 'minDomainSegments', 'tlds']);
                }

                const regex = Uri.createRegex(options);
                const domain = options.domain ? internals.addressOptions(options.domain) : null;
                return this.$_addRule({ name: 'uri', args: { options }, regex, domain });
            },
            validate(value, helpers, { options }, { regex, domain }) {

                if (['http:/', 'https:/'].includes(value)) {            // scheme:/ is technically valid but makes no sense
                    return helpers.error('string.uri');
                }

                const match = regex.exec(value);
                if (match) {
                    if (domain &&
                        !Domain.isValid(match[1], domain)) {

                        return helpers.error('string.domain', { value: match[1] });
                    }

                    return value;
                }

                if (options.relativeOnly) {
                    return helpers.error('string.uriRelativeOnly');
                }

                if (options.scheme) {
                    return helpers.error('string.uriCustomScheme', { scheme: regex.scheme, value });
                }

                return helpers.error('string.uri');
            }
        }
    },

    manifest: {

        build(obj, desc) {

            if (desc.replacements) {
                for (const { pattern, replacement } of desc.replacements) {
                    obj = obj.replace(pattern, replacement);
                }
            }

            return obj;
        }
    },

    messages: {
        'string.alphanum': '"{{#label}}" must only contain alpha-numeric characters',
        'string.base': '"{{#label}}" must be a string',
        'string.base64': '"{{#label}}" must be a valid base64 string',
        'string.creditCard': '"{{#label}}" must be a credit card',
        'string.dataUri': '"{{#label}}" must be a valid dataUri string',
        'string.domain': '"{{#label}}" must contain a valid domain name',
        'string.email': '"{{#label}}" must be a valid email',
        'string.empty': '"{{#label}}" is not allowed to be empty',
        'string.guid': '"{{#label}}" must be a valid GUID',
        'string.hex': '"{{#label}}" must only contain hexadecimal characters',
        'string.hexAlign': '"{{#label}}" hex decoded representation must be byte aligned',
        'string.hostname': '"{{#label}}" must be a valid hostname',
        'string.ip': '"{{#label}}" must be a valid ip address with a {{#cidr}} CIDR',
        'string.ipVersion': '"{{#label}}" must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR',
        'string.isoDate': '"{{#label}}" must be in iso format',
        'string.isoDuration': '"{{#label}}" must be a valid ISO 8601 duration',
        'string.length': '"{{#label}}" length must be {{#limit}} characters long',
        'string.lowercase': '"{{#label}}" must only contain lowercase characters',
        'string.max': '"{{#label}}" length must be less than or equal to {{#limit}} characters long',
        'string.min': '"{{#label}}" length must be at least {{#limit}} characters long',
        'string.normalize': '"{{#label}}" must be unicode normalized in the {{#form}} form',
        'string.token': '"{{#label}}" must only contain alpha-numeric and underscore characters',
        'string.pattern.base': '"{{#label}}" with value "{[.]}" fails to match the required pattern: {{#regex}}',
        'string.pattern.name': '"{{#label}}" with value "{[.]}" fails to match the {{#name}} pattern',
        'string.pattern.invert.base': '"{{#label}}" with value "{[.]}" matches the inverted pattern: {{#regex}}',
        'string.pattern.invert.name': '"{{#label}}" with value "{[.]}" matches the inverted {{#name}} pattern',
        'string.trim': '"{{#label}}" must not have leading or trailing whitespace',
        'string.uri': '"{{#label}}" must be a valid uri',
        'string.uriCustomScheme': '"{{#label}}" must be a valid uri with a scheme matching the {{#scheme}} pattern',
        'string.uriRelativeOnly': '"{{#label}}" must be a valid relative uri',
        'string.uppercase': '"{{#label}}" must only contain uppercase characters'
    }
});


// Helpers

internals.addressOptions = function (options) {

    if (!options) {
        return options;
    }

    // minDomainSegments

    Assert(options.minDomainSegments === undefined ||
        Number.isSafeInteger(options.minDomainSegments) && options.minDomainSegments > 0, 'minDomainSegments must be a positive integer');

    // tlds

    if (options.tlds === false) {
        return options;
    }

    if (options.tlds === true ||
        options.tlds === undefined) {

        Assert(internals.tlds, 'Built-in TLD list disabled');
        return Object.assign({}, options, internals.tlds);
    }

    Assert(typeof options.tlds === 'object', 'tlds must be true, false, or an object');

    const deny = options.tlds.deny;
    if (deny) {
        if (Array.isArray(deny)) {
            options = Object.assign({}, options, { tlds: { deny: new Set(deny) } });
        }

        Assert(options.tlds.deny instanceof Set, 'tlds.deny must be an array, Set, or boolean');
        Assert(!options.tlds.allow, 'Cannot specify both tlds.allow and tlds.deny lists');
        return options;
    }

    const allow = options.tlds.allow;
    if (!allow) {
        return options;
    }

    if (allow === true) {
        Assert(internals.tlds, 'Built-in TLD list disabled');
        return Object.assign({}, options, internals.tlds);
    }

    if (Array.isArray(allow)) {
        options = Object.assign({}, options, { tlds: { allow: new Set(allow) } });
    }

    Assert(options.tlds.allow instanceof Set, 'tlds.allow must be an array, Set, or boolean');
    return options;
};


internals.isoDate = function (value) {

    if (!Common.isIsoDate(value)) {
        return null;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return null;
    }

    return date.toISOString();
};


internals.length = function (schema, name, limit, operator, encoding) {

    Assert(!encoding || Buffer && Buffer.isEncoding(encoding), 'Invalid encoding:', encoding);      // $lab:coverage:ignore$

    return schema.$_addRule({ name, method: 'length', args: { limit, encoding }, operator });
};


/***/ }),

/***/ 8751:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Uri = __webpack_require__(18);


const internals = {};


exports.cidrs = {
    ipv4: {
        required: '\\/(?:' + Uri.ipv4Cidr + ')',
        optional: '(?:\\/(?:' + Uri.ipv4Cidr + '))?',
        forbidden: ''
    },
    ipv6: {
        required: '\\/' + Uri.ipv6Cidr,
        optional: '(?:\\/' + Uri.ipv6Cidr + ')?',
        forbidden: ''
    },
    ipvfuture: {
        required: '\\/' + Uri.ipv6Cidr,
        optional: '(?:\\/' + Uri.ipv6Cidr + ')?',
        forbidden: ''
    }
};


exports.versions = {
    ipv4: Uri.ipv4address,
    ipv6: Uri.ipv6address,
    ipvfuture: Uri.ipvFuture
};


exports.createIpRegex = function (versions, cidr) {

    const parts = versions.map((version) => exports.versions[version] + exports.cidrs[version][cidr]);
    return new RegExp('^(?:' + parts.join('|') + ')$');
};


/***/ }),

/***/ 18:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const EscapeRegex = __webpack_require__(1965);


const internals = {};


internals.generate = function () {

    const rfc3986 = {};

    const hexDigit = '\\dA-Fa-f';                                               // HEXDIG = DIGIT / "A" / "B" / "C" / "D" / "E" / "F"
    const hexDigitOnly = '[' + hexDigit + ']';

    const unreserved = '\\w-\\.~';                                              // unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
    const subDelims = '!\\$&\'\\(\\)\\*\\+,;=';                                 // sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
    const pctEncoded = '%' + hexDigit;                                          // pct-encoded = "%" HEXDIG HEXDIG
    const pchar = unreserved + pctEncoded + subDelims + ':@';                   // pchar = unreserved / pct-encoded / sub-delims / ":" / "@"
    const pcharOnly = '[' + pchar + ']';
    const decOctect = '(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])';     // dec-octet = DIGIT / %x31-39 DIGIT / "1" 2DIGIT / "2" %x30-34 DIGIT / "25" %x30-35  ; 0-9 / 10-99 / 100-199 / 200-249 / 250-255

    rfc3986.ipv4address = '(?:' + decOctect + '\\.){3}' + decOctect;            // IPv4address = dec-octet "." dec-octet "." dec-octet "." dec-octet

    /*
        h16 = 1*4HEXDIG ; 16 bits of address represented in hexadecimal
        ls32 = ( h16 ":" h16 ) / IPv4address ; least-significant 32 bits of address
        IPv6address =                            6( h16 ":" ) ls32
                    /                       "::" 5( h16 ":" ) ls32
                    / [               h16 ] "::" 4( h16 ":" ) ls32
                    / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
                    / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
                    / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
                    / [ *4( h16 ":" ) h16 ] "::"              ls32
                    / [ *5( h16 ":" ) h16 ] "::"              h16
                    / [ *6( h16 ":" ) h16 ] "::"
    */

    const h16 = hexDigitOnly + '{1,4}';
    const ls32 = '(?:' + h16 + ':' + h16 + '|' + rfc3986.ipv4address + ')';
    const IPv6SixHex = '(?:' + h16 + ':){6}' + ls32;
    const IPv6FiveHex = '::(?:' + h16 + ':){5}' + ls32;
    const IPv6FourHex = '(?:' + h16 + ')?::(?:' + h16 + ':){4}' + ls32;
    const IPv6ThreeHex = '(?:(?:' + h16 + ':){0,1}' + h16 + ')?::(?:' + h16 + ':){3}' + ls32;
    const IPv6TwoHex = '(?:(?:' + h16 + ':){0,2}' + h16 + ')?::(?:' + h16 + ':){2}' + ls32;
    const IPv6OneHex = '(?:(?:' + h16 + ':){0,3}' + h16 + ')?::' + h16 + ':' + ls32;
    const IPv6NoneHex = '(?:(?:' + h16 + ':){0,4}' + h16 + ')?::' + ls32;
    const IPv6NoneHex2 = '(?:(?:' + h16 + ':){0,5}' + h16 + ')?::' + h16;
    const IPv6NoneHex3 = '(?:(?:' + h16 + ':){0,6}' + h16 + ')?::';

    rfc3986.ipv4Cidr = '\\d|[1-2]\\d|3[0-2]';                                               // IPv4 cidr = DIGIT / %x31-32 DIGIT / "3" %x30-32  ; 0-9 / 10-29 / 30-32
    rfc3986.ipv6Cidr = '(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8])';                         // IPv6 cidr = DIGIT / %x31-39 DIGIT / "1" %x0-1 DIGIT / "12" %x0-8;   0-9 / 10-99 / 100-119 / 120-128
    rfc3986.ipv6address = '(?:' + IPv6SixHex + '|' + IPv6FiveHex + '|' + IPv6FourHex + '|' + IPv6ThreeHex + '|' + IPv6TwoHex + '|' + IPv6OneHex + '|' + IPv6NoneHex + '|' + IPv6NoneHex2 + '|' + IPv6NoneHex3 + ')';
    rfc3986.ipvFuture = 'v' + hexDigitOnly + '+\\.[' + unreserved + subDelims + ':]+';      // IPvFuture = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )

    rfc3986.scheme = '[a-zA-Z][a-zA-Z\\d+-\\.]*';                                           // scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    rfc3986.schemeRegex = new RegExp(rfc3986.scheme);

    const userinfo = '[' + unreserved + pctEncoded + subDelims + ':]*';                     // userinfo = *( unreserved / pct-encoded / sub-delims / ":" )
    const IPLiteral = '\\[(?:' + rfc3986.ipv6address + '|' + rfc3986.ipvFuture + ')\\]';    // IP-literal = "[" ( IPv6address / IPvFuture  ) "]"
    const regName = '[' + unreserved + pctEncoded + subDelims + ']{1,255}';                 // reg-name = *( unreserved / pct-encoded / sub-delims )
    const host = '(?:' + IPLiteral + '|' + rfc3986.ipv4address + '|' + regName + ')';       // host = IP-literal / IPv4address / reg-name
    const port = '\\d*';                                                                    // port = *DIGIT
    const authority = '(?:' + userinfo + '@)?' + host + '(?::' + port + ')?';               // authority   = [ userinfo "@" ] host [ ":" port ]
    const authorityCapture = '(?:' + userinfo + '@)?(' + host + ')(?::' + port + ')?';

    /*
        segment       = *pchar
        segment-nz    = 1*pchar
        path          = path-abempty    ; begins with "/" '|' is empty
                    / path-absolute   ; begins with "/" but not "//"
                    / path-noscheme   ; begins with a non-colon segment
                    / path-rootless   ; begins with a segment
                    / path-empty      ; zero characters
        path-abempty  = *( "/" segment )
        path-absolute = "/" [ segment-nz *( "/" segment ) ]
        path-rootless = segment-nz *( "/" segment )
    */

    const segment = pcharOnly + '*';
    const segmentNz = pcharOnly + '+';
    const segmentNzNc = '[' + unreserved + pctEncoded + subDelims + '@' + ']+';
    const pathEmpty = '';
    const pathAbEmpty = '(?:\\/' + segment + ')*';
    const pathAbsolute = '\\/(?:' + segmentNz + pathAbEmpty + ')?';
    const pathRootless = segmentNz + pathAbEmpty;
    const pathNoScheme = segmentNzNc + pathAbEmpty;
    const pathAbNoAuthority = '(?:\\/\\/\\/' + segment + pathAbEmpty + ')';     // Used by file:///

    // hier-part = "//" authority path

    rfc3986.hierPart = '(?:' + '(?:\\/\\/' + authority + pathAbEmpty + ')' + '|' + pathAbsolute + '|' + pathRootless + '|' + pathAbNoAuthority + ')';
    rfc3986.hierPartCapture = '(?:' + '(?:\\/\\/' + authorityCapture + pathAbEmpty + ')' + '|' + pathAbsolute + '|' + pathRootless + ')';

    // relative-part = "//" authority path-abempty / path-absolute / path-noscheme / path-empty

    rfc3986.relativeRef = '(?:' + '(?:\\/\\/' + authority + pathAbEmpty + ')' + '|' + pathAbsolute + '|' + pathNoScheme + '|' + pathEmpty + ')';

    // query = *( pchar / "/" / "?" )
    // query = *( pchar / "[" / "]" / "/" / "?" )

    rfc3986.query = '[' + pchar + '\\/\\?]*(?=#|$)';                            //Finish matching either at the fragment part '|' end of the line.
    rfc3986.queryWithSquareBrackets = '[' + pchar + '\\[\\]\\/\\?]*(?=#|$)';

    // fragment = *( pchar / "/" / "?" )

    rfc3986.fragment = '[' + pchar + '\\/\\?]*';

    return rfc3986;
};


module.exports = exports = internals.rfc3986 = internals.generate();


internals.createRegex = function (options) {

    const rfc = internals.rfc3986;

    // Construct expression

    const query = options.allowQuerySquareBrackets ? rfc.queryWithSquareBrackets : rfc.query;
    const suffix = '(?:\\?' + query + ')?' + '(?:#' + rfc.fragment + ')?$';

    // relative-ref = relative-part [ "?" query ] [ "#" fragment ]

    if (options.relativeOnly) {
        return new RegExp('^' + rfc.relativeRef + suffix);
    }

    // Custom schemes

    let customScheme = '';
    if (options.scheme) {
        Assert(options.scheme instanceof RegExp || typeof options.scheme === 'string' || Array.isArray(options.scheme), 'scheme must be a RegExp, String, or Array');

        const schemes = [].concat(options.scheme);
        Assert(schemes.length >= 1, 'scheme must have at least 1 scheme specified');

        // Flatten the array into a string to be used to match the schemes

        const selections = [];
        for (let i = 0; i < schemes.length; ++i) {
            const scheme = schemes[i];
            Assert(scheme instanceof RegExp || typeof scheme === 'string', 'scheme at position ' + i + ' must be a RegExp or String');

            if (scheme instanceof RegExp) {
                selections.push(scheme.source.toString());
            }
            else {
                Assert(rfc.schemeRegex.test(scheme), 'scheme at position ' + i + ' must be a valid scheme');
                selections.push(EscapeRegex(scheme));
            }
        }

        customScheme = selections.join('|');
    }

    // URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]

    const scheme = customScheme ? '(?:' + customScheme + ')' : rfc.scheme;
    const absolute = '(?:' + scheme + ':' + (options.domain ? rfc.hierPartCapture : rfc.hierPart) + ')';
    const prefix = options.allowRelative ? '(?:' + absolute + '|' + rfc.relativeRef + ')' : absolute;
    const regex = new RegExp('^' + prefix + suffix);
    regex.scheme = customScheme;
    return regex;
};


internals.uriRegex = internals.createRegex({});


exports.createRegex = function (options = {}) {

    if (options.scheme ||
        options.allowRelative ||
        options.relativeOnly ||
        options.allowQuerySquareBrackets ||
        options.domain) {

        return internals.createRegex(options);
    }

    return internals.uriRegex;
};


/***/ }),

/***/ 9737:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);

const Any = __webpack_require__(6866);


const internals = {};


internals.Map = class extends Map {

    slice() {

        return new internals.Map(this);
    }
};


module.exports = Any.extend({

    type: 'symbol',

    terms: {

        map: { init: new internals.Map() }
    },

    coerce: {
        method(value, { schema, error }) {

            const lookup = schema.$_terms.map.get(value);
            if (lookup) {
                value = lookup;
            }

            if (!schema._flags.only ||
                typeof value === 'symbol') {

                return { value };
            }

            return { value, errors: error('symbol.map', { map: schema.$_terms.map }) };
        }
    },

    validate(value, { error }) {

        if (typeof value !== 'symbol') {
            return { value, errors: error('symbol.base') };
        }
    },

    rules: {
        map: {
            method(iterable) {

                if (iterable &&
                    !iterable[Symbol.iterator] &&
                    typeof iterable === 'object') {

                    iterable = Object.entries(iterable);
                }

                Assert(iterable && iterable[Symbol.iterator], 'Iterable must be an iterable or object');

                const obj = this.clone();

                const symbols = [];
                for (const entry of iterable) {
                    Assert(entry && entry[Symbol.iterator], 'Entry must be an iterable');
                    const [key, value] = entry;

                    Assert(typeof key !== 'object' && typeof key !== 'function' && typeof key !== 'symbol', 'Key must not be of type object, function, or Symbol');
                    Assert(typeof value === 'symbol', 'Value must be a Symbol');

                    obj.$_terms.map.set(key, value);
                    symbols.push(value);
                }

                return obj.valid(...symbols);
            }
        }
    },

    manifest: {

        build(obj, desc) {

            if (desc.map) {
                obj = obj.map(desc.map);
            }

            return obj;
        }
    },

    messages: {
        'symbol.base': '"{{#label}}" must be a symbol',
        'symbol.map': '"{{#label}}" must be one of {{#map}}'
    }
});


/***/ }),

/***/ 9862:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const Clone = __webpack_require__(5578);
const Ignore = __webpack_require__(2887);
const Reach = __webpack_require__(8891);

const Common = __webpack_require__(3221);
const Errors = __webpack_require__(2150);
const State = __webpack_require__(9856);


const internals = {
    result: Symbol('result')
};


exports.entry = function (value, schema, prefs) {

    let settings = Common.defaults;
    if (prefs) {
        Assert(prefs.warnings === undefined, 'Cannot override warnings preference in synchronous validation');
        settings = Common.preferences(Common.defaults, prefs);
    }

    const result = internals.entry(value, schema, settings);
    Assert(!result.mainstay.externals.length, 'Schema with external rules must use validateAsync()');
    const outcome = { value: result.value };

    if (result.error) {
        outcome.error = result.error;
    }

    if (result.mainstay.warnings.length) {
        outcome.warning = Errors.details(result.mainstay.warnings);
    }

    if (result.mainstay.debug) {
        outcome.debug = result.mainstay.debug;
    }

    return outcome;
};


exports.entryAsync = async function (value, schema, prefs) {

    let settings = Common.defaults;
    if (prefs) {
        settings = Common.preferences(Common.defaults, prefs);
    }

    const result = internals.entry(value, schema, settings);
    const mainstay = result.mainstay;
    if (result.error) {
        if (mainstay.debug) {
            result.error.debug = mainstay.debug;
        }

        throw result.error;
    }

    if (mainstay.externals.length) {
        let root = result.value;
        for (const { method, path, label } of mainstay.externals) {
            let node = root;
            let key;
            let parent;

            if (path.length) {
                key = path[path.length - 1];
                parent = Reach(root, path.slice(0, -1));
                node = parent[key];
            }

            try {
                const output = await method(node);
                if (output === undefined ||
                    output === node) {

                    continue;
                }

                if (parent) {
                    parent[key] = output;
                }
                else {
                    root = output;
                }
            }
            catch (err) {
                err.message += ` (${label})`;       // Change message to include path
                throw err;
            }
        }

        result.value = root;
    }

    if (!settings.warnings &&
        !settings.debug) {

        return result.value;
    }

    const outcome = { value: result.value };
    if (mainstay.warnings.length) {
        outcome.warning = Errors.details(mainstay.warnings);
    }

    if (mainstay.debug) {
        outcome.debug = mainstay.debug;
    }

    return outcome;
};


internals.entry = function (value, schema, prefs) {

    // Prepare state

    const { tracer, cleanup } = internals.tracer(schema, prefs);
    const debug = prefs.debug ? [] : null;
    const links = schema._ids._schemaChain ? new Map() : null;
    const mainstay = { externals: [], warnings: [], tracer, debug, links };
    const schemas = schema._ids._schemaChain ? [{ schema }] : null;
    const state = new State([], [], { mainstay, schemas });

    // Validate value

    const result = exports.validate(value, schema, state, prefs);

    // Process value and errors

    if (cleanup) {
        schema.$_root.untrace();
    }

    const error = Errors.process(result.errors, value, prefs);
    return { value: result.value, error, mainstay };
};


internals.tracer = function (schema, prefs) {

    if (schema.$_root._tracer) {
        return { tracer: schema.$_root._tracer._register(schema) };
    }

    if (prefs.debug) {
        Assert(schema.$_root.trace, 'Debug mode not supported');
        return { tracer: schema.$_root.trace()._register(schema), cleanup: true };
    }

    return { tracer: internals.ignore };
};


exports.validate = function (value, schema, state, prefs, overrides = {}) {

    if (schema.$_terms.whens) {
        schema = schema._generate(value, state, prefs).schema;
    }

    // Setup state and settings

    if (schema._preferences) {
        prefs = internals.prefs(schema, prefs);
    }

    // Cache

    if (schema._cache &&
        prefs.cache) {

        const result = schema._cache.get(value);
        state.mainstay.tracer.debug(state, 'validate', 'cached', !!result);
        if (result) {
            return result;
        }
    }

    // Helpers

    const createError = (code, local, localState) => schema.$_createError(code, value, local, localState || state, prefs);
    const helpers = {
        original: value,
        prefs,
        schema,
        state,
        error: createError,
        warn: (code, local, localState) => state.mainstay.warnings.push(createError(code, local, localState)),
        message: (messages, local) => schema.$_createError('custom', value, local, state, prefs, { messages })
    };

    // Prepare

    state.mainstay.tracer.entry(schema, state);

    const def = schema._definition;
    if (def.prepare &&
        value !== undefined &&
        prefs.convert) {

        const prepared = def.prepare(value, helpers);
        if (prepared) {
            state.mainstay.tracer.value(state, 'prepare', value, prepared.value);
            if (prepared.errors) {
                return internals.finalize(prepared.value, [].concat(prepared.errors), helpers);         // Prepare error always aborts early
            }

            value = prepared.value;
        }
    }

    // Type coercion

    if (def.coerce &&
        value !== undefined &&
        prefs.convert &&
        (!def.coerce.from || def.coerce.from.includes(typeof value))) {

        const coerced = def.coerce.method(value, helpers);
        if (coerced) {
            state.mainstay.tracer.value(state, 'coerced', value, coerced.value);
            if (coerced.errors) {
                return internals.finalize(coerced.value, [].concat(coerced.errors), helpers);           // Coerce error always aborts early
            }

            value = coerced.value;
        }
    }

    // Empty value

    const empty = schema._flags.empty;
    if (empty &&
        empty.$_match(internals.trim(value, schema), state.nest(empty), Common.defaults)) {

        state.mainstay.tracer.value(state, 'empty', value, undefined);
        value = undefined;
    }

    // Presence requirements (required, optional, forbidden)

    const presence = overrides.presence || schema._flags.presence || (schema._flags._endedSwitch ? 'ignore' : prefs.presence);
    if (value === undefined) {
        if (presence === 'forbidden') {
            return internals.finalize(value, null, helpers);
        }

        if (presence === 'required') {
            return internals.finalize(value, [schema.$_createError('any.required', value, null, state, prefs)], helpers);
        }

        if (presence === 'optional') {
            if (schema._flags.default !== Common.symbols.deepDefault) {
                return internals.finalize(value, null, helpers);
            }

            state.mainstay.tracer.value(state, 'default', value, {});
            value = {};
        }
    }
    else if (presence === 'forbidden') {
        return internals.finalize(value, [schema.$_createError('any.unknown', value, null, state, prefs)], helpers);
    }

    // Allowed values

    const errors = [];

    if (schema._valids) {
        const match = schema._valids.get(value, state, prefs, schema._flags.insensitive);
        if (match) {
            if (prefs.convert) {
                state.mainstay.tracer.value(state, 'valids', value, match.value);
                value = match.value;
            }

            state.mainstay.tracer.filter(schema, state, 'valid', match);
            return internals.finalize(value, null, helpers);
        }

        if (schema._flags.only) {
            const report = schema.$_createError('any.only', value, { valids: schema._valids.values({ display: true }) }, state, prefs);
            if (prefs.abortEarly) {
                return internals.finalize(value, [report], helpers);
            }

            errors.push(report);
        }
    }

    // Denied values

    if (schema._invalids) {
        const match = schema._invalids.get(value, state, prefs, schema._flags.insensitive);
        if (match) {
            state.mainstay.tracer.filter(schema, state, 'invalid', match);
            const report = schema.$_createError('any.invalid', value, { invalids: schema._invalids.values({ display: true }) }, state, prefs);
            if (prefs.abortEarly) {
                return internals.finalize(value, [report], helpers);
            }

            errors.push(report);
        }
    }

    // Base type

    if (def.validate) {
        const base = def.validate(value, helpers);
        if (base) {
            state.mainstay.tracer.value(state, 'base', value, base.value);
            value = base.value;

            if (base.errors) {
                if (!Array.isArray(base.errors)) {
                    errors.push(base.errors);
                    return internals.finalize(value, errors, helpers);          // Base error always aborts early
                }

                if (base.errors.length) {
                    errors.push(...base.errors);
                    return internals.finalize(value, errors, helpers);          // Base error always aborts early
                }
            }
        }
    }

    // Validate tests

    if (!schema._rules.length) {
        return internals.finalize(value, errors, helpers);
    }

    return internals.rules(value, errors, helpers);
};


internals.rules = function (value, errors, helpers) {

    const { schema, state, prefs } = helpers;

    for (const rule of schema._rules) {
        const definition = schema._definition.rules[rule.method];

        // Skip rules that are also applied in coerce step

        if (definition.convert &&
            prefs.convert) {

            state.mainstay.tracer.log(schema, state, 'rule', rule.name, 'full');
            continue;
        }

        // Resolve references

        let ret;
        let args = rule.args;
        if (rule._resolve.length) {
            args = Object.assign({}, args);                                     // Shallow copy
            for (const key of rule._resolve) {
                const resolver = definition.argsByName.get(key);

                const resolved = args[key].resolve(value, state, prefs);
                const normalized = resolver.normalize ? resolver.normalize(resolved) : resolved;

                const invalid = Common.validateArg(normalized, null, resolver);
                if (invalid) {
                    ret = schema.$_createError('any.ref', resolved, { arg: key, ref: args[key], reason: invalid }, state, prefs);
                    break;
                }

                args[key] = normalized;
            }
        }

        // Test rule

        ret = ret || definition.validate(value, helpers, args, rule);           // Use ret if already set to reference error

        const result = internals.rule(ret, rule);
        if (result.errors) {
            state.mainstay.tracer.log(schema, state, 'rule', rule.name, 'error');

            if (rule.warn) {
                state.mainstay.warnings.push(...result.errors);
                continue;
            }

            if (prefs.abortEarly) {
                return internals.finalize(value, result.errors, helpers);
            }

            errors.push(...result.errors);
        }
        else {
            state.mainstay.tracer.log(schema, state, 'rule', rule.name, 'pass');
            state.mainstay.tracer.value(state, 'rule', value, result.value, rule.name);
            value = result.value;
        }
    }

    return internals.finalize(value, errors, helpers);
};


internals.rule = function (ret, rule) {

    if (ret instanceof Errors.Report) {
        internals.error(ret, rule);
        return { errors: [ret], value: null };
    }

    if (Array.isArray(ret) &&
        (ret[0] instanceof Errors.Report || ret[0] instanceof Error)) {

        ret.forEach((report) => internals.error(report, rule));
        return { errors: ret, value: null };
    }

    return { errors: null, value: ret };
};


internals.error = function (report, rule) {

    if (rule.message) {
        report._setTemplate(rule.message);
    }

    return report;
};


internals.finalize = function (value, errors, helpers) {

    errors = errors || [];
    const { schema, state, prefs } = helpers;

    // Failover value

    if (errors.length) {
        const failover = internals.default('failover', undefined, errors, helpers);
        if (failover !== undefined) {
            state.mainstay.tracer.value(state, 'failover', value, failover);
            value = failover;
            errors = [];
        }
    }

    // Error override

    if (errors.length &&
        schema._flags.error) {

        if (typeof schema._flags.error === 'function') {
            errors = schema._flags.error(errors);
            if (!Array.isArray(errors)) {
                errors = [errors];
            }

            for (const error of errors) {
                Assert(error instanceof Error || error instanceof Errors.Report, 'error() must return an Error object');
            }
        }
        else {
            errors = [schema._flags.error];
        }
    }

    // Default

    if (value === undefined) {
        const defaulted = internals.default('default', value, errors, helpers);
        state.mainstay.tracer.value(state, 'default', value, defaulted);
        value = defaulted;
    }

    // Cast

    if (schema._flags.cast &&
        value !== undefined) {

        const caster = schema._definition.cast[schema._flags.cast];
        if (caster.from(value)) {
            const casted = caster.to(value, helpers);
            state.mainstay.tracer.value(state, 'cast', value, casted, schema._flags.cast);
            value = casted;
        }
    }

    // Externals

    if (schema.$_terms.externals &&
        prefs.externals &&
        prefs._externals !== false) {                       // Disabled for matching

        for (const { method } of schema.$_terms.externals) {
            state.mainstay.externals.push({ method, path: state.path, label: Errors.label(schema._flags, state, prefs) });
        }
    }

    // Result

    const result = { value, errors: errors.length ? errors : null };

    if (schema._flags.result) {
        result.value = schema._flags.result === 'strip' ? undefined : /* raw */ helpers.original;
        state.mainstay.tracer.value(state, schema._flags.result, value, result.value);
        state.shadow(value, schema._flags.result);
    }

    // Cache

    if (schema._cache &&
        prefs.cache !== false &&
        !schema._refs.length) {

        schema._cache.set(helpers.original, result);
    }

    return result;
};


internals.prefs = function (schema, prefs) {

    const isDefaultOptions = prefs === Common.defaults;
    if (isDefaultOptions &&
        schema._preferences[Common.symbols.prefs]) {

        return schema._preferences[Common.symbols.prefs];
    }

    prefs = Common.preferences(prefs, schema._preferences);
    if (isDefaultOptions) {
        schema._preferences[Common.symbols.prefs] = prefs;
    }

    return prefs;
};


internals.default = function (flag, value, errors, { schema, state, prefs }) {

    const source = schema._flags[flag];
    if (prefs.noDefaults ||
        source === undefined) {

        return value;
    }

    state.mainstay.tracer.log(schema, state, 'rule', flag, 'full');

    if (!source) {
        return source;
    }

    if (typeof source === 'function') {
        const args = source.length > 0 ? [Clone(state.ancestors[0]), prefs] : [];

        try {
            return source(...args);
        }
        catch (err) {
            errors.push(schema.$_createError(`any.${flag}`, null, { error: err }, state, prefs));
            return;
        }
    }

    if (typeof source !== 'object') {
        return source;
    }

    if (source[Common.symbols.literal]) {
        return source.literal;
    }

    if (Common.isResolvable(source)) {
        return source.resolve(value, state, prefs);
    }

    return Clone(source);
};


internals.trim = function (value, schema) {

    if (typeof value !== 'string') {
        return value;
    }

    const trim = schema.$_getRule('trim');
    if (!trim ||
        !trim.args.enabled) {

        return value;
    }

    return value.trim();
};


internals.ignore = {
    active: false,
    debug: Ignore,
    entry: Ignore,
    filter: Ignore,
    log: Ignore,
    resolve: Ignore,
    value: Ignore
};


/***/ }),

/***/ 566:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);
const DeepEqual = __webpack_require__(5801);

const Common = __webpack_require__(3221);


const internals = {};


module.exports = internals.Values = class {

    constructor(values, refs) {

        this._values = new Set(values);
        this._refs = new Set(refs);
        this._lowercase = internals.lowercases(values);

        this._override = false;
    }

    get length() {

        return this._values.size + this._refs.size;
    }

    add(value, refs) {

        // Reference

        if (Common.isResolvable(value)) {
            if (!this._refs.has(value)) {
                this._refs.add(value);

                if (refs) {                     // Skipped in a merge
                    refs.register(value);
                }
            }

            return;
        }

        // Value

        if (!this.has(value, null, null, false)) {
            this._values.add(value);

            if (typeof value === 'string') {
                this._lowercase.set(value.toLowerCase(), value);
            }
        }
    }

    static merge(target, source, remove) {

        target = target || new internals.Values();

        if (source) {
            if (source._override) {
                return source.clone();
            }

            for (const item of [...source._values, ...source._refs]) {
                target.add(item);
            }
        }

        if (remove) {
            for (const item of [...remove._values, ...remove._refs]) {
                target.remove(item);
            }
        }

        return target.length ? target : null;
    }

    remove(value) {

        // Reference

        if (Common.isResolvable(value)) {
            this._refs.delete(value);
            return;
        }

        // Value

        this._values.delete(value);

        if (typeof value === 'string') {
            this._lowercase.delete(value.toLowerCase());
        }
    }

    has(value, state, prefs, insensitive) {

        return !!this.get(value, state, prefs, insensitive);
    }

    get(value, state, prefs, insensitive) {

        if (!this.length) {
            return false;
        }

        // Simple match

        if (this._values.has(value)) {
            return { value };
        }

        // Case insensitive string match

        if (typeof value === 'string' &&
            value &&
            insensitive) {

            const found = this._lowercase.get(value.toLowerCase());
            if (found) {
                return { value: found };
            }
        }

        if (!this._refs.size &&
            typeof value !== 'object') {

            return false;
        }

        // Objects

        if (typeof value === 'object') {
            for (const item of this._values) {
                if (DeepEqual(item, value)) {
                    return { value: item };
                }
            }
        }

        // References

        if (state) {
            for (const ref of this._refs) {
                const resolved = ref.resolve(value, state, prefs, null, { in: true });
                if (resolved === undefined) {
                    continue;
                }

                const items = !ref.in || typeof resolved !== 'object'
                    ? [resolved]
                    : Array.isArray(resolved) ? resolved : Object.keys(resolved);

                for (const item of items) {
                    if (typeof item !== typeof value) {
                        continue;
                    }

                    if (insensitive &&
                        value &&
                        typeof value === 'string') {

                        if (item.toLowerCase() === value.toLowerCase()) {
                            return { value: item, ref };
                        }
                    }
                    else {
                        if (DeepEqual(item, value)) {
                            return { value: item, ref };
                        }
                    }
                }
            }
        }

        return false;
    }

    override() {

        this._override = true;
    }

    values(options) {

        if (options &&
            options.display) {

            const values = [];

            for (const item of [...this._values, ...this._refs]) {
                if (item !== undefined) {
                    values.push(item);
                }
            }

            return values;
        }

        return Array.from([...this._values, ...this._refs]);
    }

    clone() {

        const set = new internals.Values(this._values, this._refs);
        set._override = this._override;
        return set;
    }

    concat(source) {

        Assert(!source._override, 'Cannot concat override set of values');

        const set = new internals.Values([...this._values, ...source._values], [...this._refs, ...source._refs]);
        set._override = this._override;
        return set;
    }

    describe() {

        const normalized = [];

        if (this._override) {
            normalized.push({ override: true });
        }

        for (const value of this._values.values()) {
            normalized.push(value && typeof value === 'object' ? { value } : value);
        }

        for (const value of this._refs.values()) {
            normalized.push(value.describe());
        }

        return normalized;
    }
};


internals.Values.prototype[Common.symbols.values] = true;


// Aliases

internals.Values.prototype.slice = internals.Values.prototype.clone;


// Helpers

internals.lowercases = function (from) {

    const map = new Map();

    if (from) {
        for (const value of from) {
            if (typeof value === 'string') {
                map.set(value.toLowerCase(), value);
            }
        }
    }

    return map;
};


/***/ }),

/***/ 989:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const internals = {};


exports.location = function (depth = 0) {

    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = (ignore, stack) => stack;

    const capture = {};
    Error.captureStackTrace(capture, this);
    const line = capture.stack[depth + 1];

    Error.prepareStackTrace = orig;

    return {
        filename: line.getFileName(),
        line: line.getLineNumber()
    };
};


/***/ }),

/***/ 8392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Assert = __webpack_require__(2718);


const internals = {};


module.exports = class Topo {

    constructor() {

        this._items = [];
        this.nodes = [];
    }

    add(nodes, options) {

        options = options || {};

        // Validate rules

        const before = [].concat(options.before || []);
        const after = [].concat(options.after || []);
        const group = options.group || '?';
        const sort = options.sort || 0;                   // Used for merging only

        Assert(!before.includes(group), `Item cannot come before itself: ${group}`);
        Assert(!before.includes('?'), 'Item cannot come before unassociated items');
        Assert(!after.includes(group), `Item cannot come after itself: ${group}`);
        Assert(!after.includes('?'), 'Item cannot come after unassociated items');

        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }

        for (const node of nodes) {
            const item = {
                seq: this._items.length,
                sort,
                before,
                after,
                group,
                node
            };

            this._items.push(item);
        }

        // Insert event

        const valid = this._sort();
        Assert(valid, 'item', group !== '?' ? `added into group ${group}` : '', 'created a dependencies error');

        return this.nodes;
    }

    merge(others) {

        if (!Array.isArray(others)) {
            others = [others];
        }

        for (const other of others) {
            if (other) {
                for (const item of other._items) {
                    this._items.push(Object.assign({}, item));      // Shallow cloned
                }
            }
        }

        // Sort items

        this._items.sort(internals.mergeSort);
        for (let i = 0; i < this._items.length; ++i) {
            this._items[i].seq = i;
        }

        const valid = this._sort();
        Assert(valid, 'merge created a dependencies error');

        return this.nodes;
    }

    _sort() {

        // Construct graph

        const graph = {};
        const graphAfters = Object.create(null);            // A prototype can bungle lookups w/ false positives
        const groups = Object.create(null);

        for (const item of this._items) {
            const seq = item.seq;                           // Unique across all items
            const group = item.group;

            // Determine Groups

            groups[group] = groups[group] || [];
            groups[group].push(seq);

            // Build intermediary graph using 'before'

            graph[seq] = item.before;

            // Build second intermediary graph with 'after'

            for (const after of item.after) {
                graphAfters[after] = graphAfters[after] || [];
                graphAfters[after].push(seq);
            }
        }

        // Expand intermediary graph

        for (const node in graph) {
            const expandedGroups = [];

            for (const graphNodeItem in graph[node]) {
                const group = graph[node][graphNodeItem];
                groups[group] = groups[group] || [];
                expandedGroups.push(...groups[group]);
            }

            graph[node] = expandedGroups;
        }

        // Merge intermediary graph using graphAfters into final graph

        for (const group in graphAfters) {
            if (groups[group]) {
                for (const node of groups[group]) {
                    graph[node].push(...graphAfters[group]);
                }
            }
        }

        // Compile ancestors

        const ancestors = {};
        for (const node in graph) {
            const children = graph[node];
            for (const child of children) {
                ancestors[child] = ancestors[child] || [];
                ancestors[child].push(node);
            }
        }

        // Topo sort

        const visited = {};
        const sorted = [];

        for (let i = 0; i < this._items.length; ++i) {          // Looping through item.seq values out of order
            let next = i;

            if (ancestors[i]) {
                next = null;
                for (let j = 0; j < this._items.length; ++j) {  // As above, these are item.seq values
                    if (visited[j] === true) {
                        continue;
                    }

                    if (!ancestors[j]) {
                        ancestors[j] = [];
                    }

                    const shouldSeeCount = ancestors[j].length;
                    let seenCount = 0;
                    for (let k = 0; k < shouldSeeCount; ++k) {
                        if (visited[ancestors[j][k]]) {
                            ++seenCount;
                        }
                    }

                    if (seenCount === shouldSeeCount) {
                        next = j;
                        break;
                    }
                }
            }

            if (next !== null) {
                visited[next] = true;
                sorted.push(next);
            }
        }

        if (sorted.length !== this._items.length) {
            return false;
        }

        const seqIndex = {};
        for (const item of this._items) {
            seqIndex[item.seq] = item;
        }

        this._items = [];
        this.nodes = [];

        for (const value of sorted) {
            const sortedItem = seqIndex[value];
            this.nodes.push(sortedItem.node);
            this._items.push(sortedItem);
        }

        return true;
    }
};


internals.mergeSort = (a, b) => {

    return a.sort === b.sort ? 0 : (a.sort < b.sort ? -1 : 1);
};


/***/ }),

/***/ 9417:
/***/ ((module) => {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    if(a===b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),

/***/ 3717:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var concatMap = __webpack_require__(6891);
var balanced = __webpack_require__(9417);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),

/***/ 6891:
/***/ ((module) => {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 3150:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * is-invalid-path <https://github.com/jonschlinkert/is-invalid-path>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isGlob = __webpack_require__(4309);
var re = /[‘“!#$%&+^<=>`]/;

module.exports = function (str) {
  return (typeof str !== 'string') || isGlob(str) || re.test(str);
};


/***/ }),

/***/ 5530:
/***/ ((module) => {

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

module.exports = function isExtglob(str) {
  return typeof str === 'string'
    && /[@?!+*]\(/.test(str);
};


/***/ }),

/***/ 4309:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtglob = __webpack_require__(5530);

module.exports = function isGlob(str) {
  return typeof str === 'string'
    && (/[*!?{}(|)[\]]/.test(str)
     || isExtglob(str));
};

/***/ }),

/***/ 4402:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * is-valid-path <https://github.com/jonschlinkert/is-valid-path>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */



var isInvalidPath = __webpack_require__(3150);

module.exports = function (str) {
  return isInvalidPath(str) === false;
};


/***/ }),

/***/ 1917:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var yaml = __webpack_require__(916);


module.exports = yaml;


/***/ }),

/***/ 916:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var loader = __webpack_require__(5190);
var dumper = __webpack_require__(3034);


function deprecated(name) {
  return function () {
    throw new Error('Function ' + name + ' is deprecated and cannot be used.');
  };
}


module.exports.Type = __webpack_require__(967);
module.exports.Schema = __webpack_require__(6514);
module.exports.FAILSAFE_SCHEMA = __webpack_require__(6037);
module.exports.JSON_SCHEMA = __webpack_require__(1571);
module.exports.CORE_SCHEMA = __webpack_require__(2183);
module.exports.DEFAULT_SAFE_SCHEMA = __webpack_require__(8949);
module.exports.DEFAULT_FULL_SCHEMA = __webpack_require__(6874);
module.exports.load                = loader.load;
module.exports.loadAll             = loader.loadAll;
module.exports.safeLoad            = loader.safeLoad;
module.exports.safeLoadAll         = loader.safeLoadAll;
module.exports.dump                = dumper.dump;
module.exports.safeDump            = dumper.safeDump;
module.exports.YAMLException = __webpack_require__(5199);

// Deprecated schema names from JS-YAML 2.0.x
module.exports.MINIMAL_SCHEMA = __webpack_require__(6037);
module.exports.SAFE_SCHEMA = __webpack_require__(8949);
module.exports.DEFAULT_SCHEMA = __webpack_require__(6874);

// Deprecated functions from JS-YAML 1.x.x
module.exports.scan           = deprecated('scan');
module.exports.parse          = deprecated('parse');
module.exports.compose        = deprecated('compose');
module.exports.addConstructor = deprecated('addConstructor');


/***/ }),

/***/ 9136:
/***/ ((module) => {

"use strict";



function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}


function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}


function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}


function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;

  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }

  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}


module.exports.isNothing      = isNothing;
module.exports.isObject       = isObject;
module.exports.toArray        = toArray;
module.exports.repeat         = repeat;
module.exports.isNegativeZero = isNegativeZero;
module.exports.extend         = extend;


/***/ }),

/***/ 3034:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable no-use-before-define*/

var common              = __webpack_require__(9136);
var YAMLException       = __webpack_require__(5199);
var DEFAULT_FULL_SCHEMA = __webpack_require__(6874);
var DEFAULT_SAFE_SCHEMA = __webpack_require__(8949);

var _toString       = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;

var CHAR_TAB                  = 0x09; /* Tab */
var CHAR_LINE_FEED            = 0x0A; /* LF */
var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
var CHAR_SPACE                = 0x20; /* Space */
var CHAR_EXCLAMATION          = 0x21; /* ! */
var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
var CHAR_SHARP                = 0x23; /* # */
var CHAR_PERCENT              = 0x25; /* % */
var CHAR_AMPERSAND            = 0x26; /* & */
var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
var CHAR_ASTERISK             = 0x2A; /* * */
var CHAR_COMMA                = 0x2C; /* , */
var CHAR_MINUS                = 0x2D; /* - */
var CHAR_COLON                = 0x3A; /* : */
var CHAR_EQUALS               = 0x3D; /* = */
var CHAR_GREATER_THAN         = 0x3E; /* > */
var CHAR_QUESTION             = 0x3F; /* ? */
var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
var CHAR_VERTICAL_LINE        = 0x7C; /* | */
var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

var ESCAPE_SEQUENCES = {};

ESCAPE_SEQUENCES[0x00]   = '\\0';
ESCAPE_SEQUENCES[0x07]   = '\\a';
ESCAPE_SEQUENCES[0x08]   = '\\b';
ESCAPE_SEQUENCES[0x09]   = '\\t';
ESCAPE_SEQUENCES[0x0A]   = '\\n';
ESCAPE_SEQUENCES[0x0B]   = '\\v';
ESCAPE_SEQUENCES[0x0C]   = '\\f';
ESCAPE_SEQUENCES[0x0D]   = '\\r';
ESCAPE_SEQUENCES[0x1B]   = '\\e';
ESCAPE_SEQUENCES[0x22]   = '\\"';
ESCAPE_SEQUENCES[0x5C]   = '\\\\';
ESCAPE_SEQUENCES[0x85]   = '\\N';
ESCAPE_SEQUENCES[0xA0]   = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';

var DEPRECATED_BOOLEANS_SYNTAX = [
  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
];

function compileStyleMap(schema, map) {
  var result, keys, index, length, tag, style, type;

  if (map === null) return {};

  result = {};
  keys = Object.keys(map);

  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map[tag]);

    if (tag.slice(0, 2) === '!!') {
      tag = 'tag:yaml.org,2002:' + tag.slice(2);
    }
    type = schema.compiledTypeMap['fallback'][tag];

    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }

    result[tag] = style;
  }

  return result;
}

function encodeHex(character) {
  var string, handle, length;

  string = character.toString(16).toUpperCase();

  if (character <= 0xFF) {
    handle = 'x';
    length = 2;
  } else if (character <= 0xFFFF) {
    handle = 'u';
    length = 4;
  } else if (character <= 0xFFFFFFFF) {
    handle = 'U';
    length = 8;
  } else {
    throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
  }

  return '\\' + handle + common.repeat('0', length - string.length) + string;
}

function State(options) {
  this.schema        = options['schema'] || DEFAULT_FULL_SCHEMA;
  this.indent        = Math.max(1, (options['indent'] || 2));
  this.noArrayIndent = options['noArrayIndent'] || false;
  this.skipInvalid   = options['skipInvalid'] || false;
  this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
  this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
  this.sortKeys      = options['sortKeys'] || false;
  this.lineWidth     = options['lineWidth'] || 80;
  this.noRefs        = options['noRefs'] || false;
  this.noCompatMode  = options['noCompatMode'] || false;
  this.condenseFlow  = options['condenseFlow'] || false;

  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;

  this.tag = null;
  this.result = '';

  this.duplicates = [];
  this.usedDuplicates = null;
}

// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
  var ind = common.repeat(' ', spaces),
      position = 0,
      next = -1,
      result = '',
      line,
      length = string.length;

  while (position < length) {
    next = string.indexOf('\n', position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }

    if (line.length && line !== '\n') result += ind;

    result += line;
  }

  return result;
}

function generateNextLine(state, level) {
  return '\n' + common.repeat(' ', state.indent * level);
}

function testImplicitResolving(state, str) {
  var index, length, type;

  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type = state.implicitTypes[index];

    if (type.resolve(str)) {
      return true;
    }
  }

  return false;
}

// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}

// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
  return  (0x00020 <= c && c <= 0x00007E)
      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== 0xFEFF /* BOM */)
      ||  (0x10000 <= c && c <= 0x10FFFF);
}

// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// [24] b-line-feed       ::=     #xA    /* LF */
// [25] b-carriage-return ::=     #xD    /* CR */
// [3]  c-byte-order-mark ::=     #xFEFF
function isNsChar(c) {
  return isPrintable(c) && !isWhitespace(c)
    // byte-order-mark
    && c !== 0xFEFF
    // b-char
    && c !== CHAR_CARRIAGE_RETURN
    && c !== CHAR_LINE_FEED;
}

// Simplified test for values allowed after the first character in plain style.
function isPlainSafe(c, prev) {
  // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
  // where nb-char ::= c-printable - b-char - c-byte-order-mark.
  return isPrintable(c) && c !== 0xFEFF
    // - c-flow-indicator
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // - ":" - "#"
    // /* An ns-char preceding */ "#"
    && c !== CHAR_COLON
    && ((c !== CHAR_SHARP) || (prev && isNsChar(prev)));
}

// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
  // Uses a subset of ns-char - c-indicator
  // where ns-char = nb-char - s-white.
  return isPrintable(c) && c !== 0xFEFF
    && !isWhitespace(c) // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    && c !== CHAR_MINUS
    && c !== CHAR_QUESTION
    && c !== CHAR_COLON
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    && c !== CHAR_SHARP
    && c !== CHAR_AMPERSAND
    && c !== CHAR_ASTERISK
    && c !== CHAR_EXCLAMATION
    && c !== CHAR_VERTICAL_LINE
    && c !== CHAR_EQUALS
    && c !== CHAR_GREATER_THAN
    && c !== CHAR_SINGLE_QUOTE
    && c !== CHAR_DOUBLE_QUOTE
    // | “%” | “@” | “`”)
    && c !== CHAR_PERCENT
    && c !== CHAR_COMMERCIAL_AT
    && c !== CHAR_GRAVE_ACCENT;
}

// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}

var STYLE_PLAIN   = 1,
    STYLE_SINGLE  = 2,
    STYLE_LITERAL = 3,
    STYLE_FOLDED  = 4,
    STYLE_DOUBLE  = 5;

// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
  var i;
  var char, prev_char;
  var hasLineBreak = false;
  var hasFoldableLine = false; // only checked if shouldTrackWidth
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1; // count the first line correctly
  var plain = isPlainSafeFirst(string.charCodeAt(0))
          && !isWhitespace(string.charCodeAt(string.length - 1));

  if (singleLineOnly) {
    // Case: no block styles.
    // Check for disallowed characters to rule out plain and single.
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
  } else {
    // Case: block styles permitted.
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        // Check if any line can be folded.
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine ||
            // Foldable line = too long, and not more-indented.
            (i - previousLineBreak - 1 > lineWidth &&
             string[previousLineBreak + 1] !== ' ');
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
    // in case the end is missing a \n
    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
      (i - previousLineBreak - 1 > lineWidth &&
       string[previousLineBreak + 1] !== ' '));
  }
  // Although every style can represent \n without escaping, prefer block styles
  // for multiline, since they're more readable and they don't add empty lines.
  // Also prefer folding a super-long line.
  if (!hasLineBreak && !hasFoldableLine) {
    // Strings interpretable as another type have to be quoted;
    // e.g. the string 'true' vs. the boolean true.
    return plain && !testAmbiguousType(string)
      ? STYLE_PLAIN : STYLE_SINGLE;
  }
  // Edge case: block indentation indicator can only have one digit.
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  // At this point we know block styles are valid.
  // Prefer literal style unless we want to fold.
  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
}

// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey) {
  state.dump = (function () {
    if (string.length === 0) {
      return "''";
    }
    if (!state.noCompatMode &&
        DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
      return "'" + string + "'";
    }

    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
    // As indentation gets deeper, let the width decrease monotonically
    // to the lower bound min(state.lineWidth, 40).
    // Note that this implies
    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
    // This behaves better than a constant minimum width which disallows narrower options,
    // or an indent threshold which causes the width to suddenly increase.
    var lineWidth = state.lineWidth === -1
      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

    // Without knowing if keys are implicit/explicit, assume implicit for safety.
    var singleLineOnly = iskey
      // No block styles in flow mode.
      || (state.flowLevel > -1 && level >= state.flowLevel);
    function testAmbiguity(string) {
      return testImplicitResolving(state, string);
    }

    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return '|' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return '>' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string, lineWidth) + '"';
      default:
        throw new YAMLException('impossible error: invalid scalar style');
    }
  }());
}

// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

  // note the special case: the string '\n' counts as a "trailing" empty line.
  var clip =          string[string.length - 1] === '\n';
  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
  var chomp = keep ? '+' : (clip ? '' : '-');

  return indentIndicator + chomp + '\n';
}

// (See the note for writeScalar.)
function dropEndingNewline(string) {
  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}

// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
  // unless they're before or after a more-indented line, or at the very
  // beginning or end, in which case $k$ maps to $k$.
  // Therefore, parse each chunk as newline(s) followed by a content line.
  var lineRe = /(\n+)([^\n]*)/g;

  // first line (possibly an empty line)
  var result = (function () {
    var nextLF = string.indexOf('\n');
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }());
  // If we haven't reached the first content line yet, don't add an extra \n.
  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
  var moreIndented;

  // rest of the lines
  var match;
  while ((match = lineRe.exec(string))) {
    var prefix = match[1], line = match[2];
    moreIndented = (line[0] === ' ');
    result += prefix
      + (!prevMoreIndented && !moreIndented && line !== ''
        ? '\n' : '')
      + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }

  return result;
}

// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
  if (line === '' || line[0] === ' ') return line;

  // Since a more-indented line adds a \n, breaks can't be followed by a space.
  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
  var match;
  // start is an inclusive index. end, curr, and next are exclusive.
  var start = 0, end, curr = 0, next = 0;
  var result = '';

  // Invariants: 0 <= start <= length-1.
  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
  // Inside the loop:
  //   A match implies length >= 2, so curr and next are <= length-2.
  while ((match = breakRe.exec(line))) {
    next = match.index;
    // maintain invariant: curr - start <= width
    if (next - start > width) {
      end = (curr > start) ? curr : next; // derive end <= length-2
      result += '\n' + line.slice(start, end);
      // skip the space that was output as \n
      start = end + 1;                    // derive start <= length-1
    }
    curr = next;
  }

  // By the invariants, start <= length-1, so there is something left over.
  // It is either the whole string or a part starting from non-whitespace.
  result += '\n';
  // Insert a break if the remainder is too long and there is a break available.
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }

  return result.slice(1); // drop extra \n joiner
}

// Escapes a double-quoted string.
function escapeString(string) {
  var result = '';
  var char, nextChar;
  var escapeSeq;

  for (var i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    // Check for surrogate pairs (reference Unicode 3.0 section "3.7 Surrogates").
    if (char >= 0xD800 && char <= 0xDBFF/* high surrogate */) {
      nextChar = string.charCodeAt(i + 1);
      if (nextChar >= 0xDC00 && nextChar <= 0xDFFF/* low surrogate */) {
        // Combine the surrogate pair and store it escaped.
        result += encodeHex((char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000);
        // Advance index one extra since we already used that char here.
        i++; continue;
      }
    }
    escapeSeq = ESCAPE_SEQUENCES[char];
    result += !escapeSeq && isPrintable(char)
      ? string[i]
      : escapeSeq || encodeHex(char);
  }

  return result;
}

function writeFlowSequence(state, level, object) {
  var _result = '',
      _tag    = state.tag,
      index,
      length;

  for (index = 0, length = object.length; index < length; index += 1) {
    // Write only valid elements.
    if (writeNode(state, level, object[index], false, false)) {
      if (index !== 0) _result += ',' + (!state.condenseFlow ? ' ' : '');
      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = '[' + _result + ']';
}

function writeBlockSequence(state, level, object, compact) {
  var _result = '',
      _tag    = state.tag,
      index,
      length;

  for (index = 0, length = object.length; index < length; index += 1) {
    // Write only valid elements.
    if (writeNode(state, level + 1, object[index], true, true)) {
      if (!compact || index !== 0) {
        _result += generateNextLine(state, level);
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += '-';
      } else {
        _result += '- ';
      }

      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = _result || '[]'; // Empty sequence if no valid values.
}

function writeFlowMapping(state, level, object) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      pairBuffer;

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {

    pairBuffer = '';
    if (index !== 0) pairBuffer += ', ';

    if (state.condenseFlow) pairBuffer += '"';

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (!writeNode(state, level, objectKey, false, false)) {
      continue; // Skip this pair because of invalid key;
    }

    if (state.dump.length > 1024) pairBuffer += '? ';

    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

    if (!writeNode(state, level, objectValue, false, false)) {
      continue; // Skip this pair because of invalid value.
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = '{' + _result + '}';
}

function writeBlockMapping(state, level, object, compact) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      explicitPair,
      pairBuffer;

  // Allow sorting keys so that the output file is deterministic
  if (state.sortKeys === true) {
    // Default sorting
    objectKeyList.sort();
  } else if (typeof state.sortKeys === 'function') {
    // Custom sort function
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    // Something is wrong
    throw new YAMLException('sortKeys must be a boolean or a function');
  }

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = '';

    if (!compact || index !== 0) {
      pairBuffer += generateNextLine(state, level);
    }

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue; // Skip this pair because of invalid key.
    }

    explicitPair = (state.tag !== null && state.tag !== '?') ||
                   (state.dump && state.dump.length > 1024);

    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += '?';
      } else {
        pairBuffer += '? ';
      }
    }

    pairBuffer += state.dump;

    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }

    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue; // Skip this pair because of invalid value.
    }

    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ':';
    } else {
      pairBuffer += ': ';
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}

function detectType(state, object, explicit) {
  var _result, typeList, index, length, type, style;

  typeList = explicit ? state.explicitTypes : state.implicitTypes;

  for (index = 0, length = typeList.length; index < length; index += 1) {
    type = typeList[index];

    if ((type.instanceOf  || type.predicate) &&
        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
        (!type.predicate  || type.predicate(object))) {

      state.tag = explicit ? type.tag : '?';

      if (type.represent) {
        style = state.styleMap[type.tag] || type.defaultStyle;

        if (_toString.call(type.represent) === '[object Function]') {
          _result = type.represent(object, style);
        } else if (_hasOwnProperty.call(type.represent, style)) {
          _result = type.represent[style](object, style);
        } else {
          throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
        }

        state.dump = _result;
      }

      return true;
    }
  }

  return false;
}

// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey) {
  state.tag = null;
  state.dump = object;

  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }

  var type = _toString.call(state.dump);

  if (block) {
    block = (state.flowLevel < 0 || state.flowLevel > level);
  }

  var objectOrArray = type === '[object Object]' || type === '[object Array]',
      duplicateIndex,
      duplicate;

  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }

  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
    compact = false;
  }

  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = '*ref_' + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type === '[object Object]') {
      if (block && (Object.keys(state.dump).length !== 0)) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object Array]') {
      var arrayLevel = (state.noArrayIndent && (level > 0)) ? level - 1 : level;
      if (block && (state.dump.length !== 0)) {
        writeBlockSequence(state, arrayLevel, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, arrayLevel, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object String]') {
      if (state.tag !== '?') {
        writeScalar(state, state.dump, level, iskey);
      }
    } else {
      if (state.skipInvalid) return false;
      throw new YAMLException('unacceptable kind of an object to dump ' + type);
    }

    if (state.tag !== null && state.tag !== '?') {
      state.dump = '!<' + state.tag + '> ' + state.dump;
    }
  }

  return true;
}

function getDuplicateReferences(object, state) {
  var objects = [],
      duplicatesIndexes = [],
      index,
      length;

  inspectNode(object, objects, duplicatesIndexes);

  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}

function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList,
      index,
      length;

  if (object !== null && typeof object === 'object') {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);

      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);

        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}

function dump(input, options) {
  options = options || {};

  var state = new State(options);

  if (!state.noRefs) getDuplicateReferences(input, state);

  if (writeNode(state, 0, input, true, true)) return state.dump + '\n';

  return '';
}

function safeDump(input, options) {
  return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}

module.exports.dump     = dump;
module.exports.safeDump = safeDump;


/***/ }),

/***/ 5199:
/***/ ((module) => {

"use strict";
// YAML error class. http://stackoverflow.com/questions/8458984
//


function YAMLException(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException.prototype = Object.create(Error.prototype);
YAMLException.prototype.constructor = YAMLException;


YAMLException.prototype.toString = function toString(compact) {
  var result = this.name + ': ';

  result += this.reason || '(unknown reason)';

  if (!compact && this.mark) {
    result += ' ' + this.mark.toString();
  }

  return result;
};


module.exports = YAMLException;


/***/ }),

/***/ 5190:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable max-len,no-use-before-define*/

var common              = __webpack_require__(9136);
var YAMLException       = __webpack_require__(5199);
var Mark                = __webpack_require__(5426);
var DEFAULT_SAFE_SCHEMA = __webpack_require__(8949);
var DEFAULT_FULL_SCHEMA = __webpack_require__(6874);


var _hasOwnProperty = Object.prototype.hasOwnProperty;


var CONTEXT_FLOW_IN   = 1;
var CONTEXT_FLOW_OUT  = 2;
var CONTEXT_BLOCK_IN  = 3;
var CONTEXT_BLOCK_OUT = 4;


var CHOMPING_CLIP  = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP  = 3;


var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


function _class(obj) { return Object.prototype.toString.call(obj); }

function is_EOL(c) {
  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
}

function is_WHITE_SPACE(c) {
  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
}

function is_WS_OR_EOL(c) {
  return (c === 0x09/* Tab */) ||
         (c === 0x20/* Space */) ||
         (c === 0x0A/* LF */) ||
         (c === 0x0D/* CR */);
}

function is_FLOW_INDICATOR(c) {
  return c === 0x2C/* , */ ||
         c === 0x5B/* [ */ ||
         c === 0x5D/* ] */ ||
         c === 0x7B/* { */ ||
         c === 0x7D/* } */;
}

function fromHexCode(c) {
  var lc;

  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  /*eslint-disable no-bitwise*/
  lc = c | 0x20;

  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
    return lc - 0x61 + 10;
  }

  return -1;
}

function escapedHexLen(c) {
  if (c === 0x78/* x */) { return 2; }
  if (c === 0x75/* u */) { return 4; }
  if (c === 0x55/* U */) { return 8; }
  return 0;
}

function fromDecimalCode(c) {
  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  return -1;
}

function simpleEscapeSequence(c) {
  /* eslint-disable indent */
  return (c === 0x30/* 0 */) ? '\x00' :
        (c === 0x61/* a */) ? '\x07' :
        (c === 0x62/* b */) ? '\x08' :
        (c === 0x74/* t */) ? '\x09' :
        (c === 0x09/* Tab */) ? '\x09' :
        (c === 0x6E/* n */) ? '\x0A' :
        (c === 0x76/* v */) ? '\x0B' :
        (c === 0x66/* f */) ? '\x0C' :
        (c === 0x72/* r */) ? '\x0D' :
        (c === 0x65/* e */) ? '\x1B' :
        (c === 0x20/* Space */) ? ' ' :
        (c === 0x22/* " */) ? '\x22' :
        (c === 0x2F/* / */) ? '/' :
        (c === 0x5C/* \ */) ? '\x5C' :
        (c === 0x4E/* N */) ? '\x85' :
        (c === 0x5F/* _ */) ? '\xA0' :
        (c === 0x4C/* L */) ? '\u2028' :
        (c === 0x50/* P */) ? '\u2029' : '';
}

function charFromCodepoint(c) {
  if (c <= 0xFFFF) {
    return String.fromCharCode(c);
  }
  // Encode UTF-16 surrogate pair
  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
  return String.fromCharCode(
    ((c - 0x010000) >> 10) + 0xD800,
    ((c - 0x010000) & 0x03FF) + 0xDC00
  );
}

var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}


function State(input, options) {
  this.input = input;

  this.filename  = options['filename']  || null;
  this.schema    = options['schema']    || DEFAULT_FULL_SCHEMA;
  this.onWarning = options['onWarning'] || null;
  this.legacy    = options['legacy']    || false;
  this.json      = options['json']      || false;
  this.listener  = options['listener']  || null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap       = this.schema.compiledTypeMap;

  this.length     = input.length;
  this.position   = 0;
  this.line       = 0;
  this.lineStart  = 0;
  this.lineIndent = 0;

  this.documents = [];

  /*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/

}


function generateError(state, message) {
  return new YAMLException(
    message,
    new Mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)));
}

function throwError(state, message) {
  throw generateError(state, message);
}

function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}


var directiveHandlers = {

  YAML: function handleYamlDirective(state, name, args) {

    var match, major, minor;

    if (state.version !== null) {
      throwError(state, 'duplication of %YAML directive');
    }

    if (args.length !== 1) {
      throwError(state, 'YAML directive accepts exactly one argument');
    }

    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

    if (match === null) {
      throwError(state, 'ill-formed argument of the YAML directive');
    }

    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);

    if (major !== 1) {
      throwError(state, 'unacceptable YAML version of the document');
    }

    state.version = args[0];
    state.checkLineBreaks = (minor < 2);

    if (minor !== 1 && minor !== 2) {
      throwWarning(state, 'unsupported YAML version of the document');
    }
  },

  TAG: function handleTagDirective(state, name, args) {

    var handle, prefix;

    if (args.length !== 2) {
      throwError(state, 'TAG directive accepts exactly two arguments');
    }

    handle = args[0];
    prefix = args[1];

    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
    }

    if (_hasOwnProperty.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }

    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
    }

    state.tagMap[handle] = prefix;
  }
};


function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;

  if (start < end) {
    _result = state.input.slice(start, end);

    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 0x09 ||
              (0x20 <= _character && _character <= 0x10FFFF))) {
          throwError(state, 'expected valid JSON character');
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, 'the stream contains non-printable characters');
    }

    state.result += _result;
  }
}

function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;

  if (!common.isObject(source)) {
    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
  }

  sourceKeys = Object.keys(source);

  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];

    if (!_hasOwnProperty.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}

function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
  var index, quantity;

  // The output is a plain object here, so keys can only be strings.
  // We need to convert keyNode to a string, but doing so can hang the process
  // (deeply nested arrays that explode exponentially using aliases).
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);

    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, 'nested arrays are not supported inside keys');
      }

      if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
        keyNode[index] = '[object Object]';
      }
    }
  }

  // Avoid code execution in load() via toString property
  // (still use its own toString for arrays, timestamps,
  // and whatever user schema extensions happen to have @@toStringTag)
  if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
    keyNode = '[object Object]';
  }


  keyNode = String(keyNode);

  if (_result === null) {
    _result = {};
  }

  if (keyTag === 'tag:yaml.org,2002:merge') {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json &&
        !_hasOwnProperty.call(overridableKeys, keyNode) &&
        _hasOwnProperty.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.position = startPos || state.position;
      throwError(state, 'duplicated mapping key');
    }
    _result[keyNode] = valueNode;
    delete overridableKeys[keyNode];
  }

  return _result;
}

function readLineBreak(state) {
  var ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x0A/* LF */) {
    state.position++;
  } else if (ch === 0x0D/* CR */) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
      state.position++;
    }
  } else {
    throwError(state, 'a line break is expected');
  }

  state.line += 1;
  state.lineStart = state.position;
}

function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0,
      ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    if (allowComments && ch === 0x23/* # */) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
    }

    if (is_EOL(ch)) {
      readLineBreak(state);

      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;

      while (ch === 0x20/* Space */) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }

  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, 'deficient indentation');
  }

  return lineBreaks;
}

function testDocumentSeparator(state) {
  var _position = state.position,
      ch;

  ch = state.input.charCodeAt(_position);

  // Condition state.position === state.lineStart is tested
  // in parent on each call, for efficiency. No needs to test here again.
  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
      ch === state.input.charCodeAt(_position + 1) &&
      ch === state.input.charCodeAt(_position + 2)) {

    _position += 3;

    ch = state.input.charCodeAt(_position);

    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }

  return false;
}

function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += ' ';
  } else if (count > 1) {
    state.result += common.repeat('\n', count - 1);
  }
}


function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding,
      following,
      captureStart,
      captureEnd,
      hasPendingContent,
      _line,
      _lineStart,
      _lineIndent,
      _kind = state.kind,
      _result = state.result,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (is_WS_OR_EOL(ch)      ||
      is_FLOW_INDICATOR(ch) ||
      ch === 0x23/* # */    ||
      ch === 0x26/* & */    ||
      ch === 0x2A/* * */    ||
      ch === 0x21/* ! */    ||
      ch === 0x7C/* | */    ||
      ch === 0x3E/* > */    ||
      ch === 0x27/* ' */    ||
      ch === 0x22/* " */    ||
      ch === 0x25/* % */    ||
      ch === 0x40/* @ */    ||
      ch === 0x60/* ` */) {
    return false;
  }

  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
    following = state.input.charCodeAt(state.position + 1);

    if (is_WS_OR_EOL(following) ||
        withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }

  state.kind = 'scalar';
  state.result = '';
  captureStart = captureEnd = state.position;
  hasPendingContent = false;

  while (ch !== 0) {
    if (ch === 0x3A/* : */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following) ||
          withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }

    } else if (ch === 0x23/* # */) {
      preceding = state.input.charCodeAt(state.position - 1);

      if (is_WS_OR_EOL(preceding)) {
        break;
      }

    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;

    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);

      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }

    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }

    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }

    ch = state.input.charCodeAt(++state.position);
  }

  captureSegment(state, captureStart, captureEnd, false);

  if (state.result) {
    return true;
  }

  state.kind = _kind;
  state.result = _result;
  return false;
}

function readSingleQuotedScalar(state, nodeIndent) {
  var ch,
      captureStart, captureEnd;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x27/* ' */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x27/* ' */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x27/* ' */) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a single quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a single quoted scalar');
}

function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart,
      captureEnd,
      hexLength,
      hexResult,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x22/* " */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x22/* " */) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;

    } else if (ch === 0x5C/* \ */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);

        // TODO: rework to inline fn with no type cast?
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;

      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;

        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);

          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;

          } else {
            throwError(state, 'expected hexadecimal character');
          }
        }

        state.result += charFromCodepoint(hexResult);

        state.position++;

      } else {
        throwError(state, 'unknown escape sequence');
      }

      captureStart = captureEnd = state.position;

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a double quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a double quoted scalar');
}

function readFlowCollection(state, nodeIndent) {
  var readNext = true,
      _line,
      _tag     = state.tag,
      _result,
      _anchor  = state.anchor,
      following,
      terminator,
      isPair,
      isExplicitPair,
      isMapping,
      overridableKeys = {},
      keyNode,
      keyTag,
      valueNode,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x5B/* [ */) {
    terminator = 0x5D;/* ] */
    isMapping = false;
    _result = [];
  } else if (ch === 0x7B/* { */) {
    terminator = 0x7D;/* } */
    isMapping = true;
    _result = {};
  } else {
    return false;
  }

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(++state.position);

  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? 'mapping' : 'sequence';
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, 'missed comma between flow collection entries');
    }

    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;

    if (ch === 0x3F/* ? */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }

    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
    } else {
      _result.push(keyNode);
    }

    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x2C/* , */) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }

  throwError(state, 'unexpected end of the stream within a flow collection');
}

function readBlockScalar(state, nodeIndent) {
  var captureStart,
      folding,
      chomping       = CHOMPING_CLIP,
      didReadContent = false,
      detectedIndent = false,
      textIndent     = nodeIndent,
      emptyLines     = 0,
      atMoreIndented = false,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x7C/* | */) {
    folding = false;
  } else if (ch === 0x3E/* > */) {
    folding = true;
  } else {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';

  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);

    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      if (CHOMPING_CLIP === chomping) {
        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, 'repeat of a chomping mode identifier');
      }

    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, 'repeat of an indentation width identifier');
      }

    } else {
      break;
    }
  }

  if (is_WHITE_SPACE(ch)) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (is_WHITE_SPACE(ch));

    if (ch === 0x23/* # */) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (!is_EOL(ch) && (ch !== 0));
    }
  }

  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;

    ch = state.input.charCodeAt(state.position);

    while ((!detectedIndent || state.lineIndent < textIndent) &&
           (ch === 0x20/* Space */)) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }

    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }

    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }

    // End of the scalar.
    if (state.lineIndent < textIndent) {

      // Perform the chomping.
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) { // i.e. only if the scalar is not empty.
          state.result += '\n';
        }
      }

      // Break this `while` cycle and go to the funciton's epilogue.
      break;
    }

    // Folded style: use fancy rules to handle line breaks.
    if (folding) {

      // Lines starting with white space characters (more-indented lines) are not folded.
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        // except for the first content line (cf. Example 8.1)
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

      // End of more-indented block.
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat('\n', emptyLines + 1);

      // Just one line break - perceive as the same line.
      } else if (emptyLines === 0) {
        if (didReadContent) { // i.e. only if we have already read some scalar content.
          state.result += ' ';
        }

      // Several line breaks - perceive as different lines.
      } else {
        state.result += common.repeat('\n', emptyLines);
      }

    // Literal style: just add exact number of line breaks between content lines.
    } else {
      // Keep all line breaks except the header line break.
      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
    }

    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;

    while (!is_EOL(ch) && (ch !== 0)) {
      ch = state.input.charCodeAt(++state.position);
    }

    captureSegment(state, captureStart, state.position, false);
  }

  return true;
}

function readBlockSequence(state, nodeIndent) {
  var _line,
      _tag      = state.tag,
      _anchor   = state.anchor,
      _result   = [],
      following,
      detected  = false,
      ch;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {

    if (ch !== 0x2D/* - */) {
      break;
    }

    following = state.input.charCodeAt(state.position + 1);

    if (!is_WS_OR_EOL(following)) {
      break;
    }

    detected = true;
    state.position++;

    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a sequence entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'sequence';
    state.result = _result;
    return true;
  }
  return false;
}

function readBlockMapping(state, nodeIndent, flowIndent) {
  var following,
      allowCompact,
      _line,
      _pos,
      _tag          = state.tag,
      _anchor       = state.anchor,
      _result       = {},
      overridableKeys = {},
      keyTag        = null,
      keyNode       = null,
      valueNode     = null,
      atExplicitKey = false,
      detected      = false,
      ch;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line; // Save the current line.
    _pos = state.position;

    //
    // Explicit notation case. There are two separate blocks:
    // first for the key (denoted by "?") and second for the value (denoted by ":")
    //
    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

      if (ch === 0x3F/* ? */) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
          keyTag = keyNode = valueNode = null;
        }

        detected = true;
        atExplicitKey = true;
        allowCompact = true;

      } else if (atExplicitKey) {
        // i.e. 0x3A/* : */ === character after the explicit key.
        atExplicitKey = false;
        allowCompact = true;

      } else {
        throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
      }

      state.position += 1;
      ch = following;

    //
    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
    //
    } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {

      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);

        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (ch === 0x3A/* : */) {
          ch = state.input.charCodeAt(++state.position);

          if (!is_WS_OR_EOL(ch)) {
            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
          }

          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
            keyTag = keyNode = valueNode = null;
          }

          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;

        } else if (detected) {
          throwError(state, 'can not read an implicit mapping pair; a colon is missed');

        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }

      } else if (detected) {
        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true; // Keep the result of `composeNode`.
      }

    } else {
      break; // Reading is done. Go to the epilogue.
    }

    //
    // Common reading code for both explicit and implicit notations.
    //
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }

      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
        keyTag = keyNode = valueNode = null;
      }

      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }

    if (state.lineIndent > nodeIndent && (ch !== 0)) {
      throwError(state, 'bad indentation of a mapping entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  //
  // Epilogue.
  //

  // Special case: last mapping's node contains only the key in explicit notation.
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
  }

  // Expose the resulting mapping.
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'mapping';
    state.result = _result;
  }

  return detected;
}

function readTagProperty(state) {
  var _position,
      isVerbatim = false,
      isNamed    = false,
      tagHandle,
      tagName,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x21/* ! */) return false;

  if (state.tag !== null) {
    throwError(state, 'duplication of a tag property');
  }

  ch = state.input.charCodeAt(++state.position);

  if (ch === 0x3C/* < */) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);

  } else if (ch === 0x21/* ! */) {
    isNamed = true;
    tagHandle = '!!';
    ch = state.input.charCodeAt(++state.position);

  } else {
    tagHandle = '!';
  }

  _position = state.position;

  if (isVerbatim) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (ch !== 0 && ch !== 0x3E/* > */);

    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, 'unexpected end of the stream within a verbatim tag');
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

      if (ch === 0x21/* ! */) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);

          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, 'named tag handle cannot contain such characters');
          }

          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, 'tag suffix cannot contain exclamation marks');
        }
      }

      ch = state.input.charCodeAt(++state.position);
    }

    tagName = state.input.slice(_position, state.position);

    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, 'tag suffix cannot contain flow indicator characters');
    }
  }

  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, 'tag name cannot contain such characters: ' + tagName);
  }

  if (isVerbatim) {
    state.tag = tagName;

  } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;

  } else if (tagHandle === '!') {
    state.tag = '!' + tagName;

  } else if (tagHandle === '!!') {
    state.tag = 'tag:yaml.org,2002:' + tagName;

  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }

  return true;
}

function readAnchorProperty(state) {
  var _position,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x26/* & */) return false;

  if (state.anchor !== null) {
    throwError(state, 'duplication of an anchor property');
  }

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an anchor node must contain at least one character');
  }

  state.anchor = state.input.slice(_position, state.position);
  return true;
}

function readAlias(state) {
  var _position, alias,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x2A/* * */) return false;

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an alias node must contain at least one character');
  }

  alias = state.input.slice(_position, state.position);

  if (!_hasOwnProperty.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }

  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}

function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles,
      allowBlockScalars,
      allowBlockCollections,
      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
      atNewLine  = false,
      hasContent = false,
      typeIndex,
      typeQuantity,
      type,
      flowIndent,
      blockIndent;

  if (state.listener !== null) {
    state.listener('open', state);
  }

  state.tag    = null;
  state.anchor = null;
  state.kind   = null;
  state.result = null;

  allowBlockStyles = allowBlockScalars = allowBlockCollections =
    CONTEXT_BLOCK_OUT === nodeContext ||
    CONTEXT_BLOCK_IN  === nodeContext;

  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;

      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }

  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;

        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }

  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }

  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }

    blockIndent = state.position - state.lineStart;

    if (indentStatus === 1) {
      if (allowBlockCollections &&
          (readBlockSequence(state, blockIndent) ||
           readBlockMapping(state, blockIndent, flowIndent)) ||
          readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
            readSingleQuotedScalar(state, flowIndent) ||
            readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;

        } else if (readAlias(state)) {
          hasContent = true;

          if (state.tag !== null || state.anchor !== null) {
            throwError(state, 'alias node should not have any properties');
          }

        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;

          if (state.tag === null) {
            state.tag = '?';
          }
        }

        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      // Special case: block sequences are allowed to have same indentation level as the parent.
      // http://www.yaml.org/spec/1.2/spec.html#id2799784
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }

  if (state.tag !== null && state.tag !== '!') {
    if (state.tag === '?') {
      // Implicit resolving is not allowed for non-scalar types, and '?'
      // non-specific tag is only automatically assigned to plain scalars.
      //
      // We only need to check kind conformity in case user explicitly assigns '?'
      // tag, for example like this: "!<?> [0]"
      //
      if (state.result !== null && state.kind !== 'scalar') {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }

      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type = state.implicitTypes[typeIndex];

        if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
          state.result = type.construct(state.result);
          state.tag = type.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
      type = state.typeMap[state.kind || 'fallback'][state.tag];

      if (state.result !== null && type.kind !== state.kind) {
        throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
      }

      if (!type.resolve(state.result)) { // `state.result` updated in resolver if matched
        throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
      } else {
        state.result = type.construct(state.result);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else {
      throwError(state, 'unknown tag !<' + state.tag + '>');
    }
  }

  if (state.listener !== null) {
    state.listener('close', state);
  }
  return state.tag !== null ||  state.anchor !== null || hasContent;
}

function readDocument(state) {
  var documentStart = state.position,
      _position,
      directiveName,
      directiveArgs,
      hasDirectives = false,
      ch;

  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = {};
  state.anchorMap = {};

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
      break;
    }

    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];

    if (directiveName.length < 1) {
      throwError(state, 'directive name must not be less than one character in length');
    }

    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      if (ch === 0x23/* # */) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (ch !== 0 && !is_EOL(ch));
        break;
      }

      if (is_EOL(ch)) break;

      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveArgs.push(state.input.slice(_position, state.position));
    }

    if (ch !== 0) readLineBreak(state);

    if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }

  skipSeparationSpace(state, true, -1);

  if (state.lineIndent === 0 &&
      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);

  } else if (hasDirectives) {
    throwError(state, 'directives end mark is expected');
  }

  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);

  if (state.checkLineBreaks &&
      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
  }

  state.documents.push(state.result);

  if (state.position === state.lineStart && testDocumentSeparator(state)) {

    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }

  if (state.position < (state.length - 1)) {
    throwError(state, 'end of the stream or a document separator is expected');
  } else {
    return;
  }
}


function loadDocuments(input, options) {
  input = String(input);
  options = options || {};

  if (input.length !== 0) {

    // Add tailing `\n` if not exists
    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
      input += '\n';
    }

    // Strip BOM
    if (input.charCodeAt(0) === 0xFEFF) {
      input = input.slice(1);
    }
  }

  var state = new State(input, options);

  var nullpos = input.indexOf('\0');

  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, 'null byte is not allowed in input');
  }

  // Use 0 as string terminator. That significantly simplifies bounds check.
  state.input += '\0';

  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
    state.lineIndent += 1;
    state.position += 1;
  }

  while (state.position < (state.length - 1)) {
    readDocument(state);
  }

  return state.documents;
}


function loadAll(input, iterator, options) {
  if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  var documents = loadDocuments(input, options);

  if (typeof iterator !== 'function') {
    return documents;
  }

  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}


function load(input, options) {
  var documents = loadDocuments(input, options);

  if (documents.length === 0) {
    /*eslint-disable no-undefined*/
    return undefined;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new YAMLException('expected a single document in the stream, but found more');
}


function safeLoadAll(input, iterator, options) {
  if (typeof iterator === 'object' && iterator !== null && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}


function safeLoad(input, options) {
  return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}


module.exports.loadAll     = loadAll;
module.exports.load        = load;
module.exports.safeLoadAll = safeLoadAll;
module.exports.safeLoad    = safeLoad;


/***/ }),

/***/ 5426:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var common = __webpack_require__(9136);


function Mark(name, buffer, position, line, column) {
  this.name     = name;
  this.buffer   = buffer;
  this.position = position;
  this.line     = line;
  this.column   = column;
}


Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
  var head, start, tail, end, snippet;

  if (!this.buffer) return null;

  indent = indent || 4;
  maxLength = maxLength || 75;

  head = '';
  start = this.position;

  while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
    start -= 1;
    if (this.position - start > (maxLength / 2 - 1)) {
      head = ' ... ';
      start += 5;
      break;
    }
  }

  tail = '';
  end = this.position;

  while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
    end += 1;
    if (end - this.position > (maxLength / 2 - 1)) {
      tail = ' ... ';
      end -= 5;
      break;
    }
  }

  snippet = this.buffer.slice(start, end);

  return common.repeat(' ', indent) + head + snippet + tail + '\n' +
         common.repeat(' ', indent + this.position - start + head.length) + '^';
};


Mark.prototype.toString = function toString(compact) {
  var snippet, where = '';

  if (this.name) {
    where += 'in "' + this.name + '" ';
  }

  where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);

  if (!compact) {
    snippet = this.getSnippet();

    if (snippet) {
      where += ':\n' + snippet;
    }
  }

  return where;
};


module.exports = Mark;


/***/ }),

/***/ 6514:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable max-len*/

var common        = __webpack_require__(9136);
var YAMLException = __webpack_require__(5199);
var Type          = __webpack_require__(967);


function compileList(schema, name, result) {
  var exclude = [];

  schema.include.forEach(function (includedSchema) {
    result = compileList(includedSchema, name, result);
  });

  schema[name].forEach(function (currentType) {
    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
        exclude.push(previousIndex);
      }
    });

    result.push(currentType);
  });

  return result.filter(function (type, index) {
    return exclude.indexOf(index) === -1;
  });
}


function compileMap(/* lists... */) {
  var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;

  function collectType(type) {
    result[type.kind][type.tag] = result['fallback'][type.tag] = type;
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}


function Schema(definition) {
  this.include  = definition.include  || [];
  this.implicit = definition.implicit || [];
  this.explicit = definition.explicit || [];

  this.implicit.forEach(function (type) {
    if (type.loadKind && type.loadKind !== 'scalar') {
      throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
    }
  });

  this.compiledImplicit = compileList(this, 'implicit', []);
  this.compiledExplicit = compileList(this, 'explicit', []);
  this.compiledTypeMap  = compileMap(this.compiledImplicit, this.compiledExplicit);
}


Schema.DEFAULT = null;


Schema.create = function createSchema() {
  var schemas, types;

  switch (arguments.length) {
    case 1:
      schemas = Schema.DEFAULT;
      types = arguments[0];
      break;

    case 2:
      schemas = arguments[0];
      types = arguments[1];
      break;

    default:
      throw new YAMLException('Wrong number of arguments for Schema.create function');
  }

  schemas = common.toArray(schemas);
  types = common.toArray(types);

  if (!schemas.every(function (schema) { return schema instanceof Schema; })) {
    throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
  }

  if (!types.every(function (type) { return type instanceof Type; })) {
    throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
  }

  return new Schema({
    include: schemas,
    explicit: types
  });
};


module.exports = Schema;


/***/ }),

/***/ 2183:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Standard YAML's Core schema.
// http://www.yaml.org/spec/1.2/spec.html#id2804923
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, Core schema has no distinctions from JSON schema is JS-YAML.





var Schema = __webpack_require__(6514);


module.exports = new Schema({
  include: [
    __webpack_require__(1571)
  ]
});


/***/ }),

/***/ 6874:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// JS-YAML's default schema for `load` function.
// It is not described in the YAML specification.
//
// This schema is based on JS-YAML's default safe schema and includes
// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
//
// Also this schema is used as default base schema at `Schema.create` function.





var Schema = __webpack_require__(6514);


module.exports = Schema.DEFAULT = new Schema({
  include: [
    __webpack_require__(8949)
  ],
  explicit: [
    __webpack_require__(5914),
    __webpack_require__(9242),
    __webpack_require__(7278)
  ]
});


/***/ }),

/***/ 8949:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// JS-YAML's default schema for `safeLoad` function.
// It is not described in the YAML specification.
//
// This schema is based on standard YAML's Core schema and includes most of
// extra types described at YAML tag repository. (http://yaml.org/type/)





var Schema = __webpack_require__(6514);


module.exports = new Schema({
  include: [
    __webpack_require__(2183)
  ],
  implicit: [
    __webpack_require__(3714),
    __webpack_require__(1393)
  ],
  explicit: [
    __webpack_require__(2551),
    __webpack_require__(6668),
    __webpack_require__(6039),
    __webpack_require__(9237)
  ]
});


/***/ }),

/***/ 6037:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Standard YAML's Failsafe schema.
// http://www.yaml.org/spec/1.2/spec.html#id2802346





var Schema = __webpack_require__(6514);


module.exports = new Schema({
  explicit: [
    __webpack_require__(2672),
    __webpack_require__(5490),
    __webpack_require__(1173)
  ]
});


/***/ }),

/***/ 1571:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Standard YAML's JSON schema.
// http://www.yaml.org/spec/1.2/spec.html#id2803231
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, this schema is not such strict as defined in the YAML specification.
// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.





var Schema = __webpack_require__(6514);


module.exports = new Schema({
  include: [
    __webpack_require__(6037)
  ],
  implicit: [
    __webpack_require__(2671),
    __webpack_require__(4675),
    __webpack_require__(9963),
    __webpack_require__(5564)
  ]
});


/***/ }),

/***/ 967:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var YAMLException = __webpack_require__(5199);

var TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'defaultStyle',
  'styleAliases'
];

var YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  var result = {};

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

function Type(tag, options) {
  options = options || {};

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.tag          = tag;
  this.kind         = options['kind']         || null;
  this.resolve      = options['resolve']      || function () { return true; };
  this.construct    = options['construct']    || function (data) { return data; };
  this.instanceOf   = options['instanceOf']   || null;
  this.predicate    = options['predicate']    || null;
  this.represent    = options['represent']    || null;
  this.defaultStyle = options['defaultStyle'] || null;
  this.styleAliases = compileStyleAliases(options['styleAliases'] || null);

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}

module.exports = Type;


/***/ }),

/***/ 2551:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable no-bitwise*/

var NodeBuffer;

try {
  // A trick for browserified version, to not include `Buffer` shim
  var _require = require;
  NodeBuffer = _require('buffer').Buffer;
} catch (__) {}

var Type       = __webpack_require__(967);


// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


function resolveYamlBinary(data) {
  if (data === null) return false;

  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

  // Convert one by one.
  for (idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));

    // Skip CR/LF
    if (code > 64) continue;

    // Fail on illegal characters
    if (code < 0) return false;

    bitlen += 6;
  }

  // If there are any bits left, source was corrupted
  return (bitlen % 8) === 0;
}

function constructYamlBinary(data) {
  var idx, tailbits,
      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

  // Collect by 6*4 bits (3 bytes)

  for (idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    }

    bits = (bits << 6) | map.indexOf(input.charAt(idx));
  }

  // Dump tail

  tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    result.push((bits >> 16) & 0xFF);
    result.push((bits >> 8) & 0xFF);
    result.push(bits & 0xFF);
  } else if (tailbits === 18) {
    result.push((bits >> 10) & 0xFF);
    result.push((bits >> 2) & 0xFF);
  } else if (tailbits === 12) {
    result.push((bits >> 4) & 0xFF);
  }

  // Wrap into Buffer for NodeJS and leave Array for browser
  if (NodeBuffer) {
    // Support node 6.+ Buffer API when available
    return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
  }

  return result;
}

function representYamlBinary(object /*, style*/) {
  var result = '', bits = 0, idx, tail,
      max = object.length,
      map = BASE64_MAP;

  // Convert every three bytes to 4 ASCII characters.

  for (idx = 0; idx < max; idx++) {
    if ((idx % 3 === 0) && idx) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    }

    bits = (bits << 8) + object[idx];
  }

  // Dump tail

  tail = max % 3;

  if (tail === 0) {
    result += map[(bits >> 18) & 0x3F];
    result += map[(bits >> 12) & 0x3F];
    result += map[(bits >> 6) & 0x3F];
    result += map[bits & 0x3F];
  } else if (tail === 2) {
    result += map[(bits >> 10) & 0x3F];
    result += map[(bits >> 4) & 0x3F];
    result += map[(bits << 2) & 0x3F];
    result += map[64];
  } else if (tail === 1) {
    result += map[(bits >> 2) & 0x3F];
    result += map[(bits << 4) & 0x3F];
    result += map[64];
    result += map[64];
  }

  return result;
}

function isBinary(object) {
  return NodeBuffer && NodeBuffer.isBuffer(object);
}

module.exports = new Type('tag:yaml.org,2002:binary', {
  kind: 'scalar',
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});


/***/ }),

/***/ 4675:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

function resolveYamlBoolean(data) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

module.exports = new Type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false'; },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 5564:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var common = __webpack_require__(9136);
var Type   = __webpack_require__(967);

var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // 20:59
  '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');

function resolveYamlFloat(data) {
  if (data === null) return false;

  if (!YAML_FLOAT_PATTERN.test(data) ||
      // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === '_') {
    return false;
  }

  return true;
}

function constructYamlFloat(data) {
  var value, sign, base, digits;

  value  = data.replace(/_/g, '').toLowerCase();
  sign   = value[0] === '-' ? -1 : 1;
  digits = [];

  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }

  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

  } else if (value === '.nan') {
    return NaN;

  } else if (value.indexOf(':') >= 0) {
    value.split(':').forEach(function (v) {
      digits.unshift(parseFloat(v, 10));
    });

    value = 0.0;
    base = 1;

    digits.forEach(function (d) {
      value += d * base;
      base *= 60;
    });

    return sign * value;

  }
  return sign * parseFloat(value, 10);
}


var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

function representYamlFloat(object, style) {
  var res;

  if (isNaN(object)) {
    switch (style) {
      case 'lowercase': return '.nan';
      case 'uppercase': return '.NAN';
      case 'camelcase': return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '.inf';
      case 'uppercase': return '.INF';
      case 'camelcase': return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '-.inf';
      case 'uppercase': return '-.INF';
      case 'camelcase': return '-.Inf';
    }
  } else if (common.isNegativeZero(object)) {
    return '-0.0';
  }

  res = object.toString(10);

  // JS stringifier can build scientific format without dots: 5e-100,
  // while YAML requres dot: 5.e-100. Fix it with simple hack

  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}

function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') &&
         (object % 1 !== 0 || common.isNegativeZero(object));
}

module.exports = new Type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 9963:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var common = __webpack_require__(9136);
var Type   = __webpack_require__(967);

function isHexCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

function isOctCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

function isDecCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

function resolveYamlInteger(data) {
  if (data === null) return false;

  var max = data.length,
      index = 0,
      hasDigits = false,
      ch;

  if (!max) return false;

  ch = data[index];

  // sign
  if (ch === '-' || ch === '+') {
    ch = data[++index];
  }

  if (ch === '0') {
    // 0
    if (index + 1 === max) return true;
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === 'b') {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch !== '0' && ch !== '1') return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'x') {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }

    // base 8
    for (; index < max; index++) {
      ch = data[index];
      if (ch === '_') continue;
      if (!isOctCode(data.charCodeAt(index))) return false;
      hasDigits = true;
    }
    return hasDigits && ch !== '_';
  }

  // base 10 (except 0) or base 60

  // value should not start with `_`;
  if (ch === '_') return false;

  for (; index < max; index++) {
    ch = data[index];
    if (ch === '_') continue;
    if (ch === ':') break;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === '_') return false;

  // if !base60 - done;
  if (ch !== ':') return true;

  // base60 almost not used, no needs to optimize
  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}

function constructYamlInteger(data) {
  var value = data, sign = 1, ch, base, digits = [];

  if (value.indexOf('_') !== -1) {
    value = value.replace(/_/g, '');
  }

  ch = value[0];

  if (ch === '-' || ch === '+') {
    if (ch === '-') sign = -1;
    value = value.slice(1);
    ch = value[0];
  }

  if (value === '0') return 0;

  if (ch === '0') {
    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
    if (value[1] === 'x') return sign * parseInt(value, 16);
    return sign * parseInt(value, 8);
  }

  if (value.indexOf(':') !== -1) {
    value.split(':').forEach(function (v) {
      digits.unshift(parseInt(v, 10));
    });

    value = 0;
    base = 1;

    digits.forEach(function (d) {
      value += (d * base);
      base *= 60;
    });

    return sign * value;

  }

  return sign * parseInt(value, 10);
}

function isInteger(object) {
  return (Object.prototype.toString.call(object)) === '[object Number]' &&
         (object % 1 === 0 && !common.isNegativeZero(object));
}

module.exports = new Type('tag:yaml.org,2002:int', {
  kind: 'scalar',
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
    octal:       function (obj) { return obj >= 0 ? '0'  + obj.toString(8) : '-0'  + obj.toString(8).slice(1); },
    decimal:     function (obj) { return obj.toString(10); },
    /* eslint-disable max-len */
    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
  },
  defaultStyle: 'decimal',
  styleAliases: {
    binary:      [ 2,  'bin' ],
    octal:       [ 8,  'oct' ],
    decimal:     [ 10, 'dec' ],
    hexadecimal: [ 16, 'hex' ]
  }
});


/***/ }),

/***/ 7278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var esprima;

// Browserified version does not have esprima
//
// 1. For node.js just require module as deps
// 2. For browser try to require mudule via external AMD system.
//    If not found - try to fallback to window.esprima. If not
//    found too - then fail to parse.
//
try {
  // workaround to exclude package from browserify list.
  var _require = require;
  esprima = _require('esprima');
} catch (_) {
  /* eslint-disable no-redeclare */
  /* global window */
  if (typeof window !== 'undefined') esprima = window.esprima;
}

var Type = __webpack_require__(967);

function resolveJavascriptFunction(data) {
  if (data === null) return false;

  try {
    var source = '(' + data + ')',
        ast    = esprima.parse(source, { range: true });

    if (ast.type                    !== 'Program'             ||
        ast.body.length             !== 1                     ||
        ast.body[0].type            !== 'ExpressionStatement' ||
        (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
          ast.body[0].expression.type !== 'FunctionExpression')) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

function constructJavascriptFunction(data) {
  /*jslint evil:true*/

  var source = '(' + data + ')',
      ast    = esprima.parse(source, { range: true }),
      params = [],
      body;

  if (ast.type                    !== 'Program'             ||
      ast.body.length             !== 1                     ||
      ast.body[0].type            !== 'ExpressionStatement' ||
      (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
        ast.body[0].expression.type !== 'FunctionExpression')) {
    throw new Error('Failed to resolve function');
  }

  ast.body[0].expression.params.forEach(function (param) {
    params.push(param.name);
  });

  body = ast.body[0].expression.body.range;

  // Esprima's ranges include the first '{' and the last '}' characters on
  // function expressions. So cut them out.
  if (ast.body[0].expression.body.type === 'BlockStatement') {
    /*eslint-disable no-new-func*/
    return new Function(params, source.slice(body[0] + 1, body[1] - 1));
  }
  // ES6 arrow functions can omit the BlockStatement. In that case, just return
  // the body.
  /*eslint-disable no-new-func*/
  return new Function(params, 'return ' + source.slice(body[0], body[1]));
}

function representJavascriptFunction(object /*, style*/) {
  return object.toString();
}

function isFunction(object) {
  return Object.prototype.toString.call(object) === '[object Function]';
}

module.exports = new Type('tag:yaml.org,2002:js/function', {
  kind: 'scalar',
  resolve: resolveJavascriptFunction,
  construct: constructJavascriptFunction,
  predicate: isFunction,
  represent: representJavascriptFunction
});


/***/ }),

/***/ 9242:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

function resolveJavascriptRegExp(data) {
  if (data === null) return false;
  if (data.length === 0) return false;

  var regexp = data,
      tail   = /\/([gim]*)$/.exec(data),
      modifiers = '';

  // if regexp starts with '/' it can have modifiers and must be properly closed
  // `/foo/gim` - modifiers tail can be maximum 3 chars
  if (regexp[0] === '/') {
    if (tail) modifiers = tail[1];

    if (modifiers.length > 3) return false;
    // if expression starts with /, is should be properly terminated
    if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
  }

  return true;
}

function constructJavascriptRegExp(data) {
  var regexp = data,
      tail   = /\/([gim]*)$/.exec(data),
      modifiers = '';

  // `/foo/gim` - tail can be maximum 4 chars
  if (regexp[0] === '/') {
    if (tail) modifiers = tail[1];
    regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
  }

  return new RegExp(regexp, modifiers);
}

function representJavascriptRegExp(object /*, style*/) {
  var result = '/' + object.source + '/';

  if (object.global) result += 'g';
  if (object.multiline) result += 'm';
  if (object.ignoreCase) result += 'i';

  return result;
}

function isRegExp(object) {
  return Object.prototype.toString.call(object) === '[object RegExp]';
}

module.exports = new Type('tag:yaml.org,2002:js/regexp', {
  kind: 'scalar',
  resolve: resolveJavascriptRegExp,
  construct: constructJavascriptRegExp,
  predicate: isRegExp,
  represent: representJavascriptRegExp
});


/***/ }),

/***/ 5914:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

function resolveJavascriptUndefined() {
  return true;
}

function constructJavascriptUndefined() {
  /*eslint-disable no-undefined*/
  return undefined;
}

function representJavascriptUndefined() {
  return '';
}

function isUndefined(object) {
  return typeof object === 'undefined';
}

module.exports = new Type('tag:yaml.org,2002:js/undefined', {
  kind: 'scalar',
  resolve: resolveJavascriptUndefined,
  construct: constructJavascriptUndefined,
  predicate: isUndefined,
  represent: representJavascriptUndefined
});


/***/ }),

/***/ 1173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

module.exports = new Type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: function (data) { return data !== null ? data : {}; }
});


/***/ }),

/***/ 1393:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}

module.exports = new Type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});


/***/ }),

/***/ 2671:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

function resolveYamlNull(data) {
  if (data === null) return true;

  var max = data.length;

  return (max === 1 && data === '~') ||
         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return object === null;
}

module.exports = new Type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function () { return '~';    },
    lowercase: function () { return 'null'; },
    uppercase: function () { return 'NULL'; },
    camelcase: function () { return 'Null'; }
  },
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 6668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _toString       = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (data === null) return true;

  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
      object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if (_toString.call(pair) !== '[object Object]') return false;

    for (pairKey in pair) {
      if (_hasOwnProperty.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data) {
  return data !== null ? data : [];
}

module.exports = new Type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});


/***/ }),

/***/ 6039:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

var _toString = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (data === null) return true;

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if (_toString.call(pair) !== '[object Object]') return false;

    keys = Object.keys(pair);

    if (keys.length !== 1) return false;

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return true;
}

function constructYamlPairs(data) {
  if (data === null) return [];

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return result;
}

module.exports = new Type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});


/***/ }),

/***/ 5490:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

module.exports = new Type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
  construct: function (data) { return data !== null ? data : []; }
});


/***/ }),

/***/ 9237:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (data === null) return true;

  var key, object = data;

  for (key in object) {
    if (_hasOwnProperty.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data) {
  return data !== null ? data : {};
}

module.exports = new Type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet
});


/***/ }),

/***/ 2672:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

module.exports = new Type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data) { return data !== null ? data : ''; }
});


/***/ }),

/***/ 3714:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(967);

var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}

function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, date;

  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}

function representYamlTimestamp(object /*, style*/) {
  return object.toISOString();
}

module.exports = new Type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});


/***/ }),

/***/ 3973:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(5622)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(3717)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),

/***/ 4541:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.commandFactory = exports.INPUT_STRING_ERROR = exports.INPUT_JSON_UNDEFINED_ERROR = exports.FILTER_UNDEFINED_ERROR = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _joi = __webpack_require__(4010);

var Joi = _interopRequireWildcard(_joi);

var _path = __webpack_require__(5622);

var _path2 = _interopRequireDefault(_path);

var _options = __webpack_require__(7926);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var JQ_PATH = process.env.JQ_PATH || _path2.default.join(__dirname, '..', 'bin', 'jq');

var FILTER_UNDEFINED_ERROR = exports.FILTER_UNDEFINED_ERROR = 'node-jq: invalid filter argument supplied: "undefined"';
var INPUT_JSON_UNDEFINED_ERROR = exports.INPUT_JSON_UNDEFINED_ERROR = 'node-jq: invalid json object argument supplied: "undefined"';
var INPUT_STRING_ERROR = exports.INPUT_STRING_ERROR = 'node-jq: invalid json string argument supplied';

var NODE_JQ_ERROR_TEMPLATE = 'node-jq: invalid {#label} ' + 'argument supplied{if(#label == "path" && #type == "json", " (not a .json file)", "")}' + '{if(#label == "path" && #type == "path", " (not a valid path)", "")}: ' + '"{if(#value != undefined, #value, "undefined")}"';

var messages = {
  'any.invalid': NODE_JQ_ERROR_TEMPLATE,
  'any.required': NODE_JQ_ERROR_TEMPLATE,
  'string.base': NODE_JQ_ERROR_TEMPLATE,
  'string.empty': NODE_JQ_ERROR_TEMPLATE
};

var validateArguments = function validateArguments(filter, json, options) {
  var context = { filter: filter, json: json };
  var validatedOptions = Joi.attempt(options, _options.optionsSchema);
  var validatedPreSpawn = Joi.attempt(context, _options.preSpawnSchema.tailor(validatedOptions.input), { messages: messages });
  var validatedArgs = (0, _options.parseOptions)(validatedOptions, validatedPreSpawn.filter, validatedPreSpawn.json);
  var validatedSpawn = Joi.attempt({}, _options.spawnSchema.tailor(validatedOptions.input), { context: _extends({}, validatedPreSpawn, { options: validatedOptions }) });

  if (validatedOptions.input === 'file') {
    return {
      args: validatedArgs,
      stdin: validatedSpawn.stdin
    };
  }
  return {
    args: validatedArgs,
    stdin: validatedSpawn.stdin
  };
};

var commandFactory = exports.commandFactory = function commandFactory(filter, json) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var jqPath = arguments[3];

  var command = jqPath ? _path2.default.join(jqPath, './jq') : JQ_PATH;
  var result = validateArguments(filter, json, options);

  return {
    command: command,
    args: result.args,
    stdin: result.stdin
  };
};

/***/ }),

/***/ 6388:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _child_process = __webpack_require__(3129);

var _child_process2 = _interopRequireDefault(_child_process);

var _stripFinalNewline = __webpack_require__(8174);

var _stripFinalNewline2 = _interopRequireDefault(_stripFinalNewline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEN_MEBIBYTE = 1024 * 1024 * 10;

var exec = function exec(command, args, stdin, cwd) {
  return new Promise(function (resolve, reject) {
    var stdout = '';
    var stderr = '';

    var spawnOptions = { maxBuffer: TEN_MEBIBYTE, cwd: cwd };

    var process = _child_process2.default.spawn(command, args, spawnOptions);

    if (stdin) {
      process.stdin.setEncoding('utf-8');
      process.stdin.write(stdin);
      process.stdin.end();
    }

    process.stdout.setEncoding('utf-8');
    process.stdout.on('data', function (data) {
      stdout += data;
    });

    process.stderr.on('data', function (data) {
      stderr += data;
    });

    process.on('close', function (code) {
      if (code !== 0) {
        return reject(Error(stderr));
      } else {
        return resolve((0, _stripFinalNewline2.default)(stdout));
      }
    });
  });
};

exports.default = exec;

/***/ }),

/***/ 7668:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.run = undefined;

var _exec = __webpack_require__(6388);

var _exec2 = _interopRequireDefault(_exec);

var _command = __webpack_require__(4541);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var run = exports.run = function run(filter, json) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var jqPath = arguments[3];
  var cwd = arguments[4];

  return new Promise(function (resolve, reject) {
    var _commandFactory = (0, _command.commandFactory)(filter, json, options, jqPath),
        command = _commandFactory.command,
        args = _commandFactory.args,
        stdin = _commandFactory.stdin;

    (0, _exec2.default)(command, args, stdin, cwd).then(function (stdout) {
      if (options.output === 'json') {
        var result = void 0;
        try {
          result = JSON.parse(stdout);
        } catch (error) {
          result = stdout;
        }
        return resolve(result);
      } else {
        return resolve(stdout);
      }
    }).catch(reject);
  });
};

/***/ }),

/***/ 7926:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.optionDefaults = exports.parseOptions = exports.spawnSchema = exports.preSpawnSchema = exports.optionsSchema = undefined;

var _joi = __webpack_require__(4010);

var Joi = _interopRequireWildcard(_joi);

var _utils = __webpack_require__(5956);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createBooleanSchema(name, value) {
  return Joi.string().when('' + name, {
    is: Joi.boolean().required().valid(true),
    then: Joi.string().default(value)
  });
}

var strictBoolean = Joi.boolean().default(false).strict();
var path = Joi.any().custom(function (value, helpers) {
  try {
    (0, _utils.validateJSONPath)(value);
    return value;
  } catch (e) {
    var errorType = e.message.includes('.json') ? 'json' : 'path';
    return helpers.error('any.invalid', { type: errorType });
  }
}, 'path validation').required().error(function (errors) {
  errors.forEach(function (error) {
    if (error.value === undefined) {
      error.local.type = 'path';
    }
  });
  return errors;
});

var optionsSchema = exports.optionsSchema = Joi.object({
  color: strictBoolean,
  input: Joi.string().default('file').valid('file', 'json', 'string'),
  locations: Joi.array().items(Joi.string()).default([]),
  output: Joi.string().default('pretty').valid('string', 'compact', 'pretty', 'json'),
  raw: strictBoolean,
  slurp: strictBoolean,
  sort: strictBoolean
});

var preSpawnSchema = exports.preSpawnSchema = Joi.object({
  filter: Joi.string().allow('', null).required(),
  json: Joi.any().alter({
    file: function file(schema) {
      return schema.when('/json', {
        is: Joi.array().required(),
        then: Joi.array().items(path),
        otherwise: path
      }).label('path');
    },
    json: function json(schema) {
      return Joi.object().allow('', null).required().label('json object');
    },
    string: function string(schema) {
      return Joi.string().required().label('json string');
    }
  })
});

var spawnSchema = exports.spawnSchema = Joi.object({
  args: Joi.object({
    color: createBooleanSchema('$options.color', '--color-output'),
    input: Joi.any().alter({
      file: function file(schema) {
        return schema.when('$json', {
          is: [Joi.array().items(Joi.string()), Joi.string()],
          then: Joi.array().default(Joi.ref('$json', {
            adjust: function adjust(value) {
              return [].concat(value);
            }
          }))
        });
      }
    }),
    locations: Joi.ref('$options.locations'),
    output: Joi.string().when('$options.output', {
      is: Joi.string().required().valid('string', 'compact'),
      then: Joi.string().default('--compact-output')
    }),
    raw: createBooleanSchema('$options.raw', '-r'),
    slurp: createBooleanSchema('$options.slurp', '--slurp'),
    sort: createBooleanSchema('$options.sort', '--sort-keys')
  }).default(),
  stdin: Joi.string().default('').alter({
    json: function json(schema) {
      return schema.default(Joi.ref('$json', {
        adjust: function adjust(value) {
          return JSON.stringify(value);
        }
      }));
    },
    string: function string(schema) {
      return schema.default(Joi.ref('$json'));
    }
  })
});

var parseOptions = exports.parseOptions = function parseOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var filter = arguments[1];
  var json = arguments[2];

  var context = { filter: filter, json: json, options: options };
  var validatedSpawn = Joi.attempt({}, spawnSchema.tailor(options.input), { context: context });

  if (options.input === 'file') {
    return Object.keys(validatedSpawn.args).filter(function (key) {
      return key !== 'input';
    }).reduce(function (list, key) {
      return list.concat(validatedSpawn.args[key]);
    }, []).concat(filter, json);
  }
  return Object.values(validatedSpawn.args).concat(filter);
};

var optionDefaults = exports.optionDefaults = Joi.attempt({}, optionsSchema);

/***/ }),

/***/ 5956:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.validateJSONPath = exports.isJSONPath = exports.INVALID_JSON_PATH_ERROR = exports.INVALID_PATH_ERROR = undefined;

var _isValidPath = __webpack_require__(4402);

var _isValidPath2 = _interopRequireDefault(_isValidPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INVALID_PATH_ERROR = exports.INVALID_PATH_ERROR = 'node-jq: invalid path argument supplied (not a valid path)';
var INVALID_JSON_PATH_ERROR = exports.INVALID_JSON_PATH_ERROR = 'node-jq: invalid path argument supplied (not a .json file)';

var isJSONPath = exports.isJSONPath = function isJSONPath(path) {
  return (/\.json$/.test(path)
  );
};

var validateJSONPath = exports.validateJSONPath = function validateJSONPath(path) {
  if (!(0, _isValidPath2.default)(path)) {
    throw new Error(INVALID_PATH_ERROR + ': "' + path + '"');
  }

  if (!isJSONPath(path)) {
    throw new Error(INVALID_JSON_PATH_ERROR + ': "' + (path === '' ? '' : path) + '"');
  }

  return true;
};

/***/ }),

/***/ 8174:
/***/ ((module) => {

"use strict";


module.exports = input => {
	const LF = typeof input === 'string' ? '\n' : '\n'.charCodeAt();
	const CR = typeof input === 'string' ? '\r' : '\r'.charCodeAt();

	if (input[input.length - 1] === LF) {
		input = input.slice(0, input.length - 1);
	}

	if (input[input.length - 1] === CR) {
		input = input.slice(0, input.length - 1);
	}

	return input;
};


/***/ }),

/***/ 4936:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Deserializer = exports.defaultTypeResolver = void 0;
var helpers_1 = __webpack_require__(8260);
var metadata_1 = __webpack_require__(9487);
var options_base_1 = __webpack_require__(7525);
var type_descriptor_1 = __webpack_require__(3022);
function defaultTypeResolver(sourceObject, knownTypes) {
    if (sourceObject.__type != null) {
        return knownTypes.get(sourceObject.__type);
    }
}
exports.defaultTypeResolver = defaultTypeResolver;
var Deserializer = (function () {
    function Deserializer() {
        this.typeResolver = defaultTypeResolver;
        this.errorHandler = helpers_1.logError;
        this.deserializationStrategy = new Map([
            [type_descriptor_1.AnyT.ctor, helpers_1.identity],
            [Number, deserializeDirectly],
            [String, deserializeDirectly],
            [Boolean, deserializeDirectly],
            [Date, deserializeDate],
            [ArrayBuffer, stringToArrayBuffer],
            [DataView, stringToDataView],
            [Array, convertAsArray],
            [Set, convertAsSet],
            [Map, convertAsMap],
            [Float32Array, convertAsFloatArray],
            [Float64Array, convertAsFloatArray],
            [Uint8Array, convertAsUintArray],
            [Uint8ClampedArray, convertAsUintArray],
            [Uint16Array, convertAsUintArray],
            [Uint32Array, convertAsUintArray],
        ]);
    }
    Deserializer.prototype.setDeserializationStrategy = function (type, deserializer) {
        this.deserializationStrategy.set(type, deserializer);
    };
    Deserializer.prototype.setNameResolver = function (nameResolverCallback) {
        this.nameResolver = nameResolverCallback;
    };
    Deserializer.prototype.setTypeResolver = function (typeResolverCallback) {
        if (typeof typeResolverCallback !== 'function') {
            throw new TypeError('\'typeResolverCallback\' is not a function.');
        }
        this.typeResolver = typeResolverCallback;
    };
    Deserializer.prototype.getTypeResolver = function () {
        return this.typeResolver;
    };
    Deserializer.prototype.setErrorHandler = function (errorHandlerCallback) {
        if (typeof errorHandlerCallback !== 'function') {
            throw new TypeError('\'errorHandlerCallback\' is not a function.');
        }
        this.errorHandler = errorHandlerCallback;
    };
    Deserializer.prototype.getErrorHandler = function () {
        return this.errorHandler;
    };
    Deserializer.prototype.convertSingleValue = function (sourceObject, typeDescriptor, knownTypes, memberName, memberOptions) {
        if (memberName === void 0) { memberName = 'object'; }
        if (this.retrievePreserveNull(memberOptions) && sourceObject === null) {
            return null;
        }
        else if (!helpers_1.isValueDefined(sourceObject)) {
            return;
        }
        var deserializer = this.deserializationStrategy.get(typeDescriptor.ctor);
        if (deserializer !== undefined) {
            return deserializer(sourceObject, typeDescriptor, knownTypes, memberName, this, memberOptions);
        }
        if (typeof sourceObject === 'object') {
            return convertAsObject(sourceObject, typeDescriptor, knownTypes, memberName, this);
        }
        var error = "Could not deserialize '" + memberName + "'; don't know how to deserialize type";
        if (typeDescriptor.hasFriendlyName()) {
            error += " '" + typeDescriptor.ctor.name + "'";
        }
        this.errorHandler(new TypeError(error + "."));
    };
    Deserializer.prototype.instantiateType = function (ctor) {
        return new ctor();
    };
    Deserializer.prototype.mergeKnownTypes = function () {
        var _this = this;
        var knownTypeMaps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            knownTypeMaps[_i] = arguments[_i];
        }
        var result = new Map();
        knownTypeMaps.forEach(function (knownTypes) {
            knownTypes.forEach(function (ctor, name) {
                if (_this.nameResolver === undefined) {
                    result.set(name, ctor);
                }
                else {
                    result.set(_this.nameResolver(ctor), ctor);
                }
            });
        });
        return result;
    };
    Deserializer.prototype.createKnownTypesMap = function (knowTypes) {
        var _this = this;
        var map = new Map();
        knowTypes.forEach(function (ctor) {
            if (_this.nameResolver === undefined) {
                var knownTypeMeta = metadata_1.JsonObjectMetadata.getFromConstructor(ctor);
                var customName = (knownTypeMeta === null || knownTypeMeta === void 0 ? void 0 : knownTypeMeta.isExplicitlyMarked) === true
                    ? knownTypeMeta.name
                    : null;
                map.set(customName !== null && customName !== void 0 ? customName : ctor.name, ctor);
            }
            else {
                map.set(_this.nameResolver(ctor), ctor);
            }
        });
        return map;
    };
    Deserializer.prototype.retrievePreserveNull = function (memberOptions) {
        return options_base_1.getOptionValue('preserveNull', options_base_1.mergeOptions(this.options, memberOptions));
    };
    return Deserializer;
}());
exports.Deserializer = Deserializer;
function throwTypeMismatchError(targetType, expectedSourceType, actualSourceType, memberName) {
    throw new TypeError("Could not deserialize " + memberName + " as " + targetType + ":"
        + (" expected " + expectedSourceType + ", got " + actualSourceType + "."));
}
function makeTypeErrorMessage(expectedType, actualType, memberName) {
    var expectedTypeName = typeof expectedType === 'function'
        ? helpers_1.nameof(expectedType)
        : expectedType;
    var actualTypeName = typeof actualType === 'function' ? helpers_1.nameof(actualType) : actualType;
    return "Could not deserialize " + memberName + ": expected '" + expectedTypeName + "',"
        + (" got '" + actualTypeName + "'.");
}
function srcTypeNameForDebug(sourceObject) {
    return sourceObject == null ? 'undefined' : helpers_1.nameof(sourceObject.constructor);
}
function deserializeDirectly(sourceObject, typeDescriptor, knownTypes, objectName) {
    if (sourceObject.constructor !== typeDescriptor.ctor) {
        throw new TypeError(makeTypeErrorMessage(helpers_1.nameof(typeDescriptor.ctor), sourceObject.constructor, objectName));
    }
    return sourceObject;
}
function convertAsObject(sourceObject, typeDescriptor, knownTypes, memberName, deserializer) {
    if (typeof sourceObject !== 'object' || sourceObject === null) {
        deserializer.getErrorHandler()(new TypeError("Cannot deserialize " + memberName + ": 'sourceObject' must be a defined object."));
        return undefined;
    }
    var expectedSelfType = typeDescriptor.ctor;
    var sourceObjectMetadata = metadata_1.JsonObjectMetadata.getFromConstructor(expectedSelfType);
    var knownTypeConstructors = knownTypes;
    var typeResolver = deserializer.getTypeResolver();
    if (sourceObjectMetadata !== undefined) {
        sourceObjectMetadata.processDeferredKnownTypes();
        knownTypeConstructors = deserializer.mergeKnownTypes(knownTypeConstructors, deserializer.createKnownTypesMap(sourceObjectMetadata.knownTypes));
        if (sourceObjectMetadata.typeResolver != null) {
            typeResolver = sourceObjectMetadata.typeResolver;
        }
    }
    var typeFromTypeHint = typeResolver(sourceObject, knownTypeConstructors);
    if (typeFromTypeHint != null) {
        if (helpers_1.isSubtypeOf(typeFromTypeHint, expectedSelfType)) {
            expectedSelfType = typeFromTypeHint;
            sourceObjectMetadata = metadata_1.JsonObjectMetadata.getFromConstructor(typeFromTypeHint);
            if (sourceObjectMetadata !== undefined) {
                knownTypeConstructors = deserializer.mergeKnownTypes(knownTypeConstructors, deserializer.createKnownTypesMap(sourceObjectMetadata.knownTypes));
            }
        }
    }
    if ((sourceObjectMetadata === null || sourceObjectMetadata === void 0 ? void 0 : sourceObjectMetadata.isExplicitlyMarked) === true) {
        var sourceMetadata_1 = sourceObjectMetadata;
        var sourceObjectWithDeserializedProperties_1 = {};
        var classOptions_1 = options_base_1.mergeOptions(deserializer.options, sourceMetadata_1.options);
        sourceMetadata_1.dataMembers.forEach(function (objMemberMetadata, propKey) {
            var objMemberValue = sourceObject[propKey];
            var objMemberDebugName = helpers_1.nameof(sourceMetadata_1.classType) + "." + propKey;
            var objMemberOptions = options_base_1.mergeOptions(classOptions_1, objMemberMetadata.options);
            var revivedValue;
            if (objMemberMetadata.deserializer != null) {
                revivedValue = objMemberMetadata.deserializer(objMemberValue);
            }
            else if (objMemberMetadata.type == null) {
                throw new TypeError("Cannot deserialize " + objMemberDebugName + " there is"
                    + " no constructor nor deserialization function to use.");
            }
            else {
                revivedValue = deserializer.convertSingleValue(objMemberValue, objMemberMetadata.type(), knownTypeConstructors, objMemberDebugName, objMemberOptions);
            }
            if (helpers_1.isValueDefined(revivedValue)
                || (deserializer.retrievePreserveNull(objMemberOptions)
                    && revivedValue === null)) {
                sourceObjectWithDeserializedProperties_1[objMemberMetadata.key] = revivedValue;
            }
            else if (objMemberMetadata.isRequired === true) {
                deserializer.getErrorHandler()(new TypeError("Missing required member '" + objMemberDebugName + "'."));
            }
        });
        var targetObject = void 0;
        if (typeof sourceObjectMetadata.initializerCallback === 'function') {
            try {
                targetObject = sourceObjectMetadata.initializerCallback(sourceObjectWithDeserializedProperties_1, sourceObject);
                if (targetObject == null) {
                    throw new TypeError("Cannot deserialize " + memberName + ":"
                        + " 'initializer' function returned undefined/null"
                        + (", but '" + helpers_1.nameof(sourceObjectMetadata.classType) + "' was expected."));
                }
                else if (!(targetObject instanceof sourceObjectMetadata.classType)) {
                    throw new TypeError("Cannot deserialize " + memberName + ":"
                        + ("'initializer' returned '" + helpers_1.nameof(targetObject.constructor) + "'")
                        + (", but '" + helpers_1.nameof(sourceObjectMetadata.classType) + "' was expected")
                        + (", and '" + helpers_1.nameof(targetObject.constructor) + "' is not a subtype of")
                        + (" '" + helpers_1.nameof(sourceObjectMetadata.classType) + "'"));
                }
            }
            catch (e) {
                deserializer.getErrorHandler()(e);
                return undefined;
            }
        }
        else {
            targetObject = deserializer.instantiateType(expectedSelfType);
        }
        Object.assign(targetObject, sourceObjectWithDeserializedProperties_1);
        var methodName = sourceObjectMetadata.onDeserializedMethodName;
        if (methodName != null) {
            if (typeof targetObject[methodName] === 'function') {
                targetObject[methodName]();
            }
            else if (typeof targetObject.constructor[methodName] === 'function') {
                targetObject.constructor[methodName]();
            }
            else {
                deserializer.getErrorHandler()(new TypeError("onDeserialized callback"
                    + ("'" + helpers_1.nameof(sourceObjectMetadata.classType) + "." + methodName + "' is not a method.")));
            }
        }
        return targetObject;
    }
    else {
        var targetObject_1 = {};
        Object.keys(sourceObject).forEach(function (sourceKey) {
            targetObject_1[sourceKey] = deserializer.convertSingleValue(sourceObject[sourceKey], new type_descriptor_1.ConcreteTypeDescriptor(sourceObject[sourceKey].constructor), knownTypes, sourceKey);
        });
        return targetObject_1;
    }
}
function convertAsArray(sourceObject, typeDescriptor, knownTypes, memberName, deserializer, memberOptions) {
    if (!(typeDescriptor instanceof type_descriptor_1.ArrayTypeDescriptor)) {
        throw new TypeError("Could not deserialize " + memberName + " as Array: incorrect TypeDescriptor detected,"
            + ' please use proper annotation or function for this type');
    }
    if (!Array.isArray(sourceObject)) {
        deserializer.getErrorHandler()(new TypeError(makeTypeErrorMessage(Array, sourceObject.constructor, memberName)));
        return [];
    }
    if (typeDescriptor.elementType == null) {
        deserializer.getErrorHandler()(new TypeError("Could not deserialize " + memberName + " as Array: missing constructor reference of"
            + " Array elements."));
        return [];
    }
    return sourceObject.map(function (element, i) {
        try {
            return deserializer.convertSingleValue(element, typeDescriptor.elementType, knownTypes, memberName + "[" + i + "]", memberOptions);
        }
        catch (e) {
            deserializer.getErrorHandler()(e);
            return undefined;
        }
    });
}
function convertAsSet(sourceObject, typeDescriptor, knownTypes, memberName, deserializer, memberOptions) {
    if (!(typeDescriptor instanceof type_descriptor_1.SetTypeDescriptor)) {
        throw new TypeError("Could not deserialize " + memberName + " as Set: incorrect TypeDescriptor detected,"
            + " please use proper annotation or function for this type");
    }
    if (!Array.isArray(sourceObject)) {
        deserializer.getErrorHandler()(new TypeError(makeTypeErrorMessage(Array, sourceObject.constructor, memberName)));
        return new Set();
    }
    if (typeDescriptor.elementType == null) {
        deserializer.getErrorHandler()(new TypeError("Could not deserialize " + memberName + " as Set: missing constructor reference of"
            + " Set elements."));
        return new Set();
    }
    var resultSet = new Set();
    sourceObject.forEach(function (element, i) {
        try {
            resultSet.add(deserializer.convertSingleValue(element, typeDescriptor.elementType, knownTypes, memberName + "[" + i + "]", memberOptions));
        }
        catch (e) {
            deserializer.getErrorHandler()(e);
        }
    });
    return resultSet;
}
function isExpectedMapShape(source, expectedShape) {
    return (expectedShape === 0 && Array.isArray(source))
        || (expectedShape === 1 && typeof source === 'object');
}
function convertAsMap(sourceObject, typeDescriptor, knownTypes, memberName, deserializer, memberOptions) {
    if (!(typeDescriptor instanceof type_descriptor_1.MapTypeDescriptor)) {
        throw new TypeError("Could not deserialize " + memberName + " as Map: incorrect TypeDescriptor detected,"
            + 'please use proper annotation or function for this type');
    }
    var expectedShape = typeDescriptor.getCompleteOptions().shape;
    if (!isExpectedMapShape(sourceObject, expectedShape)) {
        var expectedType = expectedShape === 0 ? Array : Object;
        deserializer.getErrorHandler()(new TypeError(makeTypeErrorMessage(expectedType, sourceObject.constructor, memberName)));
        return new Map();
    }
    if (typeDescriptor.keyType == null) {
        deserializer.getErrorHandler()(new TypeError("Could not deserialize " + memberName + " as Map: missing key constructor."));
        return new Map();
    }
    if (typeDescriptor.valueType == null) {
        deserializer.getErrorHandler()(new TypeError("Could not deserialize " + memberName + " as Map: missing value constructor."));
        return new Map();
    }
    var keyMemberName = memberName + "[].key";
    var valueMemberName = memberName + "[].value";
    var resultMap = new Map();
    if (expectedShape === 1) {
        Object.keys(sourceObject).forEach(function (key) {
            try {
                var resultKey = deserializer.convertSingleValue(key, typeDescriptor.keyType, knownTypes, keyMemberName, memberOptions);
                if (helpers_1.isValueDefined(resultKey)) {
                    resultMap.set(resultKey, deserializer.convertSingleValue(sourceObject[key], typeDescriptor.valueType, knownTypes, valueMemberName, memberOptions));
                }
            }
            catch (e) {
                deserializer.getErrorHandler()(e);
            }
        });
    }
    else {
        sourceObject.forEach(function (element) {
            try {
                var key = deserializer.convertSingleValue(element.key, typeDescriptor.keyType, knownTypes, keyMemberName, memberOptions);
                if (helpers_1.isValueDefined(key)) {
                    resultMap.set(key, deserializer.convertSingleValue(element.value, typeDescriptor.valueType, knownTypes, valueMemberName, memberOptions));
                }
            }
            catch (e) {
                deserializer.getErrorHandler()(e);
            }
        });
    }
    return resultMap;
}
function deserializeDate(sourceObject, typeDescriptor, knownTypes, memberName) {
    if (typeof sourceObject === 'number') {
        var isInteger = sourceObject % 1 === 0;
        if (!isInteger) {
            throw new TypeError("Could not deserialize " + memberName + " as Date:"
                + " expected an integer, got a number with decimal places.");
        }
        return new Date(sourceObject);
    }
    else if (typeof sourceObject === 'string') {
        return new Date(sourceObject);
    }
    else if (sourceObject instanceof Date) {
        return sourceObject;
    }
    else {
        throwTypeMismatchError('Date', 'an ISO-8601 string', srcTypeNameForDebug(sourceObject), memberName);
    }
}
function stringToArrayBuffer(sourceObject, typeDescriptor, knownTypes, memberName) {
    if (typeof sourceObject !== 'string') {
        throwTypeMismatchError('ArrayBuffer', 'a string source', srcTypeNameForDebug(sourceObject), memberName);
    }
    return createArrayBufferFromString(sourceObject);
}
function stringToDataView(sourceObject, typeDescriptor, knownTypes, memberName) {
    if (typeof sourceObject !== 'string') {
        throwTypeMismatchError('DataView', 'a string source', srcTypeNameForDebug(sourceObject), memberName);
    }
    return new DataView(createArrayBufferFromString(sourceObject));
}
function createArrayBufferFromString(input) {
    var buf = new ArrayBuffer(input.length * 2);
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = input.length; i < strLen; i++) {
        bufView[i] = input.charCodeAt(i);
    }
    return buf;
}
function convertAsFloatArray(sourceObject, typeDescriptor, knownTypes, memberName) {
    var constructor = typeDescriptor.ctor;
    if (Array.isArray(sourceObject) && sourceObject.every(function (elem) { return !isNaN(elem); })) {
        return new constructor(sourceObject);
    }
    return throwTypeMismatchError(constructor.name, 'a numeric source array', srcTypeNameForDebug(sourceObject), memberName);
}
function convertAsUintArray(sourceObject, typeDescriptor, knownTypes, memberName) {
    var constructor = typeDescriptor.ctor;
    if (Array.isArray(sourceObject) && sourceObject.every(function (elem) { return !isNaN(elem); })) {
        return new constructor(sourceObject.map(function (value) { return ~~value; }));
    }
    return throwTypeMismatchError(typeDescriptor.ctor.name, 'a numeric source array', srcTypeNameForDebug(sourceObject), memberName);
}
//# sourceMappingURL=deserializer.js.map

/***/ }),

/***/ 8260:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.identity = exports.nameof = exports.isReflectMetadataSupported = exports.isInstanceOf = exports.isValueDefined = exports.logWarning = exports.logMessage = exports.logError = exports.isSubtypeOf = exports.parseToJSObject = exports.shouldOmitParseString = exports.isObject = exports.isTypeTypedArray = exports.isDirectlyDeserializableNativeType = exports.isDirectlySerializableNativeType = exports.MISSING_REFLECT_CONF_MSG = exports.LAZY_TYPE_EXPLANATION = void 0;
var type_descriptor_1 = __webpack_require__(3022);
exports.LAZY_TYPE_EXPLANATION = "If the type is not yet defined, for example due to circular references, add '() => ' before it. E.g. @jsonMember(() => Foo)";
exports.MISSING_REFLECT_CONF_MSG = 'Make sure that you have both "experimentalDecorators"'
    + ' and "emitDecoratorMetadata" enabled in your tsconfig.json';
function isDirectlySerializableNativeType(type) {
    return [Date, Number, String, Boolean].indexOf(type) !== -1;
}
exports.isDirectlySerializableNativeType = isDirectlySerializableNativeType;
function isDirectlyDeserializableNativeType(type) {
    return [Number, String, Boolean].indexOf(type) !== -1;
}
exports.isDirectlyDeserializableNativeType = isDirectlyDeserializableNativeType;
function isTypeTypedArray(type) {
    return [
        Float32Array,
        Float64Array,
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
    ].indexOf(type) !== -1;
}
exports.isTypeTypedArray = isTypeTypedArray;
function isObject(value) {
    return typeof value === 'object';
}
exports.isObject = isObject;
function shouldOmitParseString(jsonStr, expectedType) {
    var expectsTypesSerializedAsStrings = expectedType === String
        || expectedType === ArrayBuffer
        || expectedType === DataView;
    var hasQuotes = jsonStr.length >= 2
        && jsonStr[0] === '"'
        && jsonStr[jsonStr.length - 1] === '"';
    if (expectedType === Date) {
        var isNumber = !isNaN(Number(jsonStr.trim()));
        return !hasQuotes && !isNumber;
    }
    return expectsTypesSerializedAsStrings && !hasQuotes;
}
exports.shouldOmitParseString = shouldOmitParseString;
function parseToJSObject(json, expectedType) {
    if (typeof json !== 'string' || shouldOmitParseString(json, expectedType)) {
        return json;
    }
    return JSON.parse(json);
}
exports.parseToJSObject = parseToJSObject;
function isSubtypeOf(A, B) {
    return A === B || A.prototype instanceof B;
}
exports.isSubtypeOf = isSubtypeOf;
function logError(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (typeof console === 'object' && typeof console.error === 'function') {
        console.error.apply(console, __spreadArrays([message], optionalParams));
    }
    else if (typeof console === 'object' && typeof console.log === 'function') {
        console.log.apply(console, __spreadArrays(["ERROR: " + message], optionalParams));
    }
}
exports.logError = logError;
function logMessage(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (typeof console === 'object' && typeof console.log === 'function') {
        console.log.apply(console, __spreadArrays([message], optionalParams));
    }
}
exports.logMessage = logMessage;
function logWarning(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (typeof console === 'object' && typeof console.warn === 'function') {
        console.warn.apply(console, __spreadArrays([message], optionalParams));
    }
    else if (typeof console === 'object' && typeof console.log === 'function') {
        console.log.apply(console, __spreadArrays(["WARNING: " + message], optionalParams));
    }
}
exports.logWarning = logWarning;
function isValueDefined(value) {
    return !(typeof value === 'undefined' || value === null);
}
exports.isValueDefined = isValueDefined;
function isInstanceOf(value, constructor) {
    if (constructor === type_descriptor_1.AnyT.ctor) {
        return true;
    }
    else if (typeof value === 'number') {
        return constructor === Number;
    }
    else if (typeof value === 'string') {
        return constructor === String;
    }
    else if (typeof value === 'boolean') {
        return constructor === Boolean;
    }
    else if (isObject(value)) {
        return value instanceof constructor;
    }
    return false;
}
exports.isInstanceOf = isInstanceOf;
exports.isReflectMetadataSupported = typeof Reflect === 'object' && typeof Reflect.getMetadata === 'function';
function nameof(fn) {
    if (typeof fn.name === 'string') {
        return fn.name;
    }
    return 'undefined';
}
exports.nameof = nameof;
function identity(arg) {
    return arg;
}
exports.identity = identity;
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ 9165:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var parser_1 = __webpack_require__(4713);
Object.defineProperty(exports, "TypedJSON", ({ enumerable: true, get: function () { return parser_1.TypedJSON; } }));
Object.defineProperty(exports, "defaultTypeResolver", ({ enumerable: true, get: function () { return parser_1.defaultTypeResolver; } }));
Object.defineProperty(exports, "defaultTypeEmitter", ({ enumerable: true, get: function () { return parser_1.defaultTypeEmitter; } }));
var metadata_1 = __webpack_require__(9487);
Object.defineProperty(exports, "JsonObjectMetadata", ({ enumerable: true, get: function () { return metadata_1.JsonObjectMetadata; } }));
var json_object_1 = __webpack_require__(9200);
Object.defineProperty(exports, "jsonObject", ({ enumerable: true, get: function () { return json_object_1.jsonObject; } }));
var json_member_1 = __webpack_require__(7107);
Object.defineProperty(exports, "jsonMember", ({ enumerable: true, get: function () { return json_member_1.jsonMember; } }));
var json_array_member_1 = __webpack_require__(9309);
Object.defineProperty(exports, "jsonArrayMember", ({ enumerable: true, get: function () { return json_array_member_1.jsonArrayMember; } }));
var json_set_member_1 = __webpack_require__(8127);
Object.defineProperty(exports, "jsonSetMember", ({ enumerable: true, get: function () { return json_set_member_1.jsonSetMember; } }));
var json_map_member_1 = __webpack_require__(6216);
Object.defineProperty(exports, "jsonMapMember", ({ enumerable: true, get: function () { return json_map_member_1.jsonMapMember; } }));
var to_json_1 = __webpack_require__(2023);
Object.defineProperty(exports, "toJson", ({ enumerable: true, get: function () { return to_json_1.toJson; } }));
var type_descriptor_1 = __webpack_require__(3022);
Object.defineProperty(exports, "ArrayT", ({ enumerable: true, get: function () { return type_descriptor_1.ArrayT; } }));
Object.defineProperty(exports, "AnyT", ({ enumerable: true, get: function () { return type_descriptor_1.AnyT; } }));
Object.defineProperty(exports, "SetT", ({ enumerable: true, get: function () { return type_descriptor_1.SetT; } }));
Object.defineProperty(exports, "MapT", ({ enumerable: true, get: function () { return type_descriptor_1.MapT; } }));
Object.defineProperty(exports, "SetTypeDescriptor", ({ enumerable: true, get: function () { return type_descriptor_1.SetTypeDescriptor; } }));
Object.defineProperty(exports, "ArrayTypeDescriptor", ({ enumerable: true, get: function () { return type_descriptor_1.ArrayTypeDescriptor; } }));
Object.defineProperty(exports, "MapTypeDescriptor", ({ enumerable: true, get: function () { return type_descriptor_1.MapTypeDescriptor; } }));
__exportStar(__webpack_require__(4229), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 9309:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createArrayType = exports.jsonArrayMember = void 0;
var helpers_1 = __webpack_require__(8260);
var metadata_1 = __webpack_require__(9487);
var options_base_1 = __webpack_require__(7525);
var type_descriptor_1 = __webpack_require__(3022);
function jsonArrayMember(maybeTypeThunk, options) {
    if (options === void 0) { options = {}; }
    return function (target, propKey) {
        var _a;
        var decoratorName = "@jsonArrayMember on " + helpers_1.nameof(target.constructor) + "." + String(propKey);
        var typeThunk = type_descriptor_1.ensureTypeThunk(maybeTypeThunk, decoratorName);
        var dimensions = options.dimensions == null ? 1 : options.dimensions;
        if (!isNaN(dimensions) && dimensions < 1) {
            helpers_1.logError(decoratorName + ": 'dimensions' option must be at least 1.");
            return;
        }
        var reflectedType = helpers_1.isReflectMetadataSupported
            ? Reflect.getMetadata('design:type', target, propKey)
            : null;
        if (reflectedType != null && reflectedType !== Array && reflectedType !== Object) {
            helpers_1.logError(decoratorName + ": property is not an Array. " + helpers_1.MISSING_REFLECT_CONF_MSG);
            return;
        }
        metadata_1.injectMetadataInformation(target, propKey, {
            type: function () { return createArrayType(type_descriptor_1.ensureTypeDescriptor(typeThunk()), dimensions); },
            emitDefaultValue: options.emitDefaultValue,
            isRequired: options.isRequired,
            options: options_base_1.extractOptionBase(options),
            key: propKey.toString(),
            name: (_a = options.name) !== null && _a !== void 0 ? _a : propKey.toString(),
            deserializer: options.deserializer,
            serializer: options.serializer,
        });
    };
}
exports.jsonArrayMember = jsonArrayMember;
function createArrayType(elementType, dimensions) {
    var type = new type_descriptor_1.ArrayTypeDescriptor(elementType);
    for (var i = 1; i < dimensions; ++i) {
        type = new type_descriptor_1.ArrayTypeDescriptor(type);
    }
    return type;
}
exports.createArrayType = createArrayType;
//# sourceMappingURL=json-array-member.js.map

/***/ }),

/***/ 6216:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jsonMapMember = void 0;
var helpers_1 = __webpack_require__(8260);
var metadata_1 = __webpack_require__(9487);
var options_base_1 = __webpack_require__(7525);
var type_descriptor_1 = __webpack_require__(3022);
function jsonMapMember(maybeKeyThunk, maybeValueThunk, options) {
    if (options === void 0) { options = {}; }
    return function (target, propKey) {
        var _a;
        var decoratorName = "@jsonMapMember on " + helpers_1.nameof(target.constructor) + "." + String(propKey);
        var keyThunk = type_descriptor_1.ensureTypeThunk(maybeKeyThunk, decoratorName);
        var valueThunk = type_descriptor_1.ensureTypeThunk(maybeValueThunk, decoratorName);
        var reflectedType = helpers_1.isReflectMetadataSupported
            ? Reflect.getMetadata('design:type', target, propKey)
            : null;
        if (reflectedType != null && reflectedType !== Map && reflectedType !== Object) {
            helpers_1.logError(decoratorName + ": property is not a Map. " + helpers_1.MISSING_REFLECT_CONF_MSG);
            return;
        }
        metadata_1.injectMetadataInformation(target, propKey, {
            type: function () { return type_descriptor_1.MapT(keyThunk(), valueThunk(), { shape: options.shape }); },
            emitDefaultValue: options.emitDefaultValue,
            isRequired: options.isRequired,
            options: options_base_1.extractOptionBase(options),
            key: propKey.toString(),
            name: (_a = options.name) !== null && _a !== void 0 ? _a : propKey.toString(),
            deserializer: options.deserializer,
            serializer: options.serializer,
        });
    };
}
exports.jsonMapMember = jsonMapMember;
//# sourceMappingURL=json-map-member.js.map

/***/ }),

/***/ 7107:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jsonMember = void 0;
var helpers_1 = __webpack_require__(8260);
var metadata_1 = __webpack_require__(9487);
var options_base_1 = __webpack_require__(7525);
var type_descriptor_1 = __webpack_require__(3022);
function jsonMember(optionsOrPrototype, propertyKeyOrOptions) {
    if (typeof propertyKeyOrOptions === 'string' || typeof propertyKeyOrOptions === 'symbol') {
        var property = propertyKeyOrOptions;
        var prototype = optionsOrPrototype;
        var decoratorName = "@jsonMember on " + helpers_1.nameof(prototype.constructor) + "." + String(property);
        if (!helpers_1.isReflectMetadataSupported) {
            helpers_1.logError(decoratorName + ": ReflectDecorators is required if the type is not explicitly provided with e.g. @jsonMember(Number)");
            return;
        }
        var reflectPropCtor = Reflect.getMetadata('design:type', prototype, property);
        if (reflectPropCtor == null) {
            helpers_1.logError(decoratorName + ": could not resolve detected property constructor at runtime. Potential solutions:\n - " + helpers_1.LAZY_TYPE_EXPLANATION + "\n - " + helpers_1.MISSING_REFLECT_CONF_MSG);
            return;
        }
        var typeDescriptor_1 = type_descriptor_1.ensureTypeDescriptor(reflectPropCtor);
        if (isSpecialPropertyType(decoratorName, typeDescriptor_1)) {
            return;
        }
        metadata_1.injectMetadataInformation(prototype, property, {
            type: function () { return typeDescriptor_1; },
            key: propertyKeyOrOptions.toString(),
            name: propertyKeyOrOptions.toString(),
        });
        return;
    }
    return jsonMemberDecoratorFactory(optionsOrPrototype, propertyKeyOrOptions);
}
exports.jsonMember = jsonMember;
function jsonMemberDecoratorFactory(optionsOrType, options) {
    return function (target, property) {
        var _a;
        var decoratorName = "@jsonMember on " + helpers_1.nameof(target.constructor) + "." + String(property);
        var typeThunk;
        if (type_descriptor_1.isTypelike(optionsOrType) || type_descriptor_1.isTypeThunk(optionsOrType)) {
            typeThunk = type_descriptor_1.ensureTypeThunk(optionsOrType, decoratorName);
        }
        else {
            options = optionsOrType;
        }
        options = options !== null && options !== void 0 ? options : {};
        if (Object.prototype.hasOwnProperty.call(options, 'constructor')) {
            if (typeThunk !== undefined) {
                throw new Error('Cannot both define constructor option and type. Only one allowed.');
            }
            if (!helpers_1.isValueDefined(options.constructor)) {
                helpers_1.logError(decoratorName + ": cannot resolve specified property constructor at runtime. " + helpers_1.LAZY_TYPE_EXPLANATION);
                return;
            }
            var newTypeDescriptor_1 = type_descriptor_1.ensureTypeDescriptor(options.constructor);
            typeThunk = function () { return newTypeDescriptor_1; };
            if (helpers_1.isReflectMetadataSupported && !helpers_1.isSubtypeOf(newTypeDescriptor_1.ctor, Reflect.getMetadata('design:type', target, property))) {
                helpers_1.logWarning(decoratorName + ": detected property type does not match"
                    + " 'constructor' option.");
            }
        }
        else if (typeThunk !== undefined) {
        }
        else if (helpers_1.isReflectMetadataSupported) {
            var reflectCtor_1 = Reflect.getMetadata('design:type', target, property);
            if (reflectCtor_1 == null) {
                helpers_1.logError(decoratorName + ": cannot resolve detected property constructor at runtime. " + helpers_1.LAZY_TYPE_EXPLANATION);
                return;
            }
            typeThunk = function () { return type_descriptor_1.ensureTypeDescriptor(reflectCtor_1); };
        }
        else if (options.deserializer === undefined) {
            helpers_1.logError(decoratorName + ": Cannot determine type");
            return;
        }
        var typeToTest = typeThunk === null || typeThunk === void 0 ? void 0 : typeThunk();
        if (typeToTest !== undefined && isSpecialPropertyType(decoratorName, typeToTest)) {
            return;
        }
        metadata_1.injectMetadataInformation(target, property, {
            type: typeThunk === undefined
                ? undefined
                : function () { return type_descriptor_1.ensureTypeDescriptor(typeThunk()); },
            emitDefaultValue: options.emitDefaultValue,
            isRequired: options.isRequired,
            options: options_base_1.extractOptionBase(options),
            key: property.toString(),
            name: (_a = options.name) !== null && _a !== void 0 ? _a : property.toString(),
            deserializer: options.deserializer,
            serializer: options.serializer,
        });
    };
}
function isConstructorEqual(type, constructor) {
    return type instanceof type_descriptor_1.TypeDescriptor ? type.ctor === constructor : type === constructor;
}
function isSpecialPropertyType(decoratorName, typeDescriptor) {
    if (!(typeDescriptor instanceof type_descriptor_1.ArrayTypeDescriptor)
        && isConstructorEqual(typeDescriptor, Array)) {
        helpers_1.logError(decoratorName + ": property is an Array. Use the jsonArrayMember decorator to"
            + " serialize this property.");
        return true;
    }
    if (!(typeDescriptor instanceof type_descriptor_1.SetTypeDescriptor) && isConstructorEqual(typeDescriptor, Set)) {
        helpers_1.logError(decoratorName + ": property is a Set. Use the jsonSetMember decorator to"
            + " serialize this property.");
        return true;
    }
    if (!(typeDescriptor instanceof type_descriptor_1.MapTypeDescriptor) && isConstructorEqual(typeDescriptor, Map)) {
        helpers_1.logError(decoratorName + ": property is a Map. Use the jsonMapMember decorator to"
            + " serialize this property.");
        return true;
    }
    return false;
}
//# sourceMappingURL=json-member.js.map

/***/ }),

/***/ 9200:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jsonObject = void 0;
var metadata_1 = __webpack_require__(9487);
var options_base_1 = __webpack_require__(7525);
function jsonObject(optionsOrTarget) {
    var options;
    if (typeof optionsOrTarget === 'function') {
        options = {};
    }
    else {
        options = optionsOrTarget !== null && optionsOrTarget !== void 0 ? optionsOrTarget : {};
    }
    function decorator(target) {
        var objectMetadata = metadata_1.JsonObjectMetadata.ensurePresentInPrototype(target.prototype);
        objectMetadata.isExplicitlyMarked = true;
        objectMetadata.onDeserializedMethodName = options.onDeserialized;
        objectMetadata.beforeSerializationMethodName = options.beforeSerialization;
        if (options.typeResolver != null) {
            objectMetadata.typeResolver = options.typeResolver;
        }
        if (options.typeHintEmitter != null) {
            objectMetadata.typeHintEmitter = options.typeHintEmitter;
        }
        objectMetadata.initializerCallback = options.initializer;
        if (options.name != null) {
            objectMetadata.name = options.name;
        }
        var optionsBase = options_base_1.extractOptionBase(options);
        if (optionsBase !== undefined) {
            objectMetadata.options = optionsBase;
        }
        if (options.knownTypes != null) {
            options.knownTypes
                .filter(function (knownType) { return Boolean(knownType); })
                .forEach(function (knownType) { return objectMetadata.knownTypes.add(knownType); });
        }
    }
    if (typeof optionsOrTarget === 'function') {
        decorator(optionsOrTarget);
    }
    else {
        return decorator;
    }
}
exports.jsonObject = jsonObject;
//# sourceMappingURL=json-object.js.map

/***/ }),

/***/ 8127:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jsonSetMember = void 0;
var helpers_1 = __webpack_require__(8260);
var metadata_1 = __webpack_require__(9487);
var options_base_1 = __webpack_require__(7525);
var type_descriptor_1 = __webpack_require__(3022);
function jsonSetMember(maybeTypeThunk, options) {
    if (options === void 0) { options = {}; }
    return function (target, propKey) {
        var _a;
        var decoratorName = "@jsonSetMember on " + helpers_1.nameof(target.constructor) + "." + String(propKey);
        var typeThunk = type_descriptor_1.ensureTypeThunk(maybeTypeThunk, decoratorName);
        var reflectedType = helpers_1.isReflectMetadataSupported
            ? Reflect.getMetadata('design:type', target, propKey)
            : null;
        if (reflectedType != null && reflectedType !== Set && reflectedType !== Object) {
            helpers_1.logError(decoratorName + ": property is not a Set. " + helpers_1.MISSING_REFLECT_CONF_MSG);
            return;
        }
        metadata_1.injectMetadataInformation(target, propKey, {
            type: function () { return type_descriptor_1.SetT(typeThunk()); },
            emitDefaultValue: options.emitDefaultValue,
            isRequired: options.isRequired,
            options: options_base_1.extractOptionBase(options),
            key: propKey.toString(),
            name: (_a = options.name) !== null && _a !== void 0 ? _a : propKey.toString(),
            deserializer: options.deserializer,
            serializer: options.serializer,
        });
    };
}
exports.jsonSetMember = jsonSetMember;
//# sourceMappingURL=json-set-member.js.map

/***/ }),

/***/ 9487:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectMetadataInformation = exports.JsonObjectMetadata = exports.METADATA_FIELD_KEY = void 0;
var helpers_1 = __webpack_require__(8260);
exports.METADATA_FIELD_KEY = '__typedJsonJsonObjectMetadataInformation__';
var JsonObjectMetadata = (function () {
    function JsonObjectMetadata(classType) {
        this.dataMembers = new Map();
        this.knownTypes = new Set();
        this.knownTypesDeferred = [];
        this.isExplicitlyMarked = false;
        this.isHandledWithoutAnnotation = false;
        this.classType = classType;
    }
    JsonObjectMetadata.getJsonObjectName = function (ctor) {
        var metadata = JsonObjectMetadata.getFromConstructor(ctor);
        return metadata === undefined ? helpers_1.nameof(ctor) : helpers_1.nameof(metadata.classType);
    };
    JsonObjectMetadata.getFromConstructor = function (ctor) {
        var prototype = ctor.prototype;
        if (prototype == null) {
            return;
        }
        var metadata;
        if (Object.prototype.hasOwnProperty.call(prototype, exports.METADATA_FIELD_KEY)) {
            metadata = prototype[exports.METADATA_FIELD_KEY];
        }
        if ((metadata === null || metadata === void 0 ? void 0 : metadata.isExplicitlyMarked) === true) {
            return metadata;
        }
        if (JsonObjectMetadata.doesHandleWithoutAnnotation(ctor)) {
            var primitiveMeta = new JsonObjectMetadata(ctor);
            primitiveMeta.isExplicitlyMarked = true;
            return primitiveMeta;
        }
    };
    JsonObjectMetadata.ensurePresentInPrototype = function (prototype) {
        if (Object.prototype.hasOwnProperty.call(prototype, exports.METADATA_FIELD_KEY)) {
            return prototype[exports.METADATA_FIELD_KEY];
        }
        var objectMetadata = new JsonObjectMetadata(prototype.constructor);
        var parentMetadata = prototype[exports.METADATA_FIELD_KEY];
        if (parentMetadata !== undefined) {
            parentMetadata.dataMembers.forEach(function (memberMetadata, propKey) {
                objectMetadata.dataMembers.set(propKey, memberMetadata);
            });
            parentMetadata.knownTypes.forEach(function (knownType) {
                objectMetadata.knownTypes.add(knownType);
            });
            objectMetadata.typeResolver = parentMetadata.typeResolver;
            objectMetadata.typeHintEmitter = parentMetadata.typeHintEmitter;
        }
        Object.defineProperty(prototype, exports.METADATA_FIELD_KEY, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: objectMetadata,
        });
        return objectMetadata;
    };
    JsonObjectMetadata.getKnownTypeNameFromType = function (constructor) {
        var metadata = JsonObjectMetadata.getFromConstructor(constructor);
        return metadata === undefined ? helpers_1.nameof(constructor) : helpers_1.nameof(metadata.classType);
    };
    JsonObjectMetadata.doesHandleWithoutAnnotation = function (ctor) {
        return helpers_1.isDirectlySerializableNativeType(ctor) || helpers_1.isTypeTypedArray(ctor)
            || ctor === DataView || ctor === ArrayBuffer;
    };
    JsonObjectMetadata.prototype.processDeferredKnownTypes = function () {
        var _this = this;
        this.knownTypesDeferred.forEach(function (typeThunk) {
            typeThunk().getTypes().forEach(function (ctor) { return _this.knownTypes.add(ctor); });
        });
        this.knownTypesDeferred = [];
    };
    return JsonObjectMetadata;
}());
exports.JsonObjectMetadata = JsonObjectMetadata;
function injectMetadataInformation(prototype, propKey, metadata) {
    var decoratorName = "@jsonMember on " + helpers_1.nameof(prototype.constructor) + "." + String(propKey);
    if (typeof prototype === 'function') {
        helpers_1.logError(decoratorName + ": cannot use a static property.");
        return;
    }
    if (typeof prototype[propKey] === 'function') {
        helpers_1.logError(decoratorName + ": cannot use a method property.");
        return;
    }
    if (metadata == null
        || (metadata.type === undefined && metadata.deserializer === undefined)) {
        helpers_1.logError(decoratorName + ": JsonMemberMetadata has unknown type.");
        return;
    }
    var objectMetadata = JsonObjectMetadata.ensurePresentInPrototype(prototype);
    if (metadata.deserializer === undefined) {
        objectMetadata.knownTypesDeferred.push(metadata.type);
    }
    Object.keys(metadata)
        .forEach(function (key) { return (metadata[key] === undefined) && delete metadata[key]; });
    objectMetadata.dataMembers.set(metadata.name, metadata);
}
exports.injectMetadataInformation = injectMetadataInformation;
//# sourceMappingURL=metadata.js.map

/***/ }),

/***/ 7525:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeOptions = exports.getOptionValue = exports.getDefaultOptionOf = exports.extractOptionBase = void 0;
var kAllOptions = [
    'preserveNull',
];
function extractOptionBase(from) {
    var options = Object.keys(from)
        .filter(function (key) { return kAllOptions.indexOf(key) > -1; })
        .reduce(function (obj, key) {
        obj[key] = from[key];
        return obj;
    }, {});
    return Object.keys(options).length > 0 ? options : undefined;
}
exports.extractOptionBase = extractOptionBase;
function getDefaultOptionOf(key) {
    switch (key) {
        case 'preserveNull':
            return false;
    }
    return null;
}
exports.getDefaultOptionOf = getDefaultOptionOf;
function getOptionValue(key, options) {
    if (options != null && options[key] != null) {
        return options[key];
    }
    return getDefaultOptionOf(key);
}
exports.getOptionValue = getOptionValue;
function mergeOptions(existing, moreSpecific) {
    return moreSpecific == null
        ? existing
        : __assign(__assign({}, existing), moreSpecific);
}
exports.mergeOptions = mergeOptions;
//# sourceMappingURL=options-base.js.map

/***/ }),

/***/ 4713:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypedJSON = exports.defaultTypeEmitter = exports.defaultTypeResolver = void 0;
var deserializer_1 = __webpack_require__(4936);
Object.defineProperty(exports, "defaultTypeResolver", ({ enumerable: true, get: function () { return deserializer_1.defaultTypeResolver; } }));
var helpers_1 = __webpack_require__(8260);
var json_array_member_1 = __webpack_require__(9309);
var metadata_1 = __webpack_require__(9487);
var options_base_1 = __webpack_require__(7525);
var serializer_1 = __webpack_require__(8288);
Object.defineProperty(exports, "defaultTypeEmitter", ({ enumerable: true, get: function () { return serializer_1.defaultTypeEmitter; } }));
var type_descriptor_1 = __webpack_require__(3022);
var TypedJSON = (function () {
    function TypedJSON(rootConstructor, settings) {
        this.serializer = new serializer_1.Serializer();
        this.deserializer = new deserializer_1.Deserializer();
        this.globalKnownTypes = [];
        this.indent = 0;
        var rootMetadata = metadata_1.JsonObjectMetadata.getFromConstructor(rootConstructor);
        if (rootMetadata === undefined
            || (!rootMetadata.isExplicitlyMarked && !rootMetadata.isHandledWithoutAnnotation)) {
            throw new TypeError('The TypedJSON root data type must have the @jsonObject decorator used.');
        }
        this.nameResolver = function (ctor) { return helpers_1.nameof(ctor); };
        this.rootConstructor = rootConstructor;
        this.errorHandler = function (error) { return helpers_1.logError(error); };
        this.config(settings);
    }
    TypedJSON.parse = function (object, rootType, settings) {
        return new TypedJSON(rootType, settings).parse(object);
    };
    TypedJSON.parseAsArray = function (object, elementType, settings, dimensions) {
        return new TypedJSON(elementType, settings).parseAsArray(object, dimensions);
    };
    TypedJSON.parseAsSet = function (object, elementType, settings) {
        return new TypedJSON(elementType, settings).parseAsSet(object);
    };
    TypedJSON.parseAsMap = function (object, keyType, valueType, settings) {
        return new TypedJSON(valueType, settings).parseAsMap(object, keyType);
    };
    TypedJSON.toPlainJson = function (object, rootType, settings) {
        return new TypedJSON(rootType, settings).toPlainJson(object);
    };
    TypedJSON.toPlainArray = function (object, elementType, dimensions, settings) {
        return new TypedJSON(elementType, settings).toPlainArray(object, dimensions);
    };
    TypedJSON.toPlainSet = function (object, elementType, settings) {
        return new TypedJSON(elementType, settings).toPlainSet(object);
    };
    TypedJSON.toPlainMap = function (object, keyCtor, valueCtor, settings) {
        return new TypedJSON(valueCtor, settings).toPlainMap(object, keyCtor);
    };
    TypedJSON.stringify = function (object, rootType, settings) {
        return new TypedJSON(rootType, settings).stringify(object);
    };
    TypedJSON.stringifyAsArray = function (object, elementType, dimensions, settings) {
        return new TypedJSON(elementType, settings).stringifyAsArray(object, dimensions);
    };
    TypedJSON.stringifyAsSet = function (object, elementType, settings) {
        return new TypedJSON(elementType, settings).stringifyAsSet(object);
    };
    TypedJSON.stringifyAsMap = function (object, keyCtor, valueCtor, settings) {
        return new TypedJSON(valueCtor, settings).stringifyAsMap(object, keyCtor);
    };
    TypedJSON.setGlobalConfig = function (config) {
        Object.assign(this._globalConfig, config);
    };
    TypedJSON.mapType = function (type, converters) {
        if (this._globalConfig.mappedTypes == null) {
            this._globalConfig.mappedTypes = new Map();
        }
        this._globalConfig.mappedTypes.set(type, converters);
    };
    TypedJSON.prototype.config = function (settings) {
        var _this = this;
        settings = __assign(__assign({}, TypedJSON._globalConfig), settings);
        if (settings.knownTypes != null
            && TypedJSON._globalConfig.knownTypes != null) {
            settings.knownTypes = Array.from(new Set(settings.knownTypes.concat(TypedJSON._globalConfig.knownTypes)));
        }
        var options = options_base_1.extractOptionBase(settings);
        this.serializer.options = options;
        this.deserializer.options = options;
        if (settings.errorHandler != null) {
            this.errorHandler = settings.errorHandler;
            this.deserializer.setErrorHandler(settings.errorHandler);
            this.serializer.setErrorHandler(settings.errorHandler);
        }
        if (settings.replacer != null) {
            this.replacer = settings.replacer;
        }
        if (settings.typeResolver != null) {
            this.deserializer.setTypeResolver(settings.typeResolver);
        }
        if (settings.typeHintEmitter != null) {
            this.serializer.setTypeHintEmitter(settings.typeHintEmitter);
        }
        if (settings.indent != null) {
            this.indent = settings.indent;
        }
        if (settings.mappedTypes != null) {
            settings.mappedTypes.forEach(function (upDown, type) {
                _this.setSerializationStrategies(type, upDown);
            });
        }
        if (settings.nameResolver != null) {
            this.nameResolver = settings.nameResolver;
            this.deserializer.setNameResolver(settings.nameResolver);
        }
        if (settings.knownTypes != null) {
            settings.knownTypes.forEach(function (knownType, i) {
                if (typeof knownType === 'undefined' || knownType === null) {
                    helpers_1.logWarning("TypedJSON.config: 'knownTypes' contains an undefined/null value"
                        + (" (element " + i + ")."));
                }
            });
            this.globalKnownTypes = settings.knownTypes;
        }
    };
    TypedJSON.prototype.mapType = function (type, converters) {
        this.setSerializationStrategies(type, converters);
    };
    TypedJSON.prototype.parse = function (object) {
        var _this = this;
        var json = helpers_1.parseToJSObject(object, this.rootConstructor);
        var rootMetadata = metadata_1.JsonObjectMetadata.getFromConstructor(this.rootConstructor);
        var result;
        var knownTypes = new Map();
        this.globalKnownTypes.filter(function (ktc) { return ktc; }).forEach(function (knownTypeCtor) {
            knownTypes.set(_this.nameResolver(knownTypeCtor), knownTypeCtor);
        });
        if (rootMetadata !== undefined) {
            rootMetadata.processDeferredKnownTypes();
            rootMetadata.knownTypes.forEach(function (knownTypeCtor) {
                knownTypes.set(_this.nameResolver(knownTypeCtor), knownTypeCtor);
            });
        }
        try {
            result = this.deserializer.convertSingleValue(json, type_descriptor_1.ensureTypeDescriptor(this.rootConstructor), knownTypes);
        }
        catch (e) {
            this.errorHandler(e);
        }
        return result;
    };
    TypedJSON.prototype.parseAsArray = function (object, dimensions) {
        if (dimensions === void 0) { dimensions = 1; }
        var json = helpers_1.parseToJSObject(object, Array);
        return this.deserializer.convertSingleValue(json, json_array_member_1.createArrayType(type_descriptor_1.ensureTypeDescriptor(this.rootConstructor), dimensions), this._mapKnownTypes(this.globalKnownTypes));
    };
    TypedJSON.prototype.parseAsSet = function (object) {
        var json = helpers_1.parseToJSObject(object, Set);
        return this.deserializer.convertSingleValue(json, type_descriptor_1.SetT(this.rootConstructor), this._mapKnownTypes(this.globalKnownTypes));
    };
    TypedJSON.prototype.parseAsMap = function (object, keyConstructor) {
        var json = helpers_1.parseToJSObject(object, Map);
        return this.deserializer.convertSingleValue(json, type_descriptor_1.MapT(keyConstructor, this.rootConstructor), this._mapKnownTypes(this.globalKnownTypes));
    };
    TypedJSON.prototype.toPlainJson = function (object) {
        try {
            return this.serializer.convertSingleValue(object, type_descriptor_1.ensureTypeDescriptor(this.rootConstructor));
        }
        catch (e) {
            this.errorHandler(e);
        }
    };
    TypedJSON.prototype.toPlainArray = function (object, dimensions) {
        if (dimensions === void 0) { dimensions = 1; }
        try {
            return this.serializer.convertSingleValue(object, json_array_member_1.createArrayType(type_descriptor_1.ensureTypeDescriptor(this.rootConstructor), dimensions));
        }
        catch (e) {
            this.errorHandler(e);
        }
    };
    TypedJSON.prototype.toPlainSet = function (object) {
        try {
            return this.serializer.convertSingleValue(object, type_descriptor_1.SetT(this.rootConstructor));
        }
        catch (e) {
            this.errorHandler(e);
        }
    };
    TypedJSON.prototype.toPlainMap = function (object, keyConstructor) {
        try {
            return this.serializer.convertSingleValue(object, type_descriptor_1.MapT(keyConstructor, this.rootConstructor));
        }
        catch (e) {
            this.errorHandler(e);
        }
    };
    TypedJSON.prototype.stringify = function (object) {
        var result = this.toPlainJson(object);
        if (result === undefined) {
            return '';
        }
        return JSON.stringify(result, this.replacer, this.indent);
    };
    TypedJSON.prototype.stringifyAsArray = function (object, dimensions) {
        return JSON.stringify(this.toPlainArray(object, dimensions), this.replacer, this.indent);
    };
    TypedJSON.prototype.stringifyAsSet = function (object) {
        return JSON.stringify(this.toPlainSet(object), this.replacer, this.indent);
    };
    TypedJSON.prototype.stringifyAsMap = function (object, keyConstructor) {
        return JSON.stringify(this.toPlainMap(object, keyConstructor), this.replacer, this.indent);
    };
    TypedJSON.prototype._mapKnownTypes = function (constructors) {
        var _this = this;
        var map = new Map();
        constructors.filter(function (ctor) { return ctor; }).forEach(function (ctor) { return map.set(_this.nameResolver(ctor), ctor); });
        return map;
    };
    TypedJSON.prototype.setSerializationStrategies = function (type, converters) {
        if (converters.deserializer != null) {
            this.deserializer.setDeserializationStrategy(type, function (value) {
                return converters.deserializer(value);
            });
        }
        if (converters.serializer != null) {
            this.serializer.setSerializationStrategy(type, function (value) {
                return converters.serializer(value);
            });
        }
    };
    TypedJSON._globalConfig = {};
    return TypedJSON;
}());
exports.TypedJSON = TypedJSON;
//# sourceMappingURL=parser.js.map

/***/ }),

/***/ 8288:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Serializer = exports.defaultTypeEmitter = void 0;
var helpers_1 = __webpack_require__(8260);
var metadata_1 = __webpack_require__(9487);
var options_base_1 = __webpack_require__(7525);
var type_descriptor_1 = __webpack_require__(3022);
function defaultTypeEmitter(targetObject, sourceObject, expectedSourceType, sourceTypeMetadata) {
    var _a;
    if (sourceObject.constructor !== expectedSourceType) {
        targetObject.__type = (_a = sourceTypeMetadata === null || sourceTypeMetadata === void 0 ? void 0 : sourceTypeMetadata.name) !== null && _a !== void 0 ? _a : helpers_1.nameof(sourceObject.constructor);
    }
}
exports.defaultTypeEmitter = defaultTypeEmitter;
var Serializer = (function () {
    function Serializer() {
        this.typeHintEmitter = defaultTypeEmitter;
        this.errorHandler = helpers_1.logError;
        this.serializationStrategy = new Map([
            [type_descriptor_1.AnyT.ctor, helpers_1.identity],
            [Date, helpers_1.identity],
            [Number, helpers_1.identity],
            [String, helpers_1.identity],
            [Boolean, helpers_1.identity],
            [ArrayBuffer, convertAsArrayBuffer],
            [DataView, convertAsDataView],
            [Array, convertAsArray],
            [Set, convertAsSet],
            [Map, convertAsMap],
            [Float32Array, convertAsTypedArray],
            [Float64Array, convertAsTypedArray],
            [Int8Array, convertAsTypedArray],
            [Uint8Array, convertAsTypedArray],
            [Uint8ClampedArray, convertAsTypedArray],
            [Int16Array, convertAsTypedArray],
            [Uint16Array, convertAsTypedArray],
            [Int32Array, convertAsTypedArray],
            [Uint32Array, convertAsTypedArray],
        ]);
    }
    Serializer.prototype.setSerializationStrategy = function (type, serializer) {
        this.serializationStrategy.set(type, serializer);
    };
    Serializer.prototype.setTypeHintEmitter = function (typeEmitterCallback) {
        if (typeof typeEmitterCallback !== 'function') {
            throw new TypeError('\'typeEmitterCallback\' is not a function.');
        }
        this.typeHintEmitter = typeEmitterCallback;
    };
    Serializer.prototype.getTypeHintEmitter = function () {
        return this.typeHintEmitter;
    };
    Serializer.prototype.setErrorHandler = function (errorHandlerCallback) {
        if (typeof errorHandlerCallback !== 'function') {
            throw new TypeError('\'errorHandlerCallback\' is not a function.');
        }
        this.errorHandler = errorHandlerCallback;
    };
    Serializer.prototype.getErrorHandler = function () {
        return this.errorHandler;
    };
    Serializer.prototype.retrievePreserveNull = function (memberOptions) {
        return options_base_1.getOptionValue('preserveNull', options_base_1.mergeOptions(this.options, memberOptions));
    };
    Serializer.prototype.convertSingleValue = function (sourceObject, typeDescriptor, memberName, memberOptions) {
        if (memberName === void 0) { memberName = 'object'; }
        if (this.retrievePreserveNull(memberOptions) && sourceObject === null) {
            return null;
        }
        if (!helpers_1.isValueDefined(sourceObject)) {
            return;
        }
        if (!helpers_1.isInstanceOf(sourceObject, typeDescriptor.ctor)) {
            var expectedName = helpers_1.nameof(typeDescriptor.ctor);
            var actualName = helpers_1.nameof(sourceObject.constructor);
            this.errorHandler(new TypeError("Could not serialize '" + memberName + "': expected '" + expectedName + "',"
                + (" got '" + actualName + "'.")));
            return;
        }
        var serializer = this.serializationStrategy.get(typeDescriptor.ctor);
        if (serializer !== undefined) {
            return serializer(sourceObject, typeDescriptor, memberName, this, memberOptions);
        }
        if (typeof sourceObject === 'object') {
            return convertAsObject(sourceObject, typeDescriptor, memberName, this, memberOptions);
        }
        var error = "Could not serialize '" + memberName + "'; don't know how to serialize type";
        if (typeDescriptor.hasFriendlyName()) {
            error += " '" + typeDescriptor.ctor.name + "'";
        }
        this.errorHandler(new TypeError(error + "."));
    };
    return Serializer;
}());
exports.Serializer = Serializer;
function convertAsObject(sourceObject, typeDescriptor, memberName, serializer, memberOptions) {
    var sourceTypeMetadata;
    var targetObject;
    var typeHintEmitter = serializer.getTypeHintEmitter();
    if (sourceObject.constructor !== typeDescriptor.ctor
        && sourceObject instanceof typeDescriptor.ctor) {
        sourceTypeMetadata = metadata_1.JsonObjectMetadata.getFromConstructor(sourceObject.constructor);
    }
    else {
        sourceTypeMetadata = metadata_1.JsonObjectMetadata.getFromConstructor(typeDescriptor.ctor);
    }
    if (sourceTypeMetadata === undefined) {
        targetObject = __assign({}, sourceObject);
    }
    else {
        var beforeSerializationMethodName = sourceTypeMetadata.beforeSerializationMethodName;
        if (beforeSerializationMethodName != null) {
            if (typeof sourceObject[beforeSerializationMethodName] === 'function') {
                sourceObject[beforeSerializationMethodName]();
            }
            else if (typeof sourceObject.constructor[beforeSerializationMethodName]
                === 'function') {
                sourceObject.constructor[beforeSerializationMethodName]();
            }
            else {
                serializer.getErrorHandler()(new TypeError("beforeSerialization callback '"
                    + (helpers_1.nameof(sourceTypeMetadata.classType) + "." + beforeSerializationMethodName)
                    + "' is not a method."));
            }
        }
        var sourceMeta_1 = sourceTypeMetadata;
        targetObject = {};
        var classOptions_1 = options_base_1.mergeOptions(serializer.options, sourceMeta_1.options);
        if (sourceMeta_1.typeHintEmitter != null) {
            typeHintEmitter = sourceMeta_1.typeHintEmitter;
        }
        sourceMeta_1.dataMembers.forEach(function (objMemberMetadata) {
            var objMemberOptions = options_base_1.mergeOptions(classOptions_1, objMemberMetadata.options);
            var serialized;
            if (objMemberMetadata.serializer != null) {
                serialized = objMemberMetadata.serializer(sourceObject[objMemberMetadata.key]);
            }
            else if (objMemberMetadata.type == null) {
                throw new TypeError("Could not serialize " + objMemberMetadata.name + ", there is"
                    + " no constructor nor serialization function to use.");
            }
            else {
                serialized = serializer.convertSingleValue(sourceObject[objMemberMetadata.key], objMemberMetadata.type(), helpers_1.nameof(sourceMeta_1.classType) + "." + objMemberMetadata.key, objMemberOptions);
            }
            if ((serializer.retrievePreserveNull(objMemberOptions) && serialized === null)
                || helpers_1.isValueDefined(serialized)) {
                targetObject[objMemberMetadata.name] = serialized;
            }
        });
    }
    typeHintEmitter(targetObject, sourceObject, typeDescriptor.ctor, sourceTypeMetadata);
    return targetObject;
}
function convertAsArray(sourceObject, typeDescriptor, memberName, serializer, memberOptions) {
    if (!(typeDescriptor instanceof type_descriptor_1.ArrayTypeDescriptor)) {
        throw new TypeError("Could not serialize " + memberName + " as Array: incorrect TypeDescriptor detected, please"
            + ' use proper annotation or function for this type');
    }
    if (typeDescriptor.elementType == null) {
        throw new TypeError("Could not serialize " + memberName + " as Array: missing element type definition.");
    }
    sourceObject.forEach(function (element, i) {
        if (!(serializer.retrievePreserveNull(memberOptions) && element === null)
            && !helpers_1.isInstanceOf(element, typeDescriptor.elementType.ctor)) {
            var expectedTypeName = helpers_1.nameof(typeDescriptor.elementType.ctor);
            var actualTypeName = element && helpers_1.nameof(element.constructor);
            throw new TypeError("Could not serialize " + memberName + "[" + i + "]:"
                + (" expected '" + expectedTypeName + "', got '" + actualTypeName + "'."));
        }
    });
    return sourceObject.map(function (element, i) {
        return serializer.convertSingleValue(element, typeDescriptor.elementType, memberName + "[" + i + "]", memberOptions);
    });
}
function convertAsSet(sourceObject, typeDescriptor, memberName, serializer, memberOptions) {
    if (!(typeDescriptor instanceof type_descriptor_1.SetTypeDescriptor)) {
        throw new TypeError("Could not serialize " + memberName + " as Set: incorrect TypeDescriptor detected, please"
            + ' use proper annotation or function for this type');
    }
    if (typeDescriptor.elementType == null) {
        throw new TypeError("Could not serialize " + memberName + " as Set: missing element type definition.");
    }
    memberName += '[]';
    var resultArray = [];
    sourceObject.forEach(function (element) {
        var resultElement = serializer.convertSingleValue(element, typeDescriptor.elementType, memberName, memberOptions);
        if (!helpers_1.isValueDefined(element) || helpers_1.isValueDefined(resultElement)) {
            resultArray.push(resultElement);
        }
    });
    return resultArray;
}
function convertAsMap(sourceObject, typeDescriptor, memberName, serializer, memberOptions) {
    if (!(typeDescriptor instanceof type_descriptor_1.MapTypeDescriptor)) {
        throw new TypeError("Could not serialize " + memberName + " as Map: incorrect TypeDescriptor detected, please"
            + ' use proper annotation or function for this type');
    }
    if (typeDescriptor.valueType == null) {
        throw new TypeError("Could not serialize " + memberName + " as Map: missing value type definition.");
    }
    if (typeDescriptor.keyType == null) {
        throw new TypeError("Could not serialize " + memberName + " as Map: missing key type definition.");
    }
    var keyMemberName = memberName + "[].key";
    var valueMemberName = memberName + "[].value";
    var resultShape = typeDescriptor.getCompleteOptions().shape;
    var result = resultShape === 1 ? {} : [];
    var preserveNull = serializer.retrievePreserveNull(memberOptions);
    sourceObject.forEach(function (value, key) {
        var resultKeyValuePairObj = {
            key: serializer.convertSingleValue(key, typeDescriptor.keyType, keyMemberName, memberOptions),
            value: serializer.convertSingleValue(value, typeDescriptor.valueType, valueMemberName, memberOptions),
        };
        var keyDefined = helpers_1.isValueDefined(resultKeyValuePairObj.key);
        var valueDefined = (resultKeyValuePairObj.value === null && preserveNull)
            || helpers_1.isValueDefined(resultKeyValuePairObj.value);
        if (keyDefined && valueDefined) {
            if (resultShape === 1) {
                result[resultKeyValuePairObj.key] = resultKeyValuePairObj.value;
            }
            else {
                result.push(resultKeyValuePairObj);
            }
        }
    });
    return result;
}
function convertAsTypedArray(sourceObject) {
    return Array.from(sourceObject);
}
function convertAsArrayBuffer(buffer) {
    return Array.from(new Uint16Array(buffer))
        .map(function (charCode) { return String.fromCharCode(charCode); }).join('');
}
function convertAsDataView(dataView) {
    return convertAsArrayBuffer(dataView.buffer);
}
//# sourceMappingURL=serializer.js.map

/***/ }),

/***/ 2023:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toJson = void 0;
var parser_1 = __webpack_require__(4713);
function toJson(optionsOrTarget) {
    if (typeof optionsOrTarget === 'function') {
        toJsonDecorator(optionsOrTarget, {});
        return;
    }
    return function (target) {
        toJsonDecorator(target, optionsOrTarget);
    };
}
exports.toJson = toJson;
function toJsonDecorator(target, options) {
    if (options.overwrite !== true && target.prototype.toJSON !== undefined) {
        throw new Error(target.name + " already has toJSON defined!");
    }
    target.prototype.toJSON = function toJSON() {
        return parser_1.TypedJSON.toPlainJson(this, Object.getPrototypeOf(this).constructor);
    };
}
//# sourceMappingURL=to-json.js.map

/***/ }),

/***/ 3022:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ensureTypeThunk = exports.ensureTypeDescriptor = exports.isTypeThunk = exports.isTypelike = exports.AnyT = exports.MapT = exports.MapTypeDescriptor = exports.SetT = exports.SetTypeDescriptor = exports.ArrayT = exports.ArrayTypeDescriptor = exports.GenericTypeDescriptor = exports.ConcreteTypeDescriptor = exports.TypeDescriptor = void 0;
var helpers_1 = __webpack_require__(8260);
var TypeDescriptor = (function () {
    function TypeDescriptor(ctor) {
        this.ctor = ctor;
    }
    TypeDescriptor.prototype.getTypes = function () {
        return [this.ctor];
    };
    TypeDescriptor.prototype.hasFriendlyName = function () {
        return this.ctor.name !== 'Object';
    };
    return TypeDescriptor;
}());
exports.TypeDescriptor = TypeDescriptor;
var ConcreteTypeDescriptor = (function (_super) {
    __extends(ConcreteTypeDescriptor, _super);
    function ConcreteTypeDescriptor(ctor) {
        return _super.call(this, ctor) || this;
    }
    return ConcreteTypeDescriptor;
}(TypeDescriptor));
exports.ConcreteTypeDescriptor = ConcreteTypeDescriptor;
var GenericTypeDescriptor = (function (_super) {
    __extends(GenericTypeDescriptor, _super);
    function GenericTypeDescriptor(ctor) {
        return _super.call(this, ctor) || this;
    }
    return GenericTypeDescriptor;
}(TypeDescriptor));
exports.GenericTypeDescriptor = GenericTypeDescriptor;
var ArrayTypeDescriptor = (function (_super) {
    __extends(ArrayTypeDescriptor, _super);
    function ArrayTypeDescriptor(elementType) {
        var _this = _super.call(this, Array) || this;
        _this.elementType = elementType;
        return _this;
    }
    ArrayTypeDescriptor.prototype.getTypes = function () {
        return _super.prototype.getTypes.call(this).concat(this.elementType.getTypes());
    };
    return ArrayTypeDescriptor;
}(GenericTypeDescriptor));
exports.ArrayTypeDescriptor = ArrayTypeDescriptor;
function ArrayT(elementType) {
    return new ArrayTypeDescriptor(ensureTypeDescriptor(elementType));
}
exports.ArrayT = ArrayT;
var SetTypeDescriptor = (function (_super) {
    __extends(SetTypeDescriptor, _super);
    function SetTypeDescriptor(elementType) {
        var _this = _super.call(this, Set) || this;
        _this.elementType = elementType;
        return _this;
    }
    SetTypeDescriptor.prototype.getTypes = function () {
        return _super.prototype.getTypes.call(this).concat(this.elementType.getTypes());
    };
    return SetTypeDescriptor;
}(GenericTypeDescriptor));
exports.SetTypeDescriptor = SetTypeDescriptor;
function SetT(elementType) {
    return new SetTypeDescriptor(ensureTypeDescriptor(elementType));
}
exports.SetT = SetT;
var MapTypeDescriptor = (function (_super) {
    __extends(MapTypeDescriptor, _super);
    function MapTypeDescriptor(keyType, valueType, options) {
        var _this = _super.call(this, Map) || this;
        _this.keyType = keyType;
        _this.valueType = valueType;
        _this.options = options;
        return _this;
    }
    MapTypeDescriptor.prototype.getTypes = function () {
        return _super.prototype.getTypes.call(this).concat(this.keyType.getTypes(), this.valueType.getTypes());
    };
    MapTypeDescriptor.prototype.getCompleteOptions = function () {
        var _a, _b;
        return {
            shape: (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.shape) !== null && _b !== void 0 ? _b : 0,
        };
    };
    return MapTypeDescriptor;
}(GenericTypeDescriptor));
exports.MapTypeDescriptor = MapTypeDescriptor;
function MapT(keyType, valueType, options) {
    return new MapTypeDescriptor(ensureTypeDescriptor(keyType), ensureTypeDescriptor(valueType), options);
}
exports.MapT = MapT;
exports.AnyT = new ConcreteTypeDescriptor(function () { return undefined; });
function isTypelike(type) {
    return type != null && (typeof type === 'function' || type instanceof TypeDescriptor);
}
exports.isTypelike = isTypelike;
function isTypeThunk(candidate) {
    return typeof candidate === 'function' && candidate.name === '';
}
exports.isTypeThunk = isTypeThunk;
function ensureTypeDescriptor(type) {
    return type instanceof TypeDescriptor ? type : new ConcreteTypeDescriptor(type);
}
exports.ensureTypeDescriptor = ensureTypeDescriptor;
function ensureTypeThunk(typeThunkOrSerializable, decoratorName) {
    if (typeThunkOrSerializable == null) {
        throw new Error("No type given on " + decoratorName + ". " + helpers_1.LAZY_TYPE_EXPLANATION);
    }
    if (isTypeThunk(typeThunkOrSerializable)) {
        return typeThunkOrSerializable;
    }
    return function () { return typeThunkOrSerializable; };
}
exports.ensureTypeThunk = ensureTypeThunk;
//# sourceMappingURL=type-descriptor.js.map

/***/ }),

/***/ 4229:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 3129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 9357:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(3109);
/******/ })()
;
//# sourceMappingURL=index.js.map