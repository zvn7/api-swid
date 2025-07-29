const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validasi basic
        if (!name || !email || !password || !confirmPassword) {
            return next({ statusCode: 400, message: "Semua field wajib diisi" });
        }

        // Validasi panjang password
        if (password.length < 6) {
            return next({ statusCode: 400, message: "Password minimal 6 karakter" });
        }

        // Validasi password dan confirm
        if (password !== confirmPassword) {
            return next({ statusCode: 400, message: "Password dan konfirmasi tidak cocok" });
        }

        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next({ statusCode: 400, message: "Format email tidak valid" });
        }

        // Cek email sudah terdaftar
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next({ statusCode: 400, message: "Email sudah terdaftar" });
        }

        // Simpan user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            message: "Registrasi berhasil",
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role,
            },
        });
    } catch (err) {
        console.error("[Register Error]", err);
        return next({ statusCode: 500, message: "Gagal registrasi" });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next({ statusCode: 400, message: "Email dan password wajib diisi" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next({ statusCode: 404, message: "User tidak ditemukan" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next({ statusCode: 400, message: "Password salah" });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({
            success: true,
            message: "Login berhasil",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("[Login Error]", err);
        return next({ statusCode: 500, message: "Gagal login" });
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return next({ statusCode: 404, message: "User tidak ditemukan" });
        }

        res.json({
            success: true,
            message: "Profil berhasil diambil",
            user,
        });
    } catch (err) {
        console.error("[Get Profile Error]", err);
        return next({ statusCode: 500, message: "Gagal mengambil profil" });
    }
};
