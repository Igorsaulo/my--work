import axios from "axios"
import { useForm } from "react-hook-form"
import setCookie from "../../utils/saveCokies"
import { useRouter } from "next/router";

export default function Resgister(){
    const router = useRouter();

    const {register, handleSubmit} = useForm()
    const onSubmit = (data,e)=>{
        if (data.password === data.confirmpassword){
            console.log('ok')
            axios.post('api/user',data).then(response=>{
                if(response.data){
                    axios.post('api/enter').then(responsetwo=>{
                        console.log(responsetwo.data.token)
                        setCookie(responsetwo.data.token)
                    })
                }
            })
            router.push('/')

        }
        else{
            console.log('errou')
        }
    }
    return (
        <>
            <h1> Registrar</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                <input {...register('username')} id='username' type='text'/>
                <label htmlFor="email">Email</label>
                <input {...register('email')} type='email' id="email"/>
                <label htmlFor="password">Senha</label>
                <input {...register('password')} type='password' id='password'/>
                <label htmlFor="confirmpassword">Confirmar senha</label>
                <input {...register('confirmpassword')} type='password' id='confirmpassword'/>
                <button type="submit">Registrar</button>
            </form>
        </>
    )
}