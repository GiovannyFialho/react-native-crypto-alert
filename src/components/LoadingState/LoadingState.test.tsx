import { render } from "@testing-library/react-native";

import { LoadingState } from "@/components/LoadingState/LoadingState";

describe("Component: LoadingState", () => {
  it("should render the message", async () => {
    const message = "Loading...";
    const { getByText, debug } = await render(
      <LoadingState message={message} />,
    );

    debug();

    expect(getByText(message)).toBeTruthy();
  });
});
