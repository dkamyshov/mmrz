function process(o: any, callback: Function) {
    if(typeof(o) == "string") {
        return callback(o);
    } else if(typeof(o) == "number") {
        return o;
    } else if(typeof(o) == "boolean") {
        return o;
    } else if(o instanceof Array) {
        return o.map(e => process(e, callback));
    } else if(o instanceof Object) {
        return Object.keys(o).reduce(function(r, k) {
            r[k] = process(o[k], callback);
            return r;
        }, {});
    }
}

function LocalStorage(entryName: string) {
    this.entryName = entryName;
}

LocalStorage.prototype.load = function(defaultResult: any) {
    if(localStorage[this.entryName]) {
        return process(JSON.parse(localStorage[this.entryName]), decodeURIComponent);
    } else {
        return defaultResult;
    }
}

LocalStorage.prototype.save = function(o: any) {
    localStorage[this.entryName] = JSON.stringify(process(o, encodeURIComponent));
}

export default LocalStorage;
