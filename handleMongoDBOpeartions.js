const dbo = require("./db/conn");

module.exports = {
  handleMongoDBOperations: async (dataMQTT) => {
    let db_connect = dbo.getDb("alter");
    let date = new Date(dataMQTT["datetime"]);
    console.log({ dataMQTT });
    try {
      const result = await db_connect
        .collection("systemLoss")
        .findOne({ "dateTime.hour": date.getHours() });
      console.log({ result });
      if (result) {
        // update operation
        console.log("data found");
      } else {
        // insert operation
        console.log("data inserted");
        const data = {
          inactiveTime: dataMQTT.absent_time,
          dateTime: {
            hour: date.getHours(),
            day: date.getDay(),
            month: date.getMonth(),
            year: date.getFullYear(),
          },
        };
        await db_connect.collection("systemLoss").insertOne(data);
      }
    } catch (error) {
      throw error;
    }
  },
};
