const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

console.log("routerlar calıstı");

exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  console.log("register içinde");
  // Validate input
  if (!username || !password || !email) {
    return res.status(400).json({ error: "Tüm alanlar zorunludur" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Bu email zaten kayıtlı" });
  }

  try {
    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hash,
      email,
    });

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.user_role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    req.user = { username: newUser.username, id: newUser._id };

    return res.status(200).json({
      message: "Giriş başarılı",
      user: { username: newUser.username, id: newUser._id },
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email ve şifre gereklidir" });
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Kullanıcı bulunamadı" });
  }
  // Check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Geçersiz şifre" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.user_role },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 } // 1 hour
  );
  req.user = { username: user.username, id: user._id };
  return res.status(200).json({
    message: "Giriş başarılı",
    user: { username: user.username, id: user._id },
    token,
  });
};

exports.verifyToken = (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      user: { username: decoded.username, id: decoded.id },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token süresi dolmuş" });
    }
    return res.status(404).json({ message: "Token doğrulama hatası" });
  }
};

exports.updateUser = async (req, res) => {
  const { userId, username, password } = req.body;
  console.log({ userId, username, password });

  try {
    const user = User.findByIdAndUpdate(userId);
    const hash = await bcrypt.hash(password, 10);
    if (!user)
      return res
        .status(404)
        .json({ message: "Boyle bir kullanıcı bulunamadı" });

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { username, password: hash },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error", error);
    return res.json({ message: "sunucu hatası" });
  }
};
