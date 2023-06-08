import {Store} from 'pullstate';

export interface ILoaderStore {
  isLoading: boolean;
  text: string;
}

export const LoaderStore = new Store<ILoaderStore>({
  isLoading: false,
  text: '',
});
