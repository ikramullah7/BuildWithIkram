import { ServiceIcon } from "./icons";

export function Workflow() {
  return (
    <div
      className="workflow-board"
      role="img"
      aria-label="Illustrative Results as a Service process: review the task, choose the automation and check the result."
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
          <p>Look at how the task works today.</p>
        </div>
      </div>
      <div className="connector">
        <span>Choose what to change.</span>
      </div>
      <div className="workflow-node">
        <span className="node-symbol node-ai">
          <ServiceIcon kind="ai" />
        </span>
        <div>
          <small>02 / AI & AUTOMATION</small>
          <strong>Build the first automation</strong>
          <p>Use AI where it helps with the task.</p>
        </div>
      </div>
      <div className="connector second">
        <span>Test it with the people doing the work.</span>
      </div>
      <div className="workflow-node">
        <span className="node-symbol">
          <ServiceIcon kind="outcome" />
        </span>
        <div>
          <small>03 / MEASURE</small>
          <strong>Check whether it helped</strong>
          <p>Compare the result with the starting point.</p>
        </div>
      </div>
      <div className="board-bottom">
        <span>RaaS process example</span>
      </div>
    </div>
  );
}
