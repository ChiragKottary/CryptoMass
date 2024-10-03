import {  Typography, Row, Col, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";
const demoImage ="https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const { Text, Title } = Typography;

type NewsArticle = {
  title: string;
  summary: string;
  media: string[];  // Array of media URLs
  link: string;
  authors: { name: string }[];  // Array of author objects with name field
  published: string;  // Published date in ISO format
  category: string;
  subCategory: string;
  language: string;
  timeZone: string;
};
type NewsResponse = NewsArticle[];
const News = ({ simplified }: { simplified: boolean }) => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    count: simplified ? 6 : 12,
  }) as { data: NewsResponse; isFetching: boolean };
  if (isFetching) {
    return <Loader/>
  }
  return (
    <Row gutter={[24, 24]}>
      {cryptoNews?.map((news: NewsArticle, i: number): any => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news?.media[0] || demoImage}
                  alt="news"
                  width="130px"
                />
              </div>
              <p>
                {news.summary.length > 100
                  ? `${news.summary.substring(5, 400)}...`
                  : news.summary}
              </p>
              <div className="provider-container">
                <div>
                  <Text className="provider-name">{news?.authors[0].name}</Text>
                </div>
                <Text>
                  {moment(news.published).startOf("minutes").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
