"use client"
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Button,
    ConfigProvider,
    Dropdown,
    Flex,
    Form,
    Input,
    Select,
    Space,
    Table,
} from "antd";
import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { FaEllipsisH, FaEllipsisV } from "react-icons/fa";
import { FilterItem } from "./FilterItems";
import moment from 'moment'
import axios from "axios";
import { CreateModal } from "./createModal";

function TableRender({ columns, url, onSelected, formCreateElement, ...props }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSelectedRows, setIsSelectedRows] = useState(false);
    const [filterItems, setFilterItems] = useState([])
    const [error, setError] = useState({
        isError: false,
        message: "",
        title: "",
    });
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
        filters: {},
        queryString: "",
        sorter: {
            field: columns[0].key,
            order: "ascend",
        },
    });


    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
            setIsSelectedRows(selectedRows.length > 0)
            onSelected?.handle && onSelected?.handle(selectedRows)

            console.log(selectedRows)
        },
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams), props.reloadData]);

    const fetchData = async () => {
        setLoading(true);
        try {
            let filterQueriesStr = tableParams.queryString
            let sortQueries =
                tableParams.sorter?.field && tableParams.sorter?.order
                    ? `&sortBy=${tableParams.sorter?.field}&order=${tableParams.sorter?.order === "ascend" ? "asc" : "desc"
                    }`
                    : "";
            const respone = await axios.get(
                `http://localhost:3001/api${url}/all?page=${tableParams.pagination?.current}
				&pageSize=${tableParams.pagination?.pageSize}${sortQueries}${filterQueriesStr}${props.queryStr ? `&${props.queryStr}` : ""}`
            )

            console.log(respone)
            const results = respone.data
            let data = results.data.map((item) => ({
                ...item,
                key: item.id,
            }));
            if (props.excludeDataHasIds) {
                data = data.filter((item) => !props.excludeDataHasIds?.includes(item.id))
            }
            setData(data);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    pageSize: results.pageSize,
                    current: results.page,
                    total: results.total,
                },
            });
        } catch (error) {
            setLoading(false)
            console.log(error);
            setError({
                isError: true,
                title: error?.name || "Something went wrong!",
                message: error?.message || "Unknown error",
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        console.log(pagination, filters, sorter, extra);
        if (Array.isArray(sorter)) {
            const firstSorter = sorter[0];
            console.log("Sorter is array");
            setTableParams(prev => ({
                ...prev,
                pagination,
                filters,
                sorter: {
                    field: firstSorter?.field || prev.sorter?.field,
                    order: firstSorter?.order || prev.sorter?.order,
                },
            }));
        } else {
            console.log("Sorter is not an array");

            setTableParams(prev => ({
                ...prev,
                pagination,
                filters,
                sorter: {
                    field: sorter?.field || prev.sorter?.field,
                    order: sorter?.order || prev.sorter?.order,
                },
            }));
        }
    };

    const handleCloseError = () => {
        console.log(error);
        setError({ isError: false, title: "", message: "" });
    };

    const handleSortFieldChange = (key) => {
        console.log(key, tableParams);
        setTableParams((prev) => ({
            ...prev,
            sorter: { ...prev.sorter, field: key },
        }));
        // setChecker(prevState => !prevState)
        console.log(tableParams);
    };

    const handleToggleSorter = () => {
        setTableParams((prev) => ({
            ...prev,
            sorter: {
                ...prev.sorter,
                order: prev.sorter?.order === "ascend" ? "descend" : "ascend",
            },
        }));
        // setChecker(prevState => !prevState)
    };

    const handleApplyFilter = (values) => {
        console.log(values)
        let queryStr = ""
        for (let key of Object.keys(values)) {
            if (["startsWith", "endsWith", "like", "contains"].includes(values[key].expr)) {
                queryStr = values[key].value ? `${queryStr}&${key}_${values[key].expr}=${values[key].value}` : queryStr
            } else if (["today", "last7day", "currentMonth"].includes(values[key].expr)) {
                const timeQuery = timeConvert(values[key].expr)
                queryStr = `${queryStr}&${key}_gt=${timeQuery}`
            } else if (["lastXDays"].includes(values[key].expr)) {
                console.log("fmnajsdfacmd", values[key])
                const timeQuery = timeConvert(values[key].expr, Number(values[key].value))
                queryStr = values[key].value ? `${queryStr}&${key}_gt=${timeQuery}` : queryStr
            } else if (["before", "after"].includes(values[key].expr)) {
                queryStr = values[key].value ? `${queryStr}&${key}_gt=${values[key].value.toString()}` : queryStr
            } else if (values[key].expr === "in") {
                let str = ""
                if (values[key].value) {
                    let array = values[key].value
                    if (array.length === 1) {   
                        queryStr = `${queryStr}&${key}_in=${array[0]}`
                    } else {
                        str = array.join(";")
                        queryStr = `${queryStr}&${key}_in=${str}`
                    }
                }
            }
        }

        console.log(queryStr)
        setTableParams(prev => ({
            ...prev,
            queryString: queryStr
        }))
    }

    const timeConvert = (type, numDays) => {
        const firstTimeOfToday = new Date();
        firstTimeOfToday.setHours(0, 0, 0, 0);

        // Get the first time of the last 7 days
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        last7Days.setHours(0, 0, 0, 0);

        // Get the first time of the current month
        const firstTimeOfCurrentMonth = new Date();
        firstTimeOfCurrentMonth.setDate(1);
        firstTimeOfCurrentMonth.setHours(0, 0, 0, 0);
        const formatter = (dateTime) => moment.time(dateTime).format(dateTime)
        if (type === "today") {
            return formatter(firstTimeOfToday);
        } else if (type === "last7day") {
            return formatter(last7Days)
        } else if (type === "currentMonth") {
            return formatter(firstTimeOfCurrentMonth)
        } else if (type === "lastXDays" && numDays && numDays > 0) {
            const lastXDays = new Date()
            lastXDays.setDate(last7Days.getDate() - numDays);
            lastXDays.setHours(0, 0, 0, 0);
            return formatter(lastXDays)
        }
    }

    const handleAddFilterItem = (key) => {
        if (props.filterItems) {
            const item = props.filterItems.find(item => item.key === key)
            if (item) {
                setFilterItems(prev => [...prev, item])
            }
        }
    }

    const handleDeleteFilteritem = (key) => {
        if (props.filterItems) {
            console.log(filterItems, key)
            filterItems.filter(item => item.key !== key)
            console.log(filterItems, key)

            setFilterItems(filterItems.filter(item => item.key !== key))
        }
    }

    const handleClearFilter = () => {
        setFilterItems([])
        setTableParams(prev => ({...prev, queryString: ""}))
    }

    const remainingFilterItems = props.filterItems ? props.filterItems.filter((item) => {
        const keys = filterItems.map(item => item.key);
        return !keys.includes(item.key)
    }) : []

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        footerBg: "#fff",
                    },
                    Form: {
                        itemMarginBottom: 16,
                    },
                    Input: {
                        addonBg: "#F6FAFD",
                        colorFillTertiary: "#F6FAFD",
                    },
                    InputNumber: {
                        addonBg: "#F6FAFD",
                        colorFillTertiary: "#F6FAFD",
                    },
                    DatePicker: {
                        colorFillTertiary: "#F6FAFD",
                    },

                    Select: {
                        colorFillTertiary: "#F6FAFD",
                    },
                },
            }}
        >

            <div className="w-100 d-flex flex-column h-75">
                {/* {error.isError && (
                    <Alert
                        message={error.title}
                        description={error.message}
                        type="error"
                        showIcon
                        onClose={handleCloseError}
                        closeIcon
                    />
                )} */}
                <div className="w-full d-flex border bg-white shadow py-2 px-4 my-1 border rounded shadow" >
                    <div className="flex-1 d-flex align-items-center w-25">
                        <Input
                            placeholder="Enter keywork to search...."
                            prefix={<SearchOutlined className="site-form-item-icon px-2 text-gray-500" />}
                        />
                        {props.filterItems &&
                            <Dropdown
                                disabled={remainingFilterItems.length === 0}
                                menu={{
                                    items: [
                                        {
                                            key: "1",
                                            type: 'group',
                                            label: "Filter",
                                            children: remainingFilterItems.map((item) => ({
                                                label: item.title,
                                                key: `1-${item.key}`,
                                                onClick: (menuInfo) => {
                                                    handleAddFilterItem(menuInfo.key.split("-")[1])
                                                }
                                            }))
                                        }
                                    ]
                                }}
                            >
                                <FaEllipsisV />
                            </Dropdown>}
                    </div>
                    {
                        formCreateElement && <CreateModal
                            afterCreated={() => fetchData()}
                            createUrl={url}
                            formElement={formCreateElement}
                        />
                    }

                </div>

                {props.filterItems && filterItems.length > 0 && <Form onFinish={handleApplyFilter}>
                    <div className="w-full border bg-white shadow py-2 px-4 my-1 border rounded shadow">
                        <div className="d-flex flex-wrap justify-content-start">
                            {
                                filterItems.map((item) => (
                                    <div className="w-25 px-2">
                                        <FilterItem
                                            type={item.type}
                                            fieldName={item.fieldName}
                                            key={item.key}
                                            title={item.title}
                                            options={item.options}
                                            onDelete={() => handleDeleteFilteritem(item.key)}
                                        />
                                    </div>
                                ))
                            }
                        </div>

                        {filterItems.length > 0 && <Form.Item>
                            <Space className="mt-2">
                                <Button htmlType="submit">Apply</Button>
                                <Button onClick={handleClearFilter}>Clear filters</Button>
                            </Space>
                        </Form.Item>}
                    </div>
                </Form>}
                {onSelected && isSelectedRows && onSelected?.render &&
                    <div className="border bg-white shadow py-2 px-4 my-1 border rounded shadow" >
                        {onSelected.render()}
                    </div>}
                <div className="border bg-white shadow py-2 px-4 my-1 border rounded shadow" >
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center me-4">
                            <p className="my-0 me-2">Sort by: </p>
                            <Select
                                // style={{ width: '20%' }}
                                placeholder="Columns"
                                value={tableParams.sorter?.field?.toString() || columns[0]}
                                onChange={handleSortFieldChange}
                                options={columns && columns.map((item) => ({
                                    value: item.key,
                                    label: item.title,
                                }))}
                            />
                        </div>

                        <div className="d-flex align-items-center">
                            <p className="my-0 me-2">Order: </p>
                            <Button onClick={handleToggleSorter} icon={tableParams.sorter?.order === "ascend" ? (
                                <SortAscendingOutlined />
                            ) : (
                                <SortDescendingOutlined />
                            )} />
                        </div>
                    </div>

                </div>



                <div className="border bg-white shadow py-2 px-4 my-1 border rounded shadow flex-1" >
                    <Table
                        rowSelection={{
                            ...rowSelection,
                        }}
                        className="h-100"
                        columns={columns}
                        pagination={{
                            className: "bg-white rounded px-4 py-2 justify-content-center",
                            showTotal: (total) => `Total ${total} items`,
                            position: ["bottomCenter", "bottomRight"],
                            showSizeChanger: true,
                            showQuickJumper: true,
                            total: tableParams.pagination?.total,
                            pageSize: tableParams.pagination?.pageSize,
                        }}
                        loading={loading}
                        dataSource={data}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
        </ConfigProvider >
    )
};

export default TableRender;