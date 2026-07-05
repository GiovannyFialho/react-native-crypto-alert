import { renderHook } from "@testing-library/react-native";

import { useAlertProviderState } from "@/context/AlertProvider/useAlertProvider";

describe("Context: AlertProvider", () => {
  it("should add an alert", async () => {
    const { result } = await renderHook(() => useAlertProviderState());

    console.log(result);
  });
});
