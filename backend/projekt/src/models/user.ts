import { Role } from "./role";
import { dbGetAllRoleIDs } from "../db/roleDBAccess";

export class User {
    userID: number;
    userName: string;
    userSurname: string;
    OIB: string | null;
    role: Role;
}

export class UserDTO {
    userid: number | null;
    username: string;
    usersurname: string;
    oib: string;
    roleid: number;

    static async validate(user: UserDTO) {
        let isValid = true;
        let wrongAttributes: string[] = [];

        //ID is a serial
        if (user.username.length > 200 || /\d/.test(user.username) || /[^A-Za-z\s]/.test(user.username)) {
            isValid = false;
            wrongAttributes.push("username");
        }
    
        if (user.usersurname.length > 200 || /\d/.test(user.usersurname) || /[^A-Za-z\s]/.test(user.usersurname)) {
            isValid = false;
            wrongAttributes.push("usersurname");
        }
    
        if (user.oib !== null) {
            if (user.oib.length !== 11 || !/^\d+$/.test(user.oib)) {
                isValid = false;
                wrongAttributes.push("oib");
            }
        }
    
        if (!(await dbGetAllRoleIDs()).includes(user.roleid)) {
            isValid = false;
            wrongAttributes.push("roleid");
        }
    
        return [isValid, wrongAttributes];
    }
}