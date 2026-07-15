import type { AxiosResponse } from "axios";

import { cryptocurrencies } from "@/data/cryptoData";
import api from "@/services/api";
import { fetchCryptocurrenciesFromApi } from "@/services/fetchCryptocurrenciesFromApi";

jest.mock("@/services/api", () => ({
  get: jest.fn(),
}));

describe("API: CryptoData", () => {
  it("should fetch cryptocurrencies from the API", async () => {
    jest.spyOn(api, "get").mockResolvedValue({
      data: cryptocurrencies,
    } as AxiosResponse);

    const data = await fetchCryptocurrenciesFromApi();

    expect(data).toEqual(cryptocurrencies);
  });
});
