import React, { useState } from 'react'
import {url2, api_key,option} from '../Api'
import { AsyncPaginate } from 'react-select-async-paginate'


const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null)

    const loadingOptions = (movie_title) => {
    return fetch(`${url2}?query=${movie_title}&api_key=${api_key}&language=en-US`, option)
    .then(response => response.json())
    .then(res => {
        return {
            options : res.results.map((el) => {
                return {
                    value: `${el.original_title}`,
                    label: `${el.original_title}`,
                }
            })
        }
    })
    .catch(error => console.log(error))
    }

    const handleOnChange = (searching) => {
        setSearch(searching)
        onSearchChange(searching)
    }

  return (
    <div>
        <AsyncPaginate 
            placeholder='Search Movies...'
            loadOptions={loadingOptions}
            value={search}
            onChange={handleOnChange}
            debounceTimeout={600}
        />
    </div>
  )
}

export default Search