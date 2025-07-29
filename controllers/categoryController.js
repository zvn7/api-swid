const Category = require("../models/Category");

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.status(200).json({
            message: "Kategori berhasil diambil.",
            count: categories.length,
            data: categories,
        });
    } catch (err) {
        next({ status: 500, message: "Gagal mengambil kategori", error: err });
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const category = new Category(req.body);
        const saved = await category.save();
        res.status(201).json({
            message: "Kategori berhasil dibuat.",
            data: saved,
        });
    } catch (err) {
        next({ status: 400, message: "Gagal membuat kategori", error: err });
    }
};
