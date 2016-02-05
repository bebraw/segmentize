/* eslint-env mocha */
const expect = require('chai').expect;
const jsc = require('jsverify');
const intersect = require('intersect');
const segmentize = require('./');

describe('segmentize', function () {
  it('should show only one page if there is one', function () {
    expect(segmentize({
      page: 1,
      pages: 1
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [],
      endPages: []
    });
  });

  it('should show only one page if only page and pages are set', function () {
    const pageAmount = 2;

    expect(segmentize({
      page: 1,
      pages: pageAmount
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [],
      endPages: []
    });
  });

  it('should show current at start by default', function () {
    const pageAmount = 4;

    expect(segmentize({
      page: 1,
      pages: pageAmount
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [],
      endPages: []
    });
  });

  it('should show only current at end by default', function () {
    const pageAmount = 4;

    expect(segmentize({
      page: pageAmount,
      pages: pageAmount
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [pageAmount],
      nextPages: [],
      endPages: []
    });
  });

  it('should show only current if there is only one page', function () {
    expect(segmentize({
      page: 1,
      pages: 1
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [],
      endPages: []
    });
  });

  it('should accept begin pages', function () {
    expect(segmentize({
      page: 5,
      pages: 10,
      beginPages: 2
    })).to.deep.equal({
      beginPages: [1, 2],
      previousPages: [],
      centerPage: [5],
      nextPages: [],
      endPages: []
    });
  });

  it('should accept begin pages at end', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: pageAmount,
      pages: pageAmount,
      beginPages: 2
    })).to.deep.equal({
      beginPages: [1, 2],
      previousPages: [],
      centerPage: [pageAmount],
      nextPages: [],
      endPages: []
    });
  });

  it('should accept begin pages with overlap', function () {
    expect(segmentize({
      page: 2,
      pages: 10,
      beginPages: 2
    })).to.deep.equal({
      beginPages: [1],
      previousPages: [],
      centerPage: [2],
      nextPages: [],
      endPages: []
    });
  });

  it('should accept end pages', function () {
    expect(segmentize({
      page: 5,
      pages: 10,
      endPages: 2
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [5],
      nextPages: [],
      endPages: [9, 10]
    });
  });

  it('should accept first page and end pages', function () {
    expect(segmentize({
      page: 1,
      pages: 10,
      endPages: 2
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [],
      endPages: [9, 10]
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
      previousPages: [],
      centerPage: [pageAmount - 3],
      nextPages: [],
      endPages: [pageAmount - 1, pageAmount]
    });
  });

  it('should accept both begin and end pages', function () {
    expect(segmentize({
      page: 5,
      pages: 10,
      beginPages: 2,
      endPages: 2
    })).to.deep.equal({
      beginPages: [1, 2],
      previousPages: [],
      centerPage: [5],
      nextPages: [],
      endPages: [9, 10]
    });
  });

  it('should show only one page if there is one with both begin and end pages', function () {
    expect(segmentize({
      page: 1,
      pages: 1,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [],
      endPages: []
    });
  });

  it('should show only two pages if there are two with both begin and end pages', function () {
    expect(segmentize({
      page: 1,
      pages: 2,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [],
      endPages: [2]
    });
  });

  it('should show only two pages if there are two with both begin and end pages ' +
      'and latter is selected', function () {
    expect(segmentize({
      page: 2,
      pages: 2,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [1],
      previousPages: [],
      centerPage: [2],
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
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [],
      endPages: [2, 3]
    });
  });

  it('should segmentize #2 correctly', function () {
    expect(segmentize({
      page: 1,
      pages: 3,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [],
      endPages: [2, 3]
    });
  });

  it('should segmentize 6 pages correctly when 4th page is selected', function () {
    expect(segmentize({
      page: 4,
      pages: 6,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [1, 2, 3],
      previousPages: [],
      centerPage: [4],
      nextPages: [],
      endPages: [5, 6]
    });
  });

  it('should segmentize #6 correctly', function () {
    expect(segmentize({
      page: 9,
      pages: 11,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [1, 2, 3],
      previousPages: [],
      centerPage: [9],
      nextPages: [],
      endPages: [10, 11]
    });
  });

  it('should segmentize start correctly', function () {
    expect(segmentize({
      page: 2,
      pages: 11,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [1],
      previousPages: [],
      centerPage: [2],
      nextPages: [],
      endPages: [9, 10, 11]
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
      beginPages: [1, 2],
      previousPages: [],
      centerPage: [3],
      nextPages: [],
      endPages: [5, 6, 7]
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
      beginPages: [1, 2, 3],
      previousPages: [],
      centerPage: [4],
      nextPages: [],
      endPages: [5, 6, 7]
    });
  });

  it('should segmentize ten items correctly at start', function () {
    expect(segmentize({
      page: 4,
      pages: 10,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [1, 2, 3],
      previousPages: [],
      centerPage: [4],
      nextPages: [],
      endPages: [8, 9, 10]
    });
  });

  it('should segmentize ten items correctly at end', function () {
    expect(segmentize({
      page: 5,
      pages: 10,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal({
      beginPages: [1, 2, 3],
      previousPages: [],
      centerPage: [5],
      nextPages: [],
      endPages: [8, 9, 10]
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
      centerPage: [5],
      nextPages: [6, 7],
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
      beginPages: [1, 2],
      previousPages: [3, 4],
      centerPage: [5],
      nextPages: [6, 7],
      endPages: [14, 15]
    });
  });

  it('should not show begin pages', function () {
    expect(segmentize({
      page: 1,
      pages: 1000,
      beginPages: 3,
      endPages: 3,
      sidePages: 2
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [2, 3],
      endPages: [998, 999, 1000]
    });
  });

  it('should accept side pages number for the first page', function () {
    expect(segmentize({
      page: 1,
      pages: 15,
      sidePages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [2, 3, 4],
      endPages: []
    });
  });

  it('should clamp to begin', function () {
    expect(segmentize({
      page: -1,
      pages: 1000,
      beginPages: 3,
      endPages: 3,
      sidePages: 2
    })).to.deep.equal({
      beginPages: [],
      previousPages: [],
      centerPage: [1],
      nextPages: [2, 3],
      endPages: [998, 999, 1000]
    });
  });

  it('should accept side pages number for the last page', function () {
    expect(segmentize({
      page: 15,
      pages: 15,
      sidePages: 3
    })).to.deep.equal({
      beginPages: [],
      previousPages: [12, 13, 14],
      centerPage: [15],
      nextPages: [],
      endPages: []
    });
  });

  it('should clamp to end', function () {
    expect(segmentize({
      page: 1001,
      pages: 1000,
      beginPages: 3,
      endPages: 3,
      sidePages: 2
    })).to.deep.equal({
      beginPages: [1, 2, 3],
      previousPages: [998, 999],
      centerPage: [1000],
      nextPages: [],
      endPages: []
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
