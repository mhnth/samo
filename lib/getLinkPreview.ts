import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export async function getLinkPreview(url: string): Promise<LinkPreviewData> {
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const metaTags = dom.window.document.getElementsByTagName('meta');

  let preview: LinkPreviewData = {
    title: dom.window.document.title,
    description: '',
    image: '',
    url: url,
  };

  for (let i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute('name') === 'description') {
      preview.description = metaTags[i].getAttribute('content') || '';
    }
    if (metaTags[i].getAttribute('property') === 'og:image') {
      preview.image = metaTags[i].getAttribute('content') || '';
    }
  }

  return preview;
}
