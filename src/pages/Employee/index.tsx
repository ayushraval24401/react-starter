// src/pages/ExamplePage.tsx
import { Button, Space, Tag } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import TabPane from 'antd/es/tabs/TabPane';
import GlobalTable from 'components/Table';
import GlobalTabs from 'components/Tabs';
import React, { useState } from 'react';

const ExamplePage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalRecords, setTotalRecords] = useState(100);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	// Sample data with more fields
	const tableData = Array.from({ length: 100 }, (_, index) => ({
		id: index + 1,
		name: `User ${index + 1}`,
		age: Math.floor(Math.random() * 60) + 20,
		email: `user${index + 1}@example.com`,
		address: `Address ${index + 1}, City ${index % 10}, Country`,
		status: index % 3 === 0 ? 'active' : 'inactive',
		joinDate: new Date(
			Date.now() - Math.floor(Math.random() * 10000000000)
		).toLocaleDateString(),
	}));
	// Enhanced columns with more features
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 80,
			sorter: true,
			fixed: 'left' as const,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 150,
			sorter: true,
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			width: 100,
			sorter: true,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 120,
			render: (status: string) => (
				<Tag color={status === 'active' ? 'green' : 'red'}>
					{status.toUpperCase()}
				</Tag>
			),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 200,
		},
		{
			title: 'Join Date',
			dataIndex: 'joinDate',
			key: 'joinDate',
			width: 150,
			sorter: true,
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			width: 300,
		},
		{
			title: 'Actions',
			key: 'actions',
			fixed: 'right' as const,
			width: 120,
			render: (_: any, record: any) => (
				<Space>
					<Button size="small">Edit</Button>
					<Button size="small" danger>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<any> | SorterResult<any>[]
	) => {
		setCurrentPage(pagination.current || 1);
		setPageSize(pagination.pageSize || 10);
		// Handle filters and sorter here
	};

	const handleSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	// Custom expandable row render
	const expandedRowRender = (record: any) => {
		return (
			<p style={{ margin: 0 }}>
				Extended Info for {record.name}: Lorem ipsum dolor sit amet...
			</p>
		);
	};

	return (
		<>
			<div
				style={{
					maxHeight: 'calc(100vh - 200px)',
				}}
			>
				<GlobalTabs defaultActiveKey="1">
					<TabPane tab="Tab 1" key="1">
						<GlobalTable
							// Data
							data={tableData}
							columns={columns}
							loading={false}
							// Pagination
							pagination={true}
							currentPage={currentPage}
							pageSize={pageSize}
							totalRecords={totalRecords}
							showSizeChanger={false}
							// Selection
							// rowSelection={true}
							selectedRowKeys={selectedRowKeys}
							onSelectChange={handleSelectChange}
							// Display
							size="middle"
							bordered={true}
							showTotalRecords={true}
							tableLayout="fixed"
							// Scroll
							scroll={{ x: '100%', y: 450 }}
							// Style
							sticky={true}
							rowClassName={(record) =>
								record.status === 'active' ? 'active' : ''
							}
							// Custom Components
							// title={() => <h3>User Management Table</h3>}
							// Expandable
							// expandable={{
							// 	expandedRowRender,
							// 	expandRowByClick: true,
							// }}
							// Event Handlers
							onTableChange={handleTableChange}
							onRow={(record) => ({
								onClick: () =>
									console.log('Row clicked:', record),
							})}
						/>
					</TabPane>
					<TabPane tab="Tab 2" key="2">
						<GlobalTable
							// Data
							data={tableData}
							columns={columns}
							loading={false}
							// Pagination
							pagination={true}
							currentPage={currentPage}
							pageSize={pageSize}
							totalRecords={totalRecords}
							showSizeChanger={false}
							// Selection
							// rowSelection={true}
							selectedRowKeys={selectedRowKeys}
							onSelectChange={handleSelectChange}
							// Display
							size="middle"
							bordered={true}
							showTotalRecords={true}
							tableLayout="fixed"
							// Scroll
							scroll={{ x: '100%', y: 450 }}
							// Style
							sticky={true}
							rowClassName={(record) =>
								record.status === 'active' ? 'active' : ''
							}
							// Custom Components
							// title={() => <h3>User Management Table</h3>}
							// Expandable
							// expandable={{
							// 	expandedRowRender,
							// 	expandRowByClick: true,
							// }}
							// Event Handlers
							onTableChange={handleTableChange}
							onRow={(record) => ({
								onClick: () =>
									console.log('Row clicked:', record),
							})}
						/>
					</TabPane>
				</GlobalTabs>
			</div>
		</>
	);
};

export default ExamplePage;
