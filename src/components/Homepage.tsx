import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptoQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { Cryptocurrencies, News } from ".";
import Loader from "./Loader";

const { Title } = Typography;
const Homepage = () => {

  interface datas {
    total: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: string;
    total24hVolume: string;
  }
  const { data, isFetching } = useGetCryptoQuery(10);

  const globaldata: datas = data?.data?.stats;

  if (isFetching) {
    return <Loader/>;
  }

  return (
    <>
      <Title level={2} className="heading">
        {" "}
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globaldata.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globaldata.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(parseInt(globaldata.totalMarketCap))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(parseInt(globaldata.total24hVolume))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globaldata.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
