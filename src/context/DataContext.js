import { createContext, useState, useEffect } from "react";
import useWindowSize from '../hooks/useWindowSize'; //../ => Route folder
import useAxiosFetch from '../hooks/useAxiosFetch';
import { format } from 'date-fns'
import api from "../api/apiPosts"
import {useNavigate } from 'react-router-dom'
import axios from 'axios';

const DataContext = createContext({})
 
export const DataProvider = ({ children }) => {//Components requiring data are mentioned as children
    // path='/' => localhost:3000 => Home page
  const [posts, setPosts] = useState([
    // {
    //   id: 1,
    //   title: "My first Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body: "Made a video about Tesla Q1 result"
    // },
    // {
    //   id: 2,
    //   title: "My 2nd Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body:"I addtended a DeFi blockchain event"
    // },
    // {
    //   id: 3,
    //   title: "My 3rd Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body:"Web3 global summit next week"
    // },
    // {
    //   id: 4, 
    //   title: "My 4th Post",
    //   datetime: "July 01, 2021 11:17:36 AM",
    //   body:"ETH will outperform BTC"
    // }
  ])
  const [search, setSearch] = useState('');//variable changes its own state
  const [searchResults, setSearchResults] = useState([])
  const [postTitle,setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle,setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const {width} = useWindowSize()
  const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3600/posts"); 
/*============================================Fetching the data from the API=========================================== */
  useEffect(() => {//for faster
    setPosts(data);
  }, [data])
                                /*----------- or--------------- */
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('posts');
  //       console.log("Response: ", response)
  //       console.log("Data: ",response.data)
  //       console.log("Headers: ", response.headers)
  //       console.log("Status: ",response.status)
  //           setPosts(response.data)
  //         } catch (err) {
  //                     if (err.response) {
  //                           console.log("Status: ",err.response.status);
  //                           console.log("Headers: ",err.response.headers);
  //                           console.log("Data: ",err.response.data);
  //                     } else {
  //                           console.log(`Error: ${err.message}`)
  //                     }
  //                    }
  //   }
  //   fetchPosts()
  // },[])
/*================================================================================================================ */
  useEffect(() => {
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) || 
      ((post.title).toLowerCase()).includes(search.toLowerCase())) //enough to satisfy either one
    setSearchResults(filteredResults.reverse())//reverse() - to show latest post
  }, [posts, search])
  
  const handleSubmit = async (e) => {//e-click event
    e.preventDefault();//to prevent referesh whenever some action happens
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('posts', newPost)
        console.log("Response: ", response)
        console.log("Data: ",response.data)
        console.log("Headers: ", response.headers)
        console.log("Status: ", response.status)
      const allPost = [...posts, response.data]; //adding newPost into the previous posts(...posts)
      setPosts(allPost)
      setPostTitle('')//add empty string after completion of work
      setPostBody('')//add empty string after completion of work
      navigate('/')
    } catch (err) {
      if (err.response) {
        console.log(err.response.headers)
        console.log(err.response.data)
        console.log(err.response.status)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }  
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`posts/${id}`, updatedPost)
      console.log("Response: ", response)
      console.log("Data: ", response.data)
      console.log("Headers: ", response.headers)
      console.log("Status: ", response.status)
      //const allPost = [...posts, response.data]; //adding newPost into the previous posts(...posts)
      setPosts(posts.map(post => post.id === id ? {...response.data}:post))
      setEditTitle('')//add empty string after completion of work
      setEditBody('')//add empty string after completion of work
      navigate('/')
    } catch (err) {
      if (err.response) {
        console.log(err.response.headers)
        console.log(err.response.data)
        console.log(err.response.status)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`posts/${id}`)
        console.log("Response: ", response)
        console.log("Data: ",response.data)
        console.log("Headers: ", response.headers)
        console.log("Status: ", response.status)
      const updatedPosts = posts.filter(post => post.id !== id)
      setPosts(updatedPosts)
      navigate('/')
    } catch (err) {
      if (err.response) {
        console.log(err.response.headers)
        console.log(err.response.data)
        console.log(err.response.status)
      } else {
        console.log(`Error: ${err.message}`)
      }
    }  
  }
    return (
        <DataContext.Provider value={{
            width, search, setSearch, searchResults, fetchError, isLoading, handleSubmit,
            postTitle, setPostTitle, postBody, setPostBody, posts, handleDelete,
            handleEdit, editTitle, setEditTitle, editBody, setEditBody
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext