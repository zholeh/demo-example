const assert = require('chai').assert
const tasks = require('../tasks');
const parseURL = tasks.parseURL;
const destructuring = tasks.destructuring;

describe('parseURL', function() {
  describe('http://www.example.com/dir1/dir2/path.html?a=1&b=2#hash', function() {
    const test = parseURL('http://www.example.com/dir1/dir2/path.html?a=1&b=2#hash');
    it('protocol', function() {
      assert.equal(test.protocol, 'http');
    });
    it('hostname', function() {
      assert.equal(test.hostname, 'www.example.com');
    });
    it('directory', function() {
      assert.equal(test.directory, '/dir1/dir2');
    });
    it('path', function() {
      assert.equal(test.path, '/path.html');
    });
    it('query', function() {
      assert.equal(test.query, '?a=1&b=2');
    });
    it('hash', function() {
      assert.equal(test.hash, '#hash');
    });
  });
  describe('http://www.example.com/path.html?a=1&b=2#hash', function() {
    const test = parseURL('http://www.example.com/path.html?a=1&b=2#hash');
    it('protocol', function() {
      assert.equal(test.protocol, 'http');
    });
    it('hostname', function() {
      assert.equal(test.hostname, 'www.example.com');
    });
    it('directory', function() {
      assert.equal(test.directory, undefined);
    });
    it('path', function() {
      assert.equal(test.path, '/path.html');
    });
    it('query', function() {
      assert.equal(test.query, '?a=1&b=2');
    });
    it('hash', function() {
      assert.equal(test.hash, '#hash');
    });
  });
  describe('http://www.example.com/path.html#hash', function() {
    const test = parseURL('http://www.example.com/path.html#hash');
    it('protocol', function() {
      assert.equal(test.protocol, 'http');
    });
    it('hostname', function() {
      assert.equal(test.hostname, 'www.example.com');
    });
    it('directory', function() {
      assert.equal(test.directory, undefined);
    });
    it('path', function() {
      assert.equal(test.path, '/path.html');
    });
    it('query', function() {
      assert.equal(test.query, undefined);
    });
    it('hash', function() {
      assert.equal(test.hash, '#hash');
    });
  });
  describe('https://www.example.com/path.html', function() {
    const test = parseURL('https://www.example.com/path.html');
    it('protocol', function() {
      assert.equal(test.protocol, 'https');
    });
    it('hostname', function() {
      assert.equal(test.hostname, 'www.example.com');
    });
    it('directory', function() {
      assert.equal(test.directory, undefined);
    });
    it('path', function() {
      assert.equal(test.path, '/path.html');
    });
    it('query', function() {
      assert.equal(test.query, undefined);
    });
    it('hash', function() {
      assert.equal(test.hash, undefined);
    });
  });
  describe('https://www.example.com', function() {
    const test = parseURL('https://www.example.com');
    it('protocol', function() {
      assert.equal(test.protocol, 'https');
    });
    it('hostname', function() {
      assert.equal(test.hostname, 'www.example.com');
    });
    it('directory', function() {
      assert.equal(test.directory, undefined);
    });
    it('path', function() {
      assert.equal(test.path, undefined);
    });
    it('query', function() {
      assert.equal(test.query, undefined);
    });
    it('hash', function() {
      assert.equal(test.hash, undefined);
    });
  });
});

describe('destructuring', function() {
  it('with enrolled', function () {
    let data = {
      names: ['A', 'B', 'C'],
      enrolled: true,
      marksss: {
        A: [1,1,1],
        B: [2,2,2],
        C: [3,3,3]
      }
    };
    test = destructuring(data);
    assert.isArray(test.names);
    assert.equal(test.names.length, 3);
    assert.equal(test.enrolled, true);
    assert.isObject(test.marks);
  })
  it('without enrolled', function () {
    let data = {
      names: ['A', 'B', 'C'],
      marksss: {
        A: [1,1,1],
        B: [2,2,2],
        C: [3,3,3]
      }
    };
    test = destructuring(data);
    assert.isArray(test.names);
    assert.equal(test.names.length, 3);
    assert.equal(test.enrolled, false);
    assert.isObject(test.marks);
  })
});
