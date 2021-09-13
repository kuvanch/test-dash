import { Button, PageHeader, Divider, Row, Col, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import dataAction from '../redux/actions/dataAction';
import { useHistory } from 'react-router-dom'
export const Home = () => {
    const history = useHistory()
    
    const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Supplier',
        dataIndex: 'supplier',
        key: 'supplier',
    },
    ];
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(dataAction())
    }, [])
    const { data,total } = useTypedSelector(state => state.data)
    const dataSource:any = []
    data.map((item:any) =>  dataSource.push({...item,key: item.id}))
    const onChangePagination = (page:number) => {
        dispatch(dataAction(page))
    }
    const handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('subdomen')
        history.push('/')
    }
    return (
        <>
           <PageHeader
                className="site-page-header"
                title="Dashboard"
                extra={[
                    <Button onClick={handleLogOut} key="1" type="primary">
                      Выход
                    </Button>,
                  ]}
            />
            <Divider/>
            <Row>
                <Col span={12} offset={6}>
                    <Table pagination={{
                        total: total,
                        pageSize: 10,
                        showSizeChanger: false,
                        onChange: onChangePagination,
                    }} 
                    dataSource={dataSource} columns={columns} />
                </Col>
            </Row>
        </>
    )
}
