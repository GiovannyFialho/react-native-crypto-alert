import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook } from "@testing-library/react-native";

import { AlertProvider } from "@/context/AlertProvider/AlertProvider";
import { useAlerts } from "@/context/AlertProvider/useAlertProvider";

describe("Context: useAlerts", () => {
  it("should add an alert", async () => {
    const { result } = await renderHook(() => useAlerts(), {
      wrapper: AlertProvider,
    });

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

    await AsyncStorage.clear();
  });
});
