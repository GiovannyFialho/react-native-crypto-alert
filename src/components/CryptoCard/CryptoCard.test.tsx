import { fireEvent, render } from "@testing-library/react-native";

import { CryptoCard } from "@/components/CryptoCard/CryptoCard";
import { useCryptoCard } from "@/components/CryptoCard/useCryptoCard";
import { AlertProvider } from "@/context/AlertProvider/AlertProvider";
import { cryptoCurrenciesMock } from "@mocks/data/cryptoCurrencies";

jest.mock("@utils/index", () => ({
  formatPrice: jest.fn().mockReturnValue("1,000.00"),
  formatChange: jest.fn().mockReturnValue("+10.00%"),
}));

jest.mock("@/components/CryptoCard/useCryptoCard", () => ({
  useCryptoCard: jest.fn().mockReturnValue({
    isPositive: true,
    hasAlert: true,
    alertsForCrypto: [
      {
        id: "1",
        cryptocurrency: "Bitcoin",
        symbol: "BTC",
        targetPrice: 10000,
        condition: "above",
        createdAt: new Date().toISOString(),
      },
    ],
    expanded: false,
    toggleExpanded: jest.fn(),
  }),
}));

describe("Component: CryptoCard", () => {
  it("should render the crypto name, symbol and price", async () => {
    const { getByText, getByLabelText } = await render(
      <AlertProvider>
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
      </AlertProvider>,
    );

    const name = getByText(cryptoCurrenciesMock[0].name);
    const symbol = getByText(cryptoCurrenciesMock[0].symbol);
    const price = getByLabelText("Price");

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

  it("should render change correctly", async () => {
    const { getByText } = await render(
      <AlertProvider>
        <CryptoCard crypto={{ ...cryptoCurrenciesMock[0], change24h: 10 }} />
      </AlertProvider>,
    );

    const change = getByText("+10.00%");

    expect(change).toBeTruthy();
  });

  it("should render alert badge when has alerts", async () => {
    const { getByLabelText } = await render(
      <AlertProvider>
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
      </AlertProvider>,
    );

    const alertBadge = getByLabelText("Toggle alerts for this cryptocurrency");

    expect(alertBadge).toBeTruthy();
  });

  it("should call toggleExpanded when alert badge is pressed", async () => {
    const toggleExpanded: jest.Mock = jest.fn();

    (useCryptoCard as jest.Mock).mockReturnValue({
      isPositive: true,
      hasAlert: true,
      alertsForCrypto: [
        {
          id: "1",
          cryptocurrency: "Bitcoin",
          symbol: "BTC",
          targetPrice: 100000,
          condition: "above",
          createdAt: new Date().toISOString(),
        },
      ],
      expanded: true,
      toggleExpanded,
    });

    const { getByLabelText } = await render(
      <AlertProvider>
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
      </AlertProvider>,
    );

    const alertBadge = getByLabelText("Toggle alerts for this cryptocurrency");
    fireEvent.press(alertBadge);

    expect(toggleExpanded).toHaveBeenCalledTimes(1);
  });

  it("should render alert list when expanded", async () => {
    (useCryptoCard as jest.Mock).mockReturnValue({
      isPositive: true,
      hasAlert: true,
      alertsForCrypto: [
        {
          id: "1",
          cryptocurrency: "Bitcoin",
          symbol: "BTC",
          targetPrice: 100000,
          condition: "above",
          createdAt: new Date().toISOString(),
        },
      ],
      expanded: true,
      toggleExpanded: jest.fn(),
    });

    const { getByLabelText } = await render(
      <AlertProvider>
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
      </AlertProvider>,
    );

    const alertList = getByLabelText("Alert list");

    expect(alertList).toBeTruthy();
  });
});
