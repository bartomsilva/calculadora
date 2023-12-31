// import Image from 'next/image'
import { Inter } from 'next/font/google'
import Result from 'postcss/lib/result'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [lastKey, setLastKey] = useState<string>("")
  const [start, setStart] = useState(true)
  const [expression, setExpression] = useState<string>("")
  const [lineUp, setLineUp] = useState<string>("")
  const [lineDown, setLineDown] = useState<string>("")

  function isSymbol(key: string) {
    return "+-/*.".includes(key)
  }

  function lastkey() {
    return lineDown.charAt(lineDown.length - 1)
  }

  function isSymbolEqualLastKey(key: string, lastKey: string) {
    return isSymbol(key) && isSymbol(lastKey)
  }

  function setValue(key: string) {

    if (isSymbol(key) || !isNaN(+key) || key==='.') {
      if (!isNaN(+key) || key==='.') {
        let newLineUp = lineUp.replace(/[*\-+/]/g, '') + key
        setLineUp(newLineUp)
      } else {
        if (!isSymbolEqualLastKey(key, lastkey()) && lineDown.length) {
          setLineUp(key)
        }
      }
    }

    let newExpression = ""

    switch (true) {
      case key == "CE":
        setExpression("")
        setLineUp("")
        setLineDown("")
        setStart(true)
        break
      case (key == "BS"):
        newExpression = expression.slice(0, -1)
        const newLineUp = lineUp.toString().slice(0, -1)
        setExpression(newExpression)
        setLineDown(newExpression)
        if (start) {
          setLineUp(newLineUp)
        } else {
          setLineUp("")
        }
        break
      case key == "=":
        if (!isSymbol(lineDown.charAt(lineDown.length - 1))) {
          let result = eval(lineDown)
          if (!Number.isInteger(result)) {
            result = result.toFixed(2)
          }
          setLineUp(result)
          setStart(false)
        }
        break
      case (key !== "BS"):
        const lastKey = lastkey()
        if (!isSymbolEqualLastKey(key, lastKey)) {
          newExpression = expression + key
          setExpression(newExpression)
          setLineDown(newExpression)
        }
    }
    setLastKey(key)

  }
  return (

    <main className="calculator">
      <h1 className='text-3xl mb-3'>Simplizinha - By Bart</h1>

      <div className='display'>
        <div className='lineUpDisplay bg-zinc-300'>
          {lineUp}
        </div>
        <div className='lineDownDisplay'>
          {lineDown}
        </div>
      </div>

      <div className='calcPanel'>
        <div className="containerNumbers">
          <div className='containerButtons'>
            <button onClick={() => setValue('7')} className='buttonSmall'>7</button>
            <button onClick={() => setValue('8')} className='buttonSmall'>8</button>
            <button onClick={() => setValue('9')} className='buttonSmall'>9</button>
          </div>
          <div className='containerButtons'>
            <button onClick={() => setValue('4')} className='buttonSmall'>4</button>
            <button onClick={() => setValue('5')} className='buttonSmall'>5</button>
            <button onClick={() => setValue('6')} className='buttonSmall'>6</button>
          </div>
          <div className='containerButtons'>
            <button onClick={() => setValue('1')} className='buttonSmall'>1</button>
            <button onClick={() => setValue('2')} className='buttonSmall'>2</button>
            <button onClick={() => setValue('3')} className='buttonSmall'>3</button>
          </div>
          <div className='containerButtons'>
            <button onClick={() => setValue('0')} className='buttonMedium'>0</button>
            <button onClick={() => setValue('.')} className='buttonSmall'>.</button>
          </div>
        </div>

        <div className='containerSymbols'>
          <div className='containerButtons'>
            <button onClick={() => setValue('CE')} className='buttonSmall bg-[#4a8cfa]'>CE</button>
            <button onClick={() => setValue('BS')} className='buttonSmall bg-[#fa4a4a]'>◄-</button>
          </div>
          <div className='containerButtons'>
            <button onClick={() => setValue('/')} className='buttonSmall'>/</button>
            <button onClick={() => setValue('*')} className='buttonSmall'>*</button>
          </div>
          <div className='containerButtons'>
            <button onClick={() => setValue('-')} className='buttonSmall'>-</button>
            <button onClick={() => setValue('+')} className='buttonSmall'>+</button>
          </div>
          <div className='containerButtons'>
            <button onClick={() => setValue('=')} className='buttonUniq bg-[#F4F622]'>=</button>
          </div>
        </div>
      </div>

    </main>
  )
}

// function getValueButton(key: string) {

//   console.log(key)
// }

