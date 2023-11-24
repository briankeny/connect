import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../baseurl/baseurl';

const fetchUsers = () => {
    const [employeeList, setEmployeeList] =useState([]);
    const [ isLoading, setIsloading] = useState(true);
    const [fetchingError, setFetchingError] = useState("");

    async function fetchData () {
        const tkn = await AsyncStorage.getItem("accessToken");
        const token = await JSON.parse(tkn);
        try {
            const response = await fetch(`${baseurl}/Users/`,{
                method:'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });
            if (response.status == 200){
                const data = await response.json();
                setEmployeeList(data);
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
    return {employeeList, isLoading,fetchingError}
}
export default fetchUsers;