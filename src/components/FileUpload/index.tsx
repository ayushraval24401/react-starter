import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;

export interface GlobalUploadProps {
	fileList: UploadFile[];
	setFileList: any;
	acceptedTypes: string[];
	maxFileSize?: number; // in MB
	multiple?: boolean;
	disabled?: boolean;
	maxFiles?: number;
	className?: string;
	onError?: (error: string) => void;
}

const GlobalUpload: React.FC<GlobalUploadProps> = ({
	fileList,
	setFileList,
	acceptedTypes,
	maxFileSize = 5,
	multiple = true,
	disabled = false,
	maxFiles = 10,
	className,
	onError,
}) => {
	const handleBeforeUpload = (file: RcFile) => {
		try {
			// Check file type
			const isValidType = acceptedTypes.some((type) => {
				if (type.includes('*')) {
					const baseType = type.split('/')[0];
					return file.type.startsWith(baseType);
				}
				return file.type === type;
			});

			if (!isValidType) {
				const error = `${
					file.name
				} is not an accepted file type. Accepted types: ${acceptedTypes.join(
					', '
				)}`;
				message.error(error);
				onError?.(error);
				return Upload.LIST_IGNORE;
			}

			// Check file size
			const isValidSize = file.size / 1024 / 1024 < maxFileSize;
			if (!isValidSize) {
				const error = `${file.name} exceeds the maximum file size of ${maxFileSize}MB`;
				message.error(error);
				onError?.(error);
				return Upload.LIST_IGNORE;
			}

			// Check maximum number of files
			if (fileList.length >= maxFiles) {
				const error = `You can only upload a maximum of ${maxFiles} files`;
				message.error(error);
				onError?.(error);
				return Upload.LIST_IGNORE;
			}

			// Create a new UploadFile object
			const newFile: UploadFile = {
				uid: `${Date.now()}-${file.name}`,
				name: file.name,
				status: 'done',
				size: file.size,
				type: file.type,
				originFileObj: file,
			};

			// Update fileList
			setFileList((prev: any) => [...prev, newFile]);

			// Return false to prevent default upload behavior
			return false;
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'An unknown error occurred';
			message.error(errorMessage);
			onError?.(errorMessage);
			return Upload.LIST_IGNORE;
		}
	};

	const handleRemove = (file: UploadFile) => {
		setFileList((prev: any) =>
			prev.filter((item: any) => item.uid !== file.uid)
		);
	};

	return (
		<div className={className}>
			<Dragger
				multiple={multiple}
				disabled={disabled}
				fileList={fileList}
				accept={acceptedTypes.join(',')}
				showUploadList={true}
				beforeUpload={handleBeforeUpload}
				onRemove={handleRemove}
				customRequest={({ onSuccess }) => {
					onSuccess?.('ok');
				}}
			>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">
					Click or drag files to this area to upload
				</p>
				<p className="ant-upload-hint">
					{`Accepted files: ${acceptedTypes.join(
						', '
					)} (Max size: ${maxFileSize}MB)`}
				</p>
				{maxFiles > 0 && (
					<p className="ant-upload-hint">
						Maximum files allowed: {maxFiles}
					</p>
				)}
			</Dragger>
		</div>
	);
};

export default GlobalUpload;
