import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook } from "@testing-library/react-native";

import { useAlertProviderState } from "@/context/AlertProvider/useAlertProvider";
import { cryptoAlertsMock } from "@mocks/storage/cryptoAlerts";

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

    await AsyncStorage.clear();
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

  it("should load alerts from AsyncStorage", async () => {
    const getItemSpy = jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValue(JSON.stringify(cryptoAlertsMock));

    const { result } = await renderHook(() => useAlertProviderState());

    expect(result.current.alerts).toHaveLength(2);

    getItemSpy.mockRestore();
  });

  it("should save alerts to AsyncStorage", async () => {
    const { result } = await renderHook(() => useAlertProviderState());

    expect(result.current.alerts).toHaveLength(0);

    act(() => {
      result.current.addAlert({
        cryptocurrency: "Bitcoin",
        symbol: "BTC",
        targetPrice: 100000,
        condition: "above",
      });
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "cryptoAlerts",
      JSON.stringify(result.current.alerts),
    );

    await AsyncStorage.clear();
  });
});
