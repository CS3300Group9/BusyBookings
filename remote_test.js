const axios = require("axios")

async function tester() {
    //TO GET DATA FROM THESE GETTERS YOU WILL HAVE TO USE AWAIT AS FOLLOWS WHEN YOU CALL THIS FUNCTION, IN EXAMPLE BELOW CALLING GET BUISNESSES result_list.data WILL HOLD A JSON WITH ALL BUISNESSES
            /*
            const result_list = await getBuisnesses();
            */
        async function getRemote() {
            return await axios
            .get("https://jsserver-1056678293451.us-east5.run.app/buisness")
            
        }
        const results = getRemote()
        console.log((await results).data)
}

console.log("TESTING REMOETE SERVER")
tester()
