const supabaseMock = {
  from: jest.fn(() => supabaseMock),
  select: jest.fn(() => supabaseMock),
  order: jest.fn(() => supabaseMock),
  limit: jest.fn(() => supabaseMock),
  single: jest.fn()
};

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => supabaseMock)
}));

const { handler } = require('../get-content');

describe('get-content handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns 405 for non-GET requests', async () => {
    const response = await handler({ httpMethod: 'POST' });
    expect(response.statusCode).toBe(405);
  });

  test('returns content with status 200', async () => {
    const data = { id: 1 };
    supabaseMock.single.mockResolvedValueOnce({ data, error: null });

    const response = await handler({ httpMethod: 'GET' });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(data);
  });

  test('returns 404 when no data is found', async () => {
    supabaseMock.single.mockResolvedValueOnce({ data: null, error: null });

    const response = await handler({ httpMethod: 'GET' });
    expect(response.statusCode).toBe(404);
  });

  test('returns 500 on database error', async () => {
    supabaseMock.single.mockResolvedValueOnce({ data: null, error: new Error('fail') });

    const response = await handler({ httpMethod: 'GET' });
    expect(response.statusCode).toBe(500);
  });
});
