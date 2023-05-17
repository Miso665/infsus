import { dbGetBrand } from "./brandDBAccess";

test('Gotten brand from db must be type of BrandDTO', async () => {
    expect(await dbGetBrand(1)).toEqual({
        brandid: 1,
        brandname: 'Volkswagen',
        brandcontractstart: new Date("2022-08-06T15:30:00.000Z"),
        brandcontractend: new Date("2025-08-06T15:30:00.000Z")
      });
});