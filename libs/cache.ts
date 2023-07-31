const cache = {
    set(name:string,value:any){
        return uni.setStorageSync(name,value)
    },
    get(name:string){
        return uni.getStorageSync(name);
    },
    remove(name:string){
        return uni.removeStorageSync(name)
    }
}
export default cache
