//#region require Test
const {Kolosova} = require("./Tests/Kolosova");
const {Ryahovsky} = require("./Tests/Ryahovsky");
const {Shubert} = require("./Tests/Shubert");
const {Nemov} = require("./Tests/Nemov");
const {Prokhorov} = require("./Tests/Prokhorov");
const {Rean} = require("./Tests/Rean");
const {Madduh} = require("./Tests/Madduh");
const {Munsterberg} = require("./Tests/Munsterberg");
const {UspekhElersa} = require("./Tests/UspekhElersa");
const {NeudachiElersa} = require("./Tests/NeudachiElersa");
const {Nemchin} = require("./Tests/Nemchin");
const {HolmsRage} = require("./Tests/HolmsRage");
const {PSM25} = require("./Tests/PSM25");
const {Goroh} = require("./Tests/Goroh");
const {VisualMemoryWords} = require("./Tests/VisualMemoryWords");
const {VisualMemoryNumbers} = require("./Tests/VisualMemoryNumbers");
const {AnalyticalThinking} = require("./Tests/AnalyticalThinking");
const {ProjectiveReactiveThinking} = require("./Tests/ProjectiveReactiveThinking");
const {SpatialThinking} = require("./Tests/SpatialThinking");
const {AnalyticalIntuitiveThinking} = require("./Tests/AnalyticalIntuitiveThinking");
const {ProductiveReproductiveThinking} = require("./Tests/ProductiveReproductiveThinking");
//#endregion

module.exports = {
	TestExecution: (testId, answers) => {
		var result = -1;
		let intId = Number.parseInt(testId);
		console.log("Обработка теста:" + intId);
		console.log(answers);

		switch (intId) {
			case 1:
				result = Kolosova(answers);
				break;
			case 2:
				result = Ryahovsky(answers);
				break;
			case 3:
				result = Shubert(answers);
				break;
			case 4:
				result = Nemov(answers);
				break;
			case 5:
				result = Prokhorov(answers);
				break;
			case 6:
				result = Rean(answers);
				break;
			case 7:
				break;
			case 8:
				result = Madduh(answers);
				break;
			case 9:
				result = Munsterberg(answers);
				break;
			case 10:
				break;
			case 11:
				result = UspekhElersa(answers);
				break;
			case 12:
				result = NeudachiElersa(answers);
				break;
			case 13:
				result = Nemchin(answers);
				break;
			//case 14:
			//result = Reyzas(answers);
			//break;
			case 15:
				result = HolmsRage(answers);
				break;
			case 16:
				result = PSM25(answers);
				break;
			case 20:
				result = Goroh(answers);
				break;
			case 24:
				result = VisualMemoryWords(answers);
				break;
			case 25:
				result = VisualMemoryNumbers(answers);
				break;
			case 27:
				result = ProductiveReproductiveThinking(answers);
				break;
			case 28:
				result = AnalyticalIntuitiveThinking(answers);
				break;
			case 29:
				result = SpatialThinking(answers);
				break;
			case 30:
				result = ProjectiveReactiveThinking(answers);
				break;
			case 31:
				result = AnalyticalThinking(answers);
				break;

		}

		if (result == -1) {
			console.log("[" + testId + "] test_id = " + testId + " не добавлен в обработку".toUpperCase());
		}
				
		return result;
	}

}