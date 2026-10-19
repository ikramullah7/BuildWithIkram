export const services = [
  {
    id: "automation",
    title: "Less repetitive admin",
    icon: "workflow" as const,
    problem:
      "Enquiries, spreadsheets and routine tasks keep pulling your team away from useful work.",
    example:
      "Capture an enquiry, check the details, create a record and prepare a response for a person to approve.",
    deliverable:
      "A mapped workflow, connected tools, exception handling and a clear handover.",
    measure:
      "Handling time, correctly completed records and the work that still needs a person.",
  },
  {
    id: "document-search",
    title: "Useful answers from your information",
    icon: "ai" as const,
    problem:
      "People spend time finding answers or moving information between documents and systems.",
    example:
      "Search approved documents with source references, or extract information for a person to check.",
    deliverable:
      "A focused AI-assisted workflow with agreed sources, access boundaries and quality checks.",
    measure:
      "Answer quality, extraction accuracy and exceptions against an agreed test set.",
  },
  {
    id: "reliable-delivery",
    title: "Reliable delivery behind the workflow",
    icon: "system" as const,
    problem:
      "Manual releases, disconnected systems or fragile AI deployments make improvements difficult to sustain.",
    example:
      "Automate a release pipeline, connect an existing system or introduce monitoring for an AI workflow.",
    deliverable:
      "DevOps, MLOps and integration work scoped around the systems you actually use.",
    measure:
      "Release reliability, failed runs, recovery time and ongoing operating costs.",
  },
];

export const deliverySteps = [
  [
    "Understand",
    "Talk through the task, tools, people and exceptions. Establish what happens today and what needs to improve.",
  ],
  [
    "Plan",
    "A paid workflow review produces prioritised opportunities, a practical recommendation and a scoped next step.",
  ],
  [
    "Pilot",
    "Test one agreed workflow against a baseline, quality checks and acceptance criteria before expanding it.",
  ],
  [
    "Measure & improve",
    "Review the result, document the handover and agree any ongoing operation, monitoring and support.",
  ],
];
