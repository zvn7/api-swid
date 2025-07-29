const Story = require("../models/Story");

exports.createStory = async (req, res, next) => {
    try {
        const story = new Story(req.body);
        const saved = await story.save();
        res.status(201).json({
            message: "Cerita berhasil dikirim. Terima kasih sudah berbagi 💛",
            data: saved,
        });
    } catch (err) {
        next({ status: 400, message: "Gagal mengirim cerita", error: err });
    }
};

exports.getStories = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.category) filter.category = req.query.category;

        const stories = await Story.find(filter).sort({ submittedAt: -1 });
        res.json({
            message: "Cerita berhasil diambil",
            count: stories.length,
            data: stories,
        });
    } catch (err) {
        next({ status: 500, message: "Gagal mengambil cerita", error: err });
    }
};

exports.updateStatus = async (req, res, next) => {
    const { status } = req.body;
    const validStatuses = ["approved", "rejected"];

    if (!validStatuses.includes(status)) {
        return next({
            status: 400,
            message: "Status tidak valid. Harus 'approved' atau 'rejected'.",
        });
    }

    try {
        const story = await Story.findByIdAndUpdate(
            req.params.id,
            {
                status,
                approvedAt: status === "approved" ? new Date() : null,
            },
            { new: true }
        );

        if (!story) {
            return next({ status: 404, message: "Cerita tidak ditemukan" });
        }

        res.json({
            message: `Status cerita berhasil diubah menjadi '${status}'.`,
            data: story,
        });
    } catch (err) {
        next({ status: 500, message: "Gagal mengubah status cerita", error: err });
    }
};
