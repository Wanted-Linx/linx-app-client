import { atom } from 'recoil';

export const tokenState = atom({
  key: 'tokenState',
  default: '',
});

export const nicknameState = atom({
  key: 'nicknameState',
  default: '',
});
