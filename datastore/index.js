const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// Public API - Fix these CRUD functions ///////////////////////////////////////
let newPath = (fileName) => (path.join(exports.dataDir, `${fileName}.txt`));

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      callback(err);
    } else {
      var newFile = newPath(id);
      fs.writeFile(newFile, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
};



exports.readAll = (callback) => {

  let data = [];
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      callback(err);
    } else {
      for (var i = 0; i < files.length; i++) {

        data.push({id: files[i].substr(0, 5), text: files[i].substr(0, 5)});
      }

      callback(null, data);
    }
  });

};

exports.readOne = (id, callback) => {
  //use readfile
  var searchDir = newPath(id);
  fs.readFile(searchDir, 'utf8', (err, todoText)=> {
    if (err) {
      callback(err);
    } else {
      if (!todoText) {
        callback(new Error(`No item with id: ${id}`));
      } else {
        callback(null, {id, text: todoText});
      }

    }
  });

};

exports.update = (id, text, callback) => {

  let searchDir = newPath(id);
  fs.readFile(searchDir, (err) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(searchDir, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {id, text});
        }
      });
    }
  });

};

exports.delete = (id, callback) => {


  let searchDir = newPath(id);
  fs.unlink(searchDir, (err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });

};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
