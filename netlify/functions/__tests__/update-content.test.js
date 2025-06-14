const fetchQuery = {
  select: jest.fn(() => fetchQuery),
  eq: jest.fn(() => fetchQuery),
  single: jest.fn()
};

const updateQuery = {
  update: jest.fn(() => updateQuery),
  eq: jest.fn(() => updateQuery),
  select: jest.fn(() => updateQuery),
  single: jest.fn()
};

const supabaseMock = {
  from: jest.fn()
};

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => supabaseMock)
}));

const { handler } = require('../update-content');

describe('update-content handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns 405 for non-POST requests', async () => {
    const response = await handler({ httpMethod: 'GET' });
    expect(response.statusCode).toBe(405);
  });

  test('returns 400 when body is missing fields', async () => {
    const event = { httpMethod: 'POST', body: JSON.stringify({ section: 'about' }) };
    const response = await handler(event);
    expect(response.statusCode).toBe(400);
  });

  test('updates content successfully', async () => {
    supabaseMock.from
      .mockReturnValueOnce(fetchQuery)
      .mockReturnValueOnce(updateQuery);

    fetchQuery.select.mockReturnThis();
    fetchQuery.eq.mockReturnThis();
    fetchQuery.single.mockResolvedValueOnce({ data: { about: { text: 'old' } }, error: null });

    updateQuery.update.mockReturnThis();
    updateQuery.eq.mockReturnThis();
    updateQuery.select.mockReturnThis();
    updateQuery.single.mockResolvedValueOnce({ data: { about: { text: 'new' } }, error: null });

    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ section: 'about', content: { text: 'new' } })
    };
    const response = await handler(event);
    expect(response.statusCode).toBe(200);
  });

  test('returns 500 on database error', async () => {
    supabaseMock.from.mockReturnValueOnce(fetchQuery);
    fetchQuery.select.mockReturnThis();
    fetchQuery.eq.mockReturnThis();
    fetchQuery.single.mockResolvedValueOnce({ data: { about: {} }, error: null });

    supabaseMock.from.mockReturnValueOnce(updateQuery);
    updateQuery.update.mockReturnThis();
    updateQuery.eq.mockReturnThis();
    updateQuery.select.mockReturnThis();
    updateQuery.single.mockResolvedValueOnce({ data: null, error: new Error('fail') });

    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ section: 'about', content: { text: 'new' } })
    };
    const response = await handler(event);
    expect(response.statusCode).toBe(500);
  });
});
