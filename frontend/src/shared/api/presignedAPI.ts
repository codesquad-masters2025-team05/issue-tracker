// Presigned 업로드 URL 발급 API
export async function fetchPresignedUrl({
	filename,
	type,
	size,
}: {
	filename: string;
	type: string;
	size: number;
}) {
	const params = new URLSearchParams({
		filename,
		type,
		size: size.toString(),
	});

	const token = localStorage.getItem('token');

	const res = await fetch(`/api/upload-url?${params.toString()}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error('Presigned URL 발급 실패');
	const json = await res.json();
	if (!json.success) throw new Error(json.error ?? '알 수 없는 오류');
	return json.data as { uploadUrl: string; accessUrl: string };
}
