import { SearchOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';
import Buttons from 'components/Button';
import SearchComponent from 'components/SearchComponent';
import styles from './Header.module.scss';

const statusOptions = [
	{
		label: 'All Status',
		value: '',
	},
	{
		label: 'Active',
		value: 'ACTIVE',
	},
	{
		label: 'Suspended',
		value: 'SUSPENDED',
	},
	{
		label: 'Redundant',
		value: 'REDUNDANT',
	},
	{
		label: 'Retired',
		value: 'RETIRED',
	},
	{
		label: 'Reassigned',
		value: 'REASSIGNED',
	},
	{
		label: 'Dismissed',
		value: 'DISMISSED',
	},
	{
		label: 'Deceased',
		value: 'DECEASED',
	},
];

type Props = {
	searchValue: string;
	handleSearch: (value: string) => void;
	statusFilterValue: string;
	handleStatusFilter: (value: string) => void;
	buttons: any;
};

export const EmployeeHeader = (props: Props) => {
	const {
		searchValue,
		handleSearch,
		statusFilterValue,
		handleStatusFilter,
		buttons,
	} = props;

	return (
		<>
			<div className={styles['employee-header']}>
				<Space>
					<SearchComponent
						className={styles['employee-header-item']}
						placeHolder="Search employee..."
						prefixIcon={<SearchOutlined />}
						handleChange={handleSearch}
						value={searchValue}
						size="large"
					/>
					<Select
						className={styles['employee-header-item']}
						value={statusFilterValue}
						options={statusOptions}
						onChange={(value) => {
							handleStatusFilter(value);
						}}
						size="large"
						placeholder="Select Status"
						style={{
							maxWidth: '200px',
						}}
					/>
				</Space>
				<Space>
					<Buttons buttons={buttons} />
				</Space>
			</div>
		</>
	);
};
