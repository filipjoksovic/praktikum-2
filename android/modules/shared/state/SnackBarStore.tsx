import {Store} from 'pullstate';

export interface ISnackBarStore {
  isOpen: boolean;
  text: string;
}

export const SnackBarStore = new Store<ISnackBarStore>({
  isOpen: false,
  text: '',
});
