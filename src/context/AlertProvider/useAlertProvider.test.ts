import { act, renderHook } from "@testing-library/react-native";

import { useAlertProviderState } from "@/context/AlertProvider/useAlertProvider";

describe("Context: AlertProvider", () => {
  it("should add an alert", async () => {
    const { result } = await renderHook(() => useAlertProviderState());

    expect(result.current.alerts).toHaveLength(0);

    await act(async () => {
      result.current.addAlert({
        cryptocurrency: "Bitcoin",
        symbol: "BTC",
        targetPrice: 100000,
        condition: "above",
      });
    });

    expect(result.current.alerts).toHaveLength(1);
  });

  it("should delete and alert", async () => {
    const { result } = await renderHook(() => useAlertProviderState());

    expect(result.current.alerts).toHaveLength(0);

    await act(async () => {
      result.current.addAlert({
        cryptocurrency: "Bitcoin",
        symbol: "BTC",
        targetPrice: 100000,
        condition: "above",
      });
    });

    expect(result.current.alerts).toHaveLength(1);

    const alertToDelete = result.current.alerts[0];

    await act(async () => {
      result.current.deleteAlert(alertToDelete.id);
    });

    expect(result.current.alerts).toHaveLength(0);
  });
});
