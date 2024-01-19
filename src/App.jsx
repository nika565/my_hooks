import { useState } from 'react'
import { useFetch } from './hooks/useFetch'



export const App = () => {

  const url = 'https://jsonplaceholder.typicode.com/posts/'

  const objOptions = {
    method: 'GET',
    headers: {
      abc: '1',
      "Content-type": "application/json"
    }
  }

  const [postId, setPostId] = useState('')
  const [result, loading] = useFetch(url + postId, objOptions)

  if (loading) return <p>Loading...</p>

  const handleClick = (id) => {
    setPostId(id)
  }

  if (!loading && result) {
    return (
      <div>
        {result?.length > 0 ? result.map(p => (

          <div key={p.id} onClick={() => handleClick(p.id)}>
            <p>{p.title}</p>
          </div>

        )) : (
          <div key={result.id} onClick={() => handleClick('')}>
            <p>{result.title}</p>
          </div>
        )}

      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Oi</h1>
    </div>
  )

}