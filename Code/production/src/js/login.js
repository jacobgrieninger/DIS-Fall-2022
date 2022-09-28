import React from 'react';
import ReactDOM from 'react-dom/client';

function Test(props) {
    return <h1>test</h1>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Test />);