var nodegit = require('nodegit');
var path = require('path');
console.log('asdf');
var run = function() {
  nodegit.Repository.open(path.resolve("./../left-pad/.git"))
    .then(function(repo) {
    return repo.getMasterCommit();
    })
    .then(function(firstCommitOnMaster){
    // History returns an event.
        var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);

    // History emits "commit" event for each commit in the branch's history
    history.on("commit", function(commit) {
      console.log("commit " + commit.sha());
      console.log("Author:", commit.author().name() +
      " <" + commit.author().email() + ">");
      console.log("Date:", commit.date());
      console.log("\n    " + commit.message());
    });

    // Don't forget to call `start()`!
    history.start();
    })
  .done();
}
var blameTest = async function() {
  console.log('running blameTest...');
  console.log('     ')
  var Blame = nodegit.Blame;
  var b;
  var repoPath = path.resolve('./../left-pad/.git');
  var fileName = "package.json";
  var repo = await getRepo(repoPath);
  Blame.file(repo, fileName).then(function(blame) {
    b = blame;
    console.log("blame:", blame);
  });
  return b;
}  

var getRepo = async function(repoPath) {
  nodegit.Repository.open(repoPath).then(r => {
    console.log('r: ', r);
    return r;
  });
}

blameTest();
console.log('------- done -------')
module.exports.run = run;
module.exports.blameTest = blameTest; 