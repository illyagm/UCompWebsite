import { IProductSearchService } from './IProductSearchService';
import axios from 'axios';

export default class ProductSearchService implements IProductSearchService{
    public async getProductsFromSearch(websiteUrl:String, platformId: String): Promise<any> {
        console.log('inside pr search service ' +platformId)
            return axios.post("http://localhost:3000/searchResults/getProducts", {
                websiteURL: websiteUrl,
                platformId: platformId
            })
    }
    
}
