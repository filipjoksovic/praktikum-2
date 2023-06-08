import {Store} from 'pullstate';
import {
  IListItem,
  IShoppingList,
} from '../../../models/IShoppingListsResponseDTO';

export interface IShoppingListStore {
  shoppingLists: IShoppingList[];
  activeShoppingList: IShoppingList | null;
  selectedListItem:
    | {
        item: IListItem;
        listId: string;
      }
    | undefined;
  selectedList: IShoppingList | undefined;
}

export const ShoppingListStore = new Store<IShoppingListStore>({
  shoppingLists: [],
  activeShoppingList: null,
  selectedListItem: {
    item: undefined,
    listId: '',
  },
  selectedList: undefined,
});
