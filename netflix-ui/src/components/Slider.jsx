import React from 'react'
import styled from 'styled-components'
import CardSlider from './CardSlider'

export default React.memo (function Slider({movies}) {

    const getMoviesFromRange = (start,end) => {
        return movies.slice(start,end)
    }

  return (
    <div>
        <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)} />
        <CardSlider title="Top Rated" data={getMoviesFromRange(10,20)} />
        <CardSlider title="Action Movies" data={getMoviesFromRange(20,30)} />
        <CardSlider title="Comedy Movies" data={getMoviesFromRange(30,40)} />
        <CardSlider title="Horror Movies" data={getMoviesFromRange(40,50)} />
        <CardSlider title="Romance Movies" data={getMoviesFromRange(50,60)} />
        <CardSlider title="Documentaries" data={getMoviesFromRange(60,70)} />
    </div>
  )
}
)

// const div = styled.div` `
