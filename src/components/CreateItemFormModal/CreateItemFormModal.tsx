import React, { ChangeEvent, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import Modal from "react-bootstrap/Modal";
import { ADD_ITEM, UPDATE_ITEM } from "mutations/ItemMutations";
import { GET_ITEM, GET_ITEMS } from "queries/itemQueries";
import { ItemType } from "../Items/Items";

interface CreateItemFormModalProps {
  item: ItemType;
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  title: "",
  description: "",
  price: "",
  image: "",
  url: "",
  wisher: "",
};

const CreateItemFormModal: React.FC<CreateItemFormModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (item) {
      setFormState({
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image,
        url: item.url,
        wisher: item.wisher,
      });
    } else {
      setFormState(initialState);
    }
  }, [item]);

  const [addItem] = useMutation(ADD_ITEM, {
    variables: {
      title: formState.title,
      description: formState.description,
      price: formState.price,
      image: formState.image,
      url: formState.url,
      wisher: formState.wisher,
    },
    update: (cache, { data: { addItem } }) => {
      const { items }: any = cache.readQuery({ query: GET_ITEMS });

      cache.writeQuery({
        query: GET_ITEMS,
        data: { items: [...items, addItem] },
      });
    },
  });

  const [updateItem] = useMutation(UPDATE_ITEM, {
    variables: {
      id: item?.id,
      title: formState.title,
      description: formState.description,
      price: formState.price,
      image: formState.image,
      url: formState.url,
      wisher: formState.wisher,
    },
    refetchQueries: [{ query: GET_ITEM, variables: { id: item?.id } }],
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    setFormState(initialState);
    onClose();
  };

  const handleCreateItem = (e: any) => {
    e.preventDefault();

    if (item) {
      updateItem();
    } else {
      addItem();
    }

    handleCloseModal();
  };

  return (
    <Modal show={isOpen} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {item ? "???????????????????? ??????????????" : "???????????? ??????????????"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="items-form-wrapper">
          <form>
            <div className="items-form-container">
              <div>
                <div className="items-form-content">
                  <label className="form-label" htmlFor="title">
                    ?????????????? ?????????? ???? ????
                  </label>
                  <input
                    value={formState.title}
                    name="title"
                    onChange={handleFormChange}
                    type="text"
                    placeholder="?????????????? ?????????? ???? ????"
                  />
                </div>

                <div className="items-form-content">
                  <label className="form-label" htmlFor="description">
                    ???????????????? ????????
                  </label>
                  <input
                    value={formState.description}
                    name="description"
                    onChange={handleFormChange}
                    type="text"
                    placeholder="???????????????? ????????"
                  />
                </div>
              </div>
              <div>
                <div className="items-form-content">
                  <label className="form-label" htmlFor="image">
                    ?????????? ?????????? ???? ????????????????
                  </label>
                  <input
                    value={formState.image}
                    name="image"
                    onChange={handleFormChange}
                    type="text"
                    placeholder="?????????? ?????????? ???? ????????????????"
                  />
                </div>

                <div className="items-form-content">
                  <label className="form-label" htmlFor="url">
                    ?????????? ?????????? ???? ??????????
                  </label>
                  <input
                    value={formState.url}
                    name="url"
                    onChange={handleFormChange}
                    type="text"
                    placeholder="?????????? ?????????? ???? ??????????"
                  />
                </div>
              </div>
              <div>
                <div className="items-form-content">
                  <label className="form-label" htmlFor="price">
                    ?????????? ???????? (???????????? ??????????)
                  </label>
                  <input
                    value={formState.price}
                    name="price"
                    onChange={handleFormChange}
                    type="text"
                    placeholder="???????????? ???????? ????????"
                  />
                </div>
                <div className="items-form-content">
                  <label className="form-label" htmlFor="wisher">
                    ???????????? ???????? ????&apos;??
                  </label>
                  <input
                    value={formState.wisher}
                    name="wisher"
                    onChange={handleFormChange}
                    type="text"
                    placeholder="?????? ???????? ????, ???? ???????????"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="button" onClick={onClose}>
          ??????????????
        </button>
        <button className="button button-primary" onClick={handleCreateItem}>
          ????????????????
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateItemFormModal;
