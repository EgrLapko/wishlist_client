import React from "react";

import { ItemType } from "./Items";
import ItemCard from "../ItemCard";

interface ItemsListProps {
  items: ItemType[];
  onEdit: (item: ItemType) => void;
  onModalOpen: () => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  items,
  onEdit,
  onModalOpen,
}) => {
  return (
    <div className="items-container">
      {items.map((item: ItemType) => {
        const handleEditItem = () => {
          onEdit(item);
          onModalOpen();
        };

        return <ItemCard key={item.id} item={item} onEdit={handleEditItem} />;
      })}
    </div>
  );
};

export default ItemsList;
