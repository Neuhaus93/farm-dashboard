import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { client } from "./api-contract";

const POST_ID = 4;

function App() {
  const { data } = client.getPost.useQuery(["post", POST_ID], {
    params: { id: String(POST_ID) },
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">{data && JSON.stringify(data)}</div>
    </>
  );
}

export default App;
