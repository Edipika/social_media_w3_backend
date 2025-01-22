const { Users, UserMetadata } = require('../models');

const adduser = async (req, res) => {
    console.log('Inside adduser function');
    try {
        const { name, handle } = req.body;
        if (!name || !handle) {
            return res.status(400).json({ message: 'Name and handle are required.' });
        }

        const existingUser = await Users.findOne({ where: { handle: handle } });
        if (existingUser) {
            return res.status(400).json({ message: 'Handle already exists. Please use a different name.' });
        }
        const newUser = await Users.create({ name, handle });

        // Save uploaded images
        const uploadedFiles = req.files; // Multer stores uploaded files in `req.files`
        if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).json({ message: 'No images uploaded.' });
        }

        // Save image paths and userId in UsersMetadata table
        const metadataEntries = uploadedFiles.map((file) => ({
            user_id: newUser.id,
            imagePath: file.path,
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
        res.json(users)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getImages = async (req, res) => {
    try {
        const userId = req.params.userId;
        const users = await Users.findByPk(userId);
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }
        const images = await UserMetadata.findAll({
            where: { user_id: userId }
        });
        res.json({
            user: users,
            images: images
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    adduser, getUserData, getImages
}