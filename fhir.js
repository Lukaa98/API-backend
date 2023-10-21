import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
      console.log(names)

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

    </Box>
  );
}

export default Fhir;
