module.exports = function(data){

  let items = '';

  for(let i=0;i<data.length && i<10;i++){
    let node = data[i];
    items+=`
      <item>
        <title>${node.title}</title>
        <link>https://comecuco.org/node/${node._id}</link>
        <description>${node.body}</description>
        <pubDate>${new Date(node.pubdate).toISOString()}</pubDate>
        <dc:creator>${node.author}</dc:creator>
        <guid isPermaLink="false">${node._id} at https://comecuco.org</guid>
        <comments>https://comecuco.org/node/${node._id}#comments</comments>
      </item>`;
  }

  let raw = `<?xml version="1.0" encoding="utf-8" ?><rss version="2.0" xml:base="https://comecuco.org/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:foaf="http://xmlns.com/foaf/0.1/" xmlns:og="http://ogp.me/ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:sioc="http://rdfs.org/sioc/ns#" xmlns:sioct="http://rdfs.org/sioc/types#" xmlns:skos="http://www.w3.org/2004/02/skos/core#" xmlns:xsd="http://www.w3.org/2001/XMLSchema#">
    <channel>
      <title>noticias de comecuco</title>
      <link>https://comecuco.org/</link>
      <description></description>
      <language>es</language>
       <atom:link href="https://comecuco.org/rss/noticias.xml" rel="self" type="application/rss+xml" />
      ${items}
    </channel>
  </rss>

  `
  // console.log('builded dash-page',raw);
  return raw;
}
