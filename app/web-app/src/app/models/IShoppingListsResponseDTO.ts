import { User } from './User';

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
  familyId: string;
}

export interface IListItem {
  id: string;
  name: string;
  checked: boolean;
  userId: string;
}

export interface ShoppingListDTOV2 {
  id: string;
  name: string;
  userId: string;
  familyId:string;
  user: User;
  items: ListItemDTOV2[];
}

export interface ListItemDTOV2 {
  id: string;
  name: string;
  checked: boolean;
  addedBy: BasicUserDataDTO;
  photoSrc?: string;
}

export interface BasicUserDataDTO {
  id: string;
  name: string;
  surname: string;
  email: string;
}
