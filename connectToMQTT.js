const mqtt = require("mqtt");
const { handleMongoDBOperations } = require("./handleMongoDBOpeartions");
module.exports = {
  connectToMQTT: () => {
    const client = mqtt.connect(process.env.MQTT_BROCKER_URL);
    client.on("connect", async function () {
      client.subscribe("system_loss_inactive", (qos = 1), function (err) {
        console.log("subscribed to system_loss_inactive");
      });
      client.on("message", async (topic, message) => {
        if (topic === "system_loss_inactive") {
          let data = JSON.parse(message.toString());
          handleMongoDBOperations(data);
        }
      });
      client.on("error", function (err) {
        client.end();
      });
    });
  },
};
