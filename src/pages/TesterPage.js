import React, { useEffect, useState } from 'react';


//Component
import SelectList from '../components/Lists/SelectableList';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    createRole,
    getRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById
 } from '../redux/actions/crud.action';
import { Button } from '@mui/material';




export default function TesterPage() {
    const dispatch = useDispatch();
    const [rnd, setRnd] = useState(0);
    const [id, setId] = useState('628efa3109fd466137f3bff0');
    const [values, setValues] = useState({
        title: 'Cook',
        notes: 'Cook'
    });
    const [resp, setResp] = useState([]);


const handleClick = (data) => {
    console.log(data)
    dispatch(
        deleteRoleById(data._id)
    )
    .then(a => {
        setRnd(Math.random())        
    })
    .catch(err => {
        console.log(err)
    })
}


const handleCreate = (data) => {
    console.log('create')
    dispatch(
        createRole(values)
    )
    .then(a => {
        setRnd(Math.random())        
    })
    .catch(err => {
        console.log(err)
    })
}


const handleUpdate = (data) => {
    console.log('update')
    dispatch(
        updateRoleById(id, values)
    )
    .then(a => {
        setRnd(Math.random())        
    })
    .catch(err => {
        console.log(err)
    })

}


const handleGetById = () => {
    console.log('Get By Id')
    dispatch(
        getRoleById(id)
    ).then(a => {
        console.log(a) 
        setResp([a.data])
        setTimeout(() => {
            handleGet()
        }, 5000) 
    })
   .catch(err => {
       console.log(err)
   })
} 

const handleGet = () => {
    dispatch(
        getRoles()
        )  
    .then(a => {
        setResp(a.data)
    })
    .catch(err => {
        console.log(err)
    })
} 
    

useEffect(() => {
handleGet()
}, []);

useEffect(() => {
    handleGet();
}, [rnd])


  return (
      <>
    <div>TesterPage</div>
    <div>Id:  {JSON.stringify(id)}</div>
    <div>Data:  {JSON.stringify(values)}</div>
    <Button
        onClick={() => handleCreate()}
    >
        Create
    </Button>
    <Button
        onClick={() => handleUpdate()}
    >
        Update
    </Button>
    <Button
        onClick={() => handleGetById()}
    >
        Get By Id {id}
    </Button>
    <SelectList data={resp}
        onClick={handleClick}
    />
    </>
  )
}
