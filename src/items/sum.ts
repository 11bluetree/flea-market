import axios from 'axios';

export interface ResponseData {
    id: number;
    text: string;
}

export async function getData(id: number): Promise<{ status: number, data: ResponseData[]}>  {
    const res = await axios.get<ResponseData[]>('https://example.com', { params: { id }});
    return { status: res.status, data: res.status == 404 ? [] : res.data };
}