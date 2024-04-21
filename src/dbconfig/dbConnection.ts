import mongoose from "mongoose";

export const dbConnection = () => {
  try {
    console.log("inside the db connection");

    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connection", () => {
      console.log("database connected successfully");
    });

    connection.on("error", (error) => {
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log("something wrong on db connection");
    process.exit();
  }
};
