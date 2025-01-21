const {Users,UserMetadata} = require('../models');

const adduser = async (req, res) => {
    console.log('Inside adduser function');
    try {
      // Retrieve name and handle from the request body
      const { name, handle } = req.body;

      if (!name || !handle) {
          return res.status(400).json({ message: 'Name and handle are required.' });
      }

      // Create a new user in the Users table
      const newUser = await Users.create({ name, handle });

      // Save uploaded images
      const uploadedFiles = req.files; // Multer stores uploaded files in `req.files`
      if (!uploadedFiles || uploadedFiles.length === 0) {
          return res.status(400).json({ message: 'No images uploaded.' });
      }

      // Save image paths and userId in UsersMetadata table
      const metadataEntries = uploadedFiles.map((file) => ({
          user_id: newUser.id,
          imagePath: file.path, // Save the path of the uploaded file
      }));

      await UserMetadata.bulkCreate(metadataEntries);

        res.status(200).json({ 'message': `Account created successfully!` });
    } catch (error) {
        console.error('Error Occured:', error);
        res.status(500).json({ 'message': error.message });
    }
};

const getUserData = async (req, res) => {
    try {
        const users = await Users.findAll();
        const metaData = await UserMetadata.findAll();
        res.json({
            data: users.map(user => ({
                user,
                metaData: metaData.filter(meta => meta.user_id === user.id) || null,  //finds return a object
            }))
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });  // Internal server error
    }
};



module.exports = {
    adduser,getUserData
}