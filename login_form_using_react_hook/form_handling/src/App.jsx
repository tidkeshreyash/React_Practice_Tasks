import { useForm } from "react-hook-form"
import './App.css'


function App() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (d) =>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }
  
  const onSubmit = async (data) => {
    // await delay(2)
    let r = await fetch("http://localhost:3000/")
    let res = await r.text()
    console.log(data)
    // if(data.username !== "shreyash"){
    //   setError("myform", {message:"Username is invalid"})
    // }
  }

  return (
    <>
    {isSubmitting && <div>Loading..</div>}
    <div className='container'>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("username", { required:{value: true, message:"This field is Required"}, minLength:{value:3, message:"Message Length must be 3"}, maxLength:{value:8, message:"Message Length should be less than 8"} })} placeholder='username'/>
        {errors.username && <div>{errors.username.message}</div>}
        <br />
        <input type="password" {...register("password",{ required:{value: true, message:"This field is Required"}, minLength:{value:7, message:"Password Length must be 7"} })} placeholder='password'/>
        {errors.password && <div>{errors.password.message}</div>}
        <br />
        <input disabled={isSubmitting} type="submit" value='submit' />
        {errors.myform && <div>{errors.myform.message}</div>}
      </form>
    </div>
    </>
  )
}

export default App
