import React from "react";
import { useMutation } from "@apollo/client";
import { GrTrash } from "react-icons/gr";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

import { DELETE_ITEM, UPDATE_ITEM } from "mutations/ItemMutations";
import { GET_ITEM, GET_ITEMS } from "queries/itemQueries";
import { ItemType } from "../Items/Items";

interface ItemCardProps {
  item: ItemType;
  onEdit: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit }) => {
  const { title, description, price, image, url, wisher, cameTrue } = item;

  const [deleteItem] = useMutation(DELETE_ITEM, {
    variables: { id: item.id },
    update(cache, { data: { deleteItem } }) {
      const { items }: any = cache.readQuery({
        query: GET_ITEMS,
      });
      cache.writeQuery({
        query: GET_ITEMS,
        data: {
          items: items.filter((el: ItemType) => el.id !== deleteItem.id),
        },
      });
    },
  });

  const [markAsDone] = useMutation(UPDATE_ITEM, {
    variables: {
      id: item?.id,
      cameTrue: !cameTrue,
    },
    refetchQueries: [{ query: GET_ITEM, variables: { id: item?.id } }],
  });

  const handleDeleteItem = () => {
    deleteItem();
  };

  const handleMarkAsDone = () => {
    markAsDone();
  };

  return (
    <div className="item-card">
      <div className="image-wrapper">
        <img src={image} alt={title} />
        <button
          className="button button-primary edit-button button-rounded"
          onClick={onEdit}
        >
          <AiOutlineEdit />
        </button>
        <button
          className="button button-danger button-rounded delete-button"
          onClick={handleDeleteItem}
        >
          <GrTrash size={16} />
        </button>
        <button
          className={`button button-rounded ${
            cameTrue ? "button-danger" : "button-success"
          } done-button`}
          onClick={handleMarkAsDone}
        >
          {cameTrue ? (
            <MdOutlineCancel size={32} />
          ) : (
            <AiOutlineCheck size={16} />
          )}
        </button>
      </div>
      <div className="item-card-main-content">
        <div>
          <h4 className="item-card-title-text">{title}</h4>
          {description && (
            <p className="item-card-description-text">{description}</p>
          )}
        </div>
        <div className="item-card-content-container">
          <div>
            <span>{price} </span>грн
          </div>
          <div>
            Для: <span>{wisher}</span>
          </div>
        </div>
        <div className="button-link">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit" }}
          >
            <button className="button button-primary" style={{ width: "100%" }}>
              Відкрити
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
