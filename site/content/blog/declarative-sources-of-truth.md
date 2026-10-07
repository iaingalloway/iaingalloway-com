---
title: A source of truth people can review
date: 2026-10-07
description: How describing the intended outcome and tracking changes in source control can make decisions easier to understand and govern
content-type: post
---

When a change to a complex system goes wrong, the cause is not always a difficult engineering problem. Sometimes the people requesting, approving, and implementing the change are working from different documents and conversations.

Imagine a company needs to connect to a new customer's system. This involves changes to the company's network security. An employee fills in the company's network provider's change request spreadsheet with instructions for the required changes. That spreadsheet is then emailed to a manager, then sent to infrastructure and security engineers for approval before sending it on to the provider. The provider applies the change several days later, but a mistake means it does not work. The employee corrects the spreadsheet and the approval process starts again. In the meantime, the unhappy customer is left with a broken system.

Because the request, approvals, and final result are spread across many emails and files, it is difficult for everyone to see the same proposal, understand its purpose, and catch a mistake before it is applied.

## Describe the intended result

Instead of recording a series of technical steps, we can **declare** the intended outcome. For example, a company might set this policy for backups of its customer records:

```yaml
customer_records:
  backups:
    frequency: daily
    keep_for: 30 days
    encrypted: true
```

This representation can be used as a "source of truth" for the intended backup policy. Changes to this representation can be automatically applied to the system, ensuring that the actual system matches the declared intent.

## Review changes together

Because these declarations are text files, they can be stored in source control systems in the same way as application code. Source control provides a history of changes, allows multiple people to collaborate, and supports review and approval workflows before changes are applied.

Suppose there is a proposal to change backups from daily to weekly. The difference is small and visible:

```diff
customer_records:
  backups:
-    frequency: daily
+    frequency: weekly
```

A stakeholder can see what the change means and ask whether weekly backups still meet the business need. They do not need to understand the backup software to review that decision. Engineers can separately confirm that the proposed configuration is safe and will work as intended.

With appropriate rules and tools in place, this process can:

- Allow stakeholders to **review** a proposed change and discuss it in context
- Ensure that changes **require approval** from the people responsible before accepting them
- Maintain an **audit history** of what changed, when, and who proposed and approved it
- Make it easy to **revert** a change by restoring an earlier version

While this is a deliberately simplified example, we can see how the proposed outcome, the discussion, and the decision are captured in one visible history.

This is why declarative descriptions are useful beyond infrastructure. When people can understand the intended outcome, and changes are recorded and reviewed in source control, governance becomes part of the work rather than a separate trail of spreadsheets and emails.
