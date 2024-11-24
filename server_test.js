const axios = require("axios")

async function test() {

    async function request(x, y) {
        return await axios
        .get("http://localhost:3001/validate/" + x + "/" + y)
        /*.then((response)=> {
        const posts = response.data;
        console.log(posts)
        });*/
        }


        const response = await request("test", "password");
        console.log("RESPONSE")
        //console.log(response.data)

        
}   

test()