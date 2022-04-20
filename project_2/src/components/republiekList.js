import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {useEffect} from "react";
import { getNews, selectAllNews } from "../features/newsSlice";
import Moment from 'moment';
import { ToastContainer } from 'react-toastify'; 

  export const RepubliekList =()=>{

    const dispatch= useDispatch()
    // dispath(postAdded(title, content, userId))
    //state.posts kom van postsSlice lijn10
    const news = useSelector(selectAllNews);

    const newsStatus = useSelector (state=>state.news.status)

    useEffect(()=>{
        if(newsStatus ==='idle'){
             dispatch(getNews())
        };
    }, [newsStatus, dispatch])
  

 

    const renderedNews= news.map(news=>(

        
        <article key={news.id} className='post-excerpt'>
           <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                    
                    <img src={news.imageUrls} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        {/* <p>news : {news.id}</p> */}
                        <strong>{news.displayTag}</strong>
                        <h5 className="card-title">{news.title}</h5>
                        <p className="card-text"><small className="text-muted">update <i className="bi bi-clock"></i>{Moment(news.articleDates.updateDate).format('H:mm') }</small></p>
                    </div>
                    </div>
                </div>
            </div>
            <Link to={`/republiek/${news.id}`} className="button muted-button">Details</Link>
        </article>
    ));




    return(
        <section className='posts-list'>
            <h2>News</h2>
            {renderedNews}
            <ToastContainer />
        </section>
    )

}