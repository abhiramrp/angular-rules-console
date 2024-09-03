// backend/app.js
const express = require('express');
const rulesEngine = require('./rulesEngine');
const app = express();
const port = 3000;

app.use(express.json());

const cors = require('cors');
app.use(cors());


app.post('/compareDates', async (req, res) => {
    const { date1, date2 } = req.body;
    try {
        const result = await rulesEngine.runCompareDates(date1, date2);
        res.json(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/convertTimeZone', async (req, res) => {
    const { date, timezone } = req.body;
    try {
        const result = await rulesEngine.runConvertTimeZone(date, timezone);
        res.json({ convertedDate: result });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/convertDateFormat', async (req, res) => {
    const { date, format } = req.body;
    try {
        const result = await rulesEngine.runConvertDateFormat(date, format);
        res.json({ formattedDate: result });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
