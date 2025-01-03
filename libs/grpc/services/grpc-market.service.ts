import { Observable } from 'rxjs';
import {
  ICreateLot,
  ICreateProduct, IDeleteLot, IDeleteProduct,
  IGetLots,
  IGetProducts,
  ILot, ILotMetadataPagination,
  IProduct,
  IProductMetadataPagination, IUpdateLot, IUpdateProduct
} from "@smart-home/libs/types/market";

export interface GrpcMarketService {
  createProduct(params: ICreateProduct): Observable<IProduct>;  // Создать продукт
  createLot(params: ICreateLot): Observable<ILot>;               // Создать лот
  getProducts(params: IGetProducts): Observable<IProductMetadataPagination>;  // Получить список продуктов
  getLots(params: IGetLots): Observable<ILotMetadataPagination>;  // Получить список лотов
  deleteLot(params: IDeleteLot): Observable<ILot>;               // Удалить лот
  updateLot(params: IUpdateLot): Observable<ILot>;               // Обновить лот
  deleteProduct(params: IDeleteProduct): Observable<IProduct>; // Удалить продукты
  updateProduct(params: IUpdateProduct): Observable<IProduct>;    // Обновить продукт
}

