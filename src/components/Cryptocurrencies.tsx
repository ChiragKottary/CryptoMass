import { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptoQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }: { simplified: boolean }) => {
  interface coinType {
    uuid: string;
    rank: number;
    name: string;
    iconUrl: string;
    price: string;
    marketCap: string;
    change: string;
  }

  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptoQuery(count) 
  const [cryptos, setCryptos] = useState<coinType[]>(cryptosList?.data?.coins);
  const [filterCrypto, setFilterCrypto] = useState("");
console.log(cryptosList);

  useEffect(() => {
    const filter: coinType[] = cryptosList?.data?.coins.filter((coin: coinType) =>
      coin.name.toLowerCase().includes(filterCrypto)
    );
    setCryptos(filter);
  }, [cryptosList, filterCrypto]);

  if (isFetching) {
    return <Loader/>;
  }
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={e => setFilterCrypto(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((curr: coinType) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={curr.uuid}>
            <Link key={curr.uuid} to={`/crypto/${curr.uuid}`}>
              <Card
                title={`${curr.rank}. ${curr.name}`}
                extra={<img className="crypto-image" src={curr.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(parseInt(curr.price))}</p>
                <p>Market Cap: {millify(parseInt(curr.marketCap))}</p>
                <p>Daily Change: {millify(parseInt(curr.change))}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
