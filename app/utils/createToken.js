const jwt =  require('jsonwebtoken');

Date.prototype.addDays = function(days){

	var date = new Date(this.valueOf())

	date.setDate(date.getDate() + days);

	return date;

}
const createToken = ({_id,email,profile_picture,first_name,last_name,typeUser}) => {
//console.log(profile_picture)
	const exp = new Date().addDays(1).getTime()

	const payload = {
		_id,
		email,
		exp,
		typeUser,
		first_name,
		last_name,
		profile_picture
	}

	return jwt.sign(payload, process.env.SECRET_KEY )

}

module.exports = createToken;