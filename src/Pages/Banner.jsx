import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';

function Banner() {
    const [loading , setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const malumot = () => {
      setModal(!modal)
      }

  const url = "https://api.fruteacorp.uz/banner"
  const [categories, setCategories] = useState([]);
  const imgUrl = "https://api.fruteacorp.uz/images";
  const getcategory = () => {
    setLoading(true)
    axios({
      url:`${url}`, 
      method:"GET",
    }).then(res=>{
        // console.log(token);
        
        setCategories(res.data.data)
    }).finally(()=>{
      setLoading(false)
    })
  };

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZTE4ZjVmNC05ZTEwLTQ0MGMtOWU2My00MWFmYzA4MDY4Y2EiLCJ1c2VybmFtZSI6Ijk5ODkwMTIzNDU2NyIsInJvbGUiOiJwYWNrbWFuIiwiaWF0IjoxNzQxMjQzMjMzLCJleHAiOjE3NzI4MDA4MzN9.wJKAz4st3YH2gUDhVzEmq-Cg4uD4TEXL3EL0DbFiQr0"
  const [title , settitle] = useState("");
  const [link , setlink] = useState("");
  const [image , setImage] = useState("");
  const [selecteditem, setSelecteditem] = useState(null)
  const post = () =>{
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    if(image){
      formData.append("image",image)
    }

    axios({
      url:selecteditem?`${url}/${selecteditem?.id}`:`${url}`,
      method:selecteditem?"PATCH":"POST",
      headers:{
        'Authorization':`Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    },
    data:formData,
    }).then((res)=>{
      console.log(res);
      toast.success("Muvaffaqiyatli qo'shildi")
      getcategory()
      setSelecteditem(null)
      malumot(false)
    }).catch((err)=>{
      console.log(err);
      toast.error("Xatolik yuz berdi")
    }).finally(()=>{
      setLoading(false)
    })
  }

  const close = () =>{
    malumot(false)
    setSelecteditem(null)
  }

  const deleteCategory = (id) => {
    axios({
      url:`${url}/${id}`,
      method:"DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("O‘chirildi:", res);
      toast.success("Muvaffaqiyatli o‘chirildi!")
      getcategory();
      setOpen(null)
    })
    .catch((err) => {
      console.log("Xatolik:", err);
      toast.error("Xatolik yuz berdi")
    }).finally(()=>{
      setLoading(false)
    })
  }
  
  useEffect(()=>{
    getcategory();
  },[])

  // malumot ozgartirish
  const showedit = (category) =>{
    setSelecteditem(category)
    malumot(true)
    settitle(category.title)
    setlink(category.link)
  }
  const [open , setOpen] = useState(null)
  return (
    <div >
      {open && (
      <div className="bg-[#040404c9] z-50 max-w-[1240px] h-full mx-auto  fixed top-0 left-0 flex  items-center justify-center">
       <div 
        className=" flex flex-col w-[270px] items-center justify-center gap-7 mx-auto rounded-xl px-5">
        <p className="text-white text-xl text-center font-medium">Rostdan ham o'chirmoqchimisiz</p>
        <button 
          className="text-md text-white font-medium border border-white px-5 py-1  rounded-xl hover:text-[#03e2ff] hover:border-[#03e2ff]"
          onClick={() => setOpen(null)}
          >
            Yo'q
        </button>
        <button 
          className="w-[80px] h-[35px] bg-red-600 hover:bg-red-700 text-amber-50 text-md font-bold rounded-xl"
          onClick={() => deleteCategory(open)}
          disabled={loading}
          >
            {loading?"O'chirilmoqda":"Ha"}
        </button>
       </div>
      </div>
      )}
      <div className="max-w-[1240px] mx-auto pt-5 pl-[150px] max-[500px]:pl-0 max-[500px]:pt-[90px]">
      <h2 className="text-5xl text-center pt-[250px] text-white font-bold absolute left-[550px]" disabled={loading}> </h2>
        <div className="flex items-start justify-between gap-[5px] flex-wrap py-3 max-[500px]:px-5">
          <h2 className="text-amber-50 text-3xl pb-5 font-bold hover:text-[#03e2ff]">Banner</h2>
          <button onClick={malumot} 
            className="text-xl text-white font-medium border border-white px-3 py-1 rounded-md hover:text-[#03e2ff] hover:border-[#03e2ff]">
            malumot qo'shish
          </button>
        </div>
        {/* malumot qoshish yoki ozgartirish */}
        {
            modal?
        <div className="w-[350px] mx-auto pb-5 max-[500px]:w-full max-[500px]:px-5">
         <form className="border-2 border-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-white py-2 text-xl font-bold">{selecteditem?"Edit Modal":"Add Modal"}</p>
            <button onClick={close} className="text-red-600 text-2xl font-bold"><IoMdCloseCircleOutline/></button>
          </div>
          <div className="mb-2">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              image
            </label>
            <input className="shadow appearance-none border border-white bg-none rounded-md w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              type="file" 
              placeholder="image"
              onChange={(e)=>setImage(e?.target?.files[0])}/>

          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              title
            </label>
            <input className="shadow appearance-none border border-white bg-none rounded-md w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" 
              id="username" 
              type="text" 
              placeholder="Username"
              onChange={(e)=>settitle(e?.target?.value)}
              value={title}
              />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              name
            </label>
            <input className="shadow appearance-none border border-white bg-none rounded-md w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" 
              id="username" 
              type="text" 
              placeholder="Userlink"
              onChange={(e)=>setlink(e?.target?.value)}
              value={link}
              />
          </div>
          <div className="flex items-center justify-center ">
            <button className="text-md text-white font-medium border border-white px-3 py-1 rounded-md hover:text-[#03e2ff] hover:border-[#03e2ff]" 
              type="button"
              onClick={post}
              disabled={loading}
              >
                {loading?"yuboriloqda":"yuborish"}
            </button>
          </div>
         </form>
        </div>:""
        }
        {/* malumotlarni chiqarish */}
        <div className="flex flex-wrap items-center justify-center gap-10">
        {
          categories.map((category)=>(
            <div className="w-[274px] h-full border-2 border-white rounded-md pb-3"
            key={category.id}>
                <div className="w-[270x] h-[250px] rounded-md">
                  <img className="w-full h-full object-cover rounded-md"
                      src={`${imgUrl}/${category.image}`} alt={category.title}
                    />
                </div>
                <h2 className="text-white text-center text-2xl font-medium py-2 hover:text-[#03e2ff]">{category.title}</h2>
                <h2 className="text-green-500 text-center text-md font-medium pb-2 hover:text-[#03e2ff]">{category.link}</h2>
                <div 
                  className="flex items-center justify-between mx-auto rounded-xl px-5">
                  <button 
                    className="text-md text-white font-medium border border-white px-5 py-1  rounded-xl hover:text-[#03e2ff] hover:border-[#03e2ff]"
                    onClick={() => showedit(category)}
                    >
                      Edit
                  </button>
                  <button 
                    className="w-[80px] h-[35px] bg-red-600 hover:bg-red-700 text-amber-50 text-md font-bold rounded-xl"
                    onClick={() =>setOpen(category.id)}
                    >
                      Dalet
                  </button>
                </div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default Banner  