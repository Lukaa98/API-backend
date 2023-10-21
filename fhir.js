import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert
} from '@mui/material';

function Fhir() {
  const [displayNames, setDisplayNames] = useState([]);
  const [urls, setUrls] = useState([]);
  const [patientInfo, setPatientInfo] = useState([]);

  const [currentFamilyName, setCurrentFamilyName] = useState("");
  const [currentGivenName, setCurrentGivenName] = useState("");
  const [newFamilyName, setNewFamilyName] = useState("");
  const [newGivenName, setNewGivenName] = useState("");

  const [posts, setPosts] = useState([])
  const [addName, setAddName] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [postToDelete, setPostToDelete] = useState(null);





  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");


  const [idToDelete, setIdToDelete] = useState('');




useEffect(() => {
  fetch('http://hapi.fhir.org/baseR4/Patient')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const names = data.entry.map(entryItem => { // entry item is each individual item in data.entry
        const nameRecords = entryItem.resource.name; // use family given
        return nameRecords.map(nameRecord => {
          const givenNames = Array.isArray(nameRecord.given) ? nameRecord.given.join(' ') : '';
          return `${givenNames} ${nameRecord.family || ''}`.trim();
        }).join(', '); // Join multiple names with comma, if any.
      });
      // console.log(names)

      setDisplayNames(names);
    });
}, []);




  useEffect(() => {
    fetch('http://hapi.fhir.org/baseR4/Patient')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        const extractedData = data.entry.map(entryItem => {

          return {
            name: `${entryItem.resource.name?.[0].family || ''} 
                   ${entryItem.resource.name?.[0].given?.[0] || ''}`,
            gender: entryItem.resource.gender,
            birthDate: entryItem.resource.birthDate,
            address: `${entryItem.resource.address?.[0].use || ''} 
                      ${entryItem.resource.address?.[0].line || ''} 
                      ${entryItem.resource.address?.[0].city || ''}`


          };
        });
        setPatientInfo(extractedData);
      });
  }, []);

  

// https://jsonplaceholder.typicode.com/posts


useEffect (() => {
  fetch('https://jsonplaceholder.typicode.com/posts' ,{
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    }
  })
  
  .then(response => {
    if(!response.ok)
    {
      throw new Error('Network error' , response.statusText)
    }
    return response.json();
  })

  .then(data =>
    {
    //  data.map(dataItem => {

    //       return {
    //         userId: `${dataItem.userId?.[0] || ''}
    //         ${dataItem.id?.[0] || ''}
    //         ${dataItem.title?.[0] || ''}
    //         ${dataItem.body?.[0] || ''}`
    //       }

    //   })
      setPosts(data);

    })
}, [] )




const handleAddName = () => {
  // useEffect (() => {
    fetch("https://jsonplaceholder.typicode.com/posts" ,
  {
    method: "POST",
    body: JSON.stringify({
      "userId": 123,
      "id": 123,
      "title": "title",
      "body": "body"

        }),
    headers: {
      'Content-type': 'application/json',
    }
  })
  
  .then((response) => response.json())
  .then((addName) => 
  {
    setAddName(addName)
    console.log(addName)


  })

//   .catch((err) => {
//     console.log("error" ,err.message);
//  });

// }, [] )

}


const deletePost = (id) => {
  const post = posts.find(post => post.id === parseInt(id));
  setPostToDelete(post); // Save the post content

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      setDeleteMessage(`Post with ID ${id} has been deleted.`);
      setPosts(posts.filter(post => post.id !== parseInt(id)));
      return response.json();
    })
    .then((data) => {
      console.log('Deleted:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
      setDeleteMessage(`Failed to delete post with ID ${id}.`);
    });
};



  return (
    <Box>


                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Gender</TableCell>
                          <TableCell>Birth Date</TableCell>
                          <TableCell>Address</TableCell>
                        </TableRow>
                      </TableHead>


                      <TableBody>
                        {patientInfo.map((info, index) => (
                          <TableRow key={index}>
                            <TableCell>{info.name}</TableCell>
                            <TableCell>{info.gender}</TableCell>
                            <TableCell>{info.birthDate}</TableCell>
                            <TableCell>{info.address}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>

                      
                    </Table>
                  </TableContainer>



                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>userID</TableCell>
                          <TableCell>id</TableCell>
                          <TableCell>title</TableCell>
                          <TableCell>body</TableCell>
                        </TableRow>
                      </TableHead>


                  <TableBody>
                        {posts.map((info, index) => (
                          <TableRow key={index}>
                            <TableCell>{info.userId}</TableCell>
                            <TableCell>{info.id}</TableCell>
                            <TableCell>{info.title}</TableCell>
                            <TableCell>{info.body}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      </Table>
                  </TableContainer>


                  <Box  sx={{marginTop: 10}}>
        <TextField  label="userid" variant="outlined" value={userId} 
         onChange={(e) => setUserId(e.target.value)}/>
         <TextField  label="id" variant="outlined" value={id} 
         onChange={(e) => setId(e.target.value)}/>
         <TextField  label="title" variant="outlined" value={title} 
         onChange={(e) => setTitle(e.target.value)}/>
         <TextField  label="body" variant="outlined" value={body} 
         onChange={(e) => setBody(e.target.value)}/>
       <Button variant="contained" color="primary" 
        onClick={handleAddName}> Add Name
      </Button>
    </Box>



    <Box sx={{ marginTop: 10 }}>
        <TextField
          label="Enter ID to delete"
          variant="outlined"
          value={idToDelete}
          onChange={(e) => setIdToDelete(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => deletePost(idToDelete)}>
          Delete Post
        </Button>

        {/* Display delete message */}
        {deleteMessage && (
          <Alert severity="info" sx={{ marginTop: 2 }}>
            {deleteMessage}
          </Alert>
        )}

        {/* Display the content of the deleted post */}
        {postToDelete && (
          <Box sx={{ marginTop: 2 }}>
            <strong>Deleted Post Content:</strong>
            <div>UserID: {postToDelete.userId}</div>
            <div>ID: {postToDelete.id}</div>
            <div>Title: {postToDelete.title}</div>
            <div>Body: {postToDelete.body}</div>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Fhir;
