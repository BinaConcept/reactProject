import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newsPost } from '../features/newsSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React from 'react'

import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export const AddNewsForm = () => {
 
  const inputRef = useRef()
  const [imageUrls, setImageUrls] = useState('')
  const [display, setDisplay] = useState('')
  const [title, setTitle] = useState('')
  const [discription, setDiscription] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')

  const history = useHistory()


  const dispath = useDispatch();

  //users ophalen uit de Redux-store
  const provinces = useSelector(state => state.provinces)

  // const onPictureChanged = e => setImageUrls(e.target.value)
  const onDisplayChanged = e => setDisplay(e.target.value)
  const onTitleChanged = e => setTitle(e.target.value)
  const onDiscriptionChanged = e => setDiscription(e.target.value)
  const onSubtitleChanged = e => setSubtitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const provinceOptions = provinces.map(province => (
    <option key={province.id} value={province.city}>{province.city}</option>
  ));

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
	 //je kunt script testen controleerd
   if (title && content) {
    //nieuws object gestuurd
    dispath(newsPost(imageUrls, display, title, discription, subtitle, content))
    setImageUrls('');
    setDisplay('');
    setTitle('');
    setDiscription('');
    setSubtitle('');
    setContent('');
  }
  history.push(`/`)
 
	}

	const onError = (errors) => {
    
  console.error('error: ',errors)
    toast("Mislukt");
	}
  



  return (
    <section>
      <h2>Add a News</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label htmlFor="imageUrls">Picture :</label>
        <input
          type="file"
          // onChange={fileChangedHandler}
          onChange={() => setImageUrls(inputRef.current.files[0])}
          ref={inputRef}
          id="gallery-image"
          accept=".jpg, .jpeg, .png"
        />  <br />

        {
          imageUrls.name? <img src={`assets/images/${imageUrls.name}`} className="img-fluid rounded-start" width={300} height={150} alt="news_picture" />:<p></p>
        }

        <br />
        <input
          type="hidden"
          id="imageUrls"
          name="imageUrls"
          value={imageUrls.name}
        />


  
        <label htmlFor="newsDisplay">Display:</label>
        <select id="display" name="display" {...register('display')} value={display} onChange={onDisplayChanged}>
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
        <ToastContainer />
        <button type="submit" >Save news</button>
        <br />
      </form>
    </section>
  )

}