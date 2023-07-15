import React from 'react'
import './Content.css'

const Content = ({ title, poster, mal_id }) => {
  return (

    <div className="content">
      <img className='poster' src={poster} alt={title} />
      <div className='info'>
        <b className='title'>{title}</b>
      </div>
    </div>
  )
}

export default Content