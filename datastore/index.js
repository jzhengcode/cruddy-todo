const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// could we be using items as RAM and writing the file as storage
// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////
let newPath = (fileName) => (path.join(exports.dataDir, `${fileName}.txt`));

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err){
      // let's come back here later
      callback(err);
    } else {
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
/*
Next, refactor the readOne to read a todo item from the dataDir based on the message's id. For this function, you must read the contents of the todo item file and respond with it to the client.
*/
exports.readOne = (id, callback) => {
  //use readfile
  var searchDir = newPath(id)
  fs.readFile(searchDir, 'utf8', (err, todoText)=>{
    if(err){
      callback(err)
    } else {
      if (!todoText){
        callback(new Error(`No item with id: ${id}`));
      } else {
        callback(null, {id, text: todoText});
      }

    }
  })
  //and use the thingy thing thingy
  //...?
  //profit!

  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }

  let searchDir = newPath(id)
  fs.readFile(searchDir, (err)=>{
    if(err){
      callback(err)
    }else{
      fs.writeFile(searchDir, text, (err)=>{
        if(err){
          callback(err)
        }else{
          callback(null, {id, text})
        }
      })
    }
  })



  // if err
  //   callback(new Error(`No item with id: ${id}`));
  // else
  // if it is true then take that id and fs.writeFile
  // if err
  //   callback(err)
  // else
  // callback()


};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }

  let searchDir = newPath(id);
  fs.unlink(searchDir, (err) => {
    if(err){
      callback(err)
    }else{
      callback()
    }
  })

};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
