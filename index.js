const { queries } = require("@testing-library/dom");

function extendJQuery($) {
  Object.keys(queries).forEach(function (key) {
    $.fn[key] = function (id, options, waitForOptions) {
      const el = $(this)[0];
      return $(queries[key](el, id, options, waitForOptions));
    };
  });
}

module.exports.extendJQuery = extendJQuery;
