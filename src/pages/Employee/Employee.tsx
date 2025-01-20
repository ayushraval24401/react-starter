// src/pages/ExamplePage.tsx
import { Button, Space, Tag } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import TabPane from 'antd/es/tabs/TabPane';
import { ButtonInterface } from 'components/Button';
import GlobalTable from 'components/Table';
import GlobalTabs from 'components/Tabs';
import EmployeeTable from 'features/Employee/EmployeeTable';
import { EmployeeHeader } from 'features/Employee/Header';
import SalaryTable from 'features/Employee/SalaryTable';
import React, { useState } from 'react';
import { AddSvg } from 'utils/svgs';

const EmployeePage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalRecords, setTotalRecords] = useState(100);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [searchValue, setSearchValue] = useState('');
	const [statusFilterValue, setStatusFilterValue] = useState('');

	const handleSearch = (value: string) => {
		setSearchValue(value);
	};

	const handleStatusFilter = (value: string) => {
		setStatusFilterValue(value);
	};

	const buttons: ButtonInterface[] = [
		{
			text: 'Add Employee',
			isLoading: false,
			className: 'btn-blue',
			icon: <AddSvg />,
			fontSize: '16px',
			variant: 'primary',
			isSubmit: true,
			onClick: () => {
				console.log('Add Employee button clicked');
			},
			disabled: false,
		},
	];

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

	const expandedRowRender = (record: any) => {
		return (
			<p style={{ margin: 0 }}>
				Extended Info for {record.name}: Lorem ipsum dolor sit amet...
			</p>
		);
	};

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

	return (
		<>
			<div
				style={{
					maxHeight: 'calc(100vh - 250px)',
				}}
			>
				<EmployeeHeader
					buttons={buttons}
					handleSearch={handleSearch}
					handleStatusFilter={handleStatusFilter}
					searchValue={searchValue}
					statusFilterValue={statusFilterValue}
				/>
				<GlobalTabs defaultActiveKey="1">
					<TabPane tab="Tab 1" key="1">
						<EmployeeTable
							columns={columns}
							currentPage={currentPage}
							handleSelectChange={handleSelectChange}
							handleTableChange={handleTableChange}
							pageSize={pageSize}
							selectedRowKeys={selectedRowKeys}
							tableData={tableData}
							totalRecords={totalRecords}
						/>
					</TabPane>
					<TabPane tab="Tab 2" key="2">
						<SalaryTable
							columns={columns}
							currentPage={currentPage}
							handleSelectChange={handleSelectChange}
							handleTableChange={handleTableChange}
							pageSize={pageSize}
							selectedRowKeys={selectedRowKeys}
							tableData={tableData}
							totalRecords={totalRecords}
							expandedRowRender={expandedRowRender}
						/>
					</TabPane>
				</GlobalTabs>
			</div>
		</>
	);
};

export default EmployeePage;
