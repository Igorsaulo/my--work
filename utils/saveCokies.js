import Cookies from "js-cookie";

export default function setCookie(value){
    Cookies.set('NextCoockie',value,{expires:7})
}