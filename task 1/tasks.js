'use strict';
// URL must be decoded.
// URL without port number.
const parseURL = function(url) {
  const reg = /^(?:(?<protocol>https?)(?::\/\/))(?<hostname>.+?(?=\/|$))(?<directory>.+(?=\/))?(?<path>.+?(?=\?|#|$))?(?<query>\?\w+=.*?(?=#|$))?(?<hash>#.*)?$/;
  const groups = url.match(reg).groups;
  groups.pathname = (groups.directory || '') + (groups.path || '');
  return groups;
};

const destructuring = function(data) {
  const {names, enrolled = false, marksss: marks} = data;
  return {names, enrolled, marks};
}

module.exports = { parseURL, destructuring };
