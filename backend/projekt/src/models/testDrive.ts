import { dbGetAllUserIDs } from "../db/userDBAccess";
import { CarStock } from "./carStock";
import { User } from "./user";
import { dbGetAllCarStockIDs } from "../db/carStockDBAccess";

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

    static async validate(testDrive: TestDriveDTO) {
        let isValid = true;
        let wrongAttributes: string[] = [];

        const testDriveTime = new Date(testDrive.testdrivetime);
        if (isNaN(testDriveTime.getTime())) {
            isValid = false;
            wrongAttributes.push("testdrivetime");
        }

        if (!(await dbGetAllUserIDs()).includes(testDrive.userid)) {
            isValid = false;
            wrongAttributes.push("userid");
        }

        if (!(await dbGetAllCarStockIDs()).includes(testDrive.stockid)) {
            isValid = false;
            wrongAttributes.push("stockid");
        }

        return [isValid, wrongAttributes];
    }
}