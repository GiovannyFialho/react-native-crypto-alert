import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Pressable, Text } from "react-native";

import { AlertProvider } from "@/context/AlertProvider/AlertProvider";
import { useAlerts } from "@/context/AlertProvider/useAlertProvider";
import { cryptoAlertsMock } from "@mocks/storage/cryptoAlerts";

describe("Context: AlertProvider", () => {
  it("should render the children", async () => {
    jest.spyOn(AsyncStorage, "getItem").mockResolvedValue(null);

    const { getByText } = await render(
      <AlertProvider>
        <Text>Hello, world!</Text>
      </AlertProvider>,
    );

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalled();
    });

    expect(getByText("Hello, world!")).toBeTruthy();

    jest.clearAllMocks();
  });

  it("should call AsyncStorage.getItem when the component is mounted", async () => {
    const asyncStorageGetItem = jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValue(JSON.stringify(cryptoAlertsMock));

    render(
      <AlertProvider>
        <Text>Hello, world!</Text>
      </AlertProvider>,
    );

    await waitFor(async () => {
      expect(asyncStorageGetItem).toHaveBeenCalledWith("cryptoAlerts");
    });

    jest.clearAllMocks();
  });

  it("should call AsyncStorage.setItem when alerts are added", async () => {
    function TestComponent() {
      const { addAlert } = useAlerts();

      return (
        <Pressable
          onPress={() =>
            addAlert({
              cryptocurrency: "Bitcoin",
              symbol: "BTC",
              targetPrice: 100000,
              condition: "above",
            })
          }
        >
          <Text>Add Alert</Text>
        </Pressable>
      );
    }

    const asyncStorageSetItem = jest
      .spyOn(AsyncStorage, "setItem")
      .mockResolvedValue(Promise.resolve());

    const { getByText } = await render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>,
    );

    fireEvent.press(getByText("Add Alert"));

    await waitFor(async () => {
      expect(asyncStorageSetItem).toHaveBeenCalledTimes(1);
    });

    jest.clearAllMocks();
  });

  it("should call AsyncStorage.setItem when alerts are deleted", async () => {
    function TestComponent() {
      const { deleteAlert } = useAlerts();
      return (
        <Pressable onPress={() => deleteAlert("1")}>
          <Text>Delete Alert</Text>
        </Pressable>
      );
    }

    const asyncStorageSetItem = jest
      .spyOn(AsyncStorage, "setItem")
      .mockResolvedValue(Promise.resolve());

    const { getByText } = await render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>,
    );

    fireEvent.press(getByText("Delete Alert"));

    await waitFor(async () => {
      expect(asyncStorageSetItem).toHaveBeenCalledTimes(1);
    });

    jest.clearAllMocks();
  });
});
