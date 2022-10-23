import { getData, ResponseData } from './sum';

import axios, { AxiosResponse } from 'axios';
jest.mock('axios'); // axios を mock する

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('HTTPテスト', () => {
  test('HTTP のステータスコードが 200 の時はデータを返す', async () => {
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: [{ id: 1, text: 'test result' }],
    });
    const response = await getData(1);

    expect(mockAxios.get).toHaveBeenCalledWith('https://example.com', {
      params: { id: 1 },
    });
    expect(response).toStrictEqual({
      status: 200,
      data: [{ id: 1, text: 'test result' }],
    });
  });

  test('HTTP のステータスコードが 404 の時は空の配列を返す', async () => {
    mockAxios.get.mockResolvedValue({ status: 404 });
    const response = await getData(1);
    expect(mockAxios.get).toHaveBeenCalledWith('https://example.com', {
      params: { id: 1 },
    });
    expect(response).toStrictEqual({ status: 404, data: [] });
  });
});
