import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { AlertProvider } from "@/context/AlertProvider/AlertProvider";

describe("Context: AlertProvider", () => {
  it("should render the children", async () => {
    const { debug } = await render(
      <AlertProvider>
        <Text>Hello, world!</Text>
      </AlertProvider>,
    );

    debug();
  });
});
