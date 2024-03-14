const userModel = require('../Models/userModel')

const handleSignUp = async (req,res) => {
    if (!req.body && !req.body.email && !req.body.password) {
        return res.status(204).send("No request body found");
      }
      const { email, password } = req.body;
      try {
        const data = await userModel.findOne({ email });
        if (data) {
          return res.status(201).send("maid id already exists");
        }
      } catch (err) {
        console.log(err.message);
      }
      
}


module.exports={handleSignUp}