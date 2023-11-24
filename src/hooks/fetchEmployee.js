import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../api/api';
const fetchEmployee = (id) => {
    const [employee, setEmployee] =useState([]);
    const [ isLoading, setIsloading] = useState(true);
    const [fetchingError, setFetchingError] = useState("");

    async function fetchData () {
        const tkn = await AsyncStorage.getItem("accessToken");
        const token = await JSON.parse(tkn);
        try {
            const response = await fetch(`${baseurl}/employees/${id}/`,{
                method:'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });
            if (response.ok|| response.status == 200){
                const data = await response.json(); 
                const emp = JSON.parse(JSON.stringify(data));           
                setEmployee(emp);
            }
        }
        catch(error){
         setFetchingError("An error occured while trying to fetch departments");
        
        }
        finally{
            setIsloading(false);
        }
    };

    useEffect(()=>{
        fetchData();
    },[]);
    return {employee, isLoading,fetchingError}
}
export default fetchEmployee;