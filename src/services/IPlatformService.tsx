import { IPlatform } from '../models/platform/IPlatform';

export interface IPlatformService {
    getAll(): Promise<IPlatform[]>;
    getPlatformsByCategory(category: String) : Promise<any>;
    insertPlatform(name: String, url: String): Promise<IPlatform>;
    editPlatform(id: String, name: String, url: String): Promise<IPlatform>;
    deletePlatform(id: String): Promise<IPlatform>;
}
