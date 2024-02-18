import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("Error fetching data : ",error);
      }
    };
    fetchData();
  },[]);

  return (
    <>
    <div>
      {data ? (
        <div>
          {data.map((item) => (
            <div key={item.id} className='card'>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

    </>
  )
}

export default App
