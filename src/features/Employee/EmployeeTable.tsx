import GlobalTable from 'components/Table';

type EmployeeTableProps = {
	currentPage: number;
	pageSize: number;
	totalRecords: number;
	selectedRowKeys: React.Key[];
	handleSelectChange: (selectedRowKeys: React.Key[]) => void;
	handleTableChange: (pagination: any, filters: any, sorter: any) => void;
	tableData: any[];
	loading: boolean;
	columns: any[];
};
const EmployeeTable = (props: EmployeeTableProps) => {
	const {
		columns,
		currentPage,
		handleSelectChange,
		handleTableChange,
		pageSize,
		selectedRowKeys,
		tableData,
		loading,
		totalRecords,
	} = props;
	return (
		<>
			<GlobalTable
				data={tableData}
				columns={columns}
				loading={loading}
				pagination={true}
				currentPage={currentPage}
				pageSize={pageSize}
				totalRecords={totalRecords}
				showSizeChanger={false}
				selectedRowKeys={selectedRowKeys}
				onSelectChange={handleSelectChange}
				size="middle"
				bordered={true}
				showTotalRecords={true}
				tableLayout="fixed"
				scroll={{ x: '100%', y: 400 }}
				sticky={true}
				rowClassName={(record) =>
					record.status === 'active' ? 'active' : ''
				}
				onTableChange={handleTableChange}
				onRow={(record) => ({
					onClick: () => console.log('Row clicked:', record),
				})}
			/>
		</>
	);
};

export default EmployeeTable;
