import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { Pressable, Text } from "react-native";

import { AlertProvider } from "@/context/AlertProvider/AlertProvider";
import { useAlerts } from "@/context/AlertProvider/useAlertProvider";
import { cryptoAlertsMock } from "@mocks/storage/cryptoAlerts";

describe("AlertProvider", () => {
  const renderWithProvider = async (ui: React.ReactElement) => {
    return render(<AlertProvider>{ui}</AlertProvider>);
  };

  let getItemSpy: jest.SpiedFunction<typeof AsyncStorage.getItem>;
  let setItemSpy: jest.SpiedFunction<typeof AsyncStorage.setItem>;

  beforeEach(() => {
    getItemSpy = jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValue(JSON.stringify(cryptoAlertsMock));
    setItemSpy = jest
      .spyOn(AsyncStorage, "setItem")
      .mockResolvedValue(Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the children", async () => {
    const { getByText } = await renderWithProvider(<Text>Teste</Text>);

    getByText("Teste");
    expect(getByText("Teste")).toBeTruthy();
  });

  it("should call AsyncStorage.getItem when the component is mounted", async () => {
    await act(async () => {
      renderWithProvider(<Text>Teste</Text>);
    });

    expect(getItemSpy).toHaveBeenCalledWith("cryptoAlerts");
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

    const { getByText } = await renderWithProvider(<TestComponent />);

    fireEvent.press(getByText("Add Alert"));

    await waitFor(async () => {
      expect(setItemSpy).toHaveBeenCalledTimes(1);
    });
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

    const { getByText } = await renderWithProvider(<TestComponent />);

    fireEvent.press(getByText("Delete Alert"));

    await waitFor(async () => {
      expect(setItemSpy).toHaveBeenCalledTimes(1);
    });
  });
});
