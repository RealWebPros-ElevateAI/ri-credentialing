exports.handler = async function(event) {
  const npi = event.queryStringParameters?.npi;
  if (!npi) {
    return { statusCode: 400, body: JSON.stringify({ error: 'NPI required' }) };
  }

  try {
    const url = `https://npiregistry.cms.hhs.gov/api/?number=${npi}&version=2.1`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
