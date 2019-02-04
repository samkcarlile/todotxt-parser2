"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
var readFileAsync = util_1.promisify(fs_1.default.readFile);
var TodoTxtRegex = /(?:(?<completed>x )(?<date_1>[0-9]{4}-[0-9]{2}-[0-9]{2} )?)?(?:\((?<priority>[A-Z])\) )?(?<date_2>[0-9]{4}-[0-9]{2}-[0-9]{2} )?(?<body>.+)/;
var ContextRegex = /\s(@[^\s]+)/g;
var ProjectRegex = /\s(\+[^\s]+)\s/g;
var MetaRegex = function (key) { return new RegExp(key + ":([^s]+)", 'g'); };
function parseFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var content, lines, todos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFileAsync(filePath, 'utf-8')];
                case 1:
                    content = _a.sent();
                    lines = content.split('\n');
                    todos = [];
                    lines.map(function (line) { return todos.push(new Todo(line)); });
                    return [2 /*return*/, todos];
            }
        });
    });
}
exports.parseFile = parseFile;
var Todo = /** @class */ (function () {
    function Todo(content) {
        this.raw = content;
        TodoTxtRegex.lastIndex = 0;
        var groups = TodoTxtRegex.exec(this.raw).groups;
        this.complete = groups['completed'] ? true : false;
        this.body = groups['body'];
        this.priority = groups['priority'];
        if (this.complete) {
            if (groups['date_1']) {
                this.date_completed = parseDate(groups['date_1']);
            }
            if (groups['date_2']) {
                this.date_created = parseDate(groups['date_2']);
            }
        }
        else {
            if (groups['date_1']) {
                this.date_created = parseDate(groups['date_1']);
            }
        }
    }
    Todo.prototype.toString = function () {
        return this.raw;
    };
    Object.defineProperty(Todo.prototype, "projects", {
        get: function () {
            var projects = [];
            var regexArray;
            while ((regexArray = ProjectRegex.exec(this.body)) !== null) {
                projects.push(regexArray[1]);
            }
            return projects;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Todo.prototype, "contexts", {
        get: function () {
            var contexts = [];
            var regexArray;
            while ((regexArray = ContextRegex.exec(this.body)) !== null) {
                contexts.push(regexArray[1]);
            }
            return contexts;
        },
        enumerable: true,
        configurable: true
    });
    Todo.prototype.getMeta = function (key) {
        var groups = MetaRegex(key).exec(this.body);
        return groups[1] ? groups[1] : "";
    };
    return Todo;
}());
exports.Todo = Todo;
// Parse a data in the xxxx-xx-xx format
function parseDate(str) {
    var arr = str.split('-').map(function (s) { return parseInt(s); });
    return new Date(arr[0], arr[1] + 1, arr[2]);
}
