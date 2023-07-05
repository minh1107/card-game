import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import * as cardImg from './asset/img/index'
import background from './asset/img/back.webp'

const App = () => {
  const [start, setStart] = useState(false)
  const [listCard, setListCard] = useState([])

  useEffect(() => {
    for (let j = 0; j < 2; j++) {
      for (let i = 1; i <= Object.keys(cardImg).length; i++) {
        setListCard(res => [...res, {
          link: cardImg[`no${i}`],
          doubleId: i
        }])
      }
    }
  }, [])

  const handleStart = () => {
    setStart(true)
    shuffleArray()
  }

  const shuffleArray = () => {
    listCard.forEach((item, index) => {
      let randomNumber = Math.floor(Math.random() * listCard.length)
      let change
      change = listCard[index]
      listCard[index] = listCard[randomNumber]
      listCard[randomNumber] = change 
    })
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setStart(!start);
        shuffleArray()
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [start]);
  const [point, setPoint] = useState(0)
  const [compare, setCompare] = useState([])
  const handleClickImg = (index, item, doubleId) => {
    if (imgRef.current[index].src.includes(background)) {
      imgRef.current[index].src = item
    } else {
      imgRef.current[index].src = background
    }
    if (compare.length < 2) {
      setCompare(pre => [...pre, { doubleId, index }])
    } else {
      setCompare([])
    }
  }

  useEffect(() => {
    if (compare.length === 2) {
      if (compare[0].doubleId === compare[1].doubleId) {
        setCompare([])
      }
      else {
        setTimeout(() => {
          try {
            imgRef.current[compare[0]?.index].src = background
            imgRef.current[compare[1]?.index].src = background
          } catch (error) {
              console.log(error)
          }
        }, 500);
        setCompare([])
      }
    }
  }, [compare])

  const imgRef = useRef([])
  return (
    <div className='app'>
      {
        start ?
          <div>
            <div className='img_total'>
              {
                listCard.map((item, index) => (
                  <img alt='' ref={(el) => imgRef.current[index] = el} src={background} onClick={() => handleClickImg(index, item.link, item.doubleId)} className='img__card' />
                ))
              }
            </div>
          </div> :
          <div >
            <div onClick={handleStart} className='start'>Start</div>
            <div className='start__change'>Press ESC to toggle screen</div>
          </div>
      }
    </div>
  )
}

export default App