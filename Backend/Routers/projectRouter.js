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
        var [results4] = await db.query(querytofindTrainingIds,project_id );
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
        var [results4] = await db.query(querytofindTrainingIds,project_id );
        console.log(results4);
        res.status(200).json(results4)

    } catch (err) {
        console.error("Query execution error:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router