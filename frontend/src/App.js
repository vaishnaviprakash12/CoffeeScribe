import './App.css';
import Header from './components/Header/Header/Header';
import Footer from './components/Header/Footer/Footer';
import LandingPage from './screens/Landing-page/LandingPage';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNotes from '../src/myNotes/MyNotes';
import LoginScreen from './screens/LoginPage/LoginScreen.js';
import RegisterScreen from './screens/RegisterPage/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote.js';
import SingleNote from './screens/singleNote.js';
import { useState } from 'react';

function App() {
  const [search,setSearch]=useState("");
  console.log(search);
  return (
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main style={{minHeight:"93vh"}}>
      <Routes>
      <Route path='/' Component={LandingPage} exact/>    
      <Route path='/login' Component={LoginScreen} exact/>   
      <Route path='/register' Component={RegisterScreen} exact/>
      <Route path='/myNotes/create' Component={CreateNote} exact/>
       <Route path='/myNotes/:id' Component={SingleNote} />

      <Route path='/myNotes' Component={()=><MyNotes search={search}/>}/>
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
