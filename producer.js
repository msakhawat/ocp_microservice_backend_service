const {Kafka} = require("kafkajs")

run("3");
async function run(msg){
    try{
        const kafka = new Kafka({
            "clientId": "blog_post",
            "brokers": ["kafkaserver1:9092"]
        });
        const producer = kafka.producer();
        console.log("Connecting...")
        await producer.connect();
        console.log("Connected")
        const result= await producer.send({
            topic: "blog-post",
            messages: [
                {
                    value: msg
                }
            ]
        });
        console.log(`Send successfully. ${JSON.stringify(result)}`);
        await producer.disconnect();
    }
    catch(ex){
        console.error(`Something when wrong ${ex}`);
    }
    finally{
        process.exit(0);   
    }
}