export default async function handler(req, res) {
  const { query } = req.query;
  const url = `https://cnieto.myvtex.com/api/io/_v/api/intelligent-search/product_search/?query=${query}`;

  const response = await fetch(url, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-VTEX-API-AppKey': process.env.VTEX_APP_KEY,
          'X-VTEX-API-AppToken': process.env.VTEX_APP_TOKEN
      }
  });

  const data = await response.json();
  res.status(200).json(data);
}