import React, { useState } from "react";
import { Button, Layout } from "antd";
import classNames from "classnames";
import { LikeOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./App.module.scss";
import { CardItem } from "./components/CardItem";
import { map } from "./utils";
import { useLoadProducts } from "./hooks";
import { Product } from "./types";
import {getProducts} from "./api";

const { Content } = Layout;

const App: React.FC<{ getProducts: () => Promise<Product[]> }> = () => {
  const [products, isLoaded, error] = useLoadProducts(getProducts);
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
      if (prev.size === 0) setOpen(false);
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
            [styles.open]: isOpen,
          })}
        >
          <Button
            onClick={() => setOpen(!isOpen)}
            size="small"
            icon={<LikeOutlined />}
            data-testid="liked-list-btn"
          >
            {liked.size}
          </Button>
          <div className={styles.dropdownList}>
            {liked.size === 0
              ? "No liked products"
              : map(liked, (id) => (
                  <div key={id} className={styles.dropdownListItem}>
                    <span>{products[id].name}</span>
                    <CloseOutlined
                      onClick={() => discardLike(id)}
                      data-testid="discard-liked-btn"
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Content style={{ padding: "0 90px" }}>
        {isLoaded ? (
          error ? (
            <div>Sorry, there was an error loading your products</div>
          ) : (
            <>
              <Button onClick={() => setSoldShown(!isSoldShown)}>
                {isSoldShown ? "Hide" : "Show"} Sold Items
              </Button>
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
            </>
          )
        ) : (
          <div>Loading...</div>
        )}
      </Content>
    </Layout>
  );
};

export default App;
