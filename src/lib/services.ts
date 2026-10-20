export const services = [
  {
    id: "automation",
    title: "Cut down on repeated admin",
    icon: "workflow" as const,
    problem:
      "Your team copies information between emails, spreadsheets and other tools, then checks the same details again.",
    example:
      "For example, an enquiry could be checked, added to your tracker and used to prepare a response for approval.",
    deliverable:
      "The connections between your tools, the checks each record needs and a way to handle anything that fails.",
    measure:
      "How long each task takes, how many records are correct and how often someone needs to step in.",
  },
  {
    id: "document-search",
    title: "Find answers in your documents",
    icon: "ai" as const,
    problem:
      "Finding a policy, checking a document or copying details into a system takes longer than it should.",
    example:
      "Search a set of approved documents and show the source of each answer, or pull out details for someone to check.",
    deliverable:
      "A search or extraction tool using the documents you choose, with access controls and checks for incorrect answers.",
    measure:
      "How often answers are correct, whether the sources support them and which questions need a person.",
  },
  {
    id: "reliable-delivery",
    title: "Automate releases and monitor AI systems",
    icon: "system" as const,
    problem:
      "Deployments need manual work, systems fail without warning or nobody can see why an AI task went wrong.",
    example:
      "Automate the release steps, connect your systems or add monitoring so failures can be investigated.",
    deliverable:
      "DevOps, MLOps and integration work for the systems you already use, with documentation for the people running them.",
    measure:
      "Failed releases, recovery time, errors and the cost of keeping the system running.",
  },
];

export const deliverySteps = [
  [
    "Review the task",
    "You show me how the work happens, which tools you use and where you lose time. We include the cases that go wrong.",
  ],
  [
    "Choose the first project",
    "I recommend which tasks to automate, explain the trade-offs and give you a plan for one pilot.",
  ],
  [
    "Build and test",
    "We test the pilot against real requirements and compare it with how the task worked before.",
  ],
  [
    "Decide what comes next",
    "We review the results. If you want to continue, we agree the rollout, handover and any ongoing support.",
  ],
];
