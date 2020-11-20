import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { MockData } from "./mockData";

const getProducts = async () => MockData;

describe(App, () => {
  it("should render App component", async () => {
    const { container, getByText } = render(<App getProducts={getProducts} />);

    expect(container.firstChild).toMatchSnapshot();
    await waitFor(() => getByText("Hide Sold Items"));
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should like products onLike", async () => {
    const { container, getAllByTestId } = render(
      <App getProducts={getProducts} />
    );
    const resolvedBtns = await waitFor(() => getAllByTestId("like-btn"));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(resolvedBtns[0]);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should hide/show sold products", async () => {
    const { container, getByText } = render(<App getProducts={getProducts} />);
    const button = await waitFor(() => getByText("Hide Sold Items"));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(button);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText("Show Sold Items"));
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should show/hide the list of liked products", async () => {
    const { container, getAllByTestId, getByTestId } = render(
      <App getProducts={getProducts} />
    );
    const resolvedBtns = await waitFor(() => getAllByTestId("like-btn"));
    const likedListBtn = getByTestId("liked-list-btn");
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(resolvedBtns[0]);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(likedListBtn);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(likedListBtn);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should remove liked product from dropdown list", async () => {
    const { container, getAllByTestId, getByTestId } = render(
      <App getProducts={getProducts} />
    );
    const likedBtns = await waitFor(() => getAllByTestId("like-btn"));
    fireEvent.click(likedBtns[0]);
    fireEvent.click(getByTestId("liked-list-btn"));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByTestId("discard-liked-btn"));
    expect(container.firstChild).toMatchSnapshot();
  });
});
