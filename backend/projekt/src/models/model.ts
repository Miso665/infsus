import { dbGetAllBrandIDs } from "../db/brandDBAccess";
import { Brand } from "./brand";

export class Model {
    modelID: number | null;
    modelName: string;
    modelHorsePower: number;
    modelTopSpeed: number;
    modelTransmissionType: string;
    modelAccelInSeconds: number;
    brand: Brand;
}

export class ModelDTO {
    modelid: number | null;
    modelname: string;
    modelhorsepower: number;
    modeltopspeed: number;
    modeltransmissiontype: string;
    modelaccelinseconds: number;
    brandid: number;

    static async validate(model: ModelDTO) {
        let isValid = true;
        let wrongAttributes: string[] = [];

        if (model.modelname.length > 200) {
            isValid = false;
            wrongAttributes.push("modelname");
        }

        if (model.modeltransmissiontype !== "manual" && model.modeltransmissiontype !== "automatic") {
            isValid = false;
            wrongAttributes.push("modeltransmissiontype");
        }

        if (!(await dbGetAllBrandIDs()).includes(model.brandid)) {
            isValid = false;
            wrongAttributes.push("brandid");
        }


        return [isValid, wrongAttributes];
    }
}