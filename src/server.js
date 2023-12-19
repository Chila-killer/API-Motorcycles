const app = require('./app')
const { initModel } = require('./config/database/associations')
const { authenticated,  syncUp } = require('./config/database/database')
const { envs } = require('./config/environments/environments')

async function main (){
    try {
        await authenticated()
        initModel()
        await syncUp()
    } catch (error) {
        console.log(error);
    }
}

main()

app.listen(envs.PORT, () => {
    console.log("Server running on port: " + envs.PORT);
})