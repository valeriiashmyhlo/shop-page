import React, { useEffect, useState, ReactNode } from "react";
import { Button, Layout } from "antd";
import { CardItem } from "./components/CardItem";
import classNames from "classnames";
import { Product, Optional } from "./types";
import styles from "./App.module.scss";
import { LikeOutlined, CloseOutlined } from "@ant-design/icons";
import { DATA } from "./data";

const URL = "https://5c78274f6810ec00148d0ff1.mockapi.io/api/v1/products";
const { Content } = Layout;
const parseProducts = (products: Product[]): { [key: string]: Product } => {
  const parsedProducts: { [key: string]: Product } = {};

  for (const product of products) {
    parsedProducts[product.id] = product;
  }

  return parsedProducts;
};

function map<T, U>(seq: Iterable<T>, f: (x: T) => U): U[] {
  const result: U[] = [];

  for (const x of seq) {
    result.push(f(x));
  }

  return result;
}

const useLoadProducts = (
  url: string
): [{ [id: string]: Product }, boolean, Optional<Error>] => {
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Optional<Error>>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoaded(false);

      try {
        const products = (await fetch(url)).json();
        // setProducts(parseProducts(DATA));
        setProducts(parseProducts(await products));
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    fetchProducts();
  }, [url]);

  return [products, isLoaded, error];
};

function App() {
  const [products, isLoaded, error] = useLoadProducts(URL);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [isOpen, setOpen] = useState(false);
  const [isSoldShown, setSoldShown] = useState(true);

  const onLike = (id: string): void => {
    setLiked((prev) => {
      prev = new Set(prev);

      if (prev.has(id)) {
        prev.delete(id);
      } else {
        prev.add(id);
      }

      return prev;
    });
  };

  const discardLike = (id: string): void => {
    setLiked((prev) => {
      prev = new Set(prev);
      prev.delete(id);
      return prev;
    });
  };

  let visibleProducts = Object.values(products);
  if (!isSoldShown) {
    visibleProducts = visibleProducts.filter(({ sold }) => !sold);
  }

  return (
    <Layout className={styles.layout}>
      <div className={styles.nav}>
        <div
          className={classNames(styles.dropdown, {
            [styles.open]: isOpen && liked.size > 0,
          })}
        >
          <Button
            onClick={() => setOpen(!isOpen)}
            size="small"
            icon={<LikeOutlined />}
          >
            {liked.size}
          </Button>
          <div className={styles.dropdownList}>
            {map(
              liked,
              (id: string): ReactNode => (
                <div key={id} className={styles.dropdownListItem}>
                  <span>{products[id].name}</span>
                  <CloseOutlined onClick={() => discardLike(id)} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Content style={{ padding: "0 90px" }}>
        <Button onClick={() => setSoldShown(!isSoldShown)}>
          {isSoldShown ? "Hide" : "Show"} Sold Items
        </Button>
        {isLoaded ? (
          error ? (
            <div>Sorry, there was an error loading your products</div>
          ) : (
            <div className={styles.cards}>
              {visibleProducts.map((product) => (
                <CardItem
                  key={product.id}
                  onLike={onLike}
                  isLiked={liked.has(product.id)}
                  {...product}
                />
              ))}
            </div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </Content>
    </Layout>
  );
}

export default App;
