import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { ConversionScreen } from "@/screens/ConversionScreen/ConversionScreen";

jest.mock("@data/cryptoData", () => {
  const {
    cryptoCurrenciesMock,
    fiatCurrenciesMock,
  } = require("@mocks/data/cryptoCurrencies");

  return {
    cryptocurrencies: cryptoCurrenciesMock,
    fiatCurrencies: fiatCurrenciesMock,
    fetchCryptocurrenciesFromApi: jest
      .fn()
      .mockResolvedValue(cryptoCurrenciesMock),
  };
});

jest.mock("@utils/index", () => ({
  formatPrice: jest.fn((value) => value.toFixed(2)),
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

describe("Screen: ConversionScreen", () => {
  it("should render correctly", async () => {
    const { getByText } = await render(<ConversionScreen />);

    expect(getByText("Convert Crypto")).toBeTruthy();
    expect(getByText("Enter an amount")).toBeTruthy();
  });

  it("should render the invalid amount message when the amount is invalid", async () => {
    const { getByPlaceholderText, getByText } = await render(
      <ConversionScreen />,
    );
    const amountInput = getByPlaceholderText("0.00");

    fireEvent.changeText(amountInput, "1,00");

    await waitFor(() => {
      expect(getByText("Invalid amount")).toBeTruthy();
    });
  });
});
