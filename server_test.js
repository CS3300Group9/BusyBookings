const axios = require("axios")

async function test() {

    async function request(x, y) {
        console.log("http://localhost:3001/validate/" + x + "/" + y)
        return await axios
        .get("http://localhost:3001/validate/" + x + "/" + y)
    }
    try {
        const response = await request("Reboot", "PassyMcPassFace");
        console.log("RESPONSE")
        console.log(response.data)
    } catch (error) {
        console.log(error.toString())
    }

        
}   

test()