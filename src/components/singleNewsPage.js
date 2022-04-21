import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
 import { Link } from 'react-router-dom'
// import { PostAuthor } from './postAuthor'
import { selectNewsById } from '../features/newsSlice'
import { newsDelete } from '../features/newsSlice'

import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom'

export const SingleNewsPage = ({ match }) => {
  //   //posts/:id
  const { Id } = match.params
  const dispatch = useDispatch()
  const history = useHistory()
  const news = useSelector(state =>selectNewsById(state, Id))

  if (!news) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }
  const onDeleteClicked = () => {
    
      dispatch(newsDelete({id: Id}))
      history.push(`/republiek`)
     
   
  }

    return(
      <section>
      <article className="post mt-3">
        <img src={news.imageUrls} className="img-fluid rounded-start" alt="..."/>          
       
        <h2>{news.title}</h2>
        <p>{news.discription}</p>

        <h3>{news.subtitle}</h3>
        <p>{news.content}</p>
      
        <ToastContainer />
        <Link to={`/editNews/${Id}`} className="button m-1">Bewerken</Link>
        <button type="button" className="button m-1" onClick={onDeleteClicked}>
       delete
      </button>
      </article>
    </section>
    )
}