export interface IShoppingListsResponseDTO {
  id: string;
  name: string;
  itemList: IShoppingListItem[];
}
export interface IShoppingListItem {
  id: string;
  name: string;
}
