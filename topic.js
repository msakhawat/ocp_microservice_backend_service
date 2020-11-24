const {Kafka} = require("kafkajs")

run();
async function run(){
    try{
        const kafka = new Kafka({
            "clientId": "myservice",
            "brokers": ["kafkaserver1:9092"]
        });
        const admin = kafka.admin();
        console.log("Connecting...")
        await admin.connect();
        console.log("Connected")
        await admin.createTopics({
            "topics":[{
                "topic":"blog-post",
                "numPartitions": 1
            }]
        });
        console.log("Topic created successfully");
        await admin.disconnect();
    }
    catch(ex){
        console.error(`Something when wrong ${ex}`);
    }
    finally{
        process.exit(0);   
    }

}