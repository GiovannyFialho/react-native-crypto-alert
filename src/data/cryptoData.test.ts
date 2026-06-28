import {
  cryptocurrencies,
  fetchCryptocurrenciesFromApi,
} from "@/data/cryptoData";

describe("API: CryptoData", () => {
  it("should fetch cryptocurrencies from the API", async () => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => cryptocurrencies,
    } as Response);

    const data = await fetchCryptocurrenciesFromApi();

    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(cryptocurrencies.length);
  });
});
