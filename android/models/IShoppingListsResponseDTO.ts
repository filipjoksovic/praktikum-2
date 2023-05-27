export interface IShoppingListsResponse {
  shoppingLists: IShoppingListResponse[];
  allChecked: boolean;
}

export interface IShoppingListResponse {
  shoppingList: IShoppingList;
  allChecked: boolean;
}
export interface IShoppingList {
  id: string;
  name: string;
  userId: string;
  itemList: IListItem[];
}

export interface IListItem {
  id: string;
  name: string;
  checked: boolean;
}
