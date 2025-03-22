const Renter = require('../models/renter');
const User = require('../models/user');

const renterSend = async (req, res) => {
    try {
        const { name, title } = req.body;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newRenter = new Renter({
            name,
            title,
            user: user._id,  
        });

        await newRenter.save();

        user.renter.push(newRenter._id);
        await user.save();

        return res.status(201).json({ message: "Renter added successfully", renter: newRenter });
    } catch (error) {
        console.error("Error in renterSend:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { renterSend };
