import { IProductSearch } from '../../models/productSearch/IProductSearch';

export interface IProductSearchService {
    getProductsFromSearch(websiteUrl:String, platformId: String) : Promise<any>;
}