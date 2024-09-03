// backend/rulesEngine.js
const { DateTime } = require('luxon');

async function runCompareDates(date1, date2) {
    const dt1 = DateTime.fromISO(date1);
    const dt2 = DateTime.fromISO(date2);
    const difference = dt1.diff(dt2, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();
    return difference;
}

async function runConvertTimeZone(date, timezone) {
    const dt = DateTime.fromISO(date).setZone(timezone);
    return dt.toISO();
}

async function runConvertDateFormat(date, format) {
    const dt = DateTime.fromISO(date);
    let formattedDate;
    if (format === 'MM/DD/YYYY') {
        formattedDate = dt.toFormat('MM/dd/yyyy');
    } else if (format === 'DD/MM/YYYY') {
        formattedDate = dt.toFormat('dd/MM/yyyy');
    } else {
        throw new Error('Unsupported date format');
    }
    return formattedDate;
}

module.exports = {
    runCompareDates,
    runConvertTimeZone,
    runConvertDateFormat
};
