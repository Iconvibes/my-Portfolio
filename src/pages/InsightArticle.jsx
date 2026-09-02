import { Link, useParams } from 'react-router-dom';
import CtaSection from '../components/sections/CtaSection';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { getInsightBySlug, insightDate, readingTime } from '../content/insights';

const bodyClass = {
  p: 'text-base leading-8 text-slate-400',
  h2: 'display-ink pt-4 text-2xl text-white',
  ul: 'space-y-2.5 text-base leading-7 text-slate-400',
  quote: 'border-l-2 border-signal/60 pl-6 text-lg italic leading-8 text-slate-200'
};

const renderBlock = (block, index) => {
  const key = `${block.type}-${index}`;
  if (block.type === 'ul') {
    return (
      <ul key={key} className={bodyClass.ul}>
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  const Tag = block.type === 'h2' ? 'h2' : block.type === 'quote' ? 'blockquote' : 'p';
  return (
    <Tag key={key} className={bodyClass[block.type]}>
      {block.text}
    </Tag>
  );
};

const InsightArticle = () => {
  const { slug } = useParams();
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
        <h1 className="display-ink text-3xl text-white">Essay not found</h1>
        <p className="mt-4 text-slate-400">That article does not exist, yet.</p>
        <div className="mt-8">
          <Button href="/insights">Back to insights</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink text-slate-100">
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16 md:px-8 lg:py-24">
        <Link
          to="/insights"
          className="mono-label text-slate-500 underline-offset-4 transition hover:text-signal hover:underline"
        >
          ← all insights
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Badge>{insight.category}</Badge>
          <span className="mono-label text-slate-500">{insightDate(insight.published)}</span>
          <span className="mono-label text-slate-500">{readingTime(insight)} min read</span>
        </div>

        <h1 className="display-ink mt-6 text-4xl text-white sm:text-5xl">{insight.title}</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">{insight.summary}</p>

        <div className="mt-10 space-y-6 border-t border-line pt-10">
          {insight.body.map(renderBlock)}
        </div>

        <footer className="mt-14 border-t border-line pt-8">
          <p className="mono-label text-slate-500">// about the author</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Ferdinard Ashonibare is a full-stack web developer in Lagos, Nigeria, building
            fast, secure platforms for government, hospitality, education, and beyond.
          </p>
          <div className="mt-6">
            <Button href="/contact" variant="outline" icon>
              Discuss a project like this
            </Button>
          </div>
        </footer>
      </article>
      <CtaSection title="Want more writing like this?" />
    </div>
  );
};

export default InsightArticle;
