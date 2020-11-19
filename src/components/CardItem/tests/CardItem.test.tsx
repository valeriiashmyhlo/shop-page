import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CardItem } from "../CardItem";

describe(`<Item /> tests`, () => {
  const item = {
    brand: "brandName",
    id: "1",
    img: "imgUrl",
    name: "name",
    price: "33.33",
    sold: false,
    isLiked: false
  };
  const soldItem = {
    brand: "brandName",
    id: "1",
    img: "imgUrl",
    name: "name",
    price: "33.33",
    sold: true,
    isLiked: true
  };
  it("should render CardItem with correct props", () => {
    const { container } = render(<CardItem onLike={() => {}} {...item} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should mark sold items as sold", () => {
    const { container } = render(<CardItem onLike={() => {}} {...soldItem } />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should call onLike", () => {
    const onLike = jest.fn();
    const { getByTestId } = render(<CardItem onLike={onLike} {...item} />);
    fireEvent.click(getByTestId("likeBtn"));
    expect(onLike).toHaveBeenCalledTimes(1);
  });
});
