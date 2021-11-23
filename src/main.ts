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
        description: "Converts the given temperatur to the assigned scale.",
        usage: "tempConvert[num, scale]",
        examples: [
          {
            usage: "tempConverter[25, F]",
            description: "Converts 25°C to Fahrenheit"
          }
        ],
        possibleDataOutput: ["text"],
      },
      evaluator: (_, temp, scale = "F") => {

        if (isNaN(temp)) {
          return 0;
        }

        if (scale === "C"){
          temp = (temp*1.8)+32;
          temp = Number(temp).toFixed(2);
          temp = temp + "°F";
        } else if (scale === "F"){
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