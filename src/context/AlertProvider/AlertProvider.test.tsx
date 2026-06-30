import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";

import { AlertProvider } from "@/context/AlertProvider/AlertProvider";
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
  });
});
