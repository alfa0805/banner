import axios from "axios";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

function Banner() {
  const {register ,setValue, watch , handleSubmit , reset} = useForm()
  const [selecteditem , setSelecteditem] = useState(null)
  const [banner , setBanner] = useState()
  const baseUrl = "https://api.fruteacorp.uz"
  // const token = localStorage.getItem("token")
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZjM3N2NlNy04ZTc5LTRjOGItYjlhZC00Y2QxMjk2OGYwNzUiLCJ1c2VybmFtZSI6Ijk5ODkzMTQ4NzczMyIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzQxNDE1Mjc4LCJleHAiOjE3NzI5NzI4Nzh9.RBK8tThQDmHoc2MFeofAIeI9BSVrq2zDvJenT1T6m9s"
  const getBanner = () => {
    axios.get(`${baseUrl}/banner`).then(res=>{
      setBanner(res.data.data)
    })
  }
  useEffect(()=>{
    getBanner()
  },[])

  const handleFile = (e) => {
    const file = e.target.files[0];
    setValue("image",file)
  }
  const onSubmit = (data) => {
    const file = watch("image");
    const formData = new FormData();
    formData.append("title",data.title);
    formData.append("link",data.link);
    formData.append("image",file);
    setLoading(true)
    axios({
      url:selecteditem?`${baseUrl}/banner/${selecteditem.id}`:`${baseUrl}/banner`,
      method: selecteditem? "PATCH" : "POST",
      data: formData,
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(res=>{
      console.log(res);
      toast.success(selecteditem?"Edit":"Add")
      reset()
      malumot(false)
      setSelecteditem(null)
      getBanner()
    }).catch((err) => {
      console.log("Xatolik:", err);
      toast.error("Xatolik yuz berdi")
    }).finally(()=>{
      setLoading(false)
    })
  }
  const showedit = (banner) => {
    setValue("title", banner.title)
    setValue("link", banner.link)
    setSelecteditem(banner)
    malumot(true)
  }
  const [loading , setLoading] = useState(false)
  const deleteCategory = (id) => {
    setLoading(true)
    axios({
      url:`${baseUrl}/banner/${id}`,
      method:"DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("O‘chirildi:", res);
      toast.success("Muvaffaqiyatli o‘chirildi!")
      getBanner();
      setOpen(null)
    })
    .catch((err) => {
      console.log("Xatolik:", err);
      toast.error("Xatolik yuz berdi")
    }).finally(()=>{
      setLoading(false)
    })
  }
  const [open , setOpen] = useState(null)
  const [modal, setModal] = useState(false)
  const malumot = () => {
    setModal(!modal)
  }
    const close = () =>{
      malumot(false)
      setSelecteditem(null)
    }
  return (
    <div>
      {open && (
      <div className="bg-[#04040498] z-50 w-full h-full mx-auto  fixed top-0 left-0 flex  items-center justify-center">
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
      <div className="max-w-[1240px] pl-[170px] pt-5 mx-auto">
      <div className="flex flex-col items-start justify-between gap-[5px] flex-wrap py-3 max-[500px]:px-5">
          <h2 className="text-amber-50 text-3xl pb-5 font-bold hover:text-[#03e2ff]">Banner</h2>
          <button onClick={malumot} 
            className="text-xl text-white font-medium border border-white px-3 py-1 rounded-md hover:text-[#03e2ff] hover:border-[#03e2ff]">
            malumot qo'shish
          </button>
        </div>
        {modal?
          <div className="">
             <div className="w-[320px] flex flex-col items-center gap-5">
          <div className="w-full flex items-center justify-between">
            <p className="text-white py-2 text-xl font-bold">{selecteditem?"Edit Modal":"Add Modal"}</p>
            <button onClick={close} className="text-red-600 text-2xl font-bold"><IoMdCloseCircleOutline/></button>
          </div>
          <input type="text" {...register("title")}
            className="w-full h-[40px] p-3 rounded-md text-white placeholder:text-[#b0acac] border border-amber-50"
            placeholder="Name"
          />
          <input type="text" {...register("link")} 
            className="w-full h-[40px] p-3 rounded-md text-white placeholder:text-[#b0acac] border border-amber-50"
            placeholder="Havola"
          />
          <input type="file" onChange={handleFile} 
            className="w-full h-[40px] p-3 rounded-md text-white placeholder:text-[#b0acac] border border-amber-50"
            placeholder="Havola"
          />
          <button 
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            className="w-full h-[40px] text-amber-50 bg-[#04bcd5c9] rounded-md text-md font-medium border border-amber-50"
            >
              {loading?"Loading":"Save"}
          </button>
        </div>
          </div>
          : ""
        }
        <div className="pt-5 mt-5 border-t-2 border-[#1ec1d3] h-[300px] flex items-start justify-center flex-wrap gap-11">
          {
            banner && banner.map((item,index) => (
              <div key={index} className="w-[290px] ">
                <div className="w-[290px] h-[250px]">
                  <img src={`${baseUrl}/images/${item.image}`} alt={item.title} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <h3 className="px-3 text-white font-medium text-2xl py-2">{item.title}</h3>
                <h3 className="px-3 w-full h-[35px] overflow-hidden text-[#1eaed2] font-medium text-md ">{item.link}</h3>
                <div 
                  className="flex items-center justify-between mx-auto rounded-xl px-5">
                  <button 
                    className="text-md text-white font-medium border border-white px-5 py-1  rounded-xl hover:text-[#03e2ff] hover:border-[#03e2ff]"
                    onClick={() => showedit(item)}
                    >
                      Edit
                  </button>
                  <button 
                    className="w-[80px] h-[35px] bg-red-600 hover:bg-red-700 text-amber-50 text-md font-bold rounded-xl"
                    onClick={() =>setOpen(item.id)}
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
