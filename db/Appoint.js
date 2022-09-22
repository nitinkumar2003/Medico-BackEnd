const mongoose=require("mongoose");
const AppointSchema = new mongoose.Schema({
	name:String,
	email:String,
	mobile:String,
	date:String,
	department:String,
	doctor:String,
	message:String,
	conformORnot:String
	
})
module.exports=mongoose.model("appointments",AppointSchema)



