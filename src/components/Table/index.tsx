// src/components/GlobalTable/index.tsx
import React from 'react';
import { Table } from 'antd';
import type { TablePaginationConfig, ColumnsType } from 'antd/es/table';
import type { SorterResult } from 'antd/es/table/interface';
import type { TableRowSelection } from 'antd/es/table/interface';
import './index.scss';

// Enhanced Props Types
interface GlobalTableProps<T> {
	// Data Props
	data: T[];
	columns: ColumnsType<T>;
	loading?: boolean;

	// Pagination Props
	pagination?: boolean | TablePaginationConfig;
	currentPage?: number;
	pageSize?: number;
	totalRecords?: number;
	showSizeChanger?: boolean;
	// Sorting Props
	sortBy?: string;
	sortOrder?: 'ascend' | 'descend' | null;

	// Selection Props
	rowSelection?: boolean | TableRowSelection<T>;
	selectedRowKeys?: React.Key[];
	onSelectChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;

	// Display Props
	size?: 'small' | 'middle' | 'large';
	bordered?: boolean;
	showTotalRecords?: boolean;
	tableLayout?: 'auto' | 'fixed';

	// Scroll Props
	maxHeight?: number;
	scroll?: {
		x?: number | string | true;
		y?: number | string;
	};

	// Style Props
	rowClassName?: string | ((record: T, index: number) => string);
	sticky?: boolean | { offsetHeader?: number; offsetScroll?: number };

	// Custom Components
	title?: any;
	footer?: any;
	summary?: (data: readonly T[]) => React.ReactNode;

	// Expandable Configuration
	expandable?: {
		expandedRowRender?: (record: T, index: number) => React.ReactNode;
		expandRowByClick?: boolean;
		expandedRowKeys?: React.Key[];
		onExpand?: (expanded: boolean, record: T) => void;
	};

	// Event Handlers
	onTableChange?: (
		pagination: TablePaginationConfig,
		filters: Record<string, any>,
		sorter: SorterResult<T> | SorterResult<T>[],
		extra: any
	) => void;
	onRow?: (record: T, index?: number) => React.HTMLAttributes<HTMLElement>;
}

const GlobalTable = <T extends object>({
	// Data Props
	data,
	columns,
	loading = false,

	// Pagination Props
	pagination = true,
	currentPage = 1,
	pageSize = 10,
	totalRecords = 0,
	showSizeChanger = false,
	// Sorting Props
	sortBy,
	sortOrder,

	// Selection Props
	rowSelection,
	selectedRowKeys,
	onSelectChange,

	// Display Props
	size = 'middle',
	bordered = false,
	showTotalRecords = false,
	tableLayout,

	// Scroll Props
	maxHeight = 500,
	scroll = { x: '100%', y: 500 },

	// Style Props
	rowClassName,
	sticky = false,

	// Custom Components
	title,
	footer,
	summary,

	// Expandable Configuration
	expandable,

	// Event Handlers
	onTableChange,
	onRow,
}: GlobalTableProps<T>) => {
	// Prepare pagination configuration
	const paginationConfig =
		pagination === true
			? {
					current: currentPage,
					pageSize,
					total: totalRecords,
					showSizeChanger: showSizeChanger,
					pageSizeOptions: [10, 20, 50, 100],
					showTotal: showTotalRecords
						? (total: number) => (
								<>Total No. of Employees : {total}</>
						  )
						: undefined,
			  }
			: pagination;

	// Prepare row selection configuration
	const rowSelectionConfig =
		rowSelection === true
			? {
					type: 'checkbox' as const,
					selectedRowKeys,
					onChange: onSelectChange,
			  }
			: rowSelection;

	return (
		<div className="customTable">
			<Table<T>
				// Data
				dataSource={data}
				columns={columns}
				loading={loading}
				// Pagination
				pagination={paginationConfig}
				// Selection
				rowSelection={rowSelectionConfig || undefined}
				// Display
				size={size}
				bordered={bordered}
				tableLayout={tableLayout}
				// Scroll
				scroll={scroll}
				// Style
				rowClassName={rowClassName}
				sticky={sticky}
				// Custom Components
				title={title}
				footer={footer}
				summary={summary}
				// Expandable
				expandable={expandable}
				// Event Handlers
				onChange={onTableChange}
				onRow={onRow}
				// Row Key
				rowKey={(record) => (record as any).id}
			/>
		</div>
	);
};

export default GlobalTable;
