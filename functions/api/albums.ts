export async function onRequestGet(context) {
  // NOTE: ここでR2クライアント初期化
  // R2は環境変数からバインド済みと仮定 (wrangler.tomlのbinding設定)
  const { R2_BUCKET } = context.env;

  // R2の一覧取得はS3互換APIのlistオブジェクトで取得可能
  // ディレクトリはプレフィックス、区切り文字は'/'

  try {
    // アルバムは一階層目のディレクトリ名なので prefixなし、delimiter:'/' でフォルダ単位取得
    const listResponse = await R2_BUCKET.list({
      // const listResponse = await (R2_BUCKET as R2Bucket).list({
      delimiter: '/',
    });

    console.log({ listResponse });

    // 返却するアルバム名はフォルダ名＝CommonPrefixes の配列
    const albums = listResponse.delimitedPrefixes.map(
      (prefix) => prefix.replace(/\/$/, ''), // 末尾のスラッシュ削除
    );

    return new Response(JSON.stringify({ albums }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: 'Failed to list albums', message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
