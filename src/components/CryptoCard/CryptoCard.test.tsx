import { render } from "@testing-library/react-native";

import { CryptoCard } from "@/components/CryptoCard/CryptoCard";
import { AlertProvider } from "@/context/AlertProvider/AlertProvider";
import { cryptoCurrenciesMock } from "@mocks/data/cryptoCurrencies";

describe("Component: CryptoCard", () => {
  it("should render the component", async () => {
    const { getByText } = await render(
      <AlertProvider>
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
      </AlertProvider>,
    );

    getByText(cryptoCurrenciesMock[0].name);

    expect(getByText(cryptoCurrenciesMock[0].name)).toBeTruthy();
  });
});
