import { Link } from "react-router-dom";
import style from "./Card.module.css"

const Card = ({ id, name, status, species, gender, origin, image, onClose }) => {
   return (
      <div className={style.contenedor}>
         <Link to={`/detail/:${id}`}>
            <div>
               <button className={style.button} onClick={() => {onClose(id)}}>X</button>
               <h2>{name}</h2>
               <img src={image} alt='name' />
            </div>
            <div>
               <h2>{status}</h2>
               <h2>{species}</h2> 
               <h2>{gender}</h2>
               <h2>{origin.name}</h2>
            </div>
         </Link>
      </div>
   );
} 

export default Card;