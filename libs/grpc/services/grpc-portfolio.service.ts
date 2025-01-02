import { Observable } from 'rxjs';
import {  IPortfolio,
  ICustomer, ICreatePortfolio, IUpdatePortfolio, IDeletePortfolio, IUpdateCustomer, ICreateCustomer,
  IDeleteCustomer, IGetCustomers, ICustomerMetadataPagination, IGetCustomerById, IGetPortfolios, IPortfolioMetadataPagination,
  IGetPortfolioById } from '@smart-home/libs/types/portfolio';

export interface GrpcPortfolioService {
  // Portfolio Methods
  getPortfolioById(params: IGetPortfolioById): Observable<IPortfolio>;
  getPortfolios(params: IGetPortfolios): Observable<IPortfolioMetadataPagination>;
  createPortfolio(params: ICreatePortfolio): Observable<IPortfolio>;
  updatePortfolio(params: IUpdatePortfolio): Observable<IPortfolio>;
  deletePortfolio(params: IDeletePortfolio): Observable<IPortfolio>;

  // Customer Methods
  getCustomerById(params: IGetCustomerById): Observable<ICustomer>;
  getCustomers(params: IGetCustomers): Observable<ICustomerMetadataPagination>;
  createCustomer(params: ICreateCustomer): Observable<ICustomer>;
  updateCustomer(params: IUpdateCustomer): Observable<ICustomer>;
  deleteCustomer(params: IDeleteCustomer): Observable<ICustomer>;
}
