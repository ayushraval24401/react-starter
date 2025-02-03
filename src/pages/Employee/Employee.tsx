import React, { useEffect, useMemo } from 'react';
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { Button, Space, Tag } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import TabPane from 'antd/es/tabs/TabPane';
import { ButtonInterface } from 'components/Button';
import SideDrawerWrapper from 'components/SideDrawerWrapper';
import GlobalTabs from 'components/Tabs';
import EmployeeSidebar from 'features/Employee/EmployeeSidebar';
import EmployeeTable from 'features/Employee/EmployeeTable';
import { EmployeeHeader } from 'features/Employee/Header';
import SalaryTable from 'features/Employee/SalaryTable';
import { employeeService } from 'services/api/employee';
import { AddSvg } from 'utils/svgs';
import { toastText } from 'utils/utils';
import useDebounce from 'hooks/UseDebounce';

interface EmployeeFilters {
	currentPage: number;
	pageSize: number;
	searchValue: string;
	statusFilterValue: string;
}

const EmployeePage: React.FC = () => {
	const [filters, setFilters] = React.useState<EmployeeFilters>({
		currentPage: 1,
		pageSize: 10,
		searchValue: '',
		statusFilterValue: '',
	});
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
		[]
	);
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
	const [drawerAnimation, setDrawerAnimation] = React.useState(false);

	const useDebouncedSearch = useDebounce(filters.searchValue, 500);

	const {
		data,
		isFetching: isLoading,
		isError,
		error,
		isSuccess,
	} = useQuery({
		queryKey: [
			'employees',
			{ ...filters, searchValue: useDebouncedSearch },
		],
		queryFn: () =>
			employeeService.getEmployee({
				currentPage: filters.currentPage,
				pageSize: filters.pageSize,
				search: useDebouncedSearch,
				sortBy: 'name',
				sortOrder: 'asc',
				status: filters.statusFilterValue,
			}),
		placeholderData: keepPreviousData,
	});

	console.log('isFetching: ', isLoading);
	useEffect(() => {
		if (isSuccess) {
			toastText('Employees fetched successfully', 'success');
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			toastText(
				(error as any)?.response?.data?.message ||
					'Failed to fetch employees',
				'error'
			);
		}
	}, [isError, error]);

	const handleSearch = (value: string) => {
		setFilters((prev) => ({ ...prev, searchValue: value }));
	};

	const handleStatusFilter = (value: string) => {
		setFilters((prev) => ({ ...prev, statusFilterValue: value }));
	};

	const openDrawerHandler = React.useCallback(() => {
		setDrawerAnimation(true);
		setIsSidebarOpen(true);
	}, []);

	const closeDrawerByAnimation = React.useCallback(() => {
		setDrawerAnimation(false);
	}, []);

	const removeDrawerFromDom = React.useCallback(() => {
		setIsSidebarOpen(false);
	}, []);

	const handleTableChange = React.useCallback(
		(
			pagination: TablePaginationConfig,
			filters: Record<string, FilterValue | null>,
			sorter: SorterResult<any> | SorterResult<any>[]
		) => {
			setFilters((prev) => ({
				...prev,
				currentPage: pagination.current || 1,
				pageSize: pagination.pageSize || 10,
			}));
		},
		[]
	);

	const handleSelectChange = React.useCallback(
		(newSelectedRowKeys: React.Key[]) => {
			setSelectedRowKeys(newSelectedRowKeys);
		},
		[]
	);

	const addEmployeeMutation = useMutation({
		mutationFn: (data) => employeeService.addEmployee(data),
		onSuccess: () => {
			toastText('Employee added successfully', 'success');
			// queryClient.invalidateQueries(['employees']);/dashboard
			setIsSidebarOpen(false);
		},
		onError: (error: any) => {
			toastText(
				error?.response?.data?.message || 'Failed to add employee',
				'error'
			);
		},
	});

	const handleAddEmployee = (employeeData: any) => {
		addEmployeeMutation.mutate(employeeData);
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
			onClick: openDrawerHandler,
			disabled: isLoading,
		},
	];

	const columns = useMemo(
		() => [
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
		],
		[]
	);

	const expandedRowRender = React.useCallback(
		(record: any) => (
			<p style={{ margin: 0 }}>
				Extended Info for {record.name}: Lorem ipsum dolor sit amet...
			</p>
		),
		[]
	);

	return (
		<>
			<div style={{ maxHeight: 'calc(100vh - 250px)' }}>
				<EmployeeHeader
					buttons={buttons}
					handleSearch={handleSearch}
					handleStatusFilter={handleStatusFilter}
					searchValue={filters.searchValue}
					statusFilterValue={filters.statusFilterValue}
				/>
				<GlobalTabs defaultActiveKey="1">
					<TabPane tab="Employees" key="1">
						<EmployeeTable
							columns={columns}
							currentPage={filters.currentPage}
							handleSelectChange={handleSelectChange}
							handleTableChange={handleTableChange}
							pageSize={filters.pageSize}
							selectedRowKeys={selectedRowKeys}
							tableData={data?.data?.data}
							totalRecords={data?.data?.totalRecords || 0}
							loading={isLoading}
						/>
					</TabPane>
					<TabPane tab="Salaries" key="2">
						<SalaryTable
							columns={columns}
							currentPage={filters.currentPage}
							handleSelectChange={handleSelectChange}
							handleTableChange={handleTableChange}
							pageSize={filters.pageSize}
							selectedRowKeys={selectedRowKeys}
							tableData={data?.data?.data}
							totalRecords={data?.data?.totalRecords || 0}
							expandedRowRender={expandedRowRender}
							loading={isLoading}
						/>
					</TabPane>
				</GlobalTabs>
			</div>
			{isSidebarOpen && (
				<SideDrawerWrapper
					isOpen={drawerAnimation}
					removeDrawerFromDom={removeDrawerFromDom}
					closeDrawerByAnimation={closeDrawerByAnimation}
					headerTitle="Add Employee"
					position="right"
					width="half"
				>
					<EmployeeSidebar
						closeDrawerByAnimation={closeDrawerByAnimation}
						onSubmit={handleAddEmployee}
						isLoading={addEmployeeMutation.isPending}
					/>
				</SideDrawerWrapper>
			)}
		</>
	);
};

export default EmployeePage;
