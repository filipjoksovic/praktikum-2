export enum ToastMessageType {
  PRIMARY = 'PRIMARY',
  SUCCESS = 'SUCCESS',
  DANGER = 'DANGER',
  WARNING = 'WARNING',
}

export interface ToastMessage {
  messageType: ToastMessageType;
  title?: string;
  content?: string;
}
