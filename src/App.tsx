import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [state, setState] = React.useState({
    post: "",
    response: "",
    responseToPost: "",
  });

  const handleSubmit = React.useCallback(async () => {
    const response = await fetch("/api/messages", {
      body: JSON.stringify({ post: state.post }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const body = await response.text();
    setState((s) => ({ ...s, responseToPost: body }));
  }, [state]);

  const callApi = React.useCallback(async () => {
    const response = await fetch("/api/users/1234");
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }, []);

  React.useEffect(() => {
    callApi()
      .then((res) => setState((s) => ({ ...s, response: res.express })))
      // tslint:disable-next-line:no-console
      .catch((err) => console.log(err));
  }, [callApi]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{state.response}</p>

      <p>
        <strong>Post to Server:</strong>
      </p>
      <input
        type="text"
        value={state.post}
        // tslint:disable-next-line jsx-no-lambda
        onChange={(e) => setState((s) => ({ ...s, post: e.target.value }))}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>

      <p>{state.responseToPost}</p>
    </div>
  );
}

export default App;
