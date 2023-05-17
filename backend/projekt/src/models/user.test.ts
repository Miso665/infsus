import { UserDTO } from "./user";

test('User must be invalid on roleID', async () => {
    expect(await UserDTO.validate({userid: 1, username: "John", usersurname: "Doe", oib: null, roleid: 4})).toEqual([false, ["roleid"]]);
});

test('User must be invalid on everything', async () => {
    expect(await UserDTO.validate({userid: null, username: "3jhonf", usersurname: "()", oib: "wrongwrong1", roleid: 4}))
        .toEqual([false, ["username","usersurname","oib","roleid"]]);
});
