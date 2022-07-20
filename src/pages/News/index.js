// @ts-nocheck
import React, { useEffect, useState } from 'react'
import axios from '../../components/tools/http'
import { PageHeader, Card, Col, Row, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import _ from "lodash";
export default function Index() {
    const navigate = useNavigate()
    const [newsList, setNewsList] = useState([])
    useEffect(() => {
        axios.get(`/news?publishState=2&_expand=category`).then(res => {
            if (res.data.length > 0) {
                setNewsList(Object.entries(_.groupBy(res.data, (item) => item.category.title)))
            }
        })
    }, [])
    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title="全球大新闻"
                subTitle="查看新闻"
            />
            <div className="site-card-wrapper">
                <Row gutter={[16, 16]}>
                    {
                        newsList.map(val => {
                            return (
                                <Col span={8} key={val[0]}>
                                    <Card title={val[0]} bordered={true} hoverable={true}>
                                        <List
                                            size="large"
                                            pagination={{ pageSize: 2 }}
                                            bordered
                                            dataSource={val[1]}
                                            renderItem={(item) => 
                                            <List.Item>
                                                <a onClick={() => navigate(`/detail/${item.id}`, {
                                                    state: {
                                                        row: item
                                                    }
                                                })}>{item.title}</a>
                                            </List.Item>}
                                        />
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </div>
    )
}
