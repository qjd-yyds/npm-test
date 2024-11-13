// autoPlayer v1.0.0 Copyright (c) 2024 eric and contributors
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.autoPlayer = {}));
})(this, (function (exports) { 'use strict';

    function getTime() {
        return Date.now();
    }

    exports.getTime = getTime;

}));
//# sourceMappingURL=autoPlayer.js.map
