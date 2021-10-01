import { PermissionsAndroid } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

class TextFileStorage {

    static readonly dir = RNFetchBlob.fs.dirs.CacheDir

    static async requestWritePermission() {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        return granted
    }

    static async requestReadPermission() {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        return granted
    }

    static getPath(key: string) {
        const path = `${this.dir}/textData/${key}`
        return path
    }

    static async setItem(key: string, str: string) {
        
        try {
            const path = this.getPath(key)
            await RNFetchBlob.fs.writeFile(path, str, 'utf8')
        } catch (error) {
            console.log('Error while saving item', error)
            throw error
        }
    }
    
    static async getItem(key: string) {
        
        try {
            const path = this.getPath(key)
            if (!await RNFetchBlob.fs.exists(path))
                return null
            const str = await RNFetchBlob.fs.readFile(path, 'utf8') as string
            return str
        } catch (error) {
            return null
        }
    }
    
    static async removeItem(key: string) {
        
        try {
            const path = this.getPath(key)
            await RNFetchBlob.fs.unlink(path)
        } catch (error) {
            console.log(`Error while removing item ${key}`, error)
            throw error
        }
    }
}

export default TextFileStorage
