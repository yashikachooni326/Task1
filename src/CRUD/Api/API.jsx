import axios from "axios";

const baseURL =  'http://74.208.13.142:6051';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWY3MzdmYmI3MjA5MGMwODVkY2QwZiIsImlhdCI6MTc2MjgzODcxOSwiZXhwIjoxNzYyODc0NzE5fQ.krFc_roX020h2d1asdXo4ugGaF-2mw82DSzheY3AMWg';

const api = axios.create({
baseURL : baseURL,
headers : {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`,
},
 params: {
        decrypt: true
    }
})


export const getUser = async ()=>
{
    try{
   const res = await api.get('/customer/list');
   return res.data;
   
    }
    catch(err)
    {
        console.log('error occur:',err);
    }
}

export const addUser = async (userData)=>
{
 try{
const res =  await api.post('/customer/add',userData);
return res.data;

 }  
 catch(err)
 {
    console.log("Error occur:",err);
 } 
}


export const updateUser = async(id,data)=>
{
    try{
     const res = await api.put(`/customer/update/${id}`,data);
     return res.data;
    }
    catch(err)
    {
        console.log('error occur:',err);
    }
}

export const deleteUser = async(id)=>
{
    try{
    const res = await api.delete(`/customer/delete?id=/${id}`);
    return res.data;
    }
    catch(err)
    {
        console.log('error occur:',err);
    }
}


export const getUserDetails = async (id) => {
    try {
        const res = await api.get(`/customer/details`, { params: { id } });
        return res.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
};
