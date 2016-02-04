'use strict';

module.exports = function (o) {
  var page = o.page;
  var pages = o.pages;
  var previousPages = o.sidePages ?
    range(Math.max(page - o.sidePages, 0), page) :
    page > 1 ? [page - 1] : [];
  var nextPages = o.sidePages ?
    range(page + 1, Math.min(page + o.sidePages + 1, pages)) :
    page < pages - 1 ? [page + 1] : [];
  var beginPages = o.beginPages ? range(Math.min(o.beginPages, pages)) : [];
  var endPages = o.endPages ? range(Math.max(pages - o.endPages, 0), pages) : [];

  if (beginPages.length + endPages.length >= pages) {
    return {
      beginPages: difference(beginPages, range(page, pages)),
      previousPages: [],
      centerPage: page,
      nextPages: [],
      endPages: difference(endPages, range(page + 1))
    };
  }

  return {
    beginPages: difference(beginPages, range(page, pages)),
    previousPages: difference(previousPages, beginPages),
    centerPage: page,
    nextPages: difference(nextPages, endPages),
    endPages: difference(endPages, [page])
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
