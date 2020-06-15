import { ICategory } from '../../models/category/ICategory';

export interface ICategoryService {
    getCategories() : Promise<ICategory[]>;
}