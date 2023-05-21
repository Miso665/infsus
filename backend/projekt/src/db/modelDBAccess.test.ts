import { dbDeleteModel, dbGetModel, dbInsertModel, dbUpdateModel } from "./modelDBAccess";


var testModelID = -1

test("The QUERY should not find model with id -1", async () => {
    expect(await dbGetModel(testModelID)).toEqual(null)
});

test("The INSERT should pass", async () => {
    let testModel = await dbInsertModel(
        {
            "modelid": 0,
            "modelname": "testModel",
            "modelhorsepower": 150,
            "modeltopspeed": 200,
            "modeltransmissiontype": "manual",
            "modelaccelinseconds": 3,
            "brandid": 1
        }
    )
    testModelID = testModel.modelid
    expect(testModel).toEqual({
        "modelid": testModelID,
        "modelname": "testModel",
        "modelhorsepower": 150,
        "modeltopspeed": 200,
        "modeltransmissiontype": "manual",
        "modelaccelinseconds": 3,
        "brandid": 1
    })
});


test("The UPDATE should pass", async () => {
    let testModel = await dbUpdateModel(
        {
            "modelid": testModelID,
            "modelname": "testModel2",
            "modelhorsepower": 150,
            "modeltopspeed": 200,
            "modeltransmissiontype": "automatic",
            "modelaccelinseconds": 4,
            "brandid": 1
        }
    )

    expect(testModel).toEqual({
        "modelid": testModelID,
        "modelname": "testModel2",
        "modelhorsepower": 150,
        "modeltopspeed": 200,
        "modeltransmissiontype": "automatic",
        "modelaccelinseconds": 4,
        "brandid": 1
    })
});

test("The QUERY should return updated model", async () => {
    expect(await dbGetModel(testModelID)).toEqual({
        "modelid": testModelID,
        "modelname": "testModel2",
        "modelhorsepower": 150,
        "modeltopspeed": 200,
        "modeltransmissiontype": "automatic",
        "modelaccelinseconds": 4,
        "brandid": 1
    })
});

test("The DELETE should be successful", async () => {
    expect(await dbDeleteModel(testModelID)).toEqual(true)
});

test("The DELETE should not find the model", async () => {
    expect(await dbDeleteModel(testModelID)).toEqual(false)
});