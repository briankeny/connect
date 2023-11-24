import {useEffect, useState} from 'react';
import { baseurl } from '../store/api';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import axios from 'axios';

interface itemProps {
    post_id : number;
    content : string;
    owner : {
        first_name:string;
        last_name:string;
        profile_picture:string;
        username :string;
        account_type:string;
    };
    images :[];
    timestamp ?:string;
  }

const fetchPosts = () => {
    const [postsList, setpostsList] = useState<itemProps[]>([]);
    const [ isLoading, setIsloading] = useState<boolean>(true);
    const [error, setError] = useState("");

    async function fetchData () {
        const tkn = await get("accessToken");
        try {
            const response = await axios.get(`${baseurl}/posts/`,{
                headers: {
                    Authorization: `Bearer ${tkn}`,
                    "Content-Type": "Application/Json",
                  }
                });
            
            if( response.status == 200 || response.status == 201){
                const data = await response.data;
                setpostsList(data);
                setIsloading(false);
            }
          
        }
        catch(error:any){
            setError(error.message);
            setIsloading(false);
        }
        finally{
            setIsloading(false);
        }
    };

    useEffect(()=>{
        fetchData();
    },[]);
    return {postsList, isLoading,error}
}

export default fetchPosts;