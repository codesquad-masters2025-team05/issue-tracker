import PaperClipIcon from '@/assets/paperclip.svg?react';
import { type ChangeEvent, useRef } from 'react';

interface FileInputProps {
	baseId: number;
	files: File[];
	setFiles: (files: File[]) => void;
	accept?: string; // 예: "image/*" 등 확장자 제한 가능
}

export function FileInput({ baseId, files, setFiles, accept }: FileInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	// 파일 추가
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		// 이미 첨부된 파일과 합쳐서 중복 제거
		const fileArray = Array.from(e.target.files);
		const merged = [...files, ...fileArray].filter(
			(file, idx, arr) =>
				arr.findIndex(
					(f) => f.name === file.name && f.lastModified === file.lastModified,
				) === idx,
		);
		setFiles(merged);
		// input value 초기화 (같은 파일 연속 업로드 허용)
		if (inputRef.current) inputRef.current.value = '';
	};

	// 파일 개별 삭제
	const handleRemove = (idxToRemove: number) => {
		setFiles(files.filter((_, idx) => idx !== idxToRemove));
	};

	return (
		<div className='flex items-center'>
			<input
				id={`${baseId}-file`}
				type='file'
				className='hidden'
				onChange={handleChange}
				multiple
				ref={inputRef}
				accept={accept}
			/>
			<label
				htmlFor={`${baseId}-file`}
				className='flex items-center gap-2 px-4 h-13 cursor-pointer select-none'
			>
				<PaperClipIcon className='size-4' />
				<span className='font-available-medium-12 text-[var(--neutral-text-default)]'>
					파일 첨부하기
				</span>
			</label>
			{/* 파일 목록 */}
			{files.length > 0 && (
				<ul className='flex gap-2'>
					{files.map((file, idx) => (
						<div
							key={file.name + file.lastModified}
							className='flex hover:bg-[var(--neutral-surface-bold)] px-4 py-1 rounded-xl'
						>
							<li className='flex items-center gap-2 text-xs text-[var(--neutral-text-weak)] truncate max-w-xs'>
								<span className='truncate max-w-[160px]'>{file.name}</span>
								<button
									type='button'
									onClick={() => handleRemove(idx)}
									className='ml-2 text-[var(--color-accent-red)] hover:underline'
									aria-label='파일 삭제'
								>
									삭제
								</button>
							</li>
						</div>
					))}
				</ul>
			)}
		</div>
	);
}
