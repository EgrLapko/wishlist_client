import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_ITEMS } from "queries/itemQueries";
import CreateItemFormModal from "components/CreateItemFormModal";
import ItemsList from "./ItemsList";

export type ItemType = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  url: string;
  wisher: string;
  cameTrue: boolean;
};

const Items = () => {
  const [isActiveWishes, setIsActiveWishes] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { data, loading, error } = useQuery(GET_ITEMS);

  const activeWishes = data?.items?.filter((item: ItemType) => !item.cameTrue);
  const doneWishes = data?.items?.filter((item: ItemType) => item.cameTrue);

  const hasActiveWishes = activeWishes?.length !== 0;
  const hasDoneWishes = doneWishes?.length !== 0;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSetActiveWishes = () => {
    setIsActiveWishes(true);
  };

  const handleSetDoneWishes = () => {
    setIsActiveWishes(false);
  };

  useEffect(() => {
    if (!isActiveWishes && !hasDoneWishes) {
      setIsActiveWishes(true);
    }
  }, [hasDoneWishes, isActiveWishes]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="items">
      <button className="button button-full" onClick={handleOpenModal}>
        Додати бажання
      </button>

      <div className="items-wrapper">
        {(hasActiveWishes || hasDoneWishes) && (
          <div>
            {hasActiveWishes && (
              <button
                className={`button ${isActiveWishes && " button-active"}`}
                onClick={handleSetActiveWishes}
              >
                Активні бажання
              </button>
            )}
            {hasDoneWishes && (
              <button
                className={`button ${!isActiveWishes && " button-active"}`}
                onClick={handleSetDoneWishes}
              >
                Виконані бажання
              </button>
            )}
          </div>
        )}

        {(hasActiveWishes || hasDoneWishes) && (
          <ItemsList
            items={isActiveWishes ? activeWishes : doneWishes}
            onEdit={setEditingItem}
            onModalOpen={handleOpenModal}
          />
        )}
      </div>

      <CreateItemFormModal
        isOpen={isModalOpen}
        item={editingItem}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Items;
