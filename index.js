const dotenv = require('dotenv')
const server = require('./api/server')

dotenv.config()

const PORT = require('./config').port

server.listen(PORT, () => {
    console.log(`server jammin pon da:${PORT}`)
})