const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// could we be using items as RAM and writing the file as storage
// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err){
      // let's come back here later
      callback(err);
    } else {
      let newPath = (id) => (path.join(exports.dataDir, `${id}.txt`));

      var newFile = newPath(id);
      fs.writeFile(newFile, text, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, text });
      }
      });

    }
    // console.log(paddedID);
    // items[paddedID] = text;
/*
 fs.writeFile(exports.dataDir, text, (err) => {
   //somehow make the id the name of the file and store in text
 }

*/
// make a function that joins dataDir with id -> take in an id
  // join dataDir with id.txt
  // return ^

    // if (err) {
    //   throw ('error writing counter');
    // } else {
    //   // callback(null, { id, text });
    // }
});
  // id = paddedID;
  // console.log('this is .create');
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = (callback) => {
  // use fs.readdir to get a list of all files
    //take each file store it in an array

  var data = [];
  data.push(fs.readdir((exports.dataDir,(err, data) => {
    if (err) {
      throw ('error reading all');
    } else {
      callback(null, data);
    }
  })))
  console.log(data);
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });

  // fs.readdir((exports.dataDir,(err) => {
  //   if (err) {
  //     throw ('error reading all');
  //   } else {
  //     callback(null, data);
  //   }
  // })

};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
