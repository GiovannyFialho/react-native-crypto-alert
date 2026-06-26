import { fireEvent, render } from "@testing-library/react-native";

import { SelectField } from "@/components/SelectField/SelectField";
import type { SelectOption } from "@/components/SelectField/useSelectField";

describe("Component: SelectField", () => {
  it("should return the current value selected", async () => {
    const options = [
      { value: "1", title: "Bitcoin-BTC" },
      { value: "2", title: "Ethereum-ETH" },
      { value: "3", title: "Litecoin-LTC" },
    ];

    const { getByText } = await render(
      <SelectField
        label="Select Field"
        options={options}
        value="1"
        onChange={() => {}}
      />,
    );

    expect(getByText(/bitcoin/i)).toBeTruthy();
  });

  it("should open the modal when the user presses the button", async () => {
    const options = [
      { value: "1", title: "Bitcoin-BTC" },
      { value: "2", title: "Ethereum-ETH" },
      { value: "3", title: "Litecoin-LTC" },
    ];

    const { getByRole, findByTestId } = await render(
      <SelectField
        label="Select Field"
        options={options}
        value=""
        onChange={(value) => console.log("onChange", value)}
      />,
    );

    const button = getByRole("button");
    fireEvent.press(button);

    expect(await findByTestId("select-field-modal")).toBeTruthy();
  });

  it("should call the onChange function when the user selects an option", async () => {
    const options = [
      { value: "1", title: "Bitcoin-BTC" },
      { value: "2", title: "Ethereum-ETH" },
      { value: "3", title: "Litecoin-LTC" },
    ];

    const onChange = jest.fn();

    const { getByRole, findByText } = await render(
      <SelectField
        label="Select Field"
        options={options}
        value=""
        onChange={onChange}
      />,
    );

    fireEvent.press(getByRole("button"));

    const selectedOption = await findByText(/Ethereum/i);

    fireEvent.press(selectedOption);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should call the onChange function with the correct value when the user selects an option", async () => {
    const options = [
      { value: "1", title: "Bitcoin-BTC" },
      { value: "2", title: "Ethereum-ETH" },
      { value: "3", title: "Litecoin-LTC" },
    ];

    const onChange = jest.fn();

    const { getByRole, findByText } = await render(
      <SelectField
        label="Select Field"
        options={options}
        value=""
        onChange={onChange}
      />,
    );

    fireEvent.press(getByRole("button"));

    const selectedOption = await findByText(/bitcoin/i);
    fireEvent.press(selectedOption);

    expect(onChange).toHaveBeenCalledWith("1");
  });

  it("should show empty state when the options are empty", async () => {
    const options = [] as SelectOption[];

    const { getByRole, findByText } = await render(
      <SelectField
        label="Select Field"
        options={options}
        value=""
        onChange={() => {}}
      />,
    );

    fireEvent.press(getByRole("button"));

    const emptyStateElement = await findByText(/No options found/i);

    expect(emptyStateElement).toBeTruthy();
  });

  it("should flatlist data be empty when the options are empty", async () => {
    const options = [] as SelectOption[];

    const { getByRole, findByTestId } = await render(
      <SelectField
        label="Select Field"
        options={options}
        value=""
        onChange={() => {}}
      />,
    );

    fireEvent.press(getByRole("button"));

    const list = await findByTestId("select-field-list");

    expect(list?.props.data).toHaveLength(0);
  });
});
