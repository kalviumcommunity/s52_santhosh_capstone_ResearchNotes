const bcrypt = require('bcrypt')

async function hashPassword(password) {
    const saltRounds = 2; 
    return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password,hashedPassword){
  return await bcrypt.compare(password,hashedPassword)
}  

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;