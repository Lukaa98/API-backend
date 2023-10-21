import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


function AddName() {
  const [name, setName] = useState(null);
  const [addName, setAddName] = useState(null);
  const [inputName, setInputName] = useState(''); // State to hold input value


  // useEffect(() => {
  //   fetch("http://localhost:3001/name")
  //   .then((response) => response.text())
  //   .then((name) => {
  //     setName(name);
  //   })
  //   .catch((error) => {
  //     console.error("there was an error in name ", error);
  //   });
  // }, []);


  const handleAddName = () => {
      fetch("http://localhost:3001/addname" ,
      {
        method: "POST",
        body: JSON.stringify({
          "firstName": inputName
            }),
        headers: {
          'Content-type': 'application/json',
        }
      })
      
      .then((response) => response.json())
      .then((addName) => 
      {
        setAddName(addName)
  
      })
    
      .catch((err) => {
        console.log("error" ,err.message);
     });

  }


  
  
  



  return (
  
    <Box  sx={{marginTop: 10}}>
    <TextField  label="Name" variant="outlined" value={inputName} 
      onChange={(e) => setInputName(e.target.value)}/>
       <Button variant="contained" color="primary" 
        onClick={handleAddName}> Add Name
      </Button>
    </Box>

  )

}

export default AddName;
