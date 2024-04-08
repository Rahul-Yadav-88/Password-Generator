import React, { useCallback, useState, useEffect, useRef } from "react";
const App = () => {
  const [length, setLength] = useState(8);
  const [char, setChar] = useState(false);
  const [num, setNum] = useState(false);
  const [pak, setPsk] = useState("");
  const inputRef = useRef(null)
  const copyPasswordToClipboard = useCallback(()=>{window.navigator.clipboard.writeText(pak)},[pak])
  const Pskgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*()*{}[]";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPsk(pass);
  }, [length, char, num, setPsk]);
useEffect(()=>{Pskgen()},[length, char, num, Pskgen])
  return (
    <>
      <div className="w-full max-w-screen-md mx-auto shadow-lg h-60 rounded-xl px-4 my-8 font-bold text-3xl bg-gray-600">
        <h1 className="text-white pt-4 text-6xl ">Password Generator</h1>
        <div className="flex shadow mt-10 rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={pak}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={inputRef}
          />
          <button
          onClick={copyPasswordToClipboard} 
          className="outline-none bg-blue-600 text-white px-3 py-0.5 hover:bg-blue-300 shrink-0"> Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }} />
            <label className="text-lg">Length: {length}</label>
          </div>
          <div className="flex items-center ml-6 gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="numInput"
              
              onChange={() => { setNum((prev) => !prev) }} />
            <label htmlFor="numInput" className="text-lg">Number</label>
          </div>
          <div className="flex items-center ml-6 gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="numInput"
              onChange={() => { setChar((prev) => !prev) }} />
            <label htmlFor="charInput" className="text-lg">Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
