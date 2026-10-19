import { ServiceIcon } from "./icons";

export function Workflow() {
  return (
    <div
      className="workflow-board"
      role="img"
      aria-label="Illustrative Results as a Service approach: understand the business problem, select appropriate AI and automation, and measure an agreed outcome. This is a process illustration, not a display of client results."
    >
      <div className="board-top">
        <span>AI + AUTOMATION → BUSINESS RESULTS</span>
        <span>RaaS</span>
      </div>
      <div className="workflow-node">
        <span className="node-symbol">
          <ServiceIcon kind="document" />
        </span>
        <div>
          <small>01 / UNDERSTAND</small>
          <strong>Your business problem</strong>
          <p>Find the bottleneck. Establish the baseline.</p>
        </div>
      </div>
      <div className="connector">
        <span>Choose the useful intervention.</span>
      </div>
      <div className="workflow-node">
        <span className="node-symbol node-ai">
          <ServiceIcon kind="ai" />
        </span>
        <div>
          <small>02 / AI & AUTOMATION</small>
          <strong>Intelligence, with a purpose.</strong>
          <p>Use AI, rules and integrations where they fit.</p>
        </div>
      </div>
      <div className="connector second">
        <span>Test the workflow. Keep people in control.</span>
      </div>
      <div className="workflow-node">
        <span className="node-symbol">
          <ServiceIcon kind="outcome" />
        </span>
        <div>
          <small>03 / MEASURE</small>
          <strong>An agreed, measurable result.</strong>
          <p>Check quality, exceptions and improvement.</p>
        </div>
      </div>
      <div className="board-bottom">
        <span>RaaS approach · Scope and measures agreed first</span>
      </div>
    </div>
  );
}
