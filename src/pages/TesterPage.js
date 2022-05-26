import React, { useEffect, useState } from 'react';


//Component
import SelectList from '../components/Lists/SelectableList';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
    createPayment,
    getPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById,
 } from '../redux/actions/crud.action';
import { Button } from '@mui/material';




export default function TesterPage() {
    const dispatch = useDispatch();
    const [rnd, setRnd] = useState(0);
    const [id, setId] = useState('628f121419bd7c263443f097');
    const [values, setValues] = useState({
        order_id: 'rh123',
        customer_id: '253123123',
        business_id: 'drinks123',
        description: 'drinks1',
        amount: "999",
        type: "drinks",
        receivedBy: "jim",
        notes: "test 234"
        
        
    });
    const [resp, setResp] = useState([]);


const handleClick = (data) => {
    console.log(data)
    dispatch(
        deletePaymentById(data._id)
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
        createPayment(values)
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
        updatePaymentById(id, values)
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
        getPaymentById(id)
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
        getPayments()
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
