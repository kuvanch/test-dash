import { Button, PageHeader, Divider, Row, Col, Table,Input, Space } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
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
    const [search,setSearch] = useState<string>('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(dataAction())
    }, [])
    const { data,total } = useTypedSelector(state => state.data)
    let dataSource:any = []
    data.filter( (val:any) => {
        if(search === '') {
            return val
        }
        else if (val.name.toLowerCase().includes(search.toLowerCase())){
            return val
        }
    }).map((item:any) =>  dataSource.push({...item,key: item.id}))
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
                        <Input value={search}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} 
                            placeholder="Search" />
                </Col>
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
