import React, { createContext, useContext, useState } from 'react';
import { getAllItems, createItem, deleteItem, updateItem } from '../server';
import Actions from 'components/Actions';

const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItemObject, setSelectedItemObject] = useState({});
  const allItems = async () => {
    try {
      const token = localStorage.getItem('@sistema-item:token');
      const result = await getAllItems({ token });

      const normalizedItems = result.data.data.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        actions: <Actions item={item} key={item.id} />,
      }));

      setItems(normalizedItems);
    } catch (error) {
      setItems([]);
    }
  };

  const create = async (item) => {
    try {
      const token = localStorage.getItem('@sistema-item:token');
      await createItem({ token, item });
      await allItems();
    } catch (error) {
      alert('Erro ao criar um novo item');
    }
  };

  const removeItem = async () => {
    try {
      if (!selectedItem && selectedItem.length <= 0) {
        alert('Nenhum item selecioando');
      }
      const token = localStorage.getItem('@sistema-item:token');
      await deleteItem({ token, id: selectedItem });
      await allItems();
    } catch (error) {
      alert('Erro ao deletar um item');
    }
  };

  const update = async () => {
    try {
      if (!selectedItemObject && Object.keys().length <= 0) {
        alert('Nenhum item selecioando');
      }
      const token = localStorage.getItem('@sistema-item:token');
      await updateItem({ token, item: selectedItemObject });
      await allItems();
    } catch (error) {
      alert('Erro ao atualizar um item');
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        allItems,
        items,
        create,
        removeItem,
        setSelectedItem,
        selectedItem,
        selectedItemObject,
        setSelectedItemObject,
        update,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

const useItems = () => {
  const context = useContext(ItemsContext);
  return context;
};

export { ItemsProvider, useItems };
