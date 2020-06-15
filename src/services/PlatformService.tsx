import { IPlatformService } from './IPlatformService';
import axios from 'axios';
export default class PlatformService implements IPlatformService {
    getAll(): Promise<any> {
        return axios.get('http://localhost:3000/platform/getPlatforms');
    }
    async insertPlatform(name: String, url: String): Promise<any> {
        try {
            const response = await axios.post("http://localhost:3000/platform/insertPlatform", {
                name: name,
                url: url
            });
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async editPlatform(id: String, name: String, url: String): Promise<any>{
        try {
            const response = await axios.post("http://localhost:3000/platform/editPlatform", {
                platformId: id,
                name: name,
                url: url
            });
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async deletePlatform(id: String): Promise<any> {
        try {
            const response = await axios.post("http://localhost:3000/platform/deletePlatform", {
                platformId: id
            });
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    
}