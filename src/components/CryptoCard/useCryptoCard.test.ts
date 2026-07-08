import { useCryptoCard } from "@/components/CryptoCard/useCryptoCard";
import { useAlerts } from "@/context/AlertProvider/useAlertProvider";
import { cryptoCurrenciesMock } from "@mocks/data/cryptoCurrencies";
import { cryptoAlertsMock } from "@mocks/storage/cryptoAlerts";
import { act, renderHook, waitFor } from "@tests/utils/test-utils";

jest.mock("@context/AlertProvider/useAlertProvider", () => ({
  ...jest.requireActual("@context/AlertProvider/useAlertProvider"),
  useAlerts: jest.fn().mockReturnValue({
    alerts: [],
  }),
}));

describe("useCryptoCard", () => {
  it("should return the correct values", async () => {
    const { result } = await renderHook(() =>
      useCryptoCard(cryptoCurrenciesMock[0]),
    );

    await waitFor(() => {
      expect(result.current.alertsForCrypto).toHaveLength(0);
      expect(result.current.expanded).toBe(false);
      expect(result.current.toggleExpanded).toBeDefined();
      expect(result.current.isPositive).toBe(true);
      expect(result.current.hasAlert).toBe(false);
    });
  });

  it("should return the correct values when there are alerts", async () => {
    (useAlerts as jest.Mock).mockReturnValue({
      alerts: cryptoAlertsMock,
    });
    const { result } = await renderHook(() =>
      useCryptoCard(cryptoCurrenciesMock[0]),
    );

    await waitFor(() => {
      expect(result.current.alertsForCrypto).toHaveLength(1);
      expect(result.current.expanded).toBe(false);
      expect(result.current.toggleExpanded).toBeDefined();
      expect(result.current.isPositive).toBe(true);
      expect(result.current.hasAlert).toBe(true);
    });
  });
  it("should call toggleExpanded when there are alerts", async () => {
    (useAlerts as jest.Mock).mockReturnValue({
      alerts: cryptoAlertsMock,
    });

    const { result } = await renderHook(() =>
      useCryptoCard(cryptoCurrenciesMock[0]),
    );

    await waitFor(() => {
      expect(result.current.expanded).toBe(false);
    });

    await act(async () => {
      result.current.toggleExpanded();
    });

    expect(result.current.expanded).toBe(true);
  });

  it("should not change expanded state when there are no alerts", async () => {
    (useAlerts as jest.Mock).mockReturnValue({
      alerts: [],
    });

    const { result } = await renderHook(() =>
      useCryptoCard(cryptoCurrenciesMock[0]),
    );

    await waitFor(() => {
      expect(result.current.expanded).toBe(false);
    });

    await act(async () => {
      result.current.toggleExpanded();
    });

    expect(result.current.expanded).toBe(false);
  });
});
