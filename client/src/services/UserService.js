import Cookies from 'js-cookie'


export const getUserSession=()=>{
    const data=Cookies.get('userId')
    if(data){
        return data
    }
    return false
}