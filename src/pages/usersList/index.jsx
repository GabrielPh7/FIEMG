import { Card,  PageHeader} from 'antd';
import React, {useEffect, useState, useContext} from 'react';
import api from '../../services/api';
import { SEO } from "../../components/SEO"
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";

const UsersList = () => {
  const [users, setUsers] = useState({});
  const { signOut, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(()=>{
    
    isAuthenticated ? getUsers() : router.push("/signIn")
    

  }, [])



  const getUsers = async () => {
    try {
      const response = await api.get('/user');
        setUsers(response.data);
    } catch (error) {
      if(error.data.message === "Token errado"){
        signOut();
      } else {
        console.log(error)
      }
    }
   
  }
 
 return(

  <>
  <SEO title="Lista de Usuários | FIEMG" description="UsersList" />
  <PageHeader
    onBack={() => signOut()}
    title="Sair"
  />
 <div className='usersListContent'>
  <Card
    title="Usuário"
    bordered={true}
    style={{
      width: 300,
      height: 200,
      borderRadius: "10px",
    }}
  >
    <p>Identificador: {users.id} </p>
    <p>Usuário: {users.username}</p>
  </Card>
</div>

</>)
}


export default UsersList;