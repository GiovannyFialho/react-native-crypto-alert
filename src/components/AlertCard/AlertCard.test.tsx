import { render } from "@testing-library/react-native";

import { AlertCard } from "@/components/AlertCard/AlertCard";
import { cryptoAlertsMock } from "@mocks/storage/cryptoAlerts";

describe("Component: AlertCard", () => {
  it("should render the alert card", () => {
    render(<AlertCard alert={cryptoAlertsMock[0]} onDelete={jest.fn()} />);
  });
});
