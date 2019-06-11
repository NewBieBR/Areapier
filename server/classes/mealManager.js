const request = require("request");

class mealManager {
	constructor() {
		this.lastActionDate = null;
	}

	getMeal(param, onDone) {
		let now = new Date();

		if ((this.lastActionDate == null || this.lastActionDate.getDate() != now.getDate()) &&
			param.hours == now.getHours() &&
			param.minutes == now.getMinutes()) {
			this.lastActionDate = now;

			var req = "https://www.themealdb.com/api/json/v1/1/random.php";
			var result = null;
			request(req, { json: true }, (err, res, body) => {
				if (err) {
					console.log(err);
					return;
				}
				result = { recipe: body.meals[0].strInstructions };
				onDone(result);
			});
		}
	}
}

module.exports = mealManager;
