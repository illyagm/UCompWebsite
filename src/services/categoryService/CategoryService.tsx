import { ICategoryService } from './ICategoryService';
import axios from 'axios';

export default class CategoryService implements ICategoryService{

    getCategories(): Promise<any> {
        return axios.get('http://localhost:3000/category/getCategories');
    }
    
}