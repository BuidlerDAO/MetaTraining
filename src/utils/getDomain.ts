export function extractDomains(text: string): string[] {
  const domains = new Set<string>();
  if (text.includes('https')) {
    // 正则表达式匹配所有链接
    const regex = /https?:\/\/([\w\d.-]+\.[\w]+)/gi;
    const matches = text.matchAll(regex);
    // 提取链接中的域名
    for (const match of matches) {
      const [, domain] = match;
      domains.add(domain);
    }
  } else if (text.includes('http')) {
    // 正则表达式匹配所有链接
    const regex = /http?:\/\/([\w\d.-]+\.[\w]+)/gi;
    const matches = text.matchAll(regex);
    // 提取链接中的域名
    for (const match of matches) {
      const [, domain] = match;
      domains.add(domain);
    }
  }

  return [...domains];
}
