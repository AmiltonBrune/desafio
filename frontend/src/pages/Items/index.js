import React, { useEffect } from 'react';

import SimpleTable from 'components/SimpleTable';
import CreateItem from './CreateItem';
import EditItem from './EditItems';
import DeleteItem from './DeleteItems';

import { Container } from './styles';
import { useItems } from 'hooks';
import { cellsHeaders, rowsKeys } from './constants';

function Items() {
  const { items, allItems } = useItems();

  useEffect(() => {
    allItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <SimpleTable
        title='Items'
        rows={items}
        rowsKeys={rowsKeys}
        cellsHeaders={cellsHeaders}
      />
      <CreateItem />
      <EditItem />
      <DeleteItem />
    </Container>
  );
}

export default Items;
