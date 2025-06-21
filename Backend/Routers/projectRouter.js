const verifyToken = require('../TokenVerification');
const db = require('../config/db');
var router = require('express').Router()


// get student personl details
router.get('/getstudent', verifyToken, async (req, res) => {
    const { pro_stud_id } = req.query;

    try {
        const query = 'SELECT * FROM tbl_project_student WHERE pro_stud_id = ?';
        var [results3] = await db.query(query, [pro_stud_id])
        console.log(pro_stud_id);
        res.status(200).json(results3)

    } catch (err) {
        console.error("Query execution error:", err.message);
        return res.status(500).json({ error: err.message });
    }
});
// get group details
router.get('/getGroupDetails', verifyToken, async (req, res) => {
    const { project_id } = req.query;

    try {
        const querytofindTrainingIds = 'SELECT * FROM tbl_project WHERE project_id = ?';
        var [results4] = await db.query(querytofindTrainingIds, project_id);
        console.log(results4);
        res.status(200).json(results4)

    } catch (err) {
        console.error("Query execution error:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// get bill details
router.get('/getBillDetails', verifyToken, async (req, res) => {
    const { project_id } = req.query;

    try {
        const querytofindTrainingIds = 'SELECT * FROM tbl_project_bill WHERE project_id = ?';
        var [results4] = await db.query(querytofindTrainingIds, project_id);
        console.log(results4);
        res.status(200).json(results4)

    } catch (err) {
        console.error("Query execution error:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// get announcement by project group
router.get('/getdataAnnouncements', verifyToken, async (req, res) => {
    const { group } = req.query;
    console.log(req.query);

    console.log(1);

    console.log(group);
    console.log(2);
    if (!group) {
        return res.status(400).json('group is required');
    }
    const query = 'SELECT * FROM tbl_project_announcements WHERE pro_type = ?';
    console.log(3);
    try {

        const [results] = await db.query(query, [group]);
        console.log(results);

        console.log(4);
        if (results.length === 0) {
            console.log(5);
            return res.status(404).json('No announcements found for this batch');
        }
        return res.status(200).json(results);
    } catch (err) {
        console.error("Query execution error:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// get attendance router
router.get('/getdataattendance', verifyToken, async (req, res) => {
    const { training_id, year, month } = req.query;
    if (!training_id) {
        return res.status(400).json('training_id is required');
    }
    const parsedStudentId = parseInt(training_id);
    if (isNaN(parsedStudentId)) {
        return res.status(400).json('Invalid training_id');
    }
    let query = 'SELECT * FROM tbl_project_attendance WHERE project_id = ?';
    let queryParams = [parsedStudentId];
    if (year && month) {
        query += ' AND YEAR(date_taken) = ? AND MONTH(date_taken) = ?';
        queryParams.push(year, month);
    } else {
        console.log('Filtering without specific year/month');
    }
    try {
        const [results] = await db.query(query, queryParams);
        if (results.length === 0) {
            return res.status(404).json('No attendance data found');
        }
        return res.status(200).json(results);
    } catch (err) {
        console.error("Query execution error:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// get videos
router.get('/getdatavideos', verifyToken, async (req, res) => {
    const { group } = req.query;
    console.log(group);

    if (!group) {
        return res.status(400).json('group is required');
    }

    const query = 'SELECT * FROM tbl_project_videos WHERE pro_type = ?';

    try {
        const [results] = await db.query(query, [group]);
        if (results.length === 0) {
            return res.status(404).json('No videos found for this group');
        }
        return res.status(200).json(results);
    } catch (err) {
        console.error("Query execution error:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router