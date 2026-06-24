import { fireEvent, render, screen } from "@testing-library/react-native";

import { SelectField } from "@/components/SelectField/SelectField";

describe("Component: SelectField", () => {
  it("should return the current value selected", () => {
    const options = [
      { value: "1", title: "Bitcoin-BTC" },
      { value: "2", title: "Ethereum-ETH" },
      { value: "3", title: "Litecoin-LTC" },
    ];

    render(
      <SelectField
        label="Select Field"
        options={options}
        value="1"
        onChange={() => {}}
      />,
    );

    const selectedOption = screen.getByText(/bitcoin/i);
    expect(selectedOption).toBeTruthy();
  });

  it("should open the modal when the user presses the button", () => {
    const options = [
      { value: "1", title: "Bitcoin-BTC" },
      { value: "2", title: "Ethereum-ETH" },
      { value: "3", title: "Litecoin-LTC" },
    ];

    render(
      <SelectField
        label="Select Field"
        options={options}
        value=""
        onChange={(value) => console.log("onChange", value)}
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.press(button);

    const modal = screen.queryByTestId("select-field-modal");
    expect(modal).toBeTruthy();
  });
});
