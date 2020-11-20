import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CardItem } from "../CardItem";

describe(`<CardItem /> tests`, () => {
  const props = {
    brand: "brandName",
    id: "1",
    img: "imgUrl",
    name: "name",
    price: "33.33",
    sold: false,
    isLiked: false
  };

  it("should render CardItem with correct props", () => {
    const { container } = render(<CardItem onLike={() => {}} {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should mark sold items as sold", () => {
    const { container } = render(<CardItem onLike={() => {}} {...props } sold isLiked />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should call onLike", () => {
    const onLike = jest.fn();
    const { getByTestId } = render(<CardItem onLike={onLike} {...props} />);
    fireEvent.click(getByTestId("like-btn"));
    expect(onLike).toHaveBeenCalledWith("1");
    expect(onLike).toHaveBeenCalledTimes(1);
  });
});
