import {Store} from 'pullstate';
import {
  IListItem,
  IShoppingListResponse,
  IShoppingListsResponse,
} from '../../../models/IShoppingListsResponseDTO';

export interface IShoppingListStore {
  shoppingLists: IShoppingListsResponse;
  activeShoppingList: IShoppingListResponse | null;
  selectedListItem:
    | {
        item: IListItem;
        listId: string;
      }
    | undefined;
  selectedList: IShoppingListResponse | undefined;
}

export const ShoppingListStore = new Store<IShoppingListStore>({
  shoppingLists: {shoppingLists: [], allChecked: false},
  activeShoppingList: null,
  selectedListItem: {
    item: undefined,
    listId: '',
  },
  selectedList: undefined,
});
