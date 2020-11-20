import React, { FC } from "react";
import { Card, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./CardItem.module.scss";

const FallbackImg =
  "https://www.enmp.edu.do/wp-content/plugins/pixelthrone__vc_extension/assets/img/shortcode-frontend/empty-image-thumb.png";

export const CardItem: FC<{
  brand: string;
  id: string;
  img: string;
  name: string;
  price: string;
  sold: boolean;
  isLiked: boolean;
  onLike: (id: string) => void;
}> = ({ id, name, img, brand, price, sold, isLiked, onLike }) => {
  return (
    <Card
      size="small"
      style={{ width: 220, margin: "10px" }}
      cover={
        <>
          <img
            alt="productImg"
            src={FallbackImg}
            // src={img}
            // If believe, there should be src={img} but it doesn't seems right, since these are the images of people, not the products
          />
          <div
            className={classNames(styles.cardSoldOverlay, {
              [styles.sold]: sold,
            })}
          >
            sold
          </div>
        </>
      }
    >
      <Button
        onClick={() => onLike(id)}
        className={classNames(styles.cardLikeBtn, {
          [styles.liked]: isLiked,
        })}
        size="small"
        icon={<LikeOutlined />}
        data-testid="like-btn"
      />
      <p>{name}</p>
      <p>{brand}</p>
      <p className={styles.cardPrice}>{price}</p>
    </Card>
  );
};
