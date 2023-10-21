import React, { useEffect, useState } from 'react';
import { Card, CardContent, Box, TextField, Button } from '@mui/material';

function ListName() {
  const [displayNames, setDisplayNames] = useState([]);
  const [currentName, setCurrentName] = useState(''); // Holds the current name to be updated
  const [newName, setNewName] = useState(''); // Holds the new name to update to
  const [nameToDelete, setNameToDelete] = useState(''); // Holds the new name to update to

  
  useEffect(() => {
    fetch('http://localhost:3001/listnames')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })

      .then(displayNames => {
        setDisplayNames(displayNames);
      });
  }, []);




  const updateName = () => {
    fetch('http://localhost:3001/updateName', {
      method: 'PUT',
      body: JSON.stringify({
        currentName: currentName,
        newName: newName
      }),
      headers: {
        'Content-type': 'application/json',
      }
    })
    .then(response => {
      console.log("Raw Response:", response.json);
      return response.json();
    })
      .then(data => {
        console.log("json data",data)     
        setDisplayNames(prevNames => prevNames.map(name => name === currentName ? newName : name));
      }
    )
    .catch(err => {
      console.log('error', err.message);
    });
  };



  const deleteName = (nameToDelete) => {
    fetch('http://localhost:3001/deleteName', {
      method: 'DELETE',
      body: JSON.stringify({
        name: nameToDelete,
      }),
      headers: {
        'Content-type': 'application/json',
      }
    })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
        console.log(data.message);
        // Filter out the deleted name and update the state
        const updatedNames = displayNames.filter(name => name !== nameToDelete);
        setDisplayNames(updatedNames);
      })
  .catch(err => {
      console.log('error', err.message);
  });
}


  return (
    <Box sx={{ marginTop: 10 }}>
      <Box sx={{ marginBottom: 2 }}>
        <TextField 
          label="Current Name"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
        />
        <TextField 
          label="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          sx={{ marginLeft: 2 }}
        />
        <Button onClick={updateName} variant="contained" color="primary" sx={{ marginLeft: 2 }}>
          Update
        </Button>
      </Box>

      {
        displayNames.map((name, index) => (
          <Card key={index} sx={{ margin: 2, width: 400 }}>
            <CardContent>
              {index}: {name}
              <Button onClick={() => deleteName(name)} variant="contained" color="secondary" sx={{ marginLeft: 30 }}>
              Delete
          </Button>
            </CardContent>
          </Card>
        ))
      }
    </Box>
  );
}

export default ListName;
