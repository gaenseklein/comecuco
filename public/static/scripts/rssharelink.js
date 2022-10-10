function crearLinksRedesSociales(){
    let urlraw = location.href
    let title = document.querySelector('.titulopagina').innerText
    let redes = {
       telegram : 'https://t.me/share/url?url='+encodeURIComponent(urlraw),
        threema : 'threema://compose?text='+encodeURIComponent(title+' - '+urlraw),
        whatsapp : 'whatsapp://send?text='+encodeURIComponent(title+' - '+urlraw),
        diaspora : 'https://share.diasporafoundation.org/?url='+encodeURIComponent(urlraw)+'&title='+encodeURIComponent(title),
        twitter: 'https://twitter.com/intent/tweet?text='+encodeURIComponent(title)+'&url='+encodeURIComponent(urlraw),
        facebook : 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(urlraw),
        reddit : 'https://reddit.com/submit?url='+encodeURIComponent(urlraw)+'&title='+encodeURIComponent(title),
        tumblr : 'http://tumblr.com/widgets/share/tool?canonicalUrl='+encodeURIComponent(urlraw),
        mail: 'mailto:foo@example.com?subject='+encodeURIComponent('te comparto la noticia de comecuco: '+title)+'&body='+encodeURIComponent(urlraw),
    }
    let keys = Object.keys(redes)
    let links = []
    for(let x=0;x<keys.length;x++){
        let key = keys[x]
        let url = redes[key]
        let link = `<a href="${url}" class="redesSocialesLink" title="comparte con ${key}"><img src="/public/static/rslogos/${key}.png"></a>`
        links.push(link)
    }
    let rsl = document.getElementById('redesSocialesWrapper')
    if(!rsl)return
    rsl.innerHTML=links.join('\n')
}
crearLinksRedesSociales()
