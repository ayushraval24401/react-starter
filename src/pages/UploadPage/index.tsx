import React, { useState } from 'react';
import { Button, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import GlobalUpload from 'components/FileUpload';

const UploadPage: React.FC = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleError = (error: string) => {
		console.error('Upload error:', error);
		message.error(error);
	};

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);

			const files = fileList.map((file) => file.originFileObj);

			if (files.length === 0) {
				throw new Error('Please upload at least one file');
			}

			// Create form data
			const formData = new FormData();
			files.forEach((file) => {
				if (file) {
					formData.append('files', file);
				}
			});

			console.log('Files ready to be sent:', files);
			message.success('Files processed successfully!');
			setFileList([]);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Failed to process files';
			message.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">File Upload</h1>

			<GlobalUpload
				fileList={fileList}
				setFileList={setFileList}
				acceptedTypes={[
					'image/jpeg',
					'image/png',
					'image/gif',
					'application/pdf',
				]}
				maxFileSize={5}
				multiple={true}
				maxFiles={5}
				onError={handleError}
				className="mb-4"
			/>

			<div className="mt-4 space-y-2">
				<div className="text-sm text-gray-600">
					{fileList.length} file(s) selected
				</div>

				{fileList.length > 0 && (
					<div className="space-y-2">
						<h2 className="text-lg font-semibold">
							Selected Files:
						</h2>
						<ul className="list-disc pl-5">
							{fileList.map((file) => (
								<li key={file.uid} className="text-sm">
									{file.name} (
									{(file.size! / 1024 / 1024).toFixed(2)} MB)
								</li>
							))}
						</ul>
					</div>
				)}

				<Button
					type="primary"
					onClick={handleSubmit}
					disabled={fileList.length === 0 || isSubmitting}
					loading={isSubmitting}
					className="mt-4"
				>
					{isSubmitting ? 'Processing...' : 'Submit Files'}
				</Button>
			</div>
		</div>
	);
};

export default UploadPage;
