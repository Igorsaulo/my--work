import { useForm } from "react-hook-form"
import axios from "axios";
import setCookie from "../utils/saveCokies";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'

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
    <main className={styles.main}>
    <div className={styles.homecontainer}>
      <div className={styles.texthomecontainer}>
        <div className={styles.hometext}>
          <h1>My Work</h1>
          <h2>All work is fair</h2>
        </div>
      </div>
      <div className={styles.logincontainer}>
        <form onSubmit={handleSubmit(handleSigIn)}>
          <label htmlFor="email"> email</label>
          <input {...register('email')} id="email" type="email" name="email"/>
          <label htmlFor="password">password</label>
          <input {...register('password')} id="password" type="password" name="password"/>
          <input id={styles.loginbtn} type="submit" value="login"/>
        </form>
      </div>
    </div>
    </main>
  </>
  )
};