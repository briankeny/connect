import { baseurl} from "../store/api";
import axios from "axios";
import { get, removeFromStorage, save } from "../store/storage";

// Refetch Hook 
export async function refetchToken() {
  try {   
    const refresh = await get('refreshToken')
    const data =  {"refresh": `${refresh}` }
    const response = await axios.post(`${baseurl}/token/refresh/`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error:any) {
    throw new Error(error.message);
  }
}

//Test Phone Number  
  export const testPhoneNumber = (number:string) => {
    const phonePattern = /^[1-9]\d{2}\d{3}\d{3}/;
    const no = phonePattern.test(number);
    if (no) {
      return `+254${number}`;
    } else {
      return false;
    }
  };
  
// Test Email
  export const testEmail = (email:string) => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email) {
      const emailNoSpace = email.trim().replace(/\s/g, "");
      const mail = emailPattern.test(emailNoSpace);
      return mail;
    } else {
      return false;
    }
  };
 

// Format date to yy-mm-dd
export function formatDate(date:any) {
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formated_Date = `${year}-${month}-${day}`;
    return formated_Date;
  } catch (err) {
    return date;
  }

}

//remove Space
export function removeSpace(item:string) {
      const noSpace = item.trim().replace(/\s/g, "");
      if (noSpace) {
        return noSpace;
      } else {
        return item;
      }
 }  

//Validate User login input
export function validateLoginInput(psn:any, passw:any) {
    const pass = passw && removeSpace(passw).length > 6
    const p = parseInt(psn) && removeSpace(psn).length > 7
    if (pass && p) {
        const public_service_no  = parseInt(psn);
        const password = removeSpace(passw)
      return {public_service_no:public_service_no, password:password}
    } else {
      return false;
    }
    
  }

//logout a user
export async function logoutUser() {
        try {
          await removeFromStorage('accessToken');
          await removeFromStorage('refreshToken');
          await removeFromStorage('authentication');
          return true;
        } catch (err) {

        }
}
    

// Login user
export async function handleLogin(data:any) {
  try {
    const response = await axios.post(`${baseurl}/login/`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error:any) {
    throw new Error(error.message);
  }
}
  

export function dateFormater(date:any){
  if(date){
    try{
      const today = new Date(date);
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const dat = `${day}/${month}/${year}`;
      
      const h = today.getUTCHours();
      const hrs = String(today.getUTCHours()+1).padStart(2, "0");
      const mins = String(today.getUTCMinutes()).padStart(2, "0");

      const am = ()=>{
          if (h >= 0 && h <= 12){
              return "AM"
          }
          else{
              return "PM"
          }
      }
      const utc = am()
      const time = `${hrs}:${mins} ${utc}` 


      return {dat, time};
  }
  catch(err){
      const dat = "";
      const time = ""; 
      return {dat,time}
  }
  }
  else {
    const dat = "";
      const time = ""; 
      return {dat,time}
  }
}

interface MyObj {
    [key: string]: any;
}
  
  export function createError(myObj: MyObj): string {
    let message = "";
  
    Object.entries(myObj).forEach(([key, value]) => {
      if (typeof value === "object") {
        // Assuming value is an array, concatenating its first element
        if (Array.isArray(value) && value.length > 0) {
          message += value[0];
        } else {
          message += JSON.stringify(value);
        }
      }
      if (typeof value !== "object") {
        message += value;
      }
    });
  
    return message;
  }
  

//append image plus data 
export function imageAndBodyConstructor(content={},images=[],uploadname=[]){
  const data = new FormData();
  Object.entries(content).forEach(([key,value])=>data.append(key,value))
  if (images.length >0){
  images.forEach((image)=>data.append(
    `${uploadname}`,image
  ))

}
  
return data
}


export const try_ReAuthentication_Procedure = async ()=>{
  let authErrorMessage = ""
  let success  = false
  // Try To Use RefreshToken to get new AccessToken  
  const response = await  refetchToken() 
  // Successful
  if (response.status == 200 || response.status == 201){
      const token = await response.data
      await save('accessToken',token.access)
      success = true
      return {success,authErrorMessage}
  }
  else{
      //Resort To Attempt to Login User if they Saved Password  
      const validated = await get('logins')
       if (validated){
        const response = await handleLogin(validated)
        // Successful Relogin
        if (response.status == 201 || response.status == 200) {
          const token = await response.data
          await save ('accessToken',token.access) 
          await save ('refreshToken',token.refresh) 
          success = true
          return {success,authErrorMessage}
        } 
        else{
           authErrorMessage = "Your Session Has Expired Please Login Again To Continue"
          return {success,authErrorMessage}
          // Now Proceed to warn authentication failure
          
        }
       }
        // All methods Have failed resort to Alert The User 
      else{
        // Now Proceed to warn authentication failure
         authErrorMessage =  "Your Session Has Expired Please Login Again To Continue"
        return {success,authErrorMessage}
      }
    }
}

// create post data
export function  validatePostData(title="",content="",category=""){
  interface dataprops {
      title?:string;
      content?:string;
      category?: string
  }
  const data = <dataprops>{}
  const t= removeSpace(title).length >0;
  const  cont  = removeSpace(content).length >0;
  if (t){
    data.title = title.trim();
  }
  if (cont){
    data.content = content.trim()
  }

  data.category = category
  return data
}

export function postImageBodyConstructor(postContent:object,images:any){
      const data = new FormData();
      Object.entries(postContent).forEach(([key,value])=>data.append(key,value))
     if (images){
      images.forEach((image:any,index:number)=>data.append(
        `image_${index}`,image
      ))
    }
  
  return data
}
export async function submitPost(data:any) {
  try {
    const token = await get('accessToken');
  
    const response = await axios.post(`${baseurl}/posts/`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type':'multipart/form-data',
      },
    });
    return response
  } catch (error:any) {
    throw new Error(error.message);
  }
}
  
