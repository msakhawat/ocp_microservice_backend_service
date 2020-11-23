const {Kafka} = require("kafkajs")
var mysql = require('mysql');


const clientId=process.env.KAFKA_CLIENT_ID ?? "blog_post",
      brokers=process.env.BROKERS ?? ["kafkaserver1:9092"],
      consumerGroup=process.env.CONSUMER_GROUP ?? "group1",
      kafkaTopic=process.env.KAFKA_TOPIC ?? "Blog_Post"
      
const databaseServer=process.env.DATABASE_SERVER ?? "mysql",
      databaseUser=process.env.DATABASE_USER?? "sa",
      datasePassword=process.env.DATABASE_PASSWORD?? "1234",
      database=process.env.DATABASE ?? "blog";

run();
async function run(){
    try{
        const kafka = new Kafka({
            "clientId": clientId,
            "brokers": brokers
        });
        const consumer = kafka.consumer({"groupId": consumerGroup});
        console.log("Connecting...")
        await consumer.connect();
        console.log("Connected")
        await consumer.subscribe({
            topic: kafkaTopic,
            fromBeginning: true
        });
        console.log("Subscribed")
        var con = mysql.createConnection({
            host: databaseServer,
            user: databaseUser,
            password: datasePassword,
            database: database
        });
        console.log("mysql connection created")
        console.log("consuming topic ...")
        await consumer.run({
            eachMessage: async (result)=>{              
                console.log("message recieving")
                console.log(`Message received: ${result.message.value}`);
                // con.connect(function(err) {
                //     if (err) throw err;
                    console.log("MySQL Connected");
                    var sql = `UPDATE blog_post SET author = 'sakhawat' WHERE id = '${result.message.value}'`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(result.affectedRows + " record(s) updated");
                    });
                // });
               
            }
        });
    }
    catch(ex){
        console.error(`Something when wrong ${ex}`);
    }
}