const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Judul cerita wajib diisi."],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Isi cerita wajib diisi."],
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Kategori cerita wajib dipilih."],
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
        approvedAt: Date,
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        email: {
            type: String,
            default: null,
            validate: {
                validator: function (v) {
                    // validasi format email kalau ada isinya
                    return v === null || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: (props) => `${props.value} bukan format email yang valid.`,
            },
        },
        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
