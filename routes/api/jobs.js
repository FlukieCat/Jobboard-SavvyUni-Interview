const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Job = require('../../models/Job');

// @route GET api/jobs
// @desc  get all jobs
// @acce  Public
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const keywords = req.query.keywords;
        let totalJobs;
        let returnJobs;
        if (keywords) {
            totalJobs = await Job.find({
                $text: { $search: keywords },
            });
            returnJobs = await Job.find({
                $text: { $search: keywords },
            })
                .limit(limit)
                .skip(startIndex);
        } else {
            totalJobs = await Job.find();
            returnJobs = await Job.find().limit(limit).skip(startIndex);
        }

        const results = {
            jobs: returnJobs,
        };

        if (endIndex < totalJobs.length) {
            results.hasNextPage = true;
        } else {
            results.hasNextPage = false;
        }

        return res.json(results);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

// @route PUT api/jobs/:id
// @desc  update a job
// @acce  Public
router.put('/:id', async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }
        job = await Job.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.json(job);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

// @route PUT api/jobs/delete/:id
// @desc  Soft delete a job
// @acce  Private
router.put('/delete/:id', auth, async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }
        if (
            job.dislikes.filter(
                (dislike) => dislike.user.toString() === req.user.id
            ).length > 0
        ) {
            return res.status(400).json({ msg: 'Job already deleted' });
        }
        job.dislikes.unshift({ user: req.user.id });
        await job.save();
        return res.json(job);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