export async function searchPersons(searchTerm="",search=""){
  try {
      const token = await get("accessToken");
      const response = await axios.get(`${baseurl}/Users/?searchTerm=${searchTerm}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        
        }
      });
     
      return response
    }
    catch(error:any){
      throw Error (error.message)    
    }    
}


export async function searchUserPosts(searchTerm:string){
  try {
      const tkn = await get("accessToken");
      const response = await axios.get(`${baseurl}/posts/?search_Term=${searchTerm}`,{
        headers: {
          Authorization: `Bearer ${tkn}`,
        }
      });
     
      return response
    }
    catch(error:any){
      throw Error (error.message)    
    }    
}

export function dateDifferenceWithUnit(startDate:any) {
  // Parse the input date strings
  const startDateObj = new Date(startDate);
  const endDateObj = new Date();

  const diff = endDateObj.getTime() - startDateObj.getTime();

  // Calculate the time difference in milliseconds
  const timeDifference = Math.abs(diff);

  // Define the time units and their respective milliseconds
  const timeUnits = [
    { unit: "yr", milliseconds: 365 * 24 * 60 * 60 * 1000 },
    { unit: "month", milliseconds: 30 * 24 * 60 * 60 * 1000 },
    { unit: "wk", milliseconds: 7 * 24 * 60 * 60 * 1000 },
    { unit: "day", milliseconds: 24 * 60 * 60 * 1000 },
    { unit: "hr", milliseconds: 60 * 60 * 1000 },
    { unit: "min", milliseconds: 60 * 1000 },
  ];

  // Find the largest unit that fits into the time difference
  for (const { unit, milliseconds } of timeUnits) {
    if (timeDifference >= milliseconds) {
      const difference = Math.floor(timeDifference / milliseconds);
      return `${difference} ${unit}${difference > 1 ? "s" : ""} ago`;
    }
  }

  // If the difference is less than a minute
  const difference = Math.floor(timeDifference / 1000);
  return `${difference} second${difference > 1 ? "s" : ""} ago`;
}







