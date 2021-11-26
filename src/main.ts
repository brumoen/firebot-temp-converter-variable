import { Firebot } from "firebot-custom-scripts-types";

interface Params {
	message: string;
}

const script: Firebot.CustomScript<Params> = {
	getScriptManifest: () => {
		return {
		name: "$tempConvert Variable",
		description: "Adds a $tempConvert variable",
		author: "theperry",
		version: "1.0",
		firebotVersion: "5",
		startupOnly: true,
		};
	},
	getDefaultParameters: null,
	run: (runRequest) => {
		const { replaceVariableManager } = runRequest.modules;

		replaceVariableManager.registerReplaceVariable({
		definition: {
			handle: "tempConverter",
			description: "Converts the given temperatur based on unit, if you don't assign a unit Celsius(C) is assumed.",
			usage: "tempConvert[num, unit]",
			examples: [
			{
				usage: "tempConverter[25, C]",
				description: "Converts 25°C to Fahrenheit"
			},
			{
				usage: "tempConverter[77, F]",
				description: "Converts 77°F to Celsius"
			},
			{
				usage: "arg[1]°$arg[2] converts to $tempConverter[$arg[1], $arg[2]]",
				description: "This takes argument 1 as tempteratur and argument 2 as unit and converts it."
			},
			{
				usage: "tempConverter[25]",
				description: "Converts 25°C to Fahrenheit"
			}
			],
			possibleDataOutput: ["text"],
		},
		evaluator: (_, temp, unit = "C") => {

			if (isNaN(temp)) {
			return 0;
			}

			if (unit === "C"){
			temp = (temp*1.8)+32;
			temp = Number(temp).toFixed(2);
			temp = temp + "°F";
			} else if (unit === "F"){
			temp = (temp-32)/1.8;
			temp = Number(temp).toFixed(2);
			temp = temp + "°C"
			}
			
			return temp;
		},
		});
	},
};

export default script;