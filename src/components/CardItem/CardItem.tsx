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
            // If I understand the task correctly, there should be src={img}
            // but doesn't seems right with the data, since these are the list of people img, not the product
            // src={img}
          />
          <div
            className={classNames(styles.cardSoldOverlay, {
              [styles.isSold]: sold,
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
        data-testid="likeBtn"
      />
      <p>{name}</p>
      <p>{brand}</p>
      <p className={styles.cardPrice}>{price}</p>
    </Card>
  );
};