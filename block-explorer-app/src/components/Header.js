import React, { useState } from "react";

function Header() {

  const [txid, setTxid] = useState('');

  function submit() {
    window.location.href = `/transaction-details/${txid}`;
  }

  function goBack() {
    window.location.href = `/blocks`;
  }

  return (
    <header className="p-3 bg-emerald-400">
      <div onClick={goBack} className="absolute text-teal-50">
        <svg xmlns="httåp://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </div>
      <h1 className="text-teal-50">Block Explorer</h1>
      <div>
        <span className="text-teal-50">Search transaction details</span>
        <br />
        <input onChange={(e) => setTxid(e.target.value)} type="text" placeholder="Type transaction id (txid)" className="ml-2 mt-2 p-2 border rounded-lg w-52" />
        <button onClick={submit} className="ml-2 p-2 bg-emerald-500 text-white rounded-lg">Search</button>
      </div>
    </header>
  );
}

export default Header;
