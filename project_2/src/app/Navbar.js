
import { Link } from 'react-router-dom'


export const Navbar = () => {
 

  
  return (
    
    <nav>
      <section>
        <h1>Vrt Nieuws </h1>      
       
        
          <div className="navContent">
          <Link to="/info">Info</Link>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/republiek">Republiek</Link>
        </div>      
      </section>
    </nav>





  )
}
