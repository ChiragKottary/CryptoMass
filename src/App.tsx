import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import { Layout, Typography, Space} from "antd";
import {
  CryptoDetails,
  Cryptocurrencies,
  Exchanges,
  Homepage,
  Navbar,
  News,
} from "./components";
function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/exchanges" element={<Exchanges />}></Route>
              <Route
                path="/cryptocurrencies"
                element={<Cryptocurrencies simplified={false} />}
              ></Route>
              <Route path="/crypto/:coinId" element={<CryptoDetails />}></Route>
              <Route path="/news" element={<News simplified={false} />}></Route>
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            CryptoMass
            <br />
            All Rights Reserved
          </Typography.Title>
          <Space style={{ textAlign: "center", color: "white" }}>
            <Link className="links" to="/">
              Home
            </Link>
            <Link className="links" to="/exchanges">
              Exchanges
            </Link>
            <Link className="links" to="/cryptocurrencies">
              Cryptocurrencies
            </Link>
            <Link className="links" to="/cryptoDetails">
              CryptoDetails
            </Link>
            <Link className="links"  to="/news">
              News
            </Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
