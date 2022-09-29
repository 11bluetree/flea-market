test("基本的な使い方", () => {
  const mockFn = jest.fn((a: number) => a * 10);
  mockFn(1);
  mockFn(2);

  expect(mockFn.mock.calls).toHaveLength(2);

  expect(mockFn.mock.calls[0][0]).toBe(1); // 1回目の呼出の引数
  expect(mockFn.mock.calls[1][0]).toBe(2); // 2回目の呼出の引数

  expect(mockFn.mock.results[0].value).toBe(10); // 1回目の呼出の戻り値
  expect(mockFn.mock.results[1].value).toBe(20); // 2回目の呼出の戻り値
});