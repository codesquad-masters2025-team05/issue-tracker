import PaperClipIcon from '@/assets/paperclip.svg?react';
import { type ChangeEvent, useRef } from 'react';

interface ImagePreview {
	name: string;
	dataUrl: string; // Base64 or object URL
}

interface ImageInputProps {
	baseId: number | string;
	images: ImagePreview[];
	setImages: (imgs: ImagePreview[]) => void;
	accept?: string;
}

export function ImageInput({
	baseId,
	images,
	setImages,
	accept = 'image/*',
}: ImageInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	// 이미지 파일 -> Base64 변환 함수
	const fileToDataUrl = (file: File): Promise<ImagePreview> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () =>
				resolve({ name: file.name, dataUrl: reader.result as string });
			reader.onerror = (e) => reject(e);
			reader.readAsDataURL(file);
		});

	// 파일 추가
	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const filesArr = Array.from(e.target.files);

		// 각 파일을 Base64로 변환
		const previews: ImagePreview[] = await Promise.all(
			filesArr.map(fileToDataUrl),
		);
		// 중복 방지 (이름+dataUrl로 필터, 원하는 방식으로 바꿔도 OK)
		const merged = [...images, ...previews].filter(
			(img, idx, arr) =>
				arr.findIndex(
					(i) => i.name === img.name && i.dataUrl === img.dataUrl,
				) === idx,
		);
		setImages(merged);
		if (inputRef.current) inputRef.current.value = '';
	};

	// 삭제
	const handleRemove = (idx: number) => {
		setImages(images.filter((_, i) => i !== idx));
	};

	return (
		<div className='flex flex-col gap-2'>
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
			</div>
			{/* 이미지 미리보기 목록 */}
			{images.length > 0 && (
				<ul className='flex gap-2 flex-wrap'>
					{images.map((img) => (
						<li
							key={`${img.name}-${img.dataUrl}`}
							className='flex flex-col items-center gap-1 hover:bg-[var(--neutral-surface-bold)] px-4 py-2 rounded-xl'
						>
							<img
								src={img.dataUrl}
								alt={img.name}
								className='w-16 h-16 object-cover rounded'
							/>
							<span className='text-xs truncate max-w-[80px]'>{img.name}</span>
							<button
								type='button'
								onClick={() => handleRemove(images.indexOf(img))}
								className='text-[var(--color-accent-red)] hover:underline text-xs'
								aria-label='파일 삭제'
							>
								삭제
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

/** 
 * 사용 예시 
import { useState } from 'react';
import { ImageInput } from '@/shared/ui/ImageInput';

export function Demo() {
  const [images, setImages] = useState<ImagePreview[]>([]);

  return (
    <ImageInput
      baseId="demo"
      images={images}
      setImages={setImages}
      accept="image/*"
    />
  );
}

*/
