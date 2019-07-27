import { ReactType } from 'react';

export interface ISharedComponentProps {
  style?: object;
  api?: {
    View?: ReactType;
    Text?: ReactType;
  };
}
