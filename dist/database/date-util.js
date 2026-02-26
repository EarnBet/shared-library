"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeColumn = DateTimeColumn;
const typeorm_1 = require("typeorm");
const date_1 = require("../date");
const dateTimeTransformer = {
    to: (value) => {
        var _a;
        if (value && ((_a = value.constructor) === null || _a === void 0 ? void 0 : _a.name) == "Date") {
            return (0, date_1.toDateTimeFormat)(value);
        }
        return value;
    },
    from: (value) => value,
};
const dateTimeColumnSettings = {
    type: "datetime",
    transformer: dateTimeTransformer,
};
function DateTimeColumn(options) {
    return (0, typeorm_1.Column)(Object.assign(Object.assign({}, dateTimeColumnSettings), options));
}
//# sourceMappingURL=date-util.js.map