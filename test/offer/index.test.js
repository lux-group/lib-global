const chai = require('chai')
const MockDate = require("mockdate")

const { offer } = require('../../compiled')

const expect = chai.expect

describe("timeLeftMessage()", () => {
  beforeEach(() => {
    const currentDate = "2019-05-27 14:22:47.110542+03";
    MockDate.set(currentDate);
  });

  afterEach(() => {
    MockDate.reset();
  });

  it("shows offer new", () => {
    const schedule = {
      start: "2019-05-26T11:30:00+10:00",
      end: "2019-06-30T11:30:00+10:00"
    };
    const voucher = {
      limit_reached: false
    };
    const message = offer.timeLeftMessage(schedule, voucher);
    expect(message.type).to.eql("new");
  });

  it("shows offer ends soon when no time left but vouchers left", () => {
    const schedule = {
      start: "2019-05-24T11:30:00+10:00",
      end: "2019-06-30T11:30:00+10:00"
    };
    const voucher = {
      limit_reached: false
    };
    const message = offer.timeLeftMessage(schedule, voucher);
    expect(message.type).to.eql("ending_soon");
  });

  it("shows 2 days left", () => {
    const schedule = {
      start: "2019-05-24T11:30:00+10:00",
      end: "2019-05-30T11:30:00+10:00"
    };
    const voucher = {
      limit_reached: false
    };
    const message = offer.timeLeftMessage(schedule, voucher);
    expect(message.type).to.eql("left");
    expect(message.message).to.eql("2 days left");
  });

  it("shows 1 day left", () => {
    const schedule = {
      start: "2019-05-24T11:30:00+10:00",
      end: "2019-05-29T11:30:00+10:00"
    };
    const voucher = {
      limit_reached: false
    };
    const message = offer.timeLeftMessage(schedule, voucher);
    expect(message.type).to.eql("left");
    expect(message.message).to.eql("1 day left");
  });

  it("shows 4 hours left", () => {
    const schedule = {
      start: "2019-05-24T11:30:00+10:00",
      end: "2019-05-28T01:30:00+10:00"
    };
    const voucher = {
      limit_reached: false
    };
    const message = offer.timeLeftMessage(schedule, voucher);
    expect(message.type).to.eql("left");
    expect(message.message).to.eql("4 hours left");
  });

  it("shows 1 hour left", () => {
    const schedule = {
      start: "2019-05-24T11:30:00+10:00",
      end: "2019-05-27T22:30:00+10:00"
    };
    const voucher = {
      limit_reached: false
    };
    const message = offer.timeLeftMessage(schedule, voucher);
    expect(message.type).to.eql("left");
    expect(message.message).to.eql("1 hour left");
  });

  it("shows 22 minutes left", () => {
    const schedule = {
      start: "2019-05-24T11:00:00+10:00",
      end: "2019-05-27T21:45:00+10:00"
    };
    const voucher = {
      limit_reached: false
    };
    const message = offer.timeLeftMessage(schedule, voucher);
    expect(message.type).to.eql("left");
    expect(message.message).to.eql("22 minutes left");
  });

  it("shows sold out when time left but voucher sold out", () => {
    const schedule = {
      start: "2017-05-01T12:30:00+10:00",
      end: "2017-06-01T12:30:00+10:00"
    };
    const voucher = {
      limit_reached: true
    };
    const message = offer.timeLeftMessage(schedule, voucher);
    expect(message.type).to.eql("sold");
  });
});
