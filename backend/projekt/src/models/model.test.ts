import { ModelDTO } from "./model";

test('Model must be valid',async () => {
    expect(await ModelDTO.validate({modelid: null, modelname: "foo", modelaccelinseconds: 1, modelhorsepower: 1, modeltopspeed: 1, modeltransmissiontype: "automatic", brandid: 1}))
    .toEqual([true, []]);
});

test('Model must be valid',async () => {
    expect(await ModelDTO.validate({modelid: null, modelname: "foo", modelaccelinseconds: 1, modelhorsepower: 1, modeltopspeed: 1, modeltransmissiontype: "manual", brandid: 1}))
    .toEqual([true, []]);
});

test('Model must be invalid on modeltransmissiontype and brandid',async () => {
    expect(await ModelDTO.validate({modelid: null, modelname: "foo", modelaccelinseconds: 1, modelhorsepower: 1, modeltopspeed: 1, modeltransmissiontype: "asdplfk", brandid: 100}))
    .toEqual([false, ["modeltransmissiontype", "brandid"]]);
});