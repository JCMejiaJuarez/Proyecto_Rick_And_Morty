import style from "./App.module.css"
import Cards from './components/Cards/Cards.jsx';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const EMAIL = 'ejemplo345@gmail.com';
const PASSWORD = '123pass';


function App() {
   const [characters, setCharacters] = useState([]);
   const { pathname } = useLocation();

   const navigate = useNavigate();
   const [access, setAccess] = useState(false);

   function login(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
        setAccess(true);
        navigate('/home');
      }
   };

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   /* const onSearch = (id) => {
      setCharacters ([...characters, example])
   }; */

   function onSearch(id) {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   };

   const onClose = (id) => {
      setCharacters(
         characters.filter((char) => {
            return char.id !== Number(id);
         })
      )
   }; 

   return (
      <div className={style.App}>
         {pathname !== "/" && <NavBar onSearch={onSearch}/>}

         <Routes>
            <Route path="/" element={<Form login={login}/>}/>
            <Route path="/home" element={ <Cards characters={characters} onClose={onClose}/> } />
            <Route path="/about" element={<About/>}/>
            <Route path="/detail:id" element= {<Detail/> }/>
         </Routes>

      </div> 
      
   );
}

export default App;
