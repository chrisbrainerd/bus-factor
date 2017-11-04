'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var nodegit = require('nodegit');
var path = require('path');
console.log('asdf');
var run = function run() {
  nodegit.Repository.open(path.resolve("./../left-pad/.git")).then(function (repo) {
    return repo.getMasterCommit();
  }).then(function (firstCommitOnMaster) {
    // History returns an event.
    var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);

    // History emits "commit" event for each commit in the branch's history
    history.on("commit", function (commit) {
      console.log("commit " + commit.sha());
      console.log("Author:", commit.author().name() + " <" + commit.author().email() + ">");
      console.log("Date:", commit.date());
      console.log("\n    " + commit.message());
    });

    // Don't forget to call `start()`!
    history.start();
  }).done();
};
var blameTest = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var Blame, b, repoPath, fileName, repo;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('running blameTest...');
            console.log('     ');
            Blame = nodegit.Blame;
            repoPath = path.resolve('./../left-pad/.git');
            fileName = "package.json";
            _context.next = 7;
            return getRepo(repoPath);

          case 7:
            repo = _context.sent;

            Blame.file(repo, fileName).then(function (blame) {
              b = blame;
              console.log("blame:", blame);
            });
            return _context.abrupt('return', b);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function blameTest() {
    return _ref.apply(this, arguments);
  };
}();

var getRepo = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(repoPath) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            nodegit.Repository.open(repoPath).then(function (r) {
              console.log('r: ', r);
              return r;
            });

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getRepo(_x) {
    return _ref2.apply(this, arguments);
  };
}();

blameTest();
console.log('------- done -------');
module.exports.run = run;
module.exports.blameTest = blameTest;