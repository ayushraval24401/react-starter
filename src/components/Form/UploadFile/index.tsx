import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type UploadFileProps = {
	onChange: (fileList: any[]) => void;
	fileList: any[];
	required?: boolean;
	disabled?: boolean;
	maxFileSize?: number; // in MB
	accept?: string;
	style?: React.CSSProperties;
	className?: string;
};

const CustomUploadFile: React.FC<UploadFileProps> = ({
	onChange,
	fileList,
	required = false,
	disabled = false,
	maxFileSize = 5, // default max size in MB
	accept = '*',
	style,
	className,
}: UploadFileProps) => {
	const beforeUpload = (file: File) => {
		const isSizeValid = file.size / 1024 / 1024 < maxFileSize;
		if (!isSizeValid) {
			message.error(`File size must be smaller than ${maxFileSize}MB.`);
		}
		return isSizeValid;
	};

	return (
		<div className={className} style={style}>
			<Upload
				fileList={fileList}
				onChange={({ fileList }) => onChange(fileList)}
				beforeUpload={beforeUpload}
				disabled={disabled}
				accept={accept}
				multiple
				showUploadList={{ showRemoveIcon: true }}
			>
				<Button icon={<UploadOutlined />}>Upload Files</Button>
			</Upload>
			{required && <span style={{ color: 'red' }}>*</span>}
		</div>
	);
};

export default CustomUploadFile;
