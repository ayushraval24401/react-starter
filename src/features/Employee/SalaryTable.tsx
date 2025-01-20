import GlobalTable from 'components/Table';
import React from 'react';

type SalaryTableProps = {
	currentPage: number;
	pageSize: number;
	totalRecords: number;
	selectedRowKeys: React.Key[];
	handleSelectChange: (selectedRowKeys: React.Key[]) => void;
	handleTableChange: (pagination: any, filters: any, sorter: any) => void;
	tableData: any[];
	columns: any[];
	expandedRowRender: any;
};

const SalaryTable = (props: SalaryTableProps) => {
	const {
		columns,
		currentPage,
		handleSelectChange,
		handleTableChange,
		pageSize,
		selectedRowKeys,
		tableData,
		totalRecords,
		expandedRowRender,
	} = props;
	return (
		<>
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
				rowSelection={true}
				selectedRowKeys={selectedRowKeys}
				onSelectChange={handleSelectChange}
				size="middle"
				bordered={true}
				showTotalRecords={true}
				tableLayout="fixed"
				scroll={{ x: '100%', y: 300 }}
				sticky={true}
				rowClassName={(record) =>
					record.status === 'active' ? 'active' : ''
				}
				// Custom Components
				title={() => <h3>User Management Table</h3>}
				footer={() => <h3>Footer Information</h3>}
				// Expandable
				expandable={{
					expandedRowRender,
					expandRowByClick: true,
				}}
				// Event Handlers
				onTableChange={handleTableChange}
				onRow={(record) => ({
					onClick: () => console.log('Row clicked:', record),
				})}
			/>
		</>
	);
};

export default SalaryTable;
