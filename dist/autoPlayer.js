// autoPlayer v2.0.1 Copyright (c) 2024 eric and contributors
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.autoPlayer = {}));
})(this, (function (exports) { 'use strict';

    function getTime() {
        return Date.now();
    }

    function getDay() {
        console.log(2);
        console.log(2);
        console.log(2);
        return new Date().getDay();
    }

    exports.getDay = getDay;
    exports.getTime = getTime;

}));
//# sourceMappingURL=autoPlayer.js.map
