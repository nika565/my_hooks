import { useEffect } from 'react'
import './App.css'
import { useAsync } from './hooks/useAsync'


const fetchData = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts/')
  const json = await data.json()
  return json
}

function App() {
  const [reFetchData, result, error, status] = useAsync(fetchData, false)

  useEffect(() => {
    console.log('RESULT:', result)
    console.log('ERROR:', error)
    console.log('STATUS:', status)
  }, [result, error, status])

  useEffect(() => {
    reFetchData()
  }, [reFetchData])

  if (status === 'idle') {
    return <pre>Nada executando</pre>
  }

  if (status === 'pending') {
    return <pre>Carregando...</pre>
  }

  if (status === 'error') {
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }

  if (status === 'settled') {
    return <pre>{JSON.stringify(result, null, 2)}</pre>
  }
}

export default App
