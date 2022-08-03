const moment = require('moment')
const formatDateCustom = (date, format) => {
    if (date == null) {
        return null
    } else {
        const dates = moment(date).format(format)
        return dates
    }
}
module.exports = { formatDateCustom }