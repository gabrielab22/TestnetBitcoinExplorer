import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlockList from "./components/BlockList";
import TrasactionDetails from "./components/TransactionDetails";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BlockList />} />
                <Route path="/blocks" element={<BlockList />} />
                <Route path="/transaction-details/:txid" element={<TrasactionDetails />} />
                <Route path="*" element={<div> Not Found or You do not have permission.</div>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;