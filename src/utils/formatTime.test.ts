import { formatPrice } from "@/utils";

describe("formatPrice", () => {
  it("should format a price to 2 decimal places", () => {
    const formattedPrice = formatPrice(1000);
    expect(formattedPrice).toBe("1,000.00");
  });

  it("should round correctly", () => {
    const formattedPrice = formatPrice(1000.121);
    expect(formattedPrice).toBe("1,000.12");
  });

  it("should handle 0 correctly", () => {
    const formattedPrice = formatPrice(0);
    expect(formattedPrice).toBe("0.00");
  });

  it("should handle negative prices correctly", () => {
    const formattedPrice = formatPrice(-1000);
    expect(formattedPrice).toBe("-1,000.00");
  });
});
