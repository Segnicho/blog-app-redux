import { useState } from 'react'
import BlogList from './BlogList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div
    className='mx-auto px-auto'
    >
    <h1>Hello There Welcome to the Segni's Blog</h1>
    <BlogList />
    </div>
  )
}

export default App
