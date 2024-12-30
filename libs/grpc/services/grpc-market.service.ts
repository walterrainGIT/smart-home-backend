import { Observable } from 'rxjs';
import {
  ICreateLot,
  ICreateProduct,
  IGetLots,
  IGetProducts,
  ILot, ILotMetadataPagination,
  IProduct,
  IProductMetadataPagination
} from "@smart-home/libs/types/market";

export interface GrpcMarketService {
  createProduct(params: ICreateProduct): Observable<IProduct>;
  createLot(params: ICreateLot): Observable<ILot>;
  getProducts(params: IGetProducts): Observable<IProductMetadataPagination>;
  getLots(params: IGetLots): Observable<ILotMetadataPagination>;
}
