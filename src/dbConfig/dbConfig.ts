import mongoose from "mongoose";

export async function connect() {
	try {
		await mongoose.connect(process.env.MONGO_URI!);

		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.log("MONGODB CONNECTED");
		});
		connection.on("error", (error) => {
			console.log("MONGODB CONNECTION ERROR");
			console.log(error);
			process.exit();
		});
	} catch (error) {
		console.log("CONNECTION ERROR WHILE CONNECTING TO DB");
		console.log(error);
	}
}
