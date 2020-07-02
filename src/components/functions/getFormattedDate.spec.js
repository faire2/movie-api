import {getFormattedDate} from "./getFormattedDate";

describe("Date transformation", () => {
    it("should convert a date", () => {
        const date1 = "2018-01-13";
        const newDate1 = getFormattedDate(date1);
    expect(newDate1).toEqual("13. 1. 2018");
    });
    it("should convert a date", () => {
        const date2 = "2018-01-10";
        const newDate2 = getFormattedDate(date2);
        expect(newDate2).toEqual("10. 1. 2018");
    });
    it("should convert a date", () => {
        const date3 = "2018-12-01";
        const newDate3 = getFormattedDate(date3);
        expect(newDate3).toEqual("1. 12. 2018");
    });
});