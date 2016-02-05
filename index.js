'use strict';

module.exports = function (o) {
  var pages = o.pages;
  var page = Math.min(Math.max(o.page, 1), pages);
  var previousPages = o.sidePages ?
    range(Math.max(page - o.sidePages, 1), page) : [];
  var nextPages = o.sidePages ?
    range(page + 1, Math.min(page + o.sidePages + 1, pages)) : [];
  var beginPages = o.beginPages ? range(1, Math.min(o.beginPages, pages) + 1) : [];
  var endPages = o.endPages ? range(Math.max(pages - o.endPages + 1, 0), pages + 1) : [];

  return {
    beginPages: difference(beginPages, range(page, Math.max(pages, o.beginPages) + 1)),
    previousPages: difference(previousPages, beginPages),
    centerPage: [page],
    nextPages: difference(nextPages, endPages),
    endPages: difference(endPages, range(0, page + 1))
  };
};

function range(a, b) {
  var len = b ? b : a;
  var ret = [];
  var i = b ? a : 0;

  for (; i < len; i++) {
    ret.push(i);
  }

  return ret;
}

function difference(a, b) {
  return a.filter(function (v) {
    return b.indexOf(v) < 0;
  });
}
