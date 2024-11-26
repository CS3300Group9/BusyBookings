const axios = require("axios")

async function test() {

    async function type(x) {
        console.log("http://localhost:3001/type/" + x)
        return await axios
        .get("http://localhost:3001/type/" + x)
    }
    try {
        const response = await type("Reboot");
        console.log("RESPONSE")
        console.log(response.data)
    } catch (error) {
        console.log(error.toString())
    }

        
}   

test()