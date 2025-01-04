import { Observable } from 'rxjs';
import {
  ICreateLot, ICreateOrder,
  ICreateProduct, IDeleteLot, IDeleteProduct,
  IGetLots,
  IGetProducts,
  ILot, ILotMetadataPagination, IOrder, IOrderMetadataPagination,
  IProduct,
  IProductMetadataPagination, IUpdateLot, IUpdateOrder, IUpdateProduct
} from "@smart-home/libs/types/market";
import {IGetOrders} from "@smart-home/libs/types/market/interfaces/get-orders.interface";

export interface GrpcMarketService {
  createProduct(params: ICreateProduct): Observable<IProduct>;  // Создать продукт
  createLot(params: ICreateLot): Observable<ILot>;               // Создать лот
  getProducts(params: IGetProducts): Observable<IProductMetadataPagination>;  // Получить список продуктов
  getLots(params: IGetLots): Observable<ILotMetadataPagination>;  // Получить список лотов
  deleteLot(params: IDeleteLot): Observable<ILot>;               // Удалить лот
  updateLot(params: IUpdateLot): Observable<ILot>;               // Обновить лот
  deleteProduct(params: IDeleteProduct): Observable<IProduct>;   // Удалить продукт
  updateProduct(params: IUpdateProduct): Observable<IProduct>;   // Обновить продукт

  // Методы для работы с заказами
  getOrders(params: IGetOrders): Observable<IOrderMetadataPagination>;  // Получить список заказов
  createOrder(params: ICreateOrder): Observable<IOrder>;                 // Создать заказ
  updateOrder(params: IUpdateOrder): Observable<IOrder>;                 // Обновить заказ
}


