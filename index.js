require('dotenv').config()
const app = require("./app")
const port = process.env.PORT || 3000

app.listen(port, () => {
    try {
        console.log(`PORT ${port} CONNECTED`)
    } catch (error) {
        console.log(`PORT CAN'T CONNECT!!!!`)
    }
})