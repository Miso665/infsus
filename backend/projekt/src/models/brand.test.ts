import { BrandDTO } from "./brand";

test('Brand must be invalid on everything', () => {
    let date = (new Date()).toISOString()
    expect(BrandDTO.validate({brandid: null, brandname: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor mattis nulla id facilisis. Quisque fermentum gravida dui, non fringilla orci facilisis ac. Nullam accumsan turpis justo, at facilisis erat facilisis id. Donec sit amet metus elit.",
    brandcontractstart: new Date().toISOString(), brandcontractend: date})).toEqual([false, ["brandname", "brandcontractstart","brandcontractend"]]);
});


test('Brand must be invalid on dates', () => {
    expect(BrandDTO.validate({brandid: null, brandname: "Donec sit amet metus elit.",
    brandcontractstart: "wrong", brandcontractend: "date"})).toEqual([false, ["brandcontractstart","brandcontractend"]]);
});

test('Brand must be invalid on brandcontractstart', () => {
    expect(BrandDTO.validate({brandid: null, brandname: "Donec sit amet metus elit.",
    brandcontractstart: "wrong", brandcontractend: "2022"})).toEqual([false, ["brandcontractstart"]]);
});