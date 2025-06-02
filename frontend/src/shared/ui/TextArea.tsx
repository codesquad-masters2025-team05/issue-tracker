import GripIcon from '@/assets/grip.svg?react';
import PaperClipIcon from '@/assets/paperclip.svg?react';
import { fetchPresignedUrl } from '@/shared/api/presignedAPI';
import { type TextareaHTMLAttributes, useId, useRef, useState } from 'react';

interface FileAttachButtonProps {
	onFileSelect: (file: File) => void;
	id: string;
	disabled?: boolean;
	fileName?: string;
}

function FileAttachButton({
	onFileSelect,
	id,
	disabled,
	fileName,
}: FileAttachButtonProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		onFileSelect(file);
		if (inputRef.current) inputRef.current.value = '';
	};

	return (
		<div>
			<input
				id={id}
				type='file'
				className='hidden'
				ref={inputRef}
				accept='image/*'
				disabled={disabled}
				onChange={handleChange}
			/>
			<label
				htmlFor={id}
				className='flex items-center px-4 h-13 cursor-pointer select-none'
				aria-disabled={disabled}
			>
				<PaperClipIcon className='size-4' />
				<span className='font-available-medium-12 text-[var(--neutral-text-default)]'>
					파일 첨부하기
				</span>
				{fileName && (
					<span className='ml-2 truncate text-xs text-[var(--neutral-text-weak)]'>
						{fileName}
					</span>
				)}
			</label>
		</div>
	);
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	showCounter: boolean;
	resourceType: string;
}

export function TextArea({
	label,
	placeholder = '',
	id,
	value,
	onChange,
	showCounter,
	resourceType,
	...props
}: TextAreaProps) {
	const baseId = id ?? useId();
	const [fileName, setFileName] = useState<string | undefined>();
	const [uploading, setUploading] = useState(false);

	// floating 모드일 때 label 표시 여부
	const showLabel = value.length > 0;

	const handleFileUpload = async (file: File) => {
		if (file.size > 5 * 1024 * 1024) {
			alert('5MB 이하 이미지만 업로드 가능합니다.');
			return;
		}
		setFileName(file.name);
		setUploading(true);
		try {
			// 1. presigned URL 요청
			const { uploadUrl, accessUrl } = await fetchPresignedUrl({
				filename: file.name,
				type: resourceType,
				size: file.size,
			});

			// 2. S3 업로드
			const res = await fetch(uploadUrl, {
				method: 'PUT',
				headers: { 'Content-Type': file.type },
				body: file,
			});
			if (!res.ok) throw new Error('S3 업로드 실패');

			// 3. textarea에 마크다운 이미지 추가
			const imageMarkdown = `![image](${accessUrl})`;
			// 커서 위치에 삽입하는 로직을 직접 구현하려면 ref 필요.
			// 간단히 뒤에 추가 (props.onChange로 관리하니까)
			onChange({
				target: { value: `${value}\n${imageMarkdown}` },
			} as React.ChangeEvent<HTMLTextAreaElement>);
		} catch (e) {
			alert('파일 업로드에 실패했습니다.');
		} finally {
			setUploading(false);
			setFileName(undefined);
		}
	};

	return (
		<div
			className='
        flex flex-1 flex-col justify-center rounded-[16px]
        min-h-[184px]
        focus-within:outline focus-within:outline-[var(--neutral-border-active)]
        bg-[var(--neutral-surface-bold)] focus-within:bg-[var(--neutral-surface-strong)]
        font-display-medium-16
      '
			style={{
				outlineOffset: -1,
			}}
		>
			<div className='flex flex-col pt-4 px-4 gap-2 flex-1'>
				{showLabel && (
					<label
						htmlFor={`${baseId}-text`}
						className='font-display-medium-12 text-[var(--neutral-text-weak)]'
					>
						{label || placeholder}
					</label>
				)}

				<textarea
					id={`${baseId}-text`}
					className='
            flex flex-1 w-full bg-transparent border-none outline-none
            font-display-medium-16 text-[var(--neutral-text-default)]
            placeholder:text-[var(--neutral-text-weak)]
            resize-none
          '
					placeholder={showLabel ? '' : placeholder}
					value={value}
					onChange={onChange}
					rows={3}
					{...props}
				/>
			</div>

			<div className='flex flex-col text-[var(--neutral-text-weak)]'>
				<div className='flex flex-row items-center justify-end p-4 gap-2 h-13'>
					{showCounter && (
						<span className='font-available-medium-12'>{`띄어쓰기 포함 ${value.length}자`}</span>
					)}
					<GripIcon className='size-4 text-[var(--neutral-text-weak)]' />
				</div>
				<div className='border-t border-dashed border-[var(--neutral-border-default)]' />
				<FileAttachButton
					onFileSelect={handleFileUpload}
					id={`${baseId}-file`}
					disabled={uploading}
					fileName={fileName}
				/>
			</div>
		</div>
	);
}
