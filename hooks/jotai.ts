import { atom, useAtom } from 'jotai';

export const openSidebarModalAtom = atom(false);

export const openTransactionModalAtom = atom(false);

export const modalAtom = atom<{ view: 'sidebar' | 'transaction' } | null>(null);
