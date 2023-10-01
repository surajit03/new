import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function Serch() {
    const [coustomer, setCoustomer]=useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchCoustomer = async () => {
          const res = await axios.get(`/search${query}`);
          setCoustomer(res.data);
        };
        fetchCoustomer();
      }, [query]);
  return (
    <div>
         {coustomer.map(video=>(
      <Card key={coustomer.IdNumber} video={video}/>
    ))}
    </div>
  )
}

export default Serch
