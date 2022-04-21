import { createSlice, nanoid} from "@reduxjs/toolkit"
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const initialState = {

 newsData:[],
    status:'idle',
    error: null
}



//api geven

export const getNews = () => async dispatch => {
    try {
      const response = await axios.get(`https://www.vrt.be/vrtnws/nl/regio/_jcr_content/par/grid.app.json`);
      dispatch(allNewsItems(response.data));
      
    } catch (err) {
    //test   dispatch(getUserListFailure(err.message));
    }
  }


const list=[]

const postsSlice = createSlice({
    name:'news',
    initialState,
    
    reducers:{
        newsPost: {
            reducer(state, action){
            state.newsData.push(action.payload)
            list.push('create')
            },
            prepare(imageUrls, display, title,discription,subtitle,content){ 
                return{
                    payload:{
                        id:nanoid(),
                        imageUrls:'/assets/images/'+imageUrls.name,
                        content,
                        title,
                        discription,
                        subtitle,
                        articleDates:new Date().toISOString(),
                        displayTag:display
                    }
                }
            }
        },

        newsUpdated(state, action,){  
            const {id, imagePath, display, title, discription, subtitle, content}= action.payload       
            const existingPost = state.newsData.find(post => post.id===id)

            if(existingPost){
                existingPost.imageUrls=imagePath;
                existingPost.displayTag=display;
                existingPost.title=title;
                existingPost.discription=discription;
                existingPost.subtitle=subtitle;
                existingPost.content=content;           
            } 
            list.push('update')      
        },

        newsDelete(state, action){  
            const {id}= action.payload ;
            state.newsData = state.newsData.filter(ne=>ne.id !== id);
            list.push('delete')
        },
        
        allNewsItems(state, action){
            var ids = new Set(state.newsData.map(d => d.ID));
            state.newsData =[...state.newsData,...action.payload.filter(d => !ids.has(d.ID))];
            localStorage.newsitems = JSON.stringify(state.newsData);
            
            list.push('loading');
            for (var i=0; i < list.length; i++) {
                toast(list[i]);
                delete list[i];
            } 
             
        },
        
    }

}

)

export const {postAdded,newsUpdated,allNewsItems,newsPost,newsDelete} = postsSlice.actions
export default postsSlice.reducer


export const selectAllNews= state =>state.news.newsData 
export const selectNewsById = (state, Id) =>state.news.newsData.find(news => news.id === Id)

