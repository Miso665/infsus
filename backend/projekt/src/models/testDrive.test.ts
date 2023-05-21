import { TestDriveDTO } from "./testDrive";


test('TestDrive must be invalid on testdriveconcluded and userid beacuse of missing fields', async () => {
    expect(await TestDriveDTO.validate(
        {
            "testdrivetime": "2023-07-04T10:00:00.000Z",
            "stockid": 3
        }
    )).toEqual([false, ["testdriveconcluded","userid"]])
});


test('TestDrive must be invalid beacuse composite key already exists', async () => {
    expect(await TestDriveDTO.validate(
        {
            "testdrivetime": "2023-07-04T10:00:00.000Z",
            "testdriveconcluded": true,
            "testdriveid": 1,
            "userid": 3,
            "stockid": 3
        }
    )).toEqual([false, ["Key(driverId, stockId, testDriveTime) already exists"]])
});