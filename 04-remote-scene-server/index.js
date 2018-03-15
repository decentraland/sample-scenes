"use strict";
const traceur = require("traceur");
traceur.require.makeDefault(function (filename) {
    console.log(filename);
    return true;
}, {
    asyncFunctions: true,
    asyncGenerators: true
});
require("./Server");
//# sourceMappingURL=index.js.map