import { useForm } from "react-hook-form"
import axios from "axios";
import setCookie from "../utils/saveCokies";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { useState, useEffect } from "react";

export default function Home(){
  const [input, setInput] = useState('')

  const router = useRouter();
  const { register, handleSubmit } = useForm();
  function push(){
    router.push('/inicio')
  }

  async function handleSigIn(data){
    axios.post('/api/auth', data).then(response => {
      console.log(response.data.token);
      setCookie(response.data.token)
    });
    setTimeout(push,2500)
  }

  return (
    <>
    <div>
    <h1>Hello</h1>
      <form onSubmit={handleSubmit(handleSigIn)}>
        <label htmlFor="email"> email</label>
        <input {...register('email')} id="email" type="email" name="email"/>
        <label htmlFor="password">password</label>
        <input {...register('password')} id="password" type="password" name="password"/>
        <input type="submit" value="login"/>
      </form>
    </div>
  </>
  )
};