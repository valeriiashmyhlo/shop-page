import "@testing-library/jest-dom/extend-expect";
import { parseProducts } from "../utils";

describe("utils", () => {
  describe("parseProducts", () => {
    it("parses products", () => {
      const items = [
        {
          id: "1",
          date: "2020-11-11T03:23:31.984Z",
          name: "Rowena Jerde",
          img:
            "https://s3.amazonaws.com/uifaces/faces/twitter/a_harris88/128.jpg",
          sold: true,
          price: "51.00",
          brand: "Fantastic Concrete Computer",
          description:
            "You can't copy the capacitor without generating the digital SAS hard drive!",
          seller: "Frederic",
        },
      ];
      expect(parseProducts(items)).toEqual({ "1": items[0] });
    });
  });
});
