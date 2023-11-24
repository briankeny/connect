import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl } from '../baseurl/baseurl';
const fetchPosts = () => {
    const [postsList, setpostsList] =useState({});
    const [ isLoading, setIsloading] = useState(true);
    const [error, setError] = useState("");

    async function fetchData () {
        const token = await AsyncStorage.getItem("accessToken");
        const tkn = await JSON.parse(token);
        try {
            const response = await fetch(`${baseurl}/posts/`,{
                method:'GET',
                headers: {
                    Authorization: `Bearer ${tkn}`,
                    "Content-Type": "Application/Json",
                  }
                });
            
            if( response && response !== undefined && response.ok){
                const data = await response.json();
                const vehicle = await JSON.parse(JSON.stringify(data));
                setpostsList(vehicle);
                setIsloading(false);
            }
          
        }
        catch(error){
            setError(error.message);
            setIsloading(false);
        }
        finally{
            setIsloading(false);
        }
    };

    useEffect(()=>{
        fetchData();
        const refetch = ()=>{
            fetchData();
        }
        return () =>{
            refetch();
        }
    },[]);
    return {postsList, isLoading,error}
}

export default fetchPosts;