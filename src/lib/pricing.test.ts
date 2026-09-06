import { getDeliveryFee, getOrderTotal } from "./pricing";

describe("delivery pricing", () => {
  it("adds delivery below the free-delivery threshold", () => {
    expect(getDeliveryFee(99.99)).toBe(5);
    expect(getOrderTotal(75)).toBe(80);
  });

  it("provides free delivery from $100", () => {
    expect(getDeliveryFee(100)).toBe(0);
    expect(getDeliveryFee(125)).toBe(0);
  });

  it("does not charge an empty cart", () => {
    expect(getDeliveryFee(0)).toBe(0);
  });
});
