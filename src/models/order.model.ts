import { ToyModel } from './toy.model';

export interface OrderModel {
  toy?: ToyModel;     
  count: number;        
  giftWrap?: boolean;  
}