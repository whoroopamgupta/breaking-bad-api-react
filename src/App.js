import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/ui/Header';
import CharacterGrid from './components/characters/CharacterGrid'

const App = () => {

  const [items, setItems] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [text, setText] = useState('')

  const onChange= (q) => {
        setText(q);
        setQuery(q)
    }

  useEffect(()=>{
    const fetchItems = async () =>{
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`)
      setItems(result.data)
      setIsLoading(false)
    }
    fetchItems()
  },[query])

  return (
    <div className="container">
      <Header/>
      <section className="search">
            <form>
                <input type="text" className='form-control' placeholder='Search characters' value={text} onChange={(e) => onChange(e.target.value)} autoFocus />
            </form>
        </section>
      <CharacterGrid isLoading={isLoading} items = {items} />
    </div>
  );
}

export default App;
