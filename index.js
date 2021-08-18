const { queries } = require("@testing-library/dom");

function extendJQuery($) {
  Object.keys(queries).forEach(function (key) {
    $.prototype[key] = function (id, options, waitForOptions) {
      queries[key](this, id, options, waitForOptions);
    };
  });
}

module.exports.extendJQuery = extendJQuery;
