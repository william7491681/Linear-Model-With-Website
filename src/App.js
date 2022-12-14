import { useState } from 'react'
import axios from "axios";

export default function App() {

   // new line start
  const [value, setValue] = useState(0)

  function getData() {

    axios.get(`http://localhost:8080`, {params: {
      carats: parseFloat(document.getElementById("carats").value),
      clarity: document.getElementById("clarity").value,
      color: document.getElementById("color").value
    }}).then((response) => {
      console.log(response)
      setValue(parseFloat(response.data.value))
    })

  }

  return(
    <div className='bg-slate-300 w-screen h-full'>
      <div className='flex w-screen h-[15vh] bg-slate-400 justify-center items-center'>
        <h1 className='text-6xl font-bold'>
          Diamond Price Prediction
        </h1>
      </div>
      <div className='h-full'>
        <div className='flex justify-between items-center pb-[82px] h-[50vh]'>
          <div className='flex flex-col text-center ml-16'>
            <label className="text-3xl font-semibold" htmlFor="carats">
              Carats
            </label>
            <input className='w-[200px] h-[60px] text-center rounded-md pr-1 pl-4 mt-2 text-xl
            shadow-md shadow-black bg-gray-50'
            type="number" id="carats" defaultValue={0}/>
          </div>
          <div className='flex flex-col text-center ml-16'>
            <label className="text-3xl font-semibold" htmlFor="carats">
              Clarity
            </label>
            <select className="w-[200px] h-[60px] text-center rounded-md pr-1 pl-4 mt-2 text-xl
            shadow-md shadow-black bg-gray-50"
            id='clarity'>
              <option defaultValue="IF">IF</option>
              <option value="VVS1">VVS1</option>
              <option value="VVS2">VVS2</option>
              <option value="VS1">VS1</option>
              <option value="VS2">VS2</option>
              <option value="SI1">SI1</option>
              <option value="SI2">SI2</option>
              <option value="I1">I1</option>
            </select>
          </div>
          <div className='flex flex-col text-center ml-16'>
            <label className="text-3xl font-semibold" htmlFor="carats">
              Color
            </label>
            <select className="w-[200px] h-[60px] text-center rounded-md pr-1 pl-4 mt-2 text-xl
            shadow-md shadow-black bg-gray-50"
            id='color'>
              <option defaultValue="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
              <option value="J">J</option>
            </select>
          </div>
          
          <button className='bg-green-500 hover:bg-green-700 h-[75px] w-[187.5px]
          text-white font-bold py-2 px-4 rounded-full mr-16 shadow-md shadow-black
          mt-9'
          onClick={getData}>
            Predict
          </button>
        </div>
        <div className="flex pt-10 h-[35vh] text-4xl font-semibold justify-center">
          <h1 className=''>
            Predicted Price: {value!=null ? "$"+value : "Invalid Request"}
          </h1>
        </div>
      </div>
    </div>
  )
}