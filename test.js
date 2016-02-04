/* eslint-env mocha */
const expect = require('chai').expect;
const jsc = require('jsverify');
const intersect = require('intersect');
const segmentize = require('./');

describe('segmentize', function () {
  it('should show only one page if there is one', function () {
    const pageAmount = 1;

    expect(segmentize({
      page: 0,
      pages: pageAmount
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [],
      endPages: []
    });
  });

  it('should show only two pages if there are two', function () {
    const pageAmount = 2;

    expect(segmentize({
      page: 0,
      pages: pageAmount
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [1],
      endPages: []
    });
  });

  it('should show current and next at start by default', function () {
    const pageAmount = 4;

    expect(segmentize({
      page: 0,
      pages: pageAmount
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [1],
      endPages: []
    });
  });

  it('should show current and previous at end by default', function () {
    const pageAmount = 4;

    expect(segmentize({
      page: pageAmount - 1,
      pages: pageAmount
    })).to.deep.equal({
      beginPages: [],
      previousPages: [pageAmount - 2],
      centerPage: pageAmount - 1,
      nextPages: [],
      endPages: []
    });
  });

  it('should show only current if there is only one page', function () {
    const pageAmount = 1;

    expect(segmentize({
      page: 0,
      pages: pageAmount
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [],
      endPages: []
    });
  });

  it('should show both previous and next page if at center', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 5,
      pages: pageAmount
    })).to.deep.equal({
      beginPages: [],
      previousPages: [4],
      centerPage: 5,
      nextPages: [6],
      endPages: []
    });
  });

  it('should accept begin pages', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 5,
      pages: pageAmount,
      beginPages: 2
    })).to.deep.equal({
      beginPages: [0, 1],
      previousPages: [4],
      centerPage: 5,
      nextPages: [6],
      endPages: []
    });
  });

  it('should accept begin pages at end', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: pageAmount - 1,
      pages: pageAmount,
      beginPages: 2
    })).to.deep.equal({
      beginPages: [0, 1],
      previousPages: [pageAmount - 2],
      centerPage: pageAmount - 1,
      nextPages: [],
      endPages: []
    });
  });

  it('should accept begin pages with overlap', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 2,
      pages: pageAmount,
      beginPages: 2
    })).to.deep.equal({
      beginPages: [0, 1],
      previousPages: [],
      centerPage: 2,
      nextPages: [3],
      endPages: []
    });
  });

  it('should accept end pages', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 5,
      pages: pageAmount,
      endPages: 2
    })).to.deep.equal({
      beginPages: [],
      previousPages: [4],
      centerPage: 5,
      nextPages: [6],
      endPages: [8, 9]
    });
  });

  it('should accept first page and end pages', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 0,
      pages: pageAmount,
      endPages: 2
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [1],
      endPages: [8, 9]
    });
  });

  it('should accept end pages with overlap', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: pageAmount - 3,
      pages: pageAmount,
      endPages: 2
    })).to.deep.equal({
      beginPages: [],
      previousPages: [pageAmount - 4],
      centerPage: pageAmount - 3,
      nextPages: [],
      endPages: [pageAmount - 2, pageAmount - 1]
    });
  });

  it('should accept both begin and end pages', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 5,
      pages: pageAmount,
      beginPages: 2,
      endPages: 2
    })).to.deep.equal({
      beginPages: [0, 1],
      previousPages: [4],
      centerPage: 5,
      nextPages: [6],
      endPages: [8, 9]
    });
  });

  it('should show only one page if there is one with both begin and end pages', function () {
    const pageAmount = 1;

    expect(segmentize({
      page: 0,
      pages: pageAmount,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [],
      endPages: []
    });
  });

  it('should show only two pages if there are two with both begin and end pages', function () {
    expect(segmentize({
      page: 0,
      pages: 2,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [],
      endPages: [1]
    });
  });

  it('should show only two pages if there are two with both begin and end pages ' +
      'and latter is selected', function () {
    expect(segmentize({
      page: 1,
      pages: 2,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [0],
      previousPages: [],
      centerPage: 1,
      nextPages: [],
      endPages: []
    });
  });

  it('should segmentize #1 correctly', function () {
    expect(segmentize({
      page: 1,
      pages: 3,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [0],
      previousPages: [],
      centerPage: 1,
      nextPages: [],
      endPages: [2]
    });
  });

  it('should segmentize #2 correctly', function () {
    expect(segmentize({
      page: 0,
      pages: 3,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [],
      endPages: [1, 2]
    });
  });

  it('should segmentize 6 pages correctly when 4th page is selected', function () {
    expect(segmentize({
      page: 3,
      pages: 6,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [0, 1, 2],
      previousPages: [],
      centerPage: 3,
      nextPages: [],
      endPages: [4, 5]
    });
  });

  it('should segmentize #6 correctly', function () {
    expect(segmentize({
      page: 8,
      pages: 11,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [0, 1, 2],
      previousPages: [7],
      centerPage: 8,
      nextPages: [],
      endPages: [9, 10]
    });
  });

  it('should segmentize start correctly', function () {
    expect(segmentize({
      page: 2,
      pages: 11,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [0, 1],
      previousPages: [],
      centerPage: 2,
      nextPages: [3],
      endPages: [8, 9, 10]
    });
  });

  it('should segmentize #9 correctly, part 1', function () {
    // given there's overlap between begin and end, this should merge
    expect(segmentize({
      page: 3,
      pages: 7,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [0, 1, 2],
      previousPages: [],
      centerPage: 3,
      nextPages: [],
      endPages: [4, 5, 6]
    });
  });

  it('should segmentize #9 correctly, part 2', function () {
    // given begin and end are next after each other, this should merge
    expect(segmentize({
      page: 4,
      pages: 7,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [0, 1, 2],
      previousPages: [3],
      centerPage: 4,
      nextPages: [],
      endPages: [5, 6]
    });
  });

  it('should segmentize ten items correctly at start', function () {
    expect(segmentize({
      page: 4,
      pages: 10,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [0, 1, 2],
      previousPages: [3],
      centerPage: 4,
      nextPages: [5],
      endPages: [7, 8, 9]
    });
  });

  it('should segmentize ten items correctly at end', function () {
    expect(segmentize({
      page: 5,
      pages: 10,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [0, 1, 2],
      previousPages: [4],
      centerPage: 5,
      nextPages: [6],
      endPages: [7, 8, 9]
    });
  });

  it('should accept side pages number', function () {
    expect(segmentize({
      page: 5,
      pages: 15,
      sidePages: 2
    })).to.deep.equal({
      beginPages: [],
      previousPages: [3, 4],
      centerPage: 5,
      nextPages: [6, 7],
      endPages: []
    });
  });

  it('should accept side pages number for the first page', function () {
    expect(segmentize({
      page: 0,
      pages: 15,
      sidePages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [1, 2, 3],
      endPages: []
    });
  });

  it('should accept side pages number for the last page', function () {
    expect(segmentize({
      page: 14,
      pages: 15,
      sidePages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [11, 12, 13],
      centerPage: 14,
      nextPages: [],
      endPages: []
    });
  });

  it('should accept side pages number', function () {
    expect(segmentize({
      page: 5,
      pages: 15,
      sidePages: 2,
      beginPages: 2,
      endPages: 2
    })).to.deep.equal({
      beginPages: [0, 1],
      previousPages: [3, 4],
      centerPage: 5,
      nextPages: [6, 7],
      endPages: [13, 14]
    });
  });

  it('should not show begin pages', function () {
    expect(segmentize({
      page: 0,
      pages: 1000,
      beginPages: 3,
      endPages: 3,
      sidePages: 2
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: 0,
      nextPages: [1, 2],
      endPages: [997, 998, 999]
    });
  });

  it('should not intersect', function () {
    const property = jsc.forall(jsc.nat(), jsc.nat(), function (a, b) {
      const max = Math.max(a, b);
      const min = Math.min(a, b);

      return !intersect.apply(null, values(segmentize({
        page: min,
        pages: max,
        sidePages: min,
        beginPages: min,
        endPages: min
      }))).length;
    });

    jsc.assert(property);
  });
});

function values(o) {
  return Object.keys(o).map(function (k) {
    return Array.isArray(o[k]) ? o[k] : [o[k]];
  });
}
