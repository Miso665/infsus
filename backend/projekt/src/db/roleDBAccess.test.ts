import { dbGetAllRoleIDs } from "./roleDBAccess"

test('IDs must be 1, 2, 3', async () => {
    expect(await dbGetAllRoleIDs()).toEqual([1,2,3]);
});