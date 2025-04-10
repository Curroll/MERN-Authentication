import { userModel} from "../models/user.js";

export const getUserData = async (req, res) => {
    const userId = req.user.id;
    try {
      const user = await userModel.findById(userId); // ✅ use here
  
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
  
      res.json({
        success: true,
        userData: {
          name: user.name,
          isAccountVerified: user.isAccountVerified,
        },
      });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  