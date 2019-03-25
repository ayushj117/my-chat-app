import fs from "fs";
fs.open('../../modules/user/constants', 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.error('myfile already exists');
        return;
      }
  
      throw err;
    }
  
console.log('sa', fd);
  });