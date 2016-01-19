/* eslint-env mocha */
const expect = require('chai').expect;
const segmentize = require('./');

describe('segmentize', function () {
  it('should show only one page if there is one', function () {
    const pageAmount = 1;

    expect(segmentize({
      page: 0,
      pages: pageAmount
    })).to.deep.equal([
      [0]
    ]);
  });

  it('should show only two pages if there are two', function () {
    const pageAmount = 2;

    expect(segmentize({
      page: 0,
      pages: pageAmount
    })).to.deep.equal([
      [0, 1]
    ]);
  });

  it('should show current and next at start by default', function () {
    const pageAmount = 4;

    expect(segmentize({
      page: 0,
      pages: pageAmount
    })).to.deep.equal([
      [0, 1]
    ]);
  });

  it('should show current and previous at end by default', function () {
    const pageAmount = 4;

    expect(segmentize({
      page: pageAmount - 1,
      pages: pageAmount
    })).to.deep.equal([
      [pageAmount - 2, pageAmount - 1]
    ]);
  });

  it('should show only current if there is only one page', function () {
    const pageAmount = 1;

    expect(segmentize({
      page: 0,
      pages: pageAmount
    })).to.deep.equal([
      [0]
    ]);
  });

  it('should show both previous and next page if at center', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 5,
      pages: pageAmount
    })).to.deep.equal([
      [4, 5, 6]
    ]);
  });

  it('should accept begin pages', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 5,
      pages: pageAmount,
      beginPages: 2
    })).to.deep.equal([
      [0, 1],
      [4, 5, 6]
    ]);
  });

  it('should accept begin pages and end page', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: pageAmount - 1,
      pages: pageAmount,
      beginPages: 2
    })).to.deep.equal([
      [0, 1],
      [pageAmount - 2, pageAmount - 1]
    ]);
  });

  it('should accept begin pages with overlap', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 2,
      pages: pageAmount,
      beginPages: 2
    })).to.deep.equal([
      [0, 1, 2, 3]
    ]);
  });

  it('should accept end pages', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 5,
      pages: pageAmount,
      endPages: 2
    })).to.deep.equal([
      [4, 5, 6],
      [8, 9]
    ]);
  });

  it('should accept first page and end pages', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 0,
      pages: pageAmount,
      endPages: 2
    })).to.deep.equal([
      [0, 1],
      [8, 9]
    ]);
  });

  it('should accept end pages with overlap', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: pageAmount - 3,
      pages: pageAmount,
      endPages: 2
    })).to.deep.equal([
      [6, 7, 8, 9]
    ]);
  });

  it('should accept both begin and end pages', function () {
    const pageAmount = 10;

    expect(segmentize({
      page: 5,
      pages: pageAmount,
      beginPages: 2,
      endPages: 2
    })).to.deep.equal([
      [0, 1],
      [4, 5, 6],
      [8, 9]
    ]);
  });

  it('should show only one page if there is one with both begin and end pages', function () {
    const pageAmount = 1;

    expect(segmentize({
      page: 0,
      pages: pageAmount,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0]
    ]);
  });

  it('should show only two pages if there are two with both begin and end pages', function () {
    const pageAmount = 2;

    expect(segmentize({
      page: 0,
      pages: pageAmount,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1]
    ]);
  });

  it('should show only two pages if there are two with both begin and end pages ' +
      'and latter is selected', function () {
    const pageAmount = 2;

    expect(segmentize({
      page: 1,
      pages: pageAmount,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1]
    ]);
  });

  it('should segmentize #1 correctly', function () {
    expect(segmentize({
      page: 1,
      pages: 3,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1, 2]
    ]);
  });

  it('should segmentize #2 correctly', function () {
    expect(segmentize({
      page: 0,
      pages: 3,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1, 2]
    ]);
  });

  it('should segmentize 6 pages correctly when 4th page is selected', function () {
    expect(segmentize({
      page: 3,
      pages: 6,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1, 2, 3, 4, 5]
    ]);
  });

  it('should segmentize #6 correctly', function () {
    expect(segmentize({
      page: 8,
      pages: 11,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1, 2],
      [7, 8, 9, 10]
    ]);
  });

  it('should segmentize start correctly', function () {
    expect(segmentize({
      page: 2,
      pages: 11,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1, 2, 3],
      [8, 9, 10]
    ]);
  });

  it('should segmentize #9 correctly', function () {
    // given there's overlap between begin and end, this should merge
    expect(segmentize({
      page: 3,
      pages: 7,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1, 2, 3, 4, 5, 6]
    ]);
  });

  it('should segmentize #9 correctly, part 2', function () {
    // given begin and end are right after each other, this should merge
    expect(segmentize({
      page: 4,
      pages: 7,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1, 2, 3, 4, 5, 6]
    ]);
  });

  it('should segmentize ten items correctly at start', function () {
    expect(segmentize({
      page: 4,
      pages: 10,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1, 2, 3, 4, 5],
      [7, 8, 9]
    ]);
  });

  it('should segmentize ten items correctly at end', function () {
    expect(segmentize({
      page: 5,
      pages: 10,
      beginPages: 3,
      endPages: 3
    })).to.deep.equal([
      [0, 1, 2],
      [4, 5, 6, 7, 8, 9]
    ]);
  });

  it('should accept side pages number', function () {
    expect(segmentize({
      page: 5,
      pages: 15,
      sidePages: 2
    })).to.deep.equal([
      [3, 4, 5, 6, 7]
    ]);
  });

  it('should accept side pages number for the first page', function () {
    expect(segmentize({
      page: 0,
      pages: 15,
      sidePages: 3
    })).to.deep.equal([
      [0, 1, 2, 3]
    ]);
  });

  it('should accept side pages number for the last page', function () {
    expect(segmentize({
      page: 14,
      pages: 15,
      sidePages: 3
    })).to.deep.equal([
      [11, 12, 13, 14]
    ]);
  });

  it('should accept side pages number', function () {
    expect(segmentize({
      page: 5,
      pages: 15,
      sidePages: 2,
      beginPages: 2,
      endPages: 2
    })).to.deep.equal([
      [0, 1],
      [3, 4, 5, 6, 7],
      [13, 14]
    ]);
  });
});
