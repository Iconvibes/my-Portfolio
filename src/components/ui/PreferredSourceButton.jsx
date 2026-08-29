/**
 * Google Preferred Sources button.
 *
 * Lets readers add ferdinardashonibare.com as a preferred source in Google Search,
 * making content more likely to appear in Top Stories, AI Mode, and AI Overviews.
 *
 * @see https://developers.google.com/search/docs/appearance/preferred-sources
 */

const PreferredSourceButton = ({ theme = 'dark', lang = 'en' }) => {
  return (
    <div className="mt-4">
      <div google-add-preferred-source-btn="" data-theme={theme} data-lang={lang} />
    </div>
  );
};

export default PreferredSourceButton;
