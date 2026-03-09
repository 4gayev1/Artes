const EXACT_TAGS = new Set([
  'wcag2a', 'wcag2aa', 'wcag2aaa',
  'wcag21a', 'wcag21aa',
  'wcag22aa',
  'best-practice',
  'wcag2a-obsolete',
  'ACT',
  'section508',
  'TTv5',
  'EN-301-549',
  'RGAAv4',
  'experimental'
]);

const PATTERN_TAGS = [
  /^wcag\d{3,}$/,       
  /^section508\.\d+\.\d+$/, 
  /^TT\d+\.\d+$/,       
  /^EN-9\.\d+(\.\d+)*$/, 
  /^RGAA-\d+\.\d+\.\d+$/, 
  /^cat\..+$/           
];

const isValidTag = (tag) => {
  if (EXACT_TAGS.has(tag)) return true;
  return PATTERN_TAGS.some(pattern => pattern.test(tag));
};

const validateWCAGTags = (tags) => {
  const normalized = tags.split(",").map(tag => tag.trim());

  if (normalized.length === 0) {
    throw new Error('At least one WCAG tag must be provided.');
  }

  const invalid = normalized.filter(tag => !isValidTag(tag));

  if (invalid.length > 0) {
    throw new Error(
      `Invalid WCAG tag(s): "${invalid.join('", "')}"\n` +
      `Valid tags: wcag2a, wcag2aa, wcag2aaa, wcag21a, wcag21aa, wcag22aa, ` +
      `best-practice, wcag2a-obsolete, wcag111 (SC pattern), ACT, section508, ` +
      `section508.x.x, TTv5, TT*.*, EN-301-549, EN-9.*, RGAAv4, RGAA-*.*.*, ` +
      `experimental, cat.* `+
      `For more information: https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags`
    );
  }

  return normalized;
};

module.exports = { validateWCAGTags };