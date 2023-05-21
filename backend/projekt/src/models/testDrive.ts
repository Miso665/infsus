import { dbGetAllUserIDs } from "../db/userDBAccess";
import { CarStock } from "./carStock";
import { User } from "./user";
import { dbGetAllCarStockIDs } from "../db/carStockDBAccess";
import { testDriveCompositeKeyAvailability } from "../db/testDriveDBAccess";

export class TestDrive {
    testDriveTime: Date;
    testDriveConcluded: boolean;
    testDriveID: number;
    user: User;
    stock: CarStock;
}


export class TestDriveDTO {
    testdrivetime: string;
    testdriveconcluded: boolean;
    testdriveid: number | null;
    userid: number;
    stockid: number;

    static async validate(testDrive): Promise<[boolean, string[]]> {
        let isValid = true;
        let wrongAttributes: string[] = [];


        if (!testDrive.testdrivetime) {
            isValid = false;
            wrongAttributes.push("testdrivetime");
        } else {
            const testDriveTime = new Date(testDrive.testdrivetime);
            if (isNaN(testDriveTime.getTime())) {
                isValid = false;
                wrongAttributes.push("testdrivetime");
            }
        }

        if (!testDrive.testdriveconcluded && testDrive.testdriveconcluded != false && testDrive.testdriveconcluded != true) {
            isValid = false;
            wrongAttributes.push("testdriveconcluded");
        }

        if (!testDrive.userid || !(await dbGetAllUserIDs()).includes(testDrive.userid)) {
            isValid = false;
            wrongAttributes.push("userid");
        }

        if (!testDrive.stockid || !(await dbGetAllCarStockIDs()).includes(testDrive.stockid)) {
            isValid = false;
            wrongAttributes.push("stockid");
        }

        if (!wrongAttributes.includes("testdrivetime") && !wrongAttributes.includes("userid") && !wrongAttributes.includes("stockid")) {
            if (!(await testDriveCompositeKeyAvailability(testDrive.userid, testDrive.stockid, testDrive.testdrivetime))) {
                isValid = false;
                wrongAttributes.push("Key(driverId, stockId, testDriveTime) already exists");
            }
        }

        return [isValid, wrongAttributes];
    }
}