import { render } from "@testing-library/react-native";

import { CryptoCard } from "@/components/CryptoCard/CryptoCard";
import { AlertProvider } from "@/context/AlertProvider/AlertProvider";
import { formatPrice } from "@/utils";
import { cryptoCurrenciesMock } from "@mocks/data/cryptoCurrencies";

describe("Component: CryptoCard", () => {
  it("should render the crypto name, symbol and price", async () => {
    const { getByText } = await render(
      <AlertProvider>
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
      </AlertProvider>,
    );

    const name = getByText(cryptoCurrenciesMock[0].name);
    const symbol = getByText(cryptoCurrenciesMock[0].symbol);
    const price = getByText(`$${formatPrice(cryptoCurrenciesMock[0].price)}`);

    expect(name).toBeTruthy();
    expect(symbol).toBeTruthy();
    expect(price).toBeTruthy();
  });

  it("should render first letter of the crypto symbol as avatar if crypto has no image", async () => {
    const { getByText } = await render(
      <AlertProvider>
        <CryptoCard crypto={{ ...cryptoCurrenciesMock[0], image: undefined }} />
      </AlertProvider>,
    );

    const avatar = getByText(cryptoCurrenciesMock[0].symbol.charAt(0));

    expect(avatar).toBeTruthy();
  });
});
