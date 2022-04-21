import React, { useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { selectNewsById } from '../features/newsSlice'

import { ToastContainer,toast, collapseToast } from 'react-toastify';
import { newsUpdated } from '../features/newsSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


export const EditNewsForm = ({ match }) => {
  const { Id } = match.params
  const inputRef = useRef()
  const history = useHistory()
  const news = useSelector(state =>selectNewsById(state, Id))

  const [imageUrls, setImageUrls] = useState(news.imageUrls)
  const [display, setDisplay] = useState(news.displayTag)
  const [title, setTitle] = useState(news.title)
  const [discription, setDiscription] = useState(news.description)
  const [subtitle, setSubtitle] = useState(news.subtitle)
  const [content, setContent] = useState(news.content)
 //users ophalen uit de Redux-store
  const provinces = useSelector(state => state.provinces)
  const dispatch = useDispatch()
  
  const onDisplayChanged = e => setDisplay(e.target.value)
  const onTitleChanged = e => setTitle(e.target.value)
  const onDiscriptionChanged = e => setDiscription(e.target.value)
  const onSubtitleChanged = e => setSubtitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const provinceOptions = provinces.map(province => (
    <option key={province.id} value={province.city}>{province.city}</option>
  ));


console.log('nuray:',imageUrls)
const picture=()=>{
const str = imageUrls.toString().substring(0,2)


  return(

    str==='/a'? 
    <img  src={imageUrls} className="img-fluid rounded-start" width="400" alt="news_picture" />:
    str==='//'? 
     <img  src={imageUrls} className="img-fluid rounded-start" width="400" alt="news_picture" />:
     <img  src={`/assets/images/${imageUrls.name}`} className="img-fluid rounded-start" width="400" alt="news_picture" />
    )
   
 
  

}



const SignupSchema = yup.object().shape({
  display: yup.string().required('Selecteer provincie'),
  newsTitle: yup.string().required('Titel verplicht'),
  newsDiscription: yup.string().required('Omschrijving verplicht'),
  newsSubtitle: yup.string().required('Ondertiteling verplicht'),
  newsContent: yup.string().required('Inhoud verplicht')
})

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm({
  resolver: yupResolver(SignupSchema)
})


const onSubmit = (data) => {
  const str = imageUrls.toString().substring(0,2)
  var imagePath=""
  if (str!=="//" ) {
    imagePath="/assets/images/"+imageUrls.name
     
  }
  else{
    imagePath=imageUrls
  }
  console.log('word gestuurd:',imagePath);
  dispatch(newsUpdated({ id:Id,imagePath, display, title, discription, subtitle, content }))
 history.push(`/republiek`)
}

const onError = (errors) => {
  console.error('error: ',errors)
  toast("Mislukt");
}
  return (
    
        <section>
          <ToastContainer />
          <h2>Edit Post</h2>
          <form  onSubmit={handleSubmit(onSubmit, onError)}>
          <label htmlFor="imageUrls">Picture :&nbsp;</label>
        <input
          type="file"
          onChange={() => setImageUrls(inputRef.current.files[0])}
          ref={inputRef}
          id="gallery-image"
          accept=".jpg, .jpeg, .png"
        />  
        <br/>
        {picture()}      
         <br/>
         
         <label htmlFor="newsDisplay">Display:</label>
        <select id="display"  value={display} name="display" {...register('display')} onChange={onDisplayChanged}>
          <option value={""} ></option>
          {provinceOptions}
        </select>
        {errors.display && <p>{errors.display.message}</p>}

        <label htmlFor="newsTitle">Title :</label>
        <input
          type="text"
          id="newsTitle"
          name="newsTitle"
          value={title}
          {...register('newsTitle')}
          onChange={onTitleChanged}
        />
        {errors.newsTitle && <p>{errors.newsTitle.message}</p>}

        <label htmlFor="newsDiscription">Discription :</label>
        <textarea
          id="newsDiscription"
          name="newsDiscription"
          value={discription}
          {...register('newsDiscription')}
          onChange={onDiscriptionChanged}
        />
         {errors.newsDiscription && <p>{errors.newsDiscription.message}</p>}

        <label htmlFor="newsSubtitle">Subtitel :</label>
        <input
          type="text"
          id="newsSubtitle"
          name="newsSubtitle"
          value={subtitle}
          {...register('newsSubtitle')}
          onChange={onSubtitleChanged}
        />
         {errors.newsTitle && <p>{errors.newsTitle.message}</p>}

        <label htmlFor="newsContent">Content :</label>
        <textarea
          id="newsContent"
          name="newsContent"
          value={content}
          {...register('newsContent')}
          onChange={onContentChanged}
        />
         {errors.newsTitle && <p>{errors.newsTitle.message}</p>}
        <br />
      
        <button type="submit" >Update</button>
        <br />
      </form>
    </section>
  )
}