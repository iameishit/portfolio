export default function Footer() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <footer>
      <div className="wrap">
        <span>
          © <span id="year">{new Date().getFullYear()}</span> <b>Eishit Nigam</b>
        </span>
        <button
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
