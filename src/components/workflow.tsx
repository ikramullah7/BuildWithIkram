export function Workflow() {
  return (
    <div
      className="workflow-board"
      role="img"
      aria-label="From a business problem through thoughtful engineering to a practical solution. An illustrative workflow, not a live product."
    >
      <div className="board-top">
        <span>
          <i />
          THE PRACTICAL APPROACH
        </span>
        <span>01 — 03</span>
      </div>
      <div className="workflow-node node-one">
        <span className="node-symbol">↳</span>
        <div>
          <small>01 / UNDERSTAND</small>
          <strong>A real business problem</strong>
          <p>Start with what needs to work better.</p>
        </div>
        <span className="node-check">✓</span>
      </div>
      <div className="connector">
        <span>Less friction. More clarity.</span>
      </div>
      <div className="workflow-node node-two">
        <span className="node-symbol">⌘</span>
        <div>
          <small>02 / BUILD</small>
          <strong>Thoughtful engineering</strong>
          <p>The right tools, for the right reasons.</p>
        </div>
        <span className="node-check">✓</span>
      </div>
      <div className="connector second">
        <span>Test. Learn. Improve.</span>
      </div>
      <div className="workflow-node node-three">
        <span className="node-symbol">↗</span>
        <div>
          <small>03 / MAKE IT USEFUL</small>
          <strong>A practical solution</strong>
          <p>Technology that serves the business.</p>
        </div>
        <span className="node-check">✓</span>
      </div>
      <div className="board-bottom">
        <span className="mini-lines">▥</span>
        <span>Business first. Technology second.</span>
        <span>↗</span>
      </div>
    </div>
  );
}
