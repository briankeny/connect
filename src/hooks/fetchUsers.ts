import {useEffect, useState} from 'react';
import {baseurl} from '../store/api';
import { get } from '../store/storage';
import axios from 'axios';

const fetchUsers = () => {
    const [employeeList, setEmployeeList] =useState([]);
    const [ isLoading, setIsloading] = useState(true);
    const [fetchingError, setFetchingError] = useState("");

    async function fetchData () {
        const tkn = await get("accessToken");
        try {
            const response = await axios.get(`${baseurl}/Users/`,{
                headers: {
                    Authorization: `Bearer ${tkn}`,
                  },
            });
            if (response.status == 200){
                const data = await response.data;
                setEmployeeList(data);
            }
            
        }
        catch(error:any){
         setFetchingError(error.message);
        
        }
        finally{
            setIsloading(false);
        }
    };

    useEffect(()=>{
        fetchData();
    },[]);
    return {employeeList, isLoading,fetchingError}
}
export default fetchUsers;